"use client"
import RecruiterJobCard from "../recruiter-job-card";
import PostNewJob from "../post-new-job";
import CandidateJobCard from "../candidate-job-card";
import { filterMenuDataArray, FormUrlQuery } from "@/utils";
import { useState, useEffect } from "react";
import { Menubar, MenubarItem, MenubarMenu, MenubarTrigger , MenubarContent } from "../ui/menubar";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({user, profileInfo, jobList, jobApplications, filterCategories }){
   console.log("jobApplications", jobApplications);
  // console.log("JobList", JobList);

  const [filterParams, setFilterParams] = useState({});
  const  searchParams = useSearchParams();
  const router = useRouter();


  function handleFilter(sectionId, currOption){
   let copyFilterParams = {...filterParams};
   const indexCurrSection = Object.keys(copyFilterParams).indexOf(sectionId);
   if(indexCurrSection === -1){
      copyFilterParams = {
         ...copyFilterParams,
         [sectionId] : [currOption]
      }
   }else{
      const indexOfCurrOption = copyFilterParams[sectionId].indexOf(currOption);
      if(indexOfCurrOption === -1) copyFilterParams[sectionId].push(currOption);
      else copyFilterParams[sectionId].splice(indexOfCurrOption, 1)
   }

   setFilterParams(copyFilterParams);
   sessionStorage.setItem('filterParams', JSON.stringify(copyFilterParams));
  }

  useEffect(()=>{
      setFilterParams(JSON.parse(sessionStorage.getItem('filterParams')))
  }, []);

  useEffect(()=>{
      if(filterParams && Object.keys(filterParams).length>0){
         let url = '';
         url = FormUrlQuery({
            params : searchParams.toString(),
            dataToAdd : filterParams
         })

         router.push(url, {scroll : false});
      }
  },[JSON.stringify(filterParams), searchParams.toString()]);

  const filterMenu = filterMenuDataArray.map(item => ({
   id : item.id,
   name : item.label,
   options : [
      ...new Set(filterCategories.map(listItem => listItem[item.id]))
   ]
  }));

  console.log(filterMenu);

    return <div>
        <div className="mx-auto max-w-7xl">
           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
                 {
                    profileInfo?.role === "candidate" ? 
                    "Explore All Jobs"
                    : "Job Dashboard"
                 }
              </h1>
              <div className="flex items-center">
                {
                    profileInfo?.role === 'candidate' ? 
                    (
                     <Menubar>
                        {
                           filterMenu.map((item,i) => 
                              <MenubarMenu key ={i}>
                                 <MenubarTrigger>
                                    {item.name}
                                 </MenubarTrigger>
                                 <MenubarContent>
                                    {item.options.map((option, optionindx)=>(
                                          <MenubarItem key={optionindx}
                                                       className="flex items-center"
                                                       onClick={()=> handleFilter(item.id, option)}>
                                             <div className={`h-4 w-4 border rounded border-gray-900 ${filterParams && Object.keys(filterParams).length >0 && filterParams[item.id] && filterParams[item.id].indexOf(option) > -1 ? "bg-black" : ''}`}/>
                                              <Label className="ml-3 cursor-pointer text-sm text-gray-600">{option}</Label>
                                          </MenubarItem>
                                    ))}
                                 </MenubarContent>
                              </MenubarMenu>
                           )
                        }
                     </Menubar>
                    )
                    : <PostNewJob user={user} profileInfo={profileInfo}/>
                }
              </div>
           </div>
           <div className="pt-6 pb-24">
             <div className="grid, grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
               <div className="lg:col-span-4">
                  <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                       {
                        jobList && jobList.length>0 ?
                        jobList.map((jobItem, indx) =>
                           profileInfo?.role === "candidate" ?
                           <CandidateJobCard key={indx}
                           profileInfo={profileInfo}
                           jobItem={jobItem}
                           jobApplications={jobApplications}
                            />
                          : <RecruiterJobCard key={indx}
                          profileInfo={profileInfo}
                          jobItem={jobItem}
                          jobApplications={jobApplications}
                          />
                        )
                        : null
                       }
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
    </div>
}

export default JobListing;
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

  const isCandidate = profileInfo?.role === "candidate";

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

              {/* Header */}
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {isCandidate ? "Explore All Jobs" : "Job Dashboard"}
            </h1>
            <div className="flex items-center">
              {isCandidate ? (
                <Menubar>
                  {filterMenu.map((item, i) =>
                    <MenubarMenu key={i}>
                      <MenubarTrigger>{item.name}</MenubarTrigger>
                      <MenubarContent>
                        {item.options.map((option, optionindx) => (
                          <MenubarItem key={optionindx}
                                       className="flex items-center"
                                       onClick={() => handleFilter(item.id, option)}>
                            <div className={`h-4 w-4 border rounded border-gray-900 ${
                              filterParams && Object.keys(filterParams).length > 0 &&
                              filterParams[item.id] &&
                              filterParams[item.id].indexOf(option) > -1 ? "bg-black" : ''
                            }`}/>
                            <Label className="ml-3 cursor-pointer text-sm text-gray-600">{option}</Label>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  )}
                </Menubar>
              ) : (
                <PostNewJob user={user} profileInfo={profileInfo}/>
              )}
            </div>
          </div>


          {/* Stats bar — recruiter only */}
          {!isCandidate && jobList?.length > 0 && (
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm text-gray-500">{jobList.length} active listings</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-sm text-gray-500">{jobApplications?.length || 0} total applications</span>
            </div>
          )}

          {/* Job Grid */}
          <div className="py-10 pb-24">
            {jobList && jobList.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {jobList.map((jobItem, indx) =>
                  isCandidate ? (
                    <CandidateJobCard key={indx}
                      profileInfo={profileInfo}
                      jobItem={jobItem}
                      jobApplications={jobApplications}
                    />
                  ) : (
                    <RecruiterJobCard key={indx}
                      profileInfo={profileInfo}
                      jobItem={jobItem}
                      jobApplications={jobApplications}
                    />
                  )
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No jobs found</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  {isCandidate
                    ? "Try adjusting your filters to see more opportunities."
                    : "Post your first job to start finding candidates."}
                </p>
                {!isCandidate && (
                  <div className="mt-6">
                    <PostNewJob user={user} profileInfo={profileInfo} />
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    );
}

export default JobListing;
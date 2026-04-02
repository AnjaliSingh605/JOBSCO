"use client"
import { Tabs, TabsList, TabsTrigger , TabsContent} from "../ui/tabs";
import CommonCard from "../commonCard";
import { JobIcon } from "../job-icon";

export default function CandidateActivity({jobList, jobApplicants}){
    console.log("jobList:", jobList);
  console.log("jobApplicants:", jobApplicants);
  console.log("jobList length:", jobList?.length);
  console.log("jobApplicants length:", jobApplicants?.length);

  // Check the shape of a single applicant
  console.log("First applicant:", jobApplicants?.[0]);
  console.log("First applicant status:", jobApplicants?.[0]?.status);

  // Check the shape of a single job
  console.log("First job:", jobList?.[0]);
  console.log("First job _id:", jobList?.[0]?._id);

  const uniqueStatus = [...new Set(jobApplicants.flatMap(item => item?.status))];
  console.log("uniqueStatus:", uniqueStatus);

    return(
        <div className="mx-auto max-w-7xl">
           <Tabs defaultValue="Applied" className="w-full">
             <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">Your Activity</h1>
                <TabsList>
                {uniqueStatus.map((status, i) => 
                       <TabsTrigger key={i} value={status}>{status}</TabsTrigger>
                )}
             </TabsList>
             </div>
             <div className="pb-24 pt-6 ">
                <div className="container mx-auto p-0 space-y-8">
                   <div className="flex flex-col gap-4">
                        {
                             uniqueStatus.map((status, i) => 
                                <TabsContent value={status} key={i}>
                                     {jobList.filter(jobItem => 
                                        jobApplicants.filter(applicationItem => applicationItem.status.includes(status)
                                     ).findIndex(appItem => appItem.jobID?.toString() === jobItem._id?.toString()) > -1 )
                                     .map((finalFilterItem, ind) => <CommonCard 
                                                              key={ind}
                                                              icon={<JobIcon/>}
                                                              title={finalFilterItem?.title}
                                                              description={finalFilterItem?.companyName}/>

                                     )}
                                </TabsContent>
                            )
                        }
                   </div>
                </div>
             </div>
           </Tabs>
        </div>
    )
}
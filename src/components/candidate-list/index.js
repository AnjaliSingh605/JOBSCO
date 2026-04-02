"use client"

import { Fragment } from "react"
import { Button } from "../ui/button"
import { DialogContent, Dialog, DialogTitle} from "../ui/dialog"
import { getCandidateDetailsById, updateJobApplicationAction } from "@/actions"
import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient('https://vihwmbexuhnjddlbibxl.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaHdtYmV4dWhuamRkbGJpYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTU1NDAsImV4cCI6MjA5MDE5MTU0MH0.8JkHrAFg3Q89aqKHVbHC-twuhvxIRIdtlKg23_BIOgk');



export default function CandidateList({ currCandidateDetails,
    setCurrCandidateDetails,
    jobApplications,
    showCurrCandidateDetailModel,
    setShowCurrCandidateDetailsModel }) {

    async function handleFetchCandidateDetails(currCandidateId) {
        const data = await getCandidateDetailsById(currCandidateId);
        console.log("candata", data);
        if (data) {
            setCurrCandidateDetails(data);
            setShowCurrCandidateDetailsModel(true);
        }
    }

    function handlepreviewResume(){
        const {data} = supabaseClient.storage.from('job-board-public').getPublicUrl(currCandidateDetails?.candidateInfo?.resume);
        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download', 'Resume.pdf');
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function handleUpdateJobStatus(curStatus){
      let copyJobApplicants = [...jobApplications];
      const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(item => item.candidateUserId === currCandidateDetails?.userId);
      const jobApplicantToUpdate = {
        ...copyJobApplicants[indexOfCurrentJobApplicant],
        status : copyJobApplicants[indexOfCurrentJobApplicant].status.concat(curStatus)
      }

      console.log(jobApplicantToUpdate, 'jobAplUp')

      await updateJobApplicationAction(jobApplicantToUpdate, '/jobs');

    }

    console.log(currCandidateDetails);

    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobApplications && jobApplications.length > 0 ?
                        jobApplications.map((item, i) =>
                            <div key={i} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                                <div className="px-4 my-6 flex justify-between items-center">
                                    <h3 className="text-lg font-bold ">{item.name}</h3>
                                    <Button
                                        className="flex h-11 items-center justify-center px-5"
                                        onClick={() => handleFetchCandidateDetails(item.candidateUserId)}>
                                        View Profile
                                    </Button>
                                </div>
                            </div>)
                        : null
                }
            </div>
            <Dialog open={showCurrCandidateDetailModel}
                onOpenChange={() => {
                    setShowCurrCandidateDetailsModel(false)
                    setCurrCandidateDetails(null)
                }}>
                <DialogContent>
                    <DialogTitle className="text-2xl font-medium text-black">{currCandidateDetails?.candidateInfo?.name}{" , "}{currCandidateDetails?.email}</DialogTitle>
                    <div>
                        <p className="text-xl font-medium text-black">{currCandidateDetails?.candidateInfo?.currentCompany}</p>
                        <p>
                            Total Experience: {currCandidateDetails?.candidateInfo?.totalExperience} Yrs
                        </p>
                        <p>
                            Salary : {currCandidateDetails?.candidateInfo?.currentSalary} LPA
                        </p>
                        <p>
                            Notice Period : {currCandidateDetails?.candidateInfo?.noticePeriod} Days
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-6">
                            {
                                currCandidateDetails?.candidateInfo?.skills?.split(',').map((skill, i) => (
                                    <div key={i} className="w-[100px] flex justify-center items-center h-[35px]  bg-black rounded-4"><h2 className="text-[13px] font-medium text-white" >{skill}</h2></div>
                                ))
                            }
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-6">
                            <h1>Previous Companies: </h1>
                            {
                                currCandidateDetails?.candidateInfo?.previousCompanies?.split(',').map((skill, i) => (
                                    <div key={i} className="w-[100px] flex justify-center items-center h-[35px]  bg-black rounded-4"><h2 className="text-[13px] font-medium text-white" >{skill}</h2></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex  gap-3">
                        <Button onClick={handlepreviewResume}  className=" disabled:opacity-65 flex h-11 items-center justify-center px-5">Resume</Button>
                        <Button onClick={()=>handleUpdateJobStatus('selected')}
                                className="flex h-11 items-center justify-center px-5"
                                disabled={
                                   jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)
                                   ?.status.includes("selected") || jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)
                                   ?.status.includes("rejected") ?
                                    true : 
                                    false   
                                }
                                >
                                {
                                   jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)?.status.includes("selected") ? "Selected" : "Select"   
                                }
                                </Button>
                               <Button onClick={()=>handleUpdateJobStatus('rejected')}  
                                className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                                     disabled={
                                   jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)
                                   ?.status.includes("selected") || jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)
                                   ?.status.includes("rejected") ?
                                    true : 
                                    false   
                                }
                                >
                                {
                                   jobApplications.find(item => item.candidateUserId === currCandidateDetails?.userId)?.status.includes("rejected") ? "Rejected" : "Reject"   
                                }
                                </Button>
                    </div>

                </DialogContent> 
            </Dialog>
        </Fragment>
    )
}
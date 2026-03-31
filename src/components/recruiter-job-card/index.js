"use client"
import { JobIcon } from "../job-icon"
import { Button } from "../ui/button"
import CommonCard from "../commonCard"
import JobApplicants from "../job-applicants";
import { useState } from "react";

export default function RecruiterJobCard({jobItem, profileInfo, jobApplications}){
 
  const [showApplicantDrawer, setShowApplicantDrawer] = useState(false);
  const [currCandidateDetails, setCurrCandidateDetails] = useState(null);
  const [showCurrCandidateDetailModel, setShowCurrCandidateDetailsModel] = useState(false);

    return <div>
      <CommonCard
        icon={<JobIcon/>}
        title={jobItem.title}
        footercontent={
            <Button onClick={()=> setShowApplicantDrawer(true)} 
                    className="diabled-opacity-60 flex h-11 item-center justify-center px-5"
                    disabled={jobApplications.filter(item => item.jobID === jobItem?._id?.toString()).length === 0}>
                {
                  jobApplications.filter(item => item.jobID === jobItem?._id?.toString()).length
                } Appicants
            </Button>
        }
      />
      <JobApplicants showApplicantDrawer={showApplicantDrawer}
                     setShowApplicantDrawer={setShowApplicantDrawer}
                     showCurrCandidateDetailModel={showCurrCandidateDetailModel}
                     setShowCurrCandidateDetailsModel={setShowCurrCandidateDetailsModel}
                     currCandidateDetails={currCandidateDetails}
                     setCurrCandidateDetails={setCurrCandidateDetails}
                     jobItem={jobItem}
                     jobApplications={jobApplications.filter(
                      item => item.jobID === jobItem?._id?.toString()
                     )}
                     />
    </div>
}
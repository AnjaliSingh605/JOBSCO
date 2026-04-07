"use client"
import { JobIcon } from "../job-icon"
import { Button } from "../ui/button"
import CommonCard from "../commonCard"
import JobApplicants from "../job-applicants";
import { useState } from "react";

export default function RecruiterJobCard({ jobItem, profileInfo, jobApplications }) {

  const [showApplicantDrawer, setShowApplicantDrawer] = useState(false);
  const [currCandidateDetails, setCurrCandidateDetails] = useState(null);
  const [showCurrCandidateDetailModel, setShowCurrCandidateDetailsModel] = useState(false);

  const applicants = jobApplications.filter(
    (item) => item.jobID === jobItem?._id?.toString()
  );
  const applicantCount = applicants.length;
  const hasApplicants = applicantCount > 0;

  return (
    <div>
      <CommonCard
        icon={<JobIcon className="w-4 h-4" />}
        title={jobItem?.title}
        description={jobItem?.companyName}
        footercontent={
          <div className="flex items-center justify-between w-full gap-2">

            {/* Applicant count badge */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${hasApplicants ? "bg-blue-500" : "bg-slate-300"}`} />
              <span className="text-[11px] text-slate-500 font-medium">
                {hasApplicants
                  ? `${applicantCount} applicant${applicantCount > 1 ? "s" : ""}`
                  : "No applicants yet"}
              </span>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setShowApplicantDrawer(true)}
              disabled={!hasApplicants}
              size="sm"
              className="h-7 px-3 text-[11px] rounded-lg bg-[#1a1f36] hover:bg-blue-700 text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              View Applicants
            </Button>

          </div>
        }
      />

      <JobApplicants
        showApplicantDrawer={showApplicantDrawer}
        setShowApplicantDrawer={setShowApplicantDrawer}
        showCurrCandidateDetailModel={showCurrCandidateDetailModel}
        setShowCurrCandidateDetailsModel={setShowCurrCandidateDetailsModel}
        currCandidateDetails={currCandidateDetails}
        setCurrCandidateDetails={setCurrCandidateDetails}
        jobItem={jobItem}
        jobApplications={applicants}
      />
    </div>
  );
}
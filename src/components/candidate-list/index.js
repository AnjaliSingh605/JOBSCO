"use client"

import { Fragment } from "react"
import { Button } from "../ui/button"
import { DialogContent, Dialog, DialogTitle } from "../ui/dialog"
import { getCandidateDetailsById, updateJobApplicationAction } from "@/actions"
import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient(
  'https://vihwmbexuhnjddlbibxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaHdtYmV4dWhuamRkbGJpYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTU1NDAsImV4cCI6MjA5MDE5MTU0MH0.8JkHrAFg3Q89aqKHVbHC-twuhvxIRIdtlKg23_BIOgk'
);

export default function CandidateList({
  currCandidateDetails,
  setCurrCandidateDetails,
  jobApplications,
  showCurrCandidateDetailModel,
  setShowCurrCandidateDetailsModel
}) {

  async function handleFetchCandidateDetails(currCandidateId) {
    const data = await getCandidateDetailsById(currCandidateId);
    if (data) {
      setCurrCandidateDetails(data);
      setShowCurrCandidateDetailsModel(true);
    }
  }

  function handlepreviewResume() {
    const { data } = supabaseClient.storage.from('job-board-public').getPublicUrl(currCandidateDetails?.candidateInfo?.resume);
    const a = document.createElement('a');
    a.href = data?.publicUrl;
    a.setAttribute('download', 'Resume.pdf');
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(curStatus) {
    let copyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(
      item => item.candidateUserId === currCandidateDetails?.userId
    );
    const jobApplicantToUpdate = {
      ...copyJobApplicants[indexOfCurrentJobApplicant],
      status: copyJobApplicants[indexOfCurrentJobApplicant].status.concat(curStatus)
    };
    await updateJobApplicationAction(jobApplicantToUpdate, '/jobs');
  }

  const getApplicantStatus = (candidateUserId) => {
    return jobApplications.find(item => item.candidateUserId === candidateUserId)?.status ?? [];
  }

  const isDecided = (status) => status.includes("selected") || status.includes("rejected");

  return (
    <Fragment>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
        {jobApplications && jobApplications.length > 0 ? (
          jobApplications.map((item, i) => {
            const status = getApplicantStatus(item.candidateUserId);
            const isSelected = status.includes("selected");
            const isRejected = status.includes("rejected");

            return (
              <div
                key={i}
                className="flex items-center justify-between gap-3 bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 rounded-xl px-4 py-3"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      {item.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1a1f36] truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{item.email}</p>
                  </div>
                </div>

                {/* Status badge + button */}
                <div className="flex items-center gap-2 shrink-0">
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-600 border border-green-100">
                      Selected
                    </span>
                  )}
                  {isRejected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                      Rejected
                    </span>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleFetchCandidateDetails(item.candidateUserId)}
                    className="h-7 px-3 text-[11px] rounded-lg bg-[#1a1f36] hover:bg-blue-700 text-white transition-colors duration-200"
                  >
                    View
                  </Button>
                </div>
              </div>
            );
          })
        ) : null}
      </div>

      {/* Candidate Detail Dialog */}
      <Dialog
        open={showCurrCandidateDetailModel}
        onOpenChange={() => {
          setShowCurrCandidateDetailsModel(false);
          setCurrCandidateDetails(null);
        }}
      >
        <DialogContent className="max-w-lg rounded-2xl p-6 border border-slate-100">

          {/* Header */}
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-1">
              {currCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <DialogTitle className="text-xl font-bold text-[#1a1f36]">
              {currCandidateDetails?.candidateInfo?.name}
            </DialogTitle>
            <p className="text-xs text-slate-400 mt-0.5">{currCandidateDetails?.email}</p>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Experience", value: `${currCandidateDetails?.candidateInfo?.totalExperience} yrs` },
              { label: "Salary", value: `${currCandidateDetails?.candidateInfo?.currentSalary} LPA` },
              { label: "Notice", value: `${currCandidateDetails?.candidateInfo?.noticePeriod} days` },
            ].map((stat, i) => (
              <div key={i} className="bg-blue-50/60 border border-blue-100 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] uppercase tracking-widest text-blue-400 mb-0.5">{stat.label}</p>
                <p className="text-sm font-semibold text-[#1a1f36]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {currCandidateDetails?.candidateInfo?.skills?.split(',').map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1f36] text-white">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Previous Companies */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-2">Previous Companies</p>
            <div className="flex flex-wrap gap-1.5">
              {currCandidateDetails?.candidateInfo?.previousCompanies?.split(',').map((company, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                  {company.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-4" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handlepreviewResume}
              variant="outline"
              className="h-9 px-4 text-sm rounded-lg border-blue-100 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              Resume
            </Button>

            <Button
              onClick={() => handleUpdateJobStatus('selected')}
              disabled={isDecided(getApplicantStatus(currCandidateDetails?.userId))}
              className="h-9 px-4 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 transition-colors duration-200"
            >
              {getApplicantStatus(currCandidateDetails?.userId).includes("selected") ? "Selected ✓" : "Select"}
            </Button>

            <Button
              onClick={() => handleUpdateJobStatus('rejected')}
              disabled={isDecided(getApplicantStatus(currCandidateDetails?.userId))}
              className="h-9 px-4 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 transition-colors duration-200"
            >
              {getApplicantStatus(currCandidateDetails?.userId).includes("rejected") ? "Rejected ✗" : "Reject"}
            </Button>
          </div>

        </DialogContent>
      </Dialog>

    </Fragment>
  );
}
"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import CandidateList from "../candidate-list";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({
  showApplicantDrawer,
  setShowApplicantDrawer,
  showCurrCandidateDetailModel,
  setShowCurrCandidateDetailsModel,
  currCandidateDetails,
  setCurrCandidateDetails,
  jobItem,
  jobApplications
}) {
  const applicantCount = jobApplications?.length ?? 0;

  return (
    <Drawer open={showApplicantDrawer} onOpenChange={setShowApplicantDrawer}>
      <DrawerContent className="max-w-2xl mx-auto rounded-t-2xl border-t-2 border-blue-100 px-6 pb-8 pt-2">

        <DrawerHeader className="p-0 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-1">
                {jobItem?.companyName}
              </p>
              <DrawerTitle className="text-xl font-bold text-[#1a1f36]">
                {jobItem?.title}
              </DrawerTitle>
            </div>

            {/* Applicant count pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-blue-600">
                {applicantCount} applicant{applicantCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 h-px bg-blue-50" />
        </DrawerHeader>

        <ScrollArea className="h-[40vh] overflow-y-auto pr-1">
          <CandidateList
            currCandidateDetails={currCandidateDetails}
            setCurrCandidateDetails={setCurrCandidateDetails}
            jobApplications={jobApplications}
            showCurrCandidateDetailModel={showCurrCandidateDetailModel}
            setShowCurrCandidateDetailsModel={setShowCurrCandidateDetailsModel}
          />
        </ScrollArea>

      </DrawerContent>
    </Drawer>
  );
}
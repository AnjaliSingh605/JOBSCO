"use client"
import { Fragment, useState } from "react"
import CommonCard from "../commonCard"
import { JobIcon } from "../job-icon"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"

export default function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  async function handleJobApply() {
    await createJobApplicationAction({
      recruiterUserId: jobItem?.recruiterId,
      name: profileInfo?.candidateInfo?.name,
      email: profileInfo?.email,
      candidateUserId: profileInfo?.userId,
      status: ['Applied'],
      jobID: jobItem?._id?.toString(),
      jobAppliedDated: new Date().toLocaleDateString(),
    }, '/jobs');
    setShowJobDetailsDrawer(false);
  }

  const alreadyApplied = jobApplications.some(
    (item) => item.jobID === jobItem?._id?.toString()
  );

  return (
    <Fragment>
      <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>

        <CommonCard
          icon={<JobIcon className="w-4 h-4" />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footercontent={
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                  {jobItem?.type}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                  {jobItem?.location}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setShowJobDetailsDrawer(true)}
                className="h-7 px-3 text-[11px] rounded-lg bg-[#1a1f36] hover:bg-blue-700 text-white shrink-0 transition-colors duration-200"
              >
                View
              </Button>
            </div>
          }
        />

        {/* Drawer */}
        <DrawerContent className="max-w-2xl mx-auto rounded-t-2xl px-8 pb-10 pt-2 border-t-2 border-blue-100">
          <DrawerHeader className="p-0 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-1">
                  {jobItem?.companyName}
                </p>
                <DrawerTitle className="text-2xl font-bold text-[#1a1f36]">
                  {jobItem?.title}
                </DrawerTitle>
              </div>
              <div className="flex gap-2 pt-1 shrink-0">
                <Button
                  onClick={handleJobApply}
                  disabled={alreadyApplied}
                  className="h-9 px-5 text-sm rounded-lg bg-[#1a1f36] hover:bg-blue-700 text-white disabled:opacity-50 transition-colors duration-200"
                >
                  {alreadyApplied ? "Applied ✓" : "Apply Now"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowJobDetailsDrawer(false)}
                  className="h-9 px-4 text-sm rounded-lg border-blue-100 text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          </DrawerHeader>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
              {jobItem?.type} Time
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
              📍 {jobItem?.location}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
              🧠 {jobItem?.experience} yr exp
            </span>
          </div>

          {/* Description */}
          <DrawerDescription className="text-sm text-slate-500 leading-relaxed mb-6">
            {jobItem?.description}
          </DrawerDescription>

          {/* Skills */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-3">Skills</p>
            <div className="flex flex-wrap gap-2">
              {jobItem?.skills?.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1f36] text-white hover:bg-blue-700 transition-colors duration-200 cursor-default"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  )
}
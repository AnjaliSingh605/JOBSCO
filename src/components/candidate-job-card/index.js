"use client"
import { Fragment } from "react"
import { useState } from "react"
import CommonCard from "../commonCard"
import { JobIcon } from "../job-icon"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"

export default function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  async function handleJobApply() {

    await createJobApplicationAction({
      recruiterUserId: jobItem?.recruiterId,
      name: profileInfo?.candidateInfo?.name, // candidate
      email: profileInfo?.email,
      candidateUserId: profileInfo?.userId,
      status: ['Applied'],
      jobID: jobItem?._id?.toString(),
      jobAppliedDated: new Date().toLocaleDateString(),
    }, '/jobs');
    setShowJobDetailsDrawer(false);
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem.title}
          description={jobItem.companyName}
          footercontent={
            <Button onClick={() => setShowJobDetailsDrawer(true)} className="diabled-opacty-60 flex h-11 item-center justify-center px-5">
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleJobApply}
                  disabled={jobApplications.some(
                    (item) => item.jobID === jobItem?._id?.toString()
                  )}
                  className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
                  {
                    jobApplications.findIndex(item => item.jobID === jobItem?._id?.toString()) > -1 ? "Applied" : "Apply"
                  }
                </Button>
                <Button
                  className="diabled-opacity-60 flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobDetailsDrawer(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobItem?.description}
            <span className="text-xl font-normal text-gray-500 ml-4">{jobItem.location}</span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-4">
            <h2 className="text-xl font-bold text-white">{jobItem?.type} Time</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">Experience: {jobItem.experience} year </h3>
          <div className="flex gap-4 mt-6">
            {
              jobItem.skills.split(',').map((skill, i) => (
                <div key={i} className="w-[100px] flex justify-center items-center h-[35px]  bg-black rounded-4"><h2 className="text-[13px] font-medium text-white" >{skill}</h2></div>
              ))
            }
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  )
}
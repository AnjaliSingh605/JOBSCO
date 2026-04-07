"use client"

import { candidateOnBoardFormControls, initialCandidateAccountFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils"
import { useState, useEffect } from "react";
import CommonForm from "../common-form";
import { UpdateProfileInfoAction } from "@/actions";

export default function AccountInfo({ ProfileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(initialCandidateAccountFormData);
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);

  async function handleUpdateAccount() {
    await UpdateProfileInfoAction(
      ProfileInfo?.role === "candidate"
        ? {
            _id: ProfileInfo?._id,
            userId: ProfileInfo?.userId,
            role: ProfileInfo?.role,
            email: ProfileInfo?.email,
            isPremiumUser: ProfileInfo?.isPremiumUser,
            memberShipType: ProfileInfo?.memberShipType,
            memberShipStartDate: ProfileInfo?.memberShipStartDate,
            memberShipEndDate: ProfileInfo?.memberShipEndDate,
            candidateInfo: { ...candidateFormData, resume: ProfileInfo?.candidateInfo?.resume },
          }
        : {
            _id: ProfileInfo?._id,
            userId: ProfileInfo?.userId,
            role: ProfileInfo?.role,
            email: ProfileInfo?.email,
            isPremiumUser: ProfileInfo?.isPremiumUser,
            memberShipType: ProfileInfo?.memberShipType,
            memberShipStartDate: ProfileInfo?.memberShipStartDate,
            memberShipEndDate: ProfileInfo?.memberShipEndDate,
            recruiterInfo: { ...recruiterFormData },
          },
      "/account"
    );
  }

  useEffect(() => {
    if (ProfileInfo?.role === "recruiter" && ProfileInfo?.recruiterInfo)
      setRecruiterFormData({ ...initialRecruiterFormData, ...ProfileInfo.recruiterInfo });
    if (ProfileInfo?.role === "candidate" && ProfileInfo?.candidateInfo)
      setCandidateFormData({ ...initialCandidateAccountFormData, ...ProfileInfo.candidateInfo });
  }, [ProfileInfo]);

  const isCandidate = ProfileInfo?.role === "candidate";

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Header */}
      <div className="flex items-start justify-between pt-24 pb-6 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            500,000+ active listings
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Account Details
          </h1>
        </div>

        {/* Role badge — matches homepage category pills */}
        <span
          className={`mt-2 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border ${
            isCandidate
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {isCandidate ? "Candidate" : "Recruiter"}
        </span>
      </div>

      {/* Form */}
      <div className="py-10">
        <CommonForm
          formControls={
            isCandidate
              ? candidateOnBoardFormControls.filter((c) => c.name !== "resume")
              : recruiterOnboardFormControls
          }
          formData={isCandidate ? candidateFormData : recruiterFormData}
          setFormData={isCandidate ? setCandidateFormData : setRecruiterFormData}
          buttonText="Update Profile"
          action={handleUpdateAccount}
        />
      </div>
    </div>
  );
}
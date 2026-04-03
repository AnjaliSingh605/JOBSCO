"use client"

import { candidateOnBoardFormControls, initialCandidateAccountFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils"
import { useState, useEffect } from "react";
import CommonForm from "../common-form";

export default function AccountInfo({ProfileInfo}){

    const [candidateFormData, setCandidateFormData] = useState(initialCandidateAccountFormData);
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);


    console.log("Prof", ProfileInfo);

    useEffect(() => {
    if (ProfileInfo?.role === 'recruiter' && ProfileInfo?.recruiterInfo)
        setRecruiterFormData({
            ...initialRecruiterFormData,        
            ...ProfileInfo?.recruiterInfo      
        });
    if (ProfileInfo?.role === 'candidate' && ProfileInfo?.candidateInfo)
        setCandidateFormData({
            ...initialCandidateAccountFormData, 
            ...ProfileInfo?.candidateInfo      
        });
}, [ProfileInfo]);

    return(
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between pb-6 border-b pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-950">Account Details</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm 
                     formControls={
                        ProfileInfo?.role === 'candidate' ?
                        candidateOnBoardFormControls.filter(formControl => formControl.name !== 'resume') : 
                        recruiterOnboardFormControls
                     }
                     formData ={ProfileInfo?.role === 'candidate' ?
                       candidateFormData : 
                       recruiterFormData
                     }
                     setFormData = {ProfileInfo?.role === 'candidate' ?
                       setCandidateFormData : 
                       setRecruiterFormData
                     }
                     buttonText = 'Update Profile'

                    />
                </div>
            </div>
        </div>
    )
}
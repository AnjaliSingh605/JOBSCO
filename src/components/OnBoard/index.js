"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";
import { useUser } from "@clerk/nextjs";
import { recruiterOnboardFormControls, candidateOnBoardFormControls, initialCandidateFormData, initialRecruiterFormData } from "@/utils";
import { CreateProfileAction } from "@/actions";

const OnBoard = () => {

    const [currTab, setCurrTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);

    const currentAuthUser = useUser();
    const {user} = currentAuthUser;
    function handleTabChange(value){
        setCurrTab(value)
    }

    console.log(recruiterFormData);
    
    function handleRecruiterFormValid(){
        return recruiterFormData &&
        recruiterFormData.name.trim() !== "" &&
        recruiterFormData.companyName.trim() !== "" &&
        recruiterFormData.companyRole.trim() !== ""
    };

    async function createProfile(){
       const data = {
        recruiterInfo : recruiterFormData,
        role : 'recruiter',
        isPremiumUser : false,
        userId : user?.id,
        email : user?.primaryEmailAddress?.emailAddress
       };

       await  CreateProfileAction(data, '/onboard');
    }

  return (
    <div className="bg-white">
          <Tabs value={currTab} onValueChange={handleTabChange}>
            <div className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to onBoarding</h1>
                </div>
                <TabsList>
                    <TabsTrigger value="candidate">Candidate</TabsTrigger>
                    <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                </TabsList>
            </div>
             <TabsContent value="candidate">
                <CommonForm 
                formControls={candidateOnBoardFormControls}
                buttonText={'Onboard as Candidate'}
                formData={candidateFormData}
                setFormData={setCandidateFormData}
                />
             </TabsContent>
             <TabsContent value="recruiter">
                <CommonForm 
                formControls={recruiterOnboardFormControls}
                buttonText={'Onboard as recruter'}
                formData={recruiterFormData}
                setFormData={setRecruiterFormData}
                isBtnDisabled={!handleRecruiterFormValid()}
                action={createProfile}
                />
             </TabsContent>
          </Tabs>
    </div>
  )
}

export default OnBoard

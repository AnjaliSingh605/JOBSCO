"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import CommonForm from "../common-form";
import { useUser } from "@clerk/nextjs";
import { recruiterOnboardFormControls, candidateOnBoardFormControls, initialCandidateFormData, initialRecruiterFormData } from "@/utils";
import { CreateProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://vihwmbexuhnjddlbibxl.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaHdtYmV4dWhuamRkbGJpYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTU1NDAsImV4cCI6MjA5MDE5MTU0MH0.8JkHrAFg3Q89aqKHVbHC-twuhvxIRIdtlKg23_BIOgk');


const OnBoard = () => {

    const [currTab, setCurrTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null);


    const currentAuthUser = useUser();
    const {user} = currentAuthUser;
    function handleTabChange(value){
        setCurrTab(value)
    }

    function handleFileChange(event){
        event.preventDefault();
        setFile(event.target.files[0]);
    }

   async function handleFileUploadToSupabase(){
       const {data, error} = await supabaseClient.storage
                                   .from('job-board-public')
                                   .upload(`/public/${file.name}`, file, {
                                    cacheControl : "3600",
                                    upsert : false
                                   });
        // console.log("resdata", data);
        if(data){
            setCandidateFormData({
                ...candidateFormData,
                resume : data.path
            })
        }
    }

    useEffect(()=>{
       if(file) handleFileUploadToSupabase()
    },[file])

    console.log(recruiterFormData);
    
    function handleRecruiterFormValid(){
        return recruiterFormData &&
        recruiterFormData.name.trim() !== "" &&
        recruiterFormData.companyName.trim() !== "" &&
        recruiterFormData.companyRole.trim() !== ""
    };

    function handleCandidateFormValid(){
        console.log("data", candidateFormData);
       return Object.keys(candidateFormData).every(key => candidateFormData[key].trim() !== "");
    }

    async function createProfile(){

       const data = currTab ==='candidate' ? {
          candidateInfo : candidateFormData,
          role : 'candidate',
          isPremiumUser : false,
          userId : user?.id,
          email : user?.primaryEmailAddress?.emailAddress
       } : {
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
                handleFileChange={handleFileChange}
                isBtnDisabled={!handleCandidateFormValid()}
                action={createProfile}
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

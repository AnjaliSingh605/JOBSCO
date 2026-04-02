"use server"

import connectToDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import Job from "@/models/job";
import Application from "@/models/application";

// create profile action

export async function CreateProfileAction(formData, pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}


export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId : id});
    return JSON.parse(JSON.stringify(result));
}

// create job action
export async function postNewJobAction(formData, pathToRevalidate){
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}


// fetch job action for Recruiter
export async function fetchJobActionForRecruiter(id){
    await connectToDB();
    const result = await Job.find({recruiterId : id})

    return JSON.parse(JSON.stringify(result));
}

// fetch job action for candidates
export async function fetchJobActionForCandidate(){
    await connectToDB();

    const result  = await Job.find({});


    return JSON.parse(JSON.stringify(result));
}

// create job application
export async function createJobApplicationAction(data, pathToRevalidate){
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}

// fetch job application for candidates
export async function fetchJobApplicationForCandidateAction(candidateId){
    await connectToDB();
    const result = await Application.find({candidateUserId : candidateId});
    return JSON.parse(JSON.stringify(result));
}

// fetch job application for recruiter
export async function fetchJobApplicationForRecruiter(recruiterId){
    await connectToDB();
    const result = await Application.find({recruiterUserId : recruiterId});
    return JSON.parse(JSON.stringify(result));
}

// update job application
export async function updateJobApplicationAction(data, pathToRevalidate){
    await connectToDB();
    const {_id, recruiterUserId, name, email, candidateUserId, status, jobID, jobAppliedDated} = data;
    await Application.findOneAndUpdate({
        _id : _id
    }, {
        recruiterUserId,
        name,
        email, 
        candidateUserId, 
        status, 
        jobID, 
        jobAppliedDated
    }, {new: true});

   revalidatePath(pathToRevalidate);

}

// get candiidate details by candidateId
export async function getCandidateDetailsById(currCandidateId){
    await connectToDB();
    const result = await Profile.findOne({userId : currCandidateId});

    return JSON.parse(JSON.stringify(result));
}
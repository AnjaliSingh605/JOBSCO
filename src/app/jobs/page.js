import {createFilterCategoryAction, fetchJobActionForRecruiter, fetchProfileAction, fetchJobActionForCandidate, fetchJobApplicationForCandidateAction, fetchJobApplicationForRecruiter } from "@/actions";
import JobListing from "@/components/jon-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobPages({searchParams}){
  const searchParam = await searchParams; 

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo?.role === 'candidate'
      ? await fetchJobActionForCandidate(searchParam)
     : await fetchJobActionForRecruiter(user?.id);

     const getJobApplicationList = profileInfo?.role === 'candidate'
     ? await fetchJobApplicationForCandidateAction(user?.id)
     : await fetchJobApplicationForRecruiter(user?.id)

     const fetchFilterCategories = await createFilterCategoryAction();

    return(
      <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList = {jobList}
      jobApplications={getJobApplicationList}
      filterCategories = {fetchFilterCategories}
      />
    )
}

export default JobPages;
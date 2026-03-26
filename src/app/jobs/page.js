import { fetchProfileAction } from "@/actions";
import JobListing from "@/components/jon-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobPages(){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    return(
      <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      />
    )
}

export default JobPages;
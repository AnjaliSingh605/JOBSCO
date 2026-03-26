import { fetchProfileAction } from "@/actions";
import { redirect } from "next/navigation";
import OnBoard from "@/components/OnBoard";
import { currentUser } from "@clerk/nextjs/server";

async function onBoardPage(){

    // get the auth user from clerk
    const user = await currentUser();

    // fetch profile info -> either candiidate or recruiter;

    const profileInfo = await fetchProfileAction(user?.id);

    if(profileInfo?._id){
       if(profileInfo?.role === 'recruiter' && !profileInfo.isPremium) redirect('/membership');
       else redirect('/')
    } else return <OnBoard/>
}

export default onBoardPage;
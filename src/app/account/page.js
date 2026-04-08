import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-Info"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function AccountPage(){
    const user = await currentUser();
    const ProfileInfo = await fetchProfileAction(user?.id);
    if(!ProfileInfo) redirect('/onboard')

    return<AccountInfo ProfileInfo={ProfileInfo}/>
}


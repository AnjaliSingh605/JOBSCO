import { fetchProfileAction } from "@/actions";
import memberShip from "@/components/membership-page"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function memberShipPage(){
    const user = await currentUser();
    const ProfileInfo = await fetchProfileAction(user?.id)
    if(!ProfileInfo) redirect('/onboard');

    return <memberShip ProfileInfo={ProfileInfo}/>
}
import { currentUser } from "@clerk/nextjs/server";
import Header from "../Header"
import { fetchProfileAction } from "@/actions";

export default async function CommonLayout({children}){
    
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

     return (
        <div className=" p-6 lg:px-8">
            {/* Header Component */}
            <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />

            {/* Main component */}
            <main>{children}</main>
        </div>
     )
}
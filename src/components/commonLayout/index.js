import { currentUser } from "@clerk/nextjs/server";
import Header from "../Header"
import { fetchProfileAction } from "@/actions";
import Footer from "../Footer";

export default async function CommonLayout({children}){
    
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

     return (
        <div className="">
            {/* Header Component */}
         <Header profileInfo={profileInfo} user={user ? JSON.parse(JSON.stringify(user)) : null} />
            {/* Main component */}
            <main >{children}</main>
            {/* Footer */}
            <Footer profileInfo={profileInfo} user={user ? JSON.parse(JSON.stringify(user)) : null}/>
        </div>
     )
}
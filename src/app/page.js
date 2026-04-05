import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MainPage from "@/components/main";

export default async function Home() {

  const user = await currentUser();
  // console.log(user);
  const ProfileInfo = await fetchProfileAction(user?.id);

  if(user && !ProfileInfo?._id) redirect('/onboard');

      return (
    <section>
        <MainPage ProfileInfo={ProfileInfo} user={JSON.parse(JSON.stringify(user))}/>
    </section>
  );
}

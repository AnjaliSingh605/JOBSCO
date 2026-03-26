import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {

  const user = await currentUser();
  // console.log(user);
  const ProfileInfo = await fetchProfileAction(user?.id);

  if(user && !ProfileInfo?._id) redirect('/onboard');

      return (
    <section>
      Main Content
    </section>
  );
}

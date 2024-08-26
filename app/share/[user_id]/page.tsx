import { getProfileById } from "@/actions/auth/user.action";
import { permanentRedirect } from "next/navigation";

interface SharePageProps {
  params: { user_id: string };
  searchParams: {};
}

const page = async (props: SharePageProps) => {
  const userId = props?.params?.user_id;
  const profile = await getProfileById({ serverComponent: true, userId });
  console.log(">>userId", userId);

  // ?
  if (!profile) permanentRedirect("/");
  return <div>share page</div>;
};

export default page;

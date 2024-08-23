interface SharePageProps {
  params: { user_id: string };
  searchParams: {};
}

const page = async (props: SharePageProps) => {
  const userId = props?.params?.user_id;
  console.log(">>userId", userId);

  return <div>share page</div>;
};

export default page;

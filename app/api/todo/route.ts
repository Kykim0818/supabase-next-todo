import { createServerSideClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      // 내림차순 6,5,4
      ascending: false,
    });
  console.log("ping GET API income", result);
  return NextResponse.json({ ...result });
};

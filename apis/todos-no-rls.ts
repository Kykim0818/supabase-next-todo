// client component에서 실행가능하게 하기 위함
"use client";

import { createSupabaseBrowserClient } from "@/lib/client/supabase";

// todoList 가져오기
export const getTodos = async () => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      // 내림차순 6,5,4
      ascending: false,
    });

  return result.data;
};

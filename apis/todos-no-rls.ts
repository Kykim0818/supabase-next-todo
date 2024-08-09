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

// todoList 가져오기 + by Id
export const getTodosById = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`) // ilke는 대소문자 구분없이 가져옴
    .order("id", { ascending: false })
    .limit(500); // 개수 제한

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .insert({
      content,
    })
    .select(); // insert 후 결과를 조회

  return result.data;
};

// todoList 업데이트하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .update({
      content,
      updated_at: new Date().toISOString(), // update 날짜 갱신
    })
    .eq("id", id)
    .select(); // insert 후 결과를 조회

  return result.data;
};

// todoList soft Delete
export const deleteTodosSoft = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(), // deleted at 이 채워지면 삭제된 것으로 간주
    })
    .eq("id", id)
    .select(); // insert 후 결과를 조회

  return result.data;
};

// todoList Hard Delete
// 최대한 사용을 안하는게 좋으므로 주석
// export const deleteTodosHard = async (id: number) => {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase.from("todos_no_rls").delete().eq("id", id);
//   return result.data;
// };

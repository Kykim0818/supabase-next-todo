"use server";

import { createServerSideClient } from "@/lib/supabase";

// todoList 가져오기
export const getTodos = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
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
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return result.data;
};

// todoList 가져오기 + by UserId
export const getTodosByUserId = async (userId: string) => {
  const supabase = await createServerSideClient(true);
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("user_id", userId);

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`) // ilke는 대소문자 구분없이 가져옴
    .order("id", { ascending: false })
    .limit(500); // 개수 제한

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .insert({
      content,
    })
    .select(); // insert 후 결과를 조회

  return result.data;
};

// todoList 업데이트하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
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
  const supabase = createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(), // deleted at 이 채워지면 삭제된 것으로 간주
    })
    .eq("id", id)
    .select(); // insert 후 결과를 조회

  return result.data;
};

import { getTodoAction } from "@/actions/todo/todo.action";
import { NextResponse } from "next/server";

export const GET = async () => {
  const result = await getTodoAction();
  console.log("ping GET API income", result);
  return NextResponse.json({ ...result });
};

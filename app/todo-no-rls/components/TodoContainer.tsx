"use client";

import { getTodos } from "@/apis/todos-no-rls";
import { useEffect } from "react";

export const TodoContainer = () => {
  useEffect(() => {
    getTodos();
  }, []);
  return <div>TODO container</div>;
};

export default TodoContainer;

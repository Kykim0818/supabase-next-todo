"use client";

import useTodosController from "../hooks/useTodosController";

export const TodoContainer = () => {
  const { loading, todos } = useTodosController();

  console.log(">>loading", loading);
  console.log(">>todos", todos);

  return <div>TODO container</div>;
};

export default TodoContainer;

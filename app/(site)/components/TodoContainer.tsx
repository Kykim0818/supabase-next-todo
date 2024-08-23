"use client";

import useTodosController from "../hooks/useTodosController";

interface TodoContainerProps {
  ownerUserId?: string;
}

export const TodoContainer = ({ ownerUserId }: TodoContainerProps) => {
  const { loading, todos } = useTodosController();

  console.log(">>loading", loading);
  console.log(">>todos", todos);

  return (
    <div>
      TODO container
      <div>Todo List</div>
    </div>
  );
};

export default TodoContainer;

"use client";

import { getTodoAction } from "@/actions/todo/todo.action";

const ClientComponentTest = () => {
  const handleClick = async () => {
    const result = await getTodoAction();
    console.log("result", result);
  };
  return (
    <div>
      ClientComponent Test
      <button onClick={handleClick}>Test server actions</button>
    </div>
  );
};

export default ClientComponentTest;

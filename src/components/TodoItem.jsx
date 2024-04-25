import React from "react";
import { useState } from "react";
import { useTodo } from "../context/TodoContext.js";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  //   console.log(todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    // console.log(todo.id);
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex border border-black/10 rounded-l-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/20 duration-300 text-black ${
        todo.completed ? "bg-green-800" : "bg-green-300"
      }`}
    >
      <input
        type="checkbox"
        name=""
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-500 hover:bg-gray-300 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📂" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-500 hover:bg-gray-300 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;

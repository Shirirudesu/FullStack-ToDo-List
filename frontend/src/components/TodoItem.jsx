import React from "react";

const TodoItem = ({ todo, onDelete, onToggle, onOpenSidebar, onEdit }) => {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "10px 0",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={() => onToggle(todo)}
      />
      <span
        onClick={() => onEdit(todo)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#aaa" : "black",
          cursor: "pointer",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => onOpenSidebar(todo)}>Details</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};
export default TodoItem;

import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

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
        //1 шаг: Навесить onClick на тайтл (продолжение в основном TodoPage)
        onClick={() => onEdit(todo)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#aaa" : "black",
          cursor: "pointer",
        }}
      >
        {todo.title}
      </span>
      {/* Details */}
      <IconButton onClick={() => onOpenSidebar(todo)} size="small">
        <InfoIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => onDelete(todo._id)} size="small">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </li>
  );
};
export default TodoItem;

import React from "react";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import api from "../api/axios";

const TodoSidebar = ({
  isPanelOpen,
  setIsPanelOpen,
  selectedTodo,
  setSelectedTodo,

  panelDescription,
  setPanelDescription,

  panelPriority,
  setPanelPriority,

  panelCategory,
  setPanelCategory,

  panelDueDate,
  setPanelDueDate,

  fetchTodos,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isPanelOpen}
      onClose={() => {
        setIsPanelOpen(false);
        setSelectedTodo(null);
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {selectedTodo && (
          <>
            <h3>Advanced task settings</h3>
            <div>
              <input
                type="text"
                value={selectedTodo.title}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Add note:
              </label>
              <textarea
                rows="4"
                style={{ width: "100%", padding: "5px" }}
                value={panelDescription}
                onChange={(e) => setPanelDescription(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Priority:
              </label>
              <select
                value={panelPriority}
                onChange={(e) => setPanelPriority(e.target.value)}
              >
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Category:
              </label>
              <input
                type="text"
                value={panelCategory}
                onChange={(e) => setPanelCategory(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Validity period:
              </label>
              <input
                type="date"
                value={panelDueDate}
                onChange={(e) => setPanelDueDate(e.target.value)}
              />
            </div>
            <button
              onClick={async () => {
                try {
                  await api.put(`/todos/${selectedTodo._id}`, {
                    title: selectedTodo.title,
                    description: panelDescription,
                    priority: panelPriority,
                    category: panelCategory,
                    dueDate: panelDueDate || null,
                  });
                  setIsPanelOpen(false);
                  fetchTodos();
                } catch (error) {
                  console.log("Error updating the task:", error);
                }
              }}
              style={{
                marginTop: "20px",
                padding: "10px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default TodoSidebar;

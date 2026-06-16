import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/TodoList.css";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [editingId, setEditingId] = useState(0);
  const [editingText, setEditingText] = useState("");
  const [editingCompleted, setEditingCompleted] = useState(false);

  const navigate = useNavigate();

  //ADDING
  const handleAddTodo = async () => {
    try {
      if (!inputValue.trim()) return;

      await api.post("/todos", {
        title: inputValue,
      });

      setInputValue("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  //DELETING
  const handleDeleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  //EDITING
  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.title);
  };

  //UPDATING(SAVING)
  const handleUpdateTodo = async (id) => {
    try {
      await api.put(`/todos/${id}`, {
        title: editingText,
      });
      setEditingId(null);
      setEditingText("");
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/todos");
      console.log("TODOS:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error while loading the tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Tasks List</h2>
      {isLoading && <p>Loading...</p>}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {todo.title}
                {todo.createdAt &&
                  new Date(todo.createdAt).toLocaleDateString()}
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

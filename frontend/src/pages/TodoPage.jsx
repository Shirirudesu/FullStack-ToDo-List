import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/TodoList.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import TodoSidebar from "../components/TodoSidebar";
import TodoItem from "../components/TodoItem";

export default function TodoList({ searchQuery }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const [searchQuery, setSearchQuery] = useState(""); //перенес в Navbar
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(0);
  const [editingText, setEditingText] = useState("");
  const [editingCompleted, setEditingCompleted] = useState(false);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [panelDescription, setPanelDescription] = useState("");
  const [panelPriority, setPanelPriority] = useState("none");
  const [panelCategory, setPanelCategory] = useState("Tasks");
  const [panelDueDate, setPanelDueDate] = useState("");

  const [originalText, setOriginalText] = useState("");

  const navigate = useNavigate();

  //GETTING TODOS
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error while loading the tasks:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

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

  //TOGGLE STATUS
  const handleToggleTodo = async (todo) => {
    try {
      await api.put(`/todos/${todo._id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  //UPDATING(SAVING)
  const handleUpdateTodo = async (id) => {
    //Шаг 7: если текст не изменился — не отправляем PUT-запрос. Если текущее значение совпадает с исходным, выходим из режима редактирования
    try {
      if (editingText === originalText) {
        setEditingId(null);
        return;
      }
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

  //FILTERING
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

  //SIDEBAR OPEN
  const handleOpenSidebar = (todo) => {
    setSelectedTodo(todo);

    setPanelDescription(todo.description || "");
    setPanelPriority(todo.priority || "none");
    setPanelCategory(todo.category || "Tasks");

    setPanelDueDate(
      todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "",
    );
    setIsPanelOpen(true);
  };

  //Шаг 2: Создаём обработчик
  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.title);
    setOriginalText(todo.title);
  };

  return (
    <div>
      <h2>Tasks List</h2>
      <div className="search-box" style={{ marginBottom: "15px" }}></div>

      <div
        className="filter-buttons"
        style={{ marginBottom: "15px", display: "flex", gap: "10px" }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
          Completed
        </button>
      </div>

      <div className="add-todo-box" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredTodos.length === 0 ? (
        <p className="empty-state">No tasks found here...</p>
      ) : (
        <ul>
          {filteredTodos.map((todo) =>
            //Шаг 3: Если эта задача редактируется, то показываем input, а если нет, то показываем обычный TodoItem
            editingId === todo._id ? (
              <li
                key={todo._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <input
                  type="text"
                  autoFocus
                  value={editingText}
                  //Шаг 4: Сделать input управляемым, Печатаем, editingText обновляется
                  onChange={(event) => setEditingText(event.target.value)}
                  onKeyDown={(event) => {
                    //Шаг 5-6: Клик на Enter и клик за пределами поля, плюс убираем фокус с инпута
                    if (event.key === "Enter") {
                      handleUpdateTodo(todo._id);
                    }
                    if (event.key === "Escape") {
                      setEditingId(null);
                      setEditingText("");
                    }
                  }}
                  onBlur={() => {
                    handleUpdateTodo(todo._id);
                  }}
                />

                {/* Save and Cancel */}
              </li>
            ) : (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
                onOpenSidebar={handleOpenSidebar}
                onEdit={handleEditClick}
              />
            ),
          )}
        </ul>
      )}
      <div className="drawer">
        <TodoSidebar
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          panelDescription={panelDescription}
          setPanelDescription={setPanelDescription}
          panelPriority={panelPriority}
          setPanelPriority={setPanelPriority}
          panelCategory={panelCategory}
          setPanelCategory={setPanelCategory}
          panelDueDate={panelDueDate}
          setPanelDueDate={setPanelDueDate}
          fetchTodos={fetchTodos}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

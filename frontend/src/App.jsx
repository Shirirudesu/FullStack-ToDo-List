import { useState } from "react";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TodoList from "./pages/TodoPage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section id="center">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            }
          />
          <Route
            path="/todo-list"
            element={
              <PrivateRoute>
                <TodoList searchQuery={searchQuery} />
              </PrivateRoute>
            }
          />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;

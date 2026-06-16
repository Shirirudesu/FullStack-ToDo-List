import api from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/todo-list");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    //Шаг 1: Пользователь ввел email, password и нажал Login
    try {
      // Шаг 2: Идёт POST запрос  на /auth/login
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      //Шаг 3: React получает JWT из ответа сервера
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/todo-list");
      console.log("SUCCESS:", res.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <AuthForm
      type="login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
      onSwitchClick={() => navigate("/register")}
    />
  );
}

export default LoginPage;

//  <div>
//       <h1>LOGIN FORM</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>

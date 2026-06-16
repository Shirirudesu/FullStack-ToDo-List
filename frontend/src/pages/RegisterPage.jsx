import api from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/todo-list");
    }
  }, [navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      const { token } = res.data;
      console.log(res.data);
      if (token) {
        localStorage.setItem("token", token);
        console.log("SUCCESS:", res.data);
        navigate("/todo-list");
      } else {
        //(Регистрация успешна, но токен не пришел, кидаем на логин. (Перестраховка)
        console.log("Did not receive the token");
        navigate("/login");
      }
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <AuthForm
      type="register"
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleRegister}
      onSwitchClick={() => navigate("/login")}
    />
  );
}

export default RegisterPage;

{
  /* <div>
      <h1>REGISTRATION FORM</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div> */
}

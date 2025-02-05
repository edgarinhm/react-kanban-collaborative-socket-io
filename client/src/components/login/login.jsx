import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetLogin } from "../../common/services/login-service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await GetLogin({ username, password });
      localStorage.setItem("userId", data.userId);
      alert(data.message);
      navigate("/task");
    } catch (error) {
      console.log("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <form autoComplete="off" className="login__form">
      <label htmlFor="email">Provide your email</label>
      <input
        className="input"
        id="email"
        placeholder=""
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label htmlFor="password">Enter your password</label>
      <input
        className="input"
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className="btn" onClick={handleLogin}>
        Log In
      </button>
    </form>
  );
};

export default Login;

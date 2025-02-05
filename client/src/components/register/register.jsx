import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateSignIn } from "../../common/services/login-service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await CreateSignIn({ username, password });
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form autoComplete="off" className="login__form">
      <label htmlFor="email">Enter your email</label>
      <input
        className="input"
        id="email"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="email">Choose a password</label>
      <input
        className="input"
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="form__input">
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
        <button className="btn" onClick={() => navigate("/login")}>
          Log In
        </button>
      </div>
    </form>
  );
};
export default Register;

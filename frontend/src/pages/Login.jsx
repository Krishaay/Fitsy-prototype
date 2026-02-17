import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./css/login.css";

export default function Login() {
  useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Welcome back to Fitsy");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" />

      <div className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="brand">Fitsy</h1>
          <h2>Welcome Back</h2>

          {message && <div className="success-msg">{message}</div>}
          {error && <div className="error-msg">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

          <p className="switch-auth">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
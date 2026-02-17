import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/register.css";

export default function Register() {
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
    username: "",
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="register-container">
      <div className="register-image" />

      <div className="register-form-section">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="brand">Fitsy</h1>
          <h2>Create Account</h2>

          {message && <div className="success-msg">{message}</div>}
          {error && <div className="error-msg">{error}</div>}

          <input
            type="text"
            placeholder="Username"
            required
            onChange={handleChange}
          />
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

          <button type="submit">Register</button>

          <p className="switch-auth">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
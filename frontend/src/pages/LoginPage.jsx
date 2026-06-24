import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const registeredUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!registeredUser) {
      setError(
        "No account found. Please register first."
      );
      return;
    }

    if (
      registeredUser.email !== formData.email ||
      registeredUser.password !== formData.password ||
      registeredUser.role !== formData.role
    ) {
      setError(
        "Invalid email, password or role."
      );
      return;
    }

    login(registeredUser);

    if (registeredUser.role === "student") {
      navigate("/student-dashboard");
    } else if (
      registeredUser.role === "instructor"
    ) {
      navigate("/instructor-dashboard");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="auth-box glass">
        <h2>Welcome Back</h2>

        <p>
          Login to continue your journey
        </p>

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="student">
              Student
            </option>

            <option value="instructor">
              Instructor
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <p
          className="forgot-password"
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Forgot Password?
        </p>

        <p className="switch-text">
          New user?
          <span
            onClick={() =>
              navigate("/register")
            }
          >
            {" "}
            Create account
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default LoginPage;
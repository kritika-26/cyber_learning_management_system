import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user && user.email === email) {
      setMessage(
        `Your password is: ${user.password}`
      );
    } else {
      setMessage("No account found.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button type="submit">
            Recover Password
          </button>
        </form>

        {message && (
          <p className="switch-text">
            {message}
          </p>
        )}

        <p className="switch-text">
          <span
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPasswordPage;
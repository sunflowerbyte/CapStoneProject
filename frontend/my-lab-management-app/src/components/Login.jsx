import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "../CSS/Login.css";
import LabChecksLogo from "../assets/LabChecksLogo.svg";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showContactIT, setShowContactIT] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.token); // JWT token
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    setShowContactIT(true);
  };

  const closeContactITModal = () => {
    setShowContactIT(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="website-name">
          <h1>Lab Checks</h1>
        </div>
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <div className="forgot-password">
          <p>
            <span
              onClick={handleForgotPassword}
              className="forgot-password-link"
            >
              Forgot your password?{" "}
            </span>
          </p>
        </div>
        <div className="login-image">
          <img src={LabChecksLogo} alt="Login illustration" />
        </div>
      </div>

      {/* Modal for Contact IT */}
      {showContactIT && (
        <div className="contact-it-modal">
          <div className="contact-it-content">
            <h3>Contact IT Support</h3>
            <p>
              If you are unable to log in, please contact IT support at{" "}
              <a href="mailto:support@labchecks.com">support@labchecks.com</a>.
            </p>
            <button onClick={closeContactITModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

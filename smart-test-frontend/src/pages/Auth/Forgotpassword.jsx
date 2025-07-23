import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Password reset link sent to:", email);
      alert("A password reset link has been sent to your email.");
      navigate("/login");
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="forgot-card">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset link.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <p className="back-login" onClick={() => navigate("/login")}>
            ← Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
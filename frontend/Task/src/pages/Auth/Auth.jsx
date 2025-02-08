import React, { useState } from "react";
import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можна додати логіку для обробки форми
  };

  return (
    <div className="auth-container">
      <div className={`slide-container ${isLoginMode ? "sign-in-mode" : ""}`}>
        {/* Sign Up Container */}
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2>Create Account</h2>
              <div className="social-icons">
                <div className="social-icon"></div>
                <div className="social-icon"></div>
                <div className="social-icon"></div>
              </div>
              <p>Or use your email for registration</p>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <form onSubmit={handleSubmit} className="sign-in-form">
              <h2>Log In</h2>
              <div className="social-icons">
                <div className="social-icon"></div>
                <div className="social-icon"></div>
                <div className="social-icon"></div>
              </div>
              <p>Or use your email for login</p>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <div className="forgot-password">Forgot your password?</div>
              <button type="submit" className="auth-button">Log In</button>
            </form>
          </div>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal account and start your journey with us.</p>
              <button className="auth-button ghost" onClick={toggleMode}>Sign Up</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Welcome Back!</h2>
              <p>To keep connected with us, please log in with your personal info</p>
              <button className="auth-button ghost" onClick={toggleMode}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
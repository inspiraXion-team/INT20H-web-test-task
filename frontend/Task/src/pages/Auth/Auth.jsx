import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isAuthRoute } from "../../lib/routes";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Auth.css";

const Auth = () => {
  const location = useLocation();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isFBLoaded, setIsFBLoaded] = useState(false);
  const [manualEmail, setManualEmail] = useState("");
  const [isEmailRequired, setIsEmailRequired] = useState(false);

  useEffect(() => {
    // Перевірка чи завантажено FB SDK
    const checkFBLoad = () => {
      if (window.FB) {
        setIsFBLoaded(true);
      } else {
        setTimeout(checkFBLoad, 100);
      }
    };
    checkFBLoad();
  }, []);

  // Перевірка чи находимося на маршруті авторизації
  if (!isAuthRoute(location.pathname)) {
    return null;
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("User Email:", decodedToken.email);
    console.log("User Name:", decodedToken.name);
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Fetching user information...");
          window.FB.api("/me", { fields: "name,email" }, (userData) => {
            if (userData.email) {
              console.log("User Email:", userData.email);
              // Тут можна використовувати email
            } else {
              console.error("Email not provided by Facebook.");
              setIsEmailRequired(true); // Показуємо форму для введення email вручну
            }

            if (userData.name) {
              console.log("User Name:", userData.name);
            }
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <GoogleOAuthProvider clientId="112403498475-oq8shfrfm6a0l42qve4bsbjh1hiersb8.apps.googleusercontent.com">
      <div className="auth-container">
        <div className={`slide-container ${isLoginMode ? "sign-in-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              <form onSubmit={handleSubmit} className="sign-up-form">
                <h2>Create Account</h2>
                <div className="social-buttons">
                  <div className="social-button">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      useOneTap
                      shape="rectangular"
                      width="300"
                      text="Continue with Google"
                    />
                  </div>
                  {isFBLoaded && (
                    <div className="social-button">
                      <button
                        type="button"
                        className="facebook-login-button"
                        onClick={handleFacebookLogin}
                      >
                        Continue with Facebook
                      </button>
                    </div>
                  )}
                </div>
                <p>Or use your email for registration</p>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Password again" required />
                <button type="submit" className="auth-button">
                  Sign Up
                </button>
              </form>

              <form onSubmit={handleSubmit} className="sign-in-form">
                <h2>Log In</h2>
                <div className="social-buttons">
                  <div className="social-button">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      useOneTap
                      locale="en"
                      shape="rectangular"
                      width="300"
                      text="continue_with"
                    />
                  </div>
                  {isFBLoaded && (
                    <div className="social-button">
                      <button
                        type="button"
                        className="facebook-login-button"
                        onClick={handleFacebookLogin}
                      >
                        Continue with Facebook
                      </button>
                    </div>
                  )}
                </div>
                <p>Or use your email for login</p>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <div className="forgot-password">Forgot your password?</div>
                <button type="submit" className="auth-button">
                  Log In
                </button>
              </form>
            </div>
          </div>

          {/* Overlay Container */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>Hello, Friend!</h2>
                <p>Enter your personal account and start your journey with us.</p>
                <button className="auth-button ghost" onClick={toggleMode}>
                  Sign Up
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Welcome Back!</h2>
                <p>To keep connected with us, please log in with your personal info</p>
                <button className="auth-button ghost" onClick={toggleMode}>
                  Log In
                </button>
              </div>
            </div>
          </div>

          {/* Modal for email input */}
          {isEmailRequired && (
            <div className="modal-overlay">
              <div className="modal-container">
                <p>Email not provided by Facebook. Please enter your email:</p>
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button
                  onClick={() => {
                    console.log("Manual Email:", manualEmail); // Обробляємо введений email
                    setIsEmailRequired(false); // Закриваємо модальне вікно
                  }}
                >
                  Submit Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;

import React, { useState, useEffect } from "react";
import axios from "axios"; // Додаємо axios
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    // Перевірка на відповідність паролів під час реєстрації
    if (!isLoginMode) {
      const confirmPassword = formData.get("confirmPassword");
      if (data.password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      await sendSignUpDataToBackend(data);
    } else {
      await sendLoginDataToBackend(data);
    }
  };
  

// Функція для відправки даних на сервер
const sendSignUpDataToBackend = async (data) => {
  try {
    // Перевірка наявності обов'язкових полів
    if (!data.username || !data.email || !data.password) {
      console.error("Відсутні обов'язкові поля для реєстрації.");
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      JSON.stringify(data), 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Server Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else {
      console.error("Error sending data to server:", error);
    }
  }
};

const sendLoginDataToBackend = async (data) => {
  try {
    // Перевірка наявності обов'язкових полів
    if (!data.email || !data.password) {
      console.error("Відсутні обов'язкові поля для входу.");
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      JSON.stringify(data), 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Server Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else {
      console.error("Error sending data to server:", error);
    }
  }
};

  // Обробка успішної авторизації через Google
  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("User Email:", decodedToken.email);
    console.log("User Name:", decodedToken.name);

    // Формуємо об'єкт для відправки на сервер
    const userData = {
      username: decodedToken.name || decodedToken.email.split("@")[0],
      email: decodedToken.email,
      password: "default_password",
    };

    // Відправка даних на сервер
    await sendSignUpDataToBackend(userData);
    
  };

  const handleGoogleSignUpError = () => {
    console.error("Google Login Failed");
  };

  // Обробка авторизації через Facebook
  
const handleFacebookSignUp = () => {
  if (!window.FB) {
    console.error("Facebook SDK not loaded");
    return;
  }

  window.FB.login(
    (response) => {
      if (response.authResponse) {
        console.log("Facebook auth response:", response.authResponse);
        
        window.FB.api(
          "/me",
          { fields: "id,name,email" },
          async (userData) => {
            // Log the entire userData object to see what we're getting
            console.log("Facebook user data:", userData);
            
            if (userData) {
              // Log individual fields
              //console.log("User ID:", userData.id);
              console.log("User Name:", userData.name);
              if (userData.email){
                console.log("User Email:", userData.email);
              }
              
              if (userData.email) {
                // Формування даних для сервера
                const userDataForServer = {
                  username: userData.name || `fb_user_${userData.id}`,
                  email: userData.email,
                  password: "default_password",
                  provider: "facebook",
                  providerId: userData.id
                };
    
                await sendSignUpDataToBackend(userDataForServer);
              } else {
                console.error("Email not provided by Facebook.");
                setIsEmailRequired(true);
              }
            } else {
              console.error("No user data received from Facebook");
            }
          }
        );
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    },
    { 
      scope: "public_profile,email",
      return_scopes: true // This will show what permissions were granted
    }
  );
};

useEffect(() => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    refreshAccessToken();
  }
}, []);

// Функція для рефрешу токену
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.error("No refresh token found.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/refresh-token",
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Refreshed Token:", response.data);
    // Зберігаємо новий access token
    localStorage.setItem("accessToken", response.data.accessToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};


// Login handler functions
const handleFacebookLogin = async () => {
  if (!window.FB) {
    console.error("Facebook SDK not loaded");
    return;
  }

  window.FB.login(
    (response) => {
      if (response.authResponse) {
        console.log("Facebook auth response:", response.authResponse);
        
        window.FB.api(
          "/me",
          { fields: "id, email" },
          async (userData) => {
            if (userData && userData.email) {
              const userDataForServer = {
                username: userData.name || `fb_user_${userData.id}`,
                email: userData.email,
                password: "default_password",
                provider: "facebook",
                providerId: userData.id
              };

              await sendLoginDataToBackend(userDataForServer);

              // Зберігаємо refreshToken у локальному сховищі
              const refreshToken = response.authResponse.refresh_token; // Отримання refresh_token
              localStorage.setItem("refreshToken", refreshToken);
            } else {
              console.error("Email not provided by Facebook.");
              setIsEmailRequired(true);
            }
          }
        );
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    },
    { 
      scope: "public_profile,email",
      return_scopes: true
    }
  );
};

const handleGoogleLoginSuccess = async (credentialResponse) => {
  console.log("Google Login Success:", credentialResponse);
  const decodedToken = jwtDecode(credentialResponse.credential);
  console.log("User Email:", decodedToken.email);

  // Формуємо об'єкт для відправки на сервер
  const userData = {
    username: decodedToken.name || decodedToken.email.split("@")[0],
    email: decodedToken.email,
    password: "default_password",
  };

  // Відправка даних на сервер
  await sendLoginDataToBackend(userData);

  // Зберігаємо refreshToken у локальному сховищі
  const refreshToken = decodedToken.refresh_token; // Припускаємо, що refresh_token є частиною декодованого токену
  localStorage.setItem("refreshToken", refreshToken);
};

const handleGoogleLoginError = () => {
  console.error("Google Login Failed");
};

  // Обробка введення email вручну
  const handleManualEmailSubmit = async () => {
    console.log("Manual Email:", manualEmail);

    // Формуємо об'єкт для відправки на сервер
    const userData = {
      username: manualEmail.split("@")[0], // Використовуємо частину email як username
      email: manualEmail,
      password: "default_password", // Ви можете генерувати випадковий пароль
    };

    // Відправка даних на сервер
    await sendSignUpDataToBackend(userData);
    await sendLoginDataToBackend(userData);
    setIsEmailRequired(false); // Закриваємо модальне вікно
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
                      onSuccess={handleGoogleSignUpSuccess}
                      onError={handleGoogleSignUpError}
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
                        onClick={handleFacebookSignUp}
                      >
                        Continue with Facebook
                      </button>
                    </div>
                  )}
                </div>
                <p>Or use your email for registration</p>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirmPassword" placeholder="Password again" required />
                <button type="submit" className="auth-button">Sign Up</button>
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
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
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
                <button onClick={handleManualEmailSubmit}>Submit Email</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
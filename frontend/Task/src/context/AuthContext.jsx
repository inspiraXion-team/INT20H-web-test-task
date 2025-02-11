import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (!accessToken && refreshToken) {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/refresh-token',
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        localStorage.setItem('accessToken', response.data.accessToken);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
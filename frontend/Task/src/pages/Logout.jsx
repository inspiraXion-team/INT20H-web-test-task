import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { getLogoutRoute, isLogoutRoute } from '../lib/routes';
import ROUTES from '../lib/routes';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Отримуємо інформацію про поточний URL
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи поточний роут є роутом виходу
    if (isLogoutRoute(location.pathname)) {
      console.log('This is the logout route');
      console.log('Logout route:', getLogoutRoute());
    }
    logout();
    navigate(ROUTES.HOME);
  }, [location]);

  // Функція для виходу
  const handleLogout = () => {
    // Тут можна додати логіку для виходу (наприклад, очищення токену або перенаправлення)
    console.log('User logged out');
    alert('You have been logged out.');
  };

  return (
    <div style={styles.logoutPage}>
      <div style={styles.logoutCard}>
        <h2>Log Out</h2>
        <p>Are you sure you want to log out?</p>

        {isConfirming ? (
          <div style={styles.confirmationButtons}>
            <button onClick={handleLogout} style={styles.confirmButton}>
              Yes, Log Out
            </button>
            <button
              onClick={() => setIsConfirming(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsConfirming(true)}
            style={styles.logoutButton}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

// Стилі для сторінки Logout
const styles = {
  logoutPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  logoutCard: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  logoutButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  confirmationButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  confirmButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#6c757d',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Logout;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isLogoutRoute, getLogoutRoute } from '../lib/routes';

const Logout = () => {
  const location = useLocation(); 
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isLogoutRoute(location.pathname)) {
      console.log('This is the logout route');
      console.log('Logout route:', getLogoutRoute());
    }
  }, [location]);

  const handleLogout = () => {
    console.log('User logged out');
    alert('You have been logged out.');
  };

  return (
    <div style={styles.logoutPage}>
      <div style={styles.logoutCard}>
        <h2 style={styles.neonTitle}>🚀 SYSTEM LOGOUT 🚀</h2>
        <p style={styles.glitchText}>Are you sure you want to disconnect?</p>

        {isConfirming ? (
          <div style={styles.confirmationButtons}>
            <button onClick={handleLogout} style={styles.neonButtonRed}>
              ✅ DISCONNECT
            </button>
            <button onClick={() => setIsConfirming(false)} style={styles.neonButtonGray}>
              ❌ ABORT
            </button>
          </div>
        ) : (
          <button onClick={() => setIsConfirming(true)} style={styles.neonButtonBlue}>
            🔥 INITIATE LOGOUT
          </button>
        )}
      </div>
    </div>
  );
};


const styles = {
  logoutPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'radial-gradient(circle, #000428, #004e92, #00e5ff)',
    padding: '20px',
    animation: 'glowBackground 10s infinite alternate',
  },
  logoutCard: {
    background: 'rgba(20, 20, 50, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.9)',
    padding: '25px',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
    border: '2px solid #00e5ff',
    animation: 'pulseShadow 2s infinite alternate',
  },
  neonTitle: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#00e5ff',
    textShadow: '0 0 15px #00e5ff, 0 0 25px #0077ff',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '3px',
  },
  glitchText: {
    color: '#ff00ff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 10px rgba(255, 0, 255, 0.8)',
    fontFamily: "'VT323', monospace",
    letterSpacing: '2px',
  },
  confirmationButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
  },
  neonButtonBlue: {
    padding: '12px 30px',
    border: '2px solid #00e5ff',
    borderRadius: '8px',
    background: 'transparent',
    color: '#00e5ff',
    cursor: 'pointer',
    fontSize: '18px',
    textShadow: '0 0 10px #00e5ff',
    transition: 'all 0.4s',
    fontFamily: "'Orbitron', sans-serif",
    animation: 'pulseNeon 2s infinite alternate',
  },
  neonButtonRed: {
    padding: '12px 30px',
    border: '2px solid #ff073a',
    borderRadius: '8px',
    background: 'transparent',
    color: '#ff073a',
    cursor: 'pointer',
    fontSize: '18px',
    textShadow: '0 0 10px #ff073a',
    transition: 'all 0.4s',
    fontFamily: "'Orbitron', sans-serif",
    animation: 'pulseNeonRed 2s infinite alternate',
  },
  neonButtonGray: {
    padding: '12px 30px',
    border: '2px solid #888',
    borderRadius: '8px',
    background: 'transparent',
    color: '#888',
    cursor: 'pointer',
    fontSize: '18px',
    textShadow: '0 0 10px #888',
    transition: 'all 0.4s',
    fontFamily: "'Orbitron', sans-serif",
    animation: 'pulseNeonGray 2s infinite alternate',
  },
};

const stylesWithAnimations = `
  @keyframes pulseShadow {
    0% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.9); }
    100% { box-shadow: 0 0 35px rgba(0, 255, 255, 1); }
  }

  @keyframes pulseNeon {
    0% { text-shadow: 0 0 10px #00e5ff; }
    100% { text-shadow: 0 0 25px #00e5ff; }
  }

  @keyframes pulseNeonRed {
    0% { text-shadow: 0 0 10px #ff073a; }
    100% { text-shadow: 0 0 25px #ff073a; }
  }

  @keyframes pulseNeonGray {
    0% { text-shadow: 0 0 10px #888; }
    100% { text-shadow: 0 0 25px #888; }
  }

  @keyframes glowBackground {
    0% { background: radial-gradient(circle, #000428,rgb(3, 33, 59),rgb(11, 58, 63)); }
    100% { background: radial-gradient(circle, #000428,rgb(11, 28, 47),rgb(14, 34, 30)); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesWithAnimations;
document.head.appendChild(styleSheet);

export default Logout;

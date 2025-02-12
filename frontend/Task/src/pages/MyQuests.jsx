import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyQuestsRoute, isMyQuestsRoute } from '../lib/routes';
import ROUTES from '../lib/routes';
import { ProfileService } from '../services/api/profile.service';

const MyQuests = () => {
  const { user } = useAuth(); // Використовуємо контекст автентифікації
  const navigate = useNavigate();
  const location = useLocation();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Перевірка роуту
  useEffect(() => {
    if (isMyQuestsRoute(location.pathname)) {
      console.log('This is the My Quests route');
      console.log('My Quests route:', getMyQuestsRoute());
    }
  }, [location]);

  // Отримання квестів
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await ProfileService.getUserQuests();
        setQuests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.myQuestsPage}>
      <div style={styles.myQuestsCard}>
        <h2 style={styles.neonTitle}>🌟 MY QUESTS 🌟</h2>
        <p style={styles.glitchText}>Here are the quests you've created:</p>

        {quests.length === 0 ? (
          <p style={styles.noQuestsText}>No quests found. Create one!</p>
        ) : (
          <div style={styles.questsContainer}>
            {quests.map((quest) => (
              <div key={quest.id} style={styles.questCard}>
                {quest.posterURL && (
                  <img
                    src={quest.posterURL}
                    alt={quest.title}
                    style={styles.questImage}
                  />
                )}
                <h3 style={styles.questTitle}>{quest.title}</h3>
                <button
                  style={styles.neonButtonBlue}
                  onClick={() => navigate(`${ROUTES.QUEST}/${quest.id}`)}
                >
                  View Quest
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 🌟 **Футуристичні кіберпанкові стилі**
const styles = {
  myQuestsPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'radial-gradient(circle, #000428, #004e92, #00e5ff)',
    padding: '20px',
    animation: 'glowBackground 10s infinite alternate',
  },
  myQuestsCard: {
    background: 'rgba(20, 20, 50, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.9)',
    padding: '25px',
    width: '100%',
    maxWidth: '800px',
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
  noQuestsText: {
    color: '#00e5ff',
    fontSize: '1.2rem',
    fontFamily: "'VT323', monospace",
  },
  questsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  questCard: {
    background: 'rgba(0, 15, 40, 0.8)',
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #00e5ff',
    textAlign: 'center',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  },
  questImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  questTitle: {
    color: '#00e5ff',
    fontSize: '18px',
    textShadow: '0 0 10px #00e5ff',
    fontFamily: "'Orbitron', sans-serif",
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
};

// 🎭 **Додаткові CSS-анімації**
const stylesWithAnimations = `
  @keyframes pulseShadow {
    0% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.9); }
    100% { box-shadow: 0 0 35px rgba(0, 255, 255, 1); }
  }

  @keyframes pulseNeon {
    0% { text-shadow: 0 0 10px #00e5ff; }
    100% { text-shadow: 0 0 25px #00e5ff; }
  }

  @keyframes glowBackground {
    0% { background: radial-gradient(circle, #000428, #004e92, #00e5ff); }
    100% { background: radial-gradient(circle, #000428, #0077ff, #00ffcc); }
  }
`;

// 🛠 **Додаємо CSS-анімації в документ**
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesWithAnimations;
document.head.appendChild(styleSheet);

export default MyQuests;
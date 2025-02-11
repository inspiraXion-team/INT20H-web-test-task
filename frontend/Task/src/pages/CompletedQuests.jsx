import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isCompletedQuestsRoute, getCompletedQuestsRoute } from '../lib/routes';

const CompletedQuests = () => {
  const location = useLocation();

  useEffect(() => {
    if (isCompletedQuestsRoute(location.pathname)) {
      console.log('Completed quests route:', getCompletedQuestsRoute());
    }
  }, [location]);

  const completedQuests = [
    {
      id: 1,
      title: 'Cyber Explorer',
      description: 'Complete your first quest and earn the Explorer badge.',
      completedOn: '2024-02-11',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+1',
      progress: 100,
    },
    {
      id: 2,
      title: 'Neon Hacker',
      description: 'Complete 5 hacking challenges and earn the Master Hacker badge.',
      completedOn: '2024-02-05',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+2',
      progress: 100,
    },
    {
      id: 3,
      title: 'Data Runner',
      description: 'Complete 10 data retrieval missions.',
      completedOn: '2024-01-30',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+3',
      progress: 100,
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💾 Completed Quests</h2>
        <p style={styles.subtitle}>Your legendary achievements in the cyber world:</p>

        <div style={styles.questsContainer}>
          <div style={styles.questsList}>
            {completedQuests.map((quest) => (
              <div key={quest.id} style={styles.questItem}>
                <img src={quest.image} alt={quest.title} style={styles.questImage} />
                <h3 style={styles.questTitle}>{quest.title}</h3>
                <p style={styles.questDescription}>{quest.description}</p>
                <p style={styles.questDate}><strong>Completed on:</strong> {quest.completedOn}</p>
                <div style={styles.progressBarContainer}>
                  <div style={{ ...styles.progressBar, width: `${quest.progress}%` }}></div>
                </div>
                <p style={styles.progressText}>{quest.progress}% completed</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// **Кіберпанкові стилі**
const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
background: 'linear-gradient(135deg, #0f0c29,rgb(9, 8, 24),rgb(19, 79, 83))',
    padding: '20px',
  },
  card: {
    background: 'rgba(0, 15, 40, 0.9)',
    borderRadius: '12px',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
    textAlign: 'center',
    border: '2px solid #00e5ff',
    boxShadow: '0 0 35px rgba(0, 229, 255, 0.8)',
    animation: 'neonFlicker 1.5s infinite alternate',
  },
  title: {
    color: '#00e5ff',
    fontSize: '28px',
    textShadow: '0 0 10px #00e5ff',
  },
  subtitle: {
    color: '#00c8ff',
    fontSize: '16px',
    textShadow: '0 0 8px rgba(0, 229, 255, 0.7)',
  },
  questsContainer: {
    overflowX: 'auto',
    marginTop: '20px',
    paddingBottom: '10px',
  },
  questsList: {
    display: 'flex',
    gap: '20px',
    paddingBottom: '20px',
  },
  questItem: {
    background: 'rgba(2, 12, 38, 0.8)',
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #00e5ff',
    minWidth: '280px',
    textAlign: 'left',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  questItemHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 0 25px rgba(0, 229, 255, 1)',
  },
  questImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  questTitle: {
    color: '#00e5ff',
    fontSize: '18px',
    textShadow: '0 0 8px #00e5ff',
  },
  questDescription: {
    color: '#00c8ff',
    fontSize: '14px',
  },
  questDate: {
    color: '#00aaff',
    fontSize: '12px',
  },
  progressBarContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '5px',
    height: '10px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  progressBar: {
    background: 'linear-gradient(90deg, #00e5ff, #007bff)',
    height: '100%',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)',
  },
  progressText: {
    color: '#00e5ff',
    fontSize: '12px',
    textAlign: 'right',
  },
  '@keyframes neonFlicker': {
    '0%': { boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)' },
    '100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 1)' },
  },
};

export default CompletedQuests;

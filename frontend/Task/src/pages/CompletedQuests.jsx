import React from 'react';

const CompletedQuests = () => {
  // Приклад даних про завершені квести
  const completedQuests = [
    {
      id: 1,
      title: 'First Quest',
      description: 'Complete your first quest and earn the Explorer badge.',
      completedOn: '2023-10-01',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+1', // Зображення квесту
      progress: 100, // Прогрес проходження (100% для завершених квестів)
    },
    {
      id: 2,
      title: 'Master Creator',
      description: 'Create 5 quests and earn the Master Creator badge.',
      completedOn: '2023-10-05',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+2',
      progress: 100,
    },
    {
      id: 3,
      title: 'Adventure Seeker',
      description: 'Complete 10 quests and earn the Adventure Seeker badge.',
      completedOn: '2023-10-10',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+3',
      progress: 100,
    },
    {
      id: 4,
      title: 'Treasure Hunter',
      description: 'Find hidden treasures in 3 different locations.',
      completedOn: '2023-10-15',
      image: 'https://via.placeholder.com/300x200.png?text=Quest+4',
      progress: 100,
    },
  ];

  return (
    <div style={styles.completedQuestsPage}>
      <div style={styles.completedQuestsCard}>
        <h2>Completed Quests</h2>
        <p>Here are the quests you've completed so far:</p>

        {/* Горизонтальний скролл для карток квестів */}
        <div style={styles.questsContainer}>
          <div style={styles.questsList}>
            {completedQuests.map((quest) => (
              <div key={quest.id} style={styles.questItem}>
                <img
                  src={quest.image}
                  alt={quest.title}
                  style={styles.questImage}
                />
                <h3 style={styles.questTitle}>{quest.title}</h3>
                <p style={styles.questDescription}>{quest.description}</p>
                <p style={styles.questDate}>
                  <strong>Completed on:</strong> {quest.completedOn}
                </p>
                <div style={styles.progressBarContainer}>
                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${quest.progress}%`,
                    }}
                  ></div>
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

// Стилі для сторінки CompletedQuests
const styles = {
  completedQuestsPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  completedQuestsCard: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
    textAlign: 'center',
  },
  questsContainer: {
    overflowX: 'auto', // Горизонтальний скролл
    marginTop: '20px',
  },
  questsList: {
    display: 'flex',
    gap: '20px', // Відстань між картками
    paddingBottom: '20px', // Для кращого відображення скролу
  },
  questItem: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    minWidth: '280px', // Мінімальна ширина картки
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  questImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  questTitle: {
    margin: '0 0 10px 0',
    color: '#333',
    fontSize: '18px',
  },
  questDescription: {
    margin: '0 0 10px 0',
    color: '#555',
    fontSize: '14px',
  },
  questDate: {
    margin: '0 0 10px 0',
    color: '#777',
    fontSize: '12px',
  },
  progressBarContainer: {
    background: '#e0e0e0',
    borderRadius: '5px',
    height: '10px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  progressBar: {
    background: '#007bff',
    height: '100%',
    borderRadius: '5px',
  },
  progressText: {
    margin: '0',
    color: '#007bff',
    fontSize: '12px',
    textAlign: 'right',
  },
};

export default CompletedQuests;
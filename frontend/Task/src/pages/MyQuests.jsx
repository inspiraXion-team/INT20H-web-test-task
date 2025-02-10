// MyQuests.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyQuests = () => {
  const navigate = useNavigate();

  // Приклад даних про квести
  const [quests, setQuests] = useState([
    { id: 1, name: 'Квест 1', level: 'Рівень 1', status: 'Активний' },
    { id: 2, name: 'Квест 2', level: 'Рівень 2', status: 'Завершений' },
    { id: 3, name: 'Квест 3', level: 'Рівень 3', status: 'В очікуванні' },
  ]);

  // Функція для переходу на сторінку деталей квесту
  const handleViewDetails = (questId) => {
    navigate(`/quest-details/${questId}`);
  };

  // Функція для переходу на сторінку конструктора квестів
  const handleGoToConstructor = () => {
    navigate('/constructor-of-quests');
  };

  return (
    <div style={styles.container}>

      {/* Кнопка для переходу на сторінку конструктора квестів */}
      <button
        style={styles.constructorButton}
        onClick={handleGoToConstructor}
      >
        Constructor Of Quests
      </button>

      {/* Список квестів */}
      <div style={styles.questsList}>
        {quests.map((quest) => (
          <div key={quest.id} style={styles.questCard}>
            <h3>{quest.name}</h3>
            <p>Рівень: {quest.level}</p>
            <p>Статус: {quest.status}</p>
            <button
              style={styles.detailsButton}
              onClick={() => handleViewDetails(quest.id)}
            >
              Деталі
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Стилі
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  constructorButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
  },
  questsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  questCard: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  detailsButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default MyQuests;
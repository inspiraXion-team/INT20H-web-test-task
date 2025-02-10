// ConstructorOfQuests.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Додано для навігації

const ConstructorOfQuests = () => {
     const navigate = useNavigate();
  const [questName, setQuestName] = useState('');
  const [legend, setLegend] = useState('');
  const [timeLimit, setTimeLimit] = useState('00:00');
  const [maxPeople, setMaxPeople] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [file, setFile] = useState(null);

  const handlePublish = () => {
    alert('Квест опубліковано!');
    // Тут можна додати логіку для відправки даних на сервер
  };

  return (
    <div style={styles.container}>
      <h1>Сконструюйте ваш квест</h1>

      {/* Рівні */}
      <div style={styles.levels}>
        <button
          style={selectedLevel === 1 ? styles.selectedLevelButton : styles.levelButton}
          onClick={() => setSelectedLevel(1)}
        >
          Рівень 1
        </button>
        <button
          style={selectedLevel === 2 ? styles.selectedLevelButton : styles.levelButton}
          onClick={() => setSelectedLevel(2)}
        >
          Рівень 2
        </button>
        <button
          style={selectedLevel === 3 ? styles.selectedLevelButton : styles.levelButton}
          onClick={() => setSelectedLevel(3)}
        >
          Рівень 3
        </button>
      </div>

      {/* Завантаження файлу */}
      <div style={styles.uploadSection}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
      </div>

      {/* Назва квесту */}
      <input
        type="text"
        placeholder="Назва квесту"
        value={questName}
        onChange={(e) => setQuestName(e.target.value)}
        style={styles.input}
      />

      {/* Легенда квесту */}
      <textarea
        placeholder="Легенда квесту"
        value={legend}
        onChange={(e) => setLegend(e.target.value)}
        style={styles.textarea}
      />

      {/* Обмеження за часом */}
      <div style={styles.timeLimitSection}>
        <label>Чи треба обмеження за часом?</label>
        <input
          type="time"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          style={styles.timeInput}
        />
      </div>

      {/* Максимальна кількість людей */}
      <input
        type="number"
        placeholder="Максимальна кількість людей"
        value={maxPeople}
        onChange={(e) => setMaxPeople(e.target.value)}
        style={styles.input}
      />

      {/* Кнопка публікації */}
      <button style={styles.publishButton} onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

// Стилі
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  levels: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  levelButton: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  selectedLevelButton: {
    padding: '10px 20px',
    border: '1px solid #4CAF50',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  uploadSection: {
    marginBottom: '20px',
  },
  fileInput: {
    display: 'none',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px',
  },
  timeLimitSection: {
    marginBottom: '20px',
  },
  timeInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ConstructorOfQuests;
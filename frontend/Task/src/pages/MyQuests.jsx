import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../lib/routes";

const MyQuests = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const quests = [
    { id: 1, name: "Cyber Explorer", level: "Рівень 1", status: "Активний", image: "https://via.placeholder.com/300x200.png?text=Cyber+Quest+1" },
    { id: 2, name: "Neon Hacker", level: "Рівень 2", status: "Завершений", image: "https://via.placeholder.com/300x200.png?text=Cyber+Quest+2" },
    { id: 3, name: "Data Runner", level: "Рівень 3", status: "В очікуванні", image: "https://via.placeholder.com/300x200.png?text=Cyber+Quest+3" },
    { id: 4, name: "Shadow Seeker", level: "Рівень 4", status: "Активний", image: "https://via.placeholder.com/300x200.png?text=Cyber+Quest+4" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.neonText}>📜 My Own Quests</h1>
      <button 
        style={styles.neonButton} 
        onClick={() => navigate(ROUTES.CONSTRUCTOR_OF_QUEST)}
      >
        ⚙️ Constructor of Quests
      </button>

      <div style={styles.questsContainer}>
        {quests.map((quest, index) => (
          <div 
            key={quest.id} 
            style={{
              ...styles.questCard, 
              ...(hovered === index ? styles.hoveredCard : {}),
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={quest.image} alt={quest.name} style={styles.questImage} />
            <h3 style={styles.questTitle}>{quest.name}</h3>
            <p style={styles.questDetails}>Рівень: {quest.level}</p>
            <p style={styles.questDetails}>Статус: {quest.status}</p>
            <button 
              style={styles.neonButton} 
              onClick={() => navigate(`${ROUTES.QUEST_DETAILS}/${quest.id}`)}
            >
              🔍 Деталі
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    color: "white",
      background: 'linear-gradient(135deg, #0f0c29,rgb(9, 8, 24),rgb(19, 79, 83))',
    padding: "20px",
    minHeight: "100vh",
  },
  neonText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#00e5ff",
    textShadow: "0 0 15px #00e5ff",
    marginBottom: "20px",
  },
  neonButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "transparent",
    color: "#00e5ff",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
    textShadow: "0 0 8px #00e5ff",
    margin: "10px",
    boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
  },
  questsContainer: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "20px",
    scrollbarWidth: "thin",
    scrollbarColor: "#00e5ff #000814",
  },
  questCard: {
    background: "rgba(0, 15, 40, 0.8)",
    padding: "15px",
    borderRadius: "10px",
    border: "2px solid #00e5ff",
    minWidth: "280px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0, 229, 255, 0.6)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  questImage: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  questTitle: {
    color: "#00e5ff",
    fontSize: "18px",
    textShadow: "0 0 10px #00e5ff",
  },
  questDetails: {
    color: "#00c8ff",
    fontSize: "14px",
  },
  hoveredCard: {
    transform: "scale(1.05)",
    boxShadow: "0 0 25px rgba(0, 229, 255, 1)",
  },
};

export default MyQuests;

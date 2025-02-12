import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../lib/routes";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "JohnDoe",
    email: "email@gmail.com",
    avatar: "https://via.placeholder.com/150",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile.username);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = () => {
    setProfile((prev) => ({
      ...prev,
      username: newName,
    }));
    setIsEditing(false);
  };

  const achievements = [
    { icon: "🏅", title: "First Step" },
    { icon: "🧩", title: "Puzzle Master" },
    { icon: "📖", title: "Storyteller" },
    { icon: "🌍", title: "Explorer" },
    { icon: "🎥", title: "Media Wizard" },
  ];

  return (
    <div style={styles.profilePage}>
      <div style={styles.profileCard}>
        <h1 style={styles.neonText}>My Profile</h1>
    
        <div style={styles.avatarContainer}>
          <label htmlFor="avatar-upload" style={styles.avatarUploadLabel}>
            <img src={profile.avatar} alt="Profile Avatar" style={styles.profileAvatar} />
            <div style={styles.uploadText}>📷 Change</div>
          </label>
          <input id="avatar-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} />
        </div>

  
        <div style={styles.profileInfo}>
          <p>
            <strong>Username:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={styles.inputField}
              />
            ) : (
              <span style={styles.neonDetail}>{profile.username}</span>
            )}
            <button style={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
              ✎
            </button>
          </p>

          <p>
            <strong>Email:</strong> <span style={styles.neonDetail}>{profile.email}</span>
          </p>

          {isEditing && (
            <button style={styles.neonButton} onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>


        <div style={styles.profileActions}>
          <button style={styles.neonButton} onClick={() => navigate(ROUTES.CONSTRUCTOR_OF_QUEST)}>
            ⚙️ Constructor of Quests
          </button>
          <button style={styles.neonButton} onClick={() => navigate(ROUTES.MY_QUESTS)}>
            📜 My Own Quests
          </button>
          <button style={styles.neonButton} onClick={() => navigate(ROUTES.LOGOUT)}>
            🚪 Log Out
          </button>
        </div>
      </div>

      <div style={styles.achievementsSection}>
        {achievements.map((ach, index) => (
          <div key={index} style={styles.achievementItem} title={ach.title}>
            {ach.icon}
          </div>
        ))}
      </div>
    </div>
  );
};


const styles = {
  profilePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: 'linear-gradient(135deg, #0f0c29, #090818, #134f53)',
    padding: "20px",
  },
  profileCard: {
    background: "rgba(8, 23, 53, 0.91)",
    borderRadius: "10px",
    boxShadow: "0 0 35px rgba(0, 255, 255, 0.5)",
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  avatarContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "10px",
  },
  avatarUploadLabel: {
    cursor: "pointer",
    display: "block",
  },
  profileAvatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.7)",
    transition: "transform 0.3s",
  },
  uploadText: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 11, 51, 0.7)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
  },
  neonText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "cyan",
    textShadow: "0 0 10px cyan",
  },
  neonDetail: {
    color: "#0ff",
    textShadow: "0 0 5px rgba(0, 255, 255, 0.7)",
  },
  profileInfo: {
    textAlign: "left",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    marginBottom: "15px",
  },
  inputField: {
    background: "black",
    color: "cyan",
    border: "1px solid cyan",
    padding: "5px",
    borderRadius: "5px",
    outline: "none",
  },
  editButton: {
    background: "transparent",
    border: "none",
    color: "cyan",
    cursor: "pointer",
    marginLeft: "10px",
  },
  profileActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  neonButton: {
    padding: "10px 20px",
    border: "2px solid cyan",
    borderRadius: "5px",
    backgroundColor: "transparent",
    color: "#0ff",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s",
    textShadow: "0 0 5px cyan",
  },
  achievementsSection: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  achievementItem: {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    color: "cyan",
    borderRadius: "50%",
    fontSize: "30px",
    boxShadow: "0 0 10px cyan",
    transition: "transform 0.3s",
  },
};

export default Profile;

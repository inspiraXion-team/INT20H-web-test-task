import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../lib/routes";
import { ProfileService } from "../services/api/profile.service";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: 0,
    username: "",
    email: "",
    avatarURL: "src/assets/avatar-placeholder.png", // За замовчуванням
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatarFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Отримання даних профілю при завантаженні компонента
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
        setFormData({
          username: data.username,
          email: data.email,
          avatarFile: null,
        });
      } catch (error) {
        setError("Failed to fetch profile");
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Оновлення аватарки
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatarURL: reader.result, // Оновлюємо попередній перегляд аватарки
        }));
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({
        ...prev,
        avatarFile: file,
      }));
    }
  };

  // Оновлення форми
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Оновлення профілю
  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfile = await ProfileService.updateProfile(
        formData.username || profile.username, // Якщо поле не змінено, беремо старе значення
        formData.email || profile.email, // Якщо поле не змінено, беремо старе значення
        formData.avatarFile // Файл аватарки (може бути null)
      );
      setProfile(updatedProfile); // Оновлюємо стан профілю
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError("Failed to update profile");
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Масив досягнень (іконки)
  const achievements = [
    { icon: "🏅", title: "First Step" },
    { icon: "🧩", title: "Puzzle Master" },
    { icon: "📖", title: "Storyteller" },
    { icon: "🌍", title: "Explorer" },
    { icon: "🎥", title: "Media Wizard" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.profilePage}>
      <div style={styles.profileCard}>
        <h1 style={styles.neonText}>My Profile</h1>

        {/* 📷 Аватар */}
        <div style={styles.avatarContainer}>
          <label htmlFor="avatar-upload" style={styles.avatarUploadLabel}>
            <img src={profile.avatarURL} alt="Profile Avatar" style={styles.profileAvatar} />
            <div style={styles.uploadText}>📷 Change</div>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>

        {/* 🔷 Інформація */}
        <div style={styles.profileInfo}>
          <p>
            <strong>Username:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            ) : (
              <span style={styles.neonDetail}>{profile.username}</span>
            )}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            ) : (
              <span style={styles.neonDetail}>{profile.email}</span>
            )}
          </p>

          {isEditing && (
            <button style={styles.neonButton} onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>

        {/* 🔵 Дії */}
        <div style={styles.profileActions}>
          <button
            style={styles.neonButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Editing" : "✎ Edit Profile"}
          </button>
          <button
            style={styles.neonButton}
            onClick={() => navigate(ROUTES.CONSTRUCTOR_OF_QUEST)}
          >
            ⚙️ Constructor of Quests
          </button>
          <button
            style={styles.neonButton}
            onClick={() => navigate(ROUTES.MY_QUESTS)}
          >
            📜 My Own Quests
          </button>
          <button
            style={styles.neonButton}
            onClick={() => navigate(ROUTES.LOGOUT)}
          >
            🚪 Log Out
          </button>
        </div>
      </div>

      {/* 🏆 Досягнення */}
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

// 🎨 **Стилі**
const styles = {
  profilePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #090818, #134f53)",
    padding: "20px",
  },
  profileCard: {
    background: "rgba(14, 70, 54, 0.85)",
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Додано для навігації

const Profile = () => {
  const navigate = useNavigate(); // Хук для навігації

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Quest Creator | Adventure Seeker',
    avatar: 'https://via.placeholder.com/150',
    createdQuests: 5,
    completedQuests: 12,
    achievements: ['First Quest', 'Explorer', 'Master Creator'],
  });

  const [isEditing, setIsEditing] = useState(false);

  // Обробник зміни даних
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обробник завантаження фото
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Отримуємо перший вибраний файл
    if (file) {
      const reader = new FileReader(); // Створюємо FileReader для читання файлу
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result, // Оновлюємо аватар зображенням з файлу
        }));
      };
      reader.readAsDataURL(file); // Читаємо файл як Data URL
    }
  };

  // Збереження змін
  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profile);
  };

  // Вбудовані стилі
  const styles = {
    profilePage: {
      maxWidth: "800px",
      margin: "50px auto",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    profileCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    avatarContainer: {
      position: "relative",
      marginRight: "20px",
    },
    avatarUploadLabel: {
      cursor: "pointer",
    },
    profileAvatar: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    uploadText: {
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      padding: "5px",
      borderRadius: "5px",
    },
    profileInfo: {
      textAlign: "left",
    },
    profileStats: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      margin: "20px 0",
    },
    statItem: {
      textAlign: "center",
    },
    profileDetails: {
      width: "100%",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      resize: "vertical",
    },
    achievementsSection: {
      width: "100%",
      marginBottom: "20px",
    },
    achievementsList: {
      listStyleType: "none",
      padding: 0,
    },
    achievementItem: {
      backgroundColor: "#f0f0f0",
      margin: "5px 0",
      padding: "10px",
      borderRadius: "5px",
    },
    profileActions: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      alignItems: "center", // Вирівнювання по центру
      marginTop: "20px",
    },
    saveButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    editButton: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: "10px",
    },
    questButton: {
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "5px",
    },
    constructorButton: {
      width: '100%', // Широка кнопка
      backgroundColor: '#2196F3', // Синій колір для виділення
      marginTop: '20px', // Відступ зверху
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor : 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s, transform 0.2s',
    },
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={styles.profilePage}>
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            <label htmlFor="avatar-upload" style={styles.avatarUploadLabel}>
              <img
                src={profile.avatar}
                alt="Profile Avatar"
                style={styles.profileAvatar}
              />
              {isEditing && (
                <div style={styles.uploadText}>Завантажити нове фото</div>
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
          <div style={styles.profileInfo}>
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
          </div>
        </div>

        <div style={styles.profileStats}>
          <div style={styles.statItem}>
            <h3>Created Quests</h3>
            <p>{profile.createdQuests}</p>
          </div>
          <div style={styles.statItem}>
            <h3>Completed Quests</h3>
            <p>{profile.completedQuests}</p>
          </div>
        </div>

        <div style={styles.profileDetails}>
          {isEditing ? (
            <>
              <div style={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            </>
          )}
        </div>

        <div style={styles.achievementsSection}>
          <h3>Achievements</h3>
          <ul style={styles.achievementsList}>
            {profile.achievements.map((achievement, index) => (
              <li key={index} style={styles.achievementItem}>
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.profileActions}>
          {isEditing ? (
            <button onClick={handleSave} style={styles.saveButton}>
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
              Edit Profile
            </button>
          )}
        </div>

        <div style={styles.profileActions}>
          <button
            style={styles.questButton}
            onClick={() => navigate("/completed-quests")}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Completed Quests
          </button>
          <button
            style={styles.questButton}
            onClick={() => navigate("/my-quests")}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            My Quests
          </button>
          <button
            style={styles.constructorButton}
            onClick={() => navigate("/constructor-of-quests")}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Constructor of Quests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
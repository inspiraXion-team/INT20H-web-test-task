import axiosInstance from './axios-instance';

export const QuestService = {
  async getQuestById(id) {
    const response = await axiosInstance.get(`/api/quest/${id}`);
    return response.data;
  },

  async getAllPublishedQuests() {
    const response = await axiosInstance.get('/api/quest/all/published');
    return response.data;
  },

  async saveQuest(questData) {
    const formData = new FormData();
    
    // Додаємо основні дані квесту
    formData.append('Title', questData.title);
    formData.append('Description', questData.description);
    formData.append('TimeLimit', questData.timeLimit);
    formData.append('IsPublished', questData.isPublished);
    
    // Додаємо постер якщо він є
    if (questData.poster) {
      formData.append('Poster', questData.poster);
    }

    // Додаємо завдання
    if (questData.tasks) {
      formData.append('Tasks', JSON.stringify(questData.tasks));
    }

    const response = await axiosInstance.post('/api/quest-constructor/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getQuestForEditing(questId) {
    const response = await axiosInstance.get(`/api/quest-constructor/${questId}`);
    return response.data;
  },

  async rateQuest(questId, rating, comment) {
    const response = await axiosInstance.post('/api/quest-rating', {
      questId,
      rating,
      comment
    });
    return response.data;
  }
};
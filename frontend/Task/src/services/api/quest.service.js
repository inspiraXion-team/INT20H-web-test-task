import axiosInstance from './axios-instance';

export const QuestService = {
  // Function to retrieve the token from storage (localStorage in this case)
  getToken() {
    return localStorage.getItem('accessToken'); // Adjust based on how your token is stored
  },

  // Helper function to get headers with the token
  getHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  async getQuestById(id) {
    const response = await axiosInstance.get(`/api/quest/${id}`, {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async getAllPublishedQuests() {
    const response = await axiosInstance.get('/api/quest/all/published', {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async saveQuest(questData) {
    const formData = new FormData();
    
    // Add the main quest data
    formData.append('Title', questData.title);
    formData.append('Description', questData.description);
    formData.append('TimeLimit', questData.timeLimit);
    formData.append('IsPublished', questData.isPublished);
    
    // Add the poster if it exists
    if (questData.poster) {
      formData.append('Poster', questData.poster);
    }

    // Add tasks if they exist
    if (questData.tasks) {
      formData.append('Tasks', JSON.stringify(questData.tasks));
    }

    const response = await axiosInstance.post('/api/quest-constructor/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...this.getHeaders(),  // Add Authorization token here
      },
    });
    return response.data;
  },

  async getQuestForEditing(questId) {
    const response = await axiosInstance.get(`/api/quest-constructor/${questId}`, {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async rateQuest(questId, rating, comment) {
    const response = await axiosInstance.post('/api/quest-rating', {
      questId,
      rating,
      comment
    }, {
      headers: this.getHeaders(),
    });
    return response.data;
  }
};

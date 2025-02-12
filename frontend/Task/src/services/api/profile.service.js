import axiosInstance from './axios-instance';

export const ProfileService = {
  async updateProfile(username, avatarFile) {
    const formData = new FormData();
    if (username) {
      formData.append('Username', username);
    }
    if (avatarFile) {
      formData.append('AvatarFile', avatarFile);
    }

    const response = await axiosInstance.put('/api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getProfile() {
    const response = await axiosInstance.get('/api/profile');
    return response.data;
  },

  async getRewards() {
    const response = await axiosInstance.get('/api/profile/rewards');
    return response.data;
  },

  async getUserQuests() {
    const response = await axiosInstance.get('/api/profile/quests');
    return response.data;
  }
};
import axiosInstance from './axios-instance';

export const AuthService = {
  async register(username, email, password) {
    const response = await axiosInstance.post('/api/auth/register', {
      username,
      email,
      password
    });
    return response.data;
  },

  async login(email, password) {
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  },

  async refreshToken(refreshToken) {
    const response = await axiosInstance.post('/api/auth/refresh-token', {
      refreshToken
    });
    return response.data;
  },

  async externalLogin(provider, accessToken) {
    const response = await axiosInstance.post(`/api/auth/external-login/${provider}`, {
      accessToken
    });
    return response.data;
  }
};
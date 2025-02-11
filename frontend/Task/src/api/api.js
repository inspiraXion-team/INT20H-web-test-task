import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Налаштування Axios
const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Для підтримки куків, якщо необхідно
});

// Зовнішній логін через Google із використанням fetch
export async function externalLoginGoogle(googleToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/external-login/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ accessToken: googleToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Google');
    }

    return await response.json();
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
}

// Приклад функції логіну через Facebook (якщо потрібно)
export async function externalLoginFacebook(fbToken) {
  try {
    const response = await api.post('/auth/external-login/facebook', {
      accessToken: fbToken,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Facebook login failed');
  }
}

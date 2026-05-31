import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // kirim httpOnly cookie (refresh token) di setiap request
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nutritrack_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url ?? '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');

    // Jika 401 dan bukan dari endpoint auth, coba refresh access token
    if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem('nutritrack_token', data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest); // ulangi request asal dengan token baru
      } catch {
        // Refresh token juga expired → paksa logout
        localStorage.removeItem('nutritrack_token');
        localStorage.removeItem('nutritrack_user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

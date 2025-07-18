// src/api/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const axiosConfig = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor to attach JWT token
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    try {
      const fullUrl = new URL(config.url, API_BASE_URL);
      const path = fullUrl.pathname;

      // Don't attach token for login or register
      const isAuthRoute = ['/auth/login', '/auth/register'].includes(path);

      if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('Failed to parse URL, fallback token attach:', err);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor to handle auth errors
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Token invalid or expired. Logging out.');
      localStorage.removeItem('token');

      // Optional: Redirect to login
      // window.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;

import axios from 'axios';
import { store } from '../store';
import { login, logout } from '../store/authSlice';
import { refreshToken } from './userApi';

const API_URL = import.meta.env.VITE_API_URL ;


const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config?.url,
      baseURL: config?.baseURL,
      method: config?.method,
      headers: config?.headers
    });
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/login') && 
        !originalRequest.url?.includes('/signup')) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();
        const { token: accessToken } = response.data;
        store.dispatch(login({ accessToken }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
// src/axiosConfig.js
import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Set your base URL here
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(process.env.JWT_SECRET_KEY);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});

export default axiosInstance;

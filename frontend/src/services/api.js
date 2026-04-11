import axios from 'axios';

// Axios instance ready for your MERN backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change when backend is ready
  headers: { 'Content-Type': 'application/json' }
});

// Auto attach JWT (matches PDF authentication flow)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
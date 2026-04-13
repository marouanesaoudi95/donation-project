import axios from 'axios';

// Vite uses import.meta.env for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API helpers
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Donations/Posts API helpers
export const postsAPI = {
  getAll: (params) => api.get('/donations', { params }),
  getOne: (id) => api.get(`/donations/${id}`),
  getMine: () => api.get('/donations/my/donations'),
  create: (data) => api.post('/donations', data),
  update: (id, data) => api.put(`/donations/${id}`, data),
  remove: (id) => api.delete(`/donations/${id}`),
};

// Claims API helpers
export const claimsAPI = {
  create: (data) => api.post('/claims', data),
  getMine: () => api.get('/claims/my'),
  getOne: (id) => api.get(`/claims/${id}`),
  updateStatus: (id, status) => api.put(`/claims/${id}/status`, { status }),
};

export default api;
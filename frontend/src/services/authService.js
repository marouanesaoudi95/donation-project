import api from './api';

export const register = async (payload) => {
  return api.post('/auth/register', payload);
};

export const login = async (credentials) => {
  return api.post('/auth/login', credentials);
};

export const getProfile = async () => {
  return api.get('/auth/me');
};

export const updateProfile = async (payload) => {
  return api.put('/auth/profile', payload);
};

export const deleteProfile = async () => {
  return api.delete('/auth/profile');
};
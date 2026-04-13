import api from './api';

export const createClaim = async (payload) => {
  return api.post('/claims', payload);
};

export const getMyClaims = async () => {
  return api.get('/claims/my');
};

export const getClaimById = async (id) => {
  return api.get(`/claims/${id}`);
};

export const deleteClaim = async (id) => {
  return api.delete(`/claims/${id}`);
};

export const updateClaimStatus = async (id, payload) => {
  return api.put(`/claims/${id}/status`, payload);
};
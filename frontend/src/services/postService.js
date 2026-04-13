import api from './api';

export const getAllDonations = async () => {
  return api.get('/donations');
};

export const getDonationById = async (id) => {
  return api.get(`/donations/${id}`);
};

export const createDonation = async (payload) => {
  return api.post('/donations', payload);
};

export const getMyDonations = async () => {
  return api.get('/donations/my/donations');
};

export const updateDonation = async (id, payload) => {
  return api.put(`/donations/${id}`, payload);
};

export const deleteDonation = async (id) => {
  return api.delete(`/donations/${id}`);
};
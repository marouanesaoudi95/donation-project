export const validateDonation = (data) => {
  if (!data.donationType) return 'Donation type is required';
  if (!data.quantity || data.quantity < 1) return 'Quantity must be at least 1';
  if (!data.description || data.description.length < 10) return 'Description must be at least 10 characters';
  return null;
};
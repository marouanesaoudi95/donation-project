import { useState } from 'react';
import {
  getMyClaims,
  createClaim,
  deleteClaim,
  getClaimById,
  updateClaimStatus,
} from '../services/claimService';

export const useClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const data = await getMyClaims();
      setClaims(data);
    } finally {
      setLoading(false);
    }
  };

  const addClaim = async (payload) => {
    const created = await createClaim(payload);
    setClaims((prev) => [created, ...prev]);
    return created;
  };

  const removeClaim = async (id) => {
    await deleteClaim(id);
    setClaims((prev) => prev.filter((claim) => claim._id !== id));
  };

  const changeClaimStatus = async (id, status) => {
    const updated = await updateClaimStatus(id, { status });
    setClaims((prev) => prev.map((claim) => (claim._id === id ? updated : claim)));
    return updated;
  };

  return {
    claims,
    loading,
    fetchClaims,
    addClaim,
    removeClaim,
    getClaimById,
    changeClaimStatus,
  };
};
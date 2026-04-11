import { useState } from 'react';

export const useClaims = () => {
  const [claims, setClaims] = useState([]);

  const addClaim = (claim) => {
    setClaims(prev => [claim, ...prev]);
  };

  return { claims, addClaim };
};
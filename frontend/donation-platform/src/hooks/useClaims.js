import { useState, useCallback } from 'react'
import { claimsAPI } from '../services/api'

export const useClaims = () => {
  const [claims,  setClaims]  = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const fetchMyClaims = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const { data } = await claimsAPI.getMine()
      setClaims(data.claims || data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load claims')
    } finally { setLoading(false) }
  }, [])

  const submitClaim = useCallback(async (postId, quantity, notes = '') => {
    const { data } = await claimsAPI.create({ postId, quantity, notes })
    return data.claim || data
  }, [])

  const updateClaimStatus = useCallback(async (claimId, status) => {
    const { data } = await claimsAPI.updateStatus(claimId, status)
    setClaims(prev => prev.map(c => c._id === claimId ? { ...c, status } : c))
    return data
  }, [])

  return {
    claims, loading, error,
    fetchMyClaims, submitClaim, updateClaimStatus,
  }
}

export default useClaims

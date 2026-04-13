import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(() => {
    // Rehydrate user from localStorage instantly (avoids flash)
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [token,   setToken]   = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      const storedToken = localStorage.getItem('token')
      if (!storedToken) {
        setLoading(false)
        return
      }
      try {
        const { data } = await authAPI.getMe()
        const u = data.user || data
        setUser(u)
        localStorage.setItem('user', JSON.stringify(u))
      } catch {
        // Token invalid - clear it silently, don't redirect
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [])

  const login = useCallback((data) => {
    const { token: t, user: u } = data
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(u))
    setToken(t)
    setUser(u)
    return u
  }, [])

  const register = useCallback((data) => {
    const { token: t, user: u } = data
    if (t) localStorage.setItem('token', t)
    if (u) localStorage.setItem('user', JSON.stringify(u))
    setToken(t || null)
    setUser(u || null)
    return u
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback(async (updates) => {
    const { data } = await authAPI.updateProfile(updates)
    const updated = data.user || data
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
    return updated
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!token && !!user,
      isDonor:         user?.role === 'donor',
      isCharity:       user?.role === 'charity',
      isAdmin:         user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}

export default AuthContext

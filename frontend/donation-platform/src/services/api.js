import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => Promise.reject(error))

// Handle 401 - only redirect if NOT already on an auth page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname
      const isAuthPage = path === '/login' || path === '/register'
      if (!isAuthPage) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register:      (data) => api.post('/auth/register', data),
  login:         (data) => api.post('/auth/login', data),
  getMe:         ()     => api.get('/auth/me'),
  updateProfile: (d)    => api.put('/auth/profile', d),
}

export const postsAPI = {
  getAll:        (params) => api.get('/posts', { params }),
  getOne:        (id)     => api.get(`/posts/${id}`),
  create:        (data)   => api.post('/posts', data),
  update:        (id, d)  => api.put(`/posts/${id}`, d),
  remove:        (id)     => api.delete(`/posts/${id}`),
  getMine:       ()       => api.get('/posts/my'),
  getPostClaims: (id)     => api.get(`/posts/${id}/claims`),
}

export const claimsAPI = {
  create:       (data)    => api.post('/claims', data),
  getMine:      ()        => api.get('/claims/my'),
  getOne:       (id)      => api.get(`/claims/${id}`),
  updateStatus: (id, s)   => api.put(`/claims/${id}/status`, { status: s }),
}

export default api

import { useState, useCallback } from 'react'
import { postsAPI } from '../services/api'

export const usePosts = () => {
  const [posts,   setPosts]   = useState([])
  const [post,    setPost]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  const fetchPosts = useCallback(async (params = {}) => {
    setLoading(true); setError(null)
    try {
      const { data } = await postsAPI.getAll(params)
      setPosts(data.posts || data)
      if (data.pagination) setPagination(data.pagination)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts')
    } finally { setLoading(false) }
  }, [])

  const fetchPost = useCallback(async (id) => {
    setLoading(true); setError(null)
    try {
      const { data } = await postsAPI.getOne(id)
      setPost(data.post || data)
    } catch (err) {
      setError(err.response?.data?.message || 'Post not found')
    } finally { setLoading(false) }
  }, [])

  const fetchMyPosts = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const { data } = await postsAPI.getMine()
      setPosts(data.posts || data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your posts')
    } finally { setLoading(false) }
  }, [])

  const createPost = useCallback(async (postData) => {
    const { data } = await postsAPI.create(postData)
    return data.post || data
  }, [])

  const updatePost = useCallback(async (id, postData) => {
    const { data } = await postsAPI.update(id, postData)
    return data.post || data
  }, [])

  const deletePost = useCallback(async (id) => {
    await postsAPI.remove(id)
    setPosts(prev => prev.filter(p => p._id !== id))
  }, [])

  return {
    posts, post, loading, error, pagination,
    fetchPosts, fetchPost, fetchMyPosts,
    createPost, updatePost, deletePost,
  }
}

export default usePosts

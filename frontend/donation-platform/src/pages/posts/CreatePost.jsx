import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../../hooks/usePosts'
import PostForm from '../../components/posts/PostForm'

const CreatePost = () => {
  const { createPost } = usePosts()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    setLoading(true); setError('')
    try {
      const post = await createPost(data)
      navigate(`/posts/${post._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-10">
        <div className="max-w-2xl mx-auto px-4 text-white">
          <h1 className="font-serif text-3xl font-bold mb-1">Create a Donation</h1>
          <p className=" text-white/80">List your items for charities to discover and claim.</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm ">⚠️ {error}</div>}
        <div className="card p-8">
          <PostForm onSubmit={handleSubmit} loading={loading} submitLabel="Publish Donation 🎁" />
        </div>
      </div>
    </div>
  )
}

export default CreatePost

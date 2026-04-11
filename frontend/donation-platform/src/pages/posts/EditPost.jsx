import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../../hooks/usePosts'
import PostForm from '../../components/posts/PostForm'
import { PageSpinner } from '../../components/common/Spinner'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loading: fetching, fetchPost, updatePost } = usePosts()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchPost(id) }, [id])

  const handleSubmit = async (data) => {
    setSaving(true); setError('')
    try {
      await updatePost(id, data)
      navigate(`/posts/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post')
    } finally { setSaving(false) }
  }

  if (fetching) return <PageSpinner />

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-10">
        <div className="max-w-2xl mx-auto px-4 text-white">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white  text-sm mb-3 flex items-center gap-1 transition-colors">
            ← Back
          </button>
          <h1 className="font-serif text-3xl font-bold">Edit Donation</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
        <div className="card p-8">
          <PostForm initialData={post || {}} onSubmit={handleSubmit} loading={saving} submitLabel="Save Changes" />
        </div>
      </div>
    </div>
  )
}

export default EditPost

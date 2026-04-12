import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import PostForm from '../../components/posts/PostForm'
import { PageSpinner } from '../../components/common/Spinner'
import { FadeContent, BlurText } from '../../components/animations'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loading:fetching, fetchPost, updatePost } = usePosts()
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

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
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      <div style={{background:'linear-gradient(135deg,#f97316,#ea6c10)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{x:[-20,20,-20]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
          style={{position:'absolute',bottom:'-2rem',left:'-2rem',width:'10rem',height:'10rem',borderRadius:'50%',background:'rgba(255,255,255,0.07)'}}
        />
        <div className="max-w-2xl mx-auto px-4">
          <FadeContent direction="up">
            <motion.button whileHover={{x:-4}} onClick={() => navigate(-1)}
              style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'rgba(255,255,255,0.8)',border:'none',background:'none',cursor:'pointer',marginBottom:'0.875rem',fontSize:'0.875rem'}}>
              ← Back
            </motion.button>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,color:'white'}}>
              <BlurText text="Edit Donation" delay={0.1} />
            </h1>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4" style={{paddingTop:'2.5rem',paddingBottom:'4rem'}}>
        {error && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
            style={{marginBottom:'1.25rem',padding:'1rem',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'0.875rem',color:'#dc2626',fontSize:'0.875rem'}}>
            ⚠️ {error}
          </motion.div>
        )}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
          style={{background:'white',borderRadius:'1.25rem',boxShadow:'0 8px 40px rgba(0,0,0,0.09)',padding:'2rem'}}>
          <PostForm initialData={post||{}} onSubmit={handleSubmit} loading={saving} submitLabel="Save Changes ✓" />
        </motion.div>
      </div>
    </div>
  )
}

export default EditPost

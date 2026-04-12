import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import PostForm from '../../components/posts/PostForm'
import { FadeContent, BlurText } from '../../components/animations'

const CreatePost = () => {
  const { createPost } = usePosts()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

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
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      <div style={{background:'linear-gradient(135deg,#f97316,#ea6c10)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{scale:[1,1.3,1],opacity:[0.4,0.7,0.4]}} transition={{duration:5,repeat:Infinity}}
          style={{position:'absolute',top:'-3rem',right:'-3rem',width:'14rem',height:'14rem',borderRadius:'50%',background:'rgba(255,255,255,0.07)'}}
        />
        <div className="max-w-2xl mx-auto px-4">
          <FadeContent direction="up">
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:'white',marginBottom:'0.375rem'}}>
              <BlurText text="Create a Donation" delay={0.1} />
            </h1>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'0.95rem'}}>List your items for charities to discover and claim.</p>
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
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}}
          style={{background:'white',borderRadius:'1.25rem',boxShadow:'0 8px 40px rgba(0,0,0,0.09)',padding:'2rem'}}>
          <PostForm onSubmit={handleSubmit} loading={loading} submitLabel="Publish Donation 🎁" />
        </motion.div>
      </div>
    </div>
  )
}

export default CreatePost

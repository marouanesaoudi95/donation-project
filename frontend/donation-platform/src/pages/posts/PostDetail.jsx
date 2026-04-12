import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import { useClaims } from '../../hooks/useClaims'
import { useAuth } from '../../hooks/useAuth'
import { PageSpinner } from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import { FadeContent, ScrollReveal, BlurText, GlowCard } from '../../components/animations'
import { getDonationTypeInfo, formatDate, getProgressPercent } from '../../utils/formatters'

const TYPE_GRAD = {
  food:'linear-gradient(to right,#4ade80,#10b981)',
  clothes:'linear-gradient(to right,#60a5fa,#6366f1)',
  toys:'linear-gradient(to right,#fbbf24,#f97316)',
  electronics:'linear-gradient(to right,#a78bfa,#8b5cf6)',
  books:'linear-gradient(to right,#2dd4bf,#06b6d4)',
  other:'linear-gradient(to right,#a8a29e,#78716c)',
}

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loading, error, fetchPost } = usePosts()
  const { submitClaim } = useClaims()
  const { isAuthenticated, isCharity } = useAuth()

  const [claimModal, setClaimModal] = useState(false)
  const [claimQty,   setClaimQty]   = useState(1)
  const [claimNotes, setClaimNotes] = useState('')
  const [claimLoading, setClaimLoading] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [claimError,   setClaimError]   = useState('')

  useEffect(() => { fetchPost(id) }, [id])

  const handleClaim = async () => {
    if (claimQty < 1 || claimQty > post.remainingQty) {
      setClaimError(`Quantity must be between 1 and ${post.remainingQty}`)
      return
    }
    setClaimLoading(true); setClaimError('')
    try {
      await submitClaim(id, Number(claimQty), claimNotes)
      setClaimSuccess(true)
      setTimeout(() => { setClaimModal(false); setClaimSuccess(false); fetchPost(id) }, 2200)
    } catch (err) {
      setClaimError(err.response?.data?.message || 'Failed to submit claim')
    } finally { setClaimLoading(false) }
  }

  if (loading) return <PageSpinner />
  if (error || !post) return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <FadeContent direction="up">
        <div style={{textAlign:'center'}}>
          <motion.p animate={{y:[0,-8,0]}} transition={{duration:2,repeat:Infinity}} style={{fontSize:'4rem',marginBottom:'1rem'}}>🔍</motion.p>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.75rem',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>Post Not Found</h2>
          <button onClick={() => navigate('/posts')} className="btn-primary">Back to Donations</button>
        </div>
      </FadeContent>
    </div>
  )

  const typeInfo   = getDonationTypeInfo(post.donationType)
  const progress   = getProgressPercent(post.remainingQty, post.quantity)
  const isCompleted= post.status === 'completed'
  const grad       = TYPE_GRAD[post.donationType] || TYPE_GRAD.other

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#f97316,#ea6c10)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{scale:[1,1.2,1],opacity:[0.4,0.7,0.4]}}
          transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
          style={{position:'absolute',top:'-4rem',right:'-4rem',width:'18rem',height:'18rem',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}
        />
        <div className="max-w-4xl mx-auto px-4">
          <motion.button
            whileHover={{x:-4}} whileTap={{scale:0.95}}
            onClick={() => navigate(-1)}
            style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'rgba(255,255,255,0.8)',border:'none',background:'none',cursor:'pointer',marginBottom:'1rem',fontSize:'0.875rem',fontWeight:500}}
          >← Back</motion.button>
          <FadeContent direction="up">
            <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'white'}}>
              <motion.div
                initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}}
                transition={{type:'spring',stiffness:260,damping:20,delay:0.1}}
                style={{width:'4rem',height:'4rem',background:'rgba(255,255,255,0.2)',borderRadius:'1rem',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',backdropFilter:'blur(8px)'}}
              >{typeInfo.icon}</motion.div>
              <div>
                <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.5rem,4vw,2.25rem)',fontWeight:700,textTransform:'capitalize'}}>
                  <BlurText text={`${post.donationType} Donation`} delay={0.2} />
                </h1>
                <p style={{color:'rgba(255,255,255,0.75)',fontSize:'0.875rem'}}>Posted {formatDate(post.createdAt)}</p>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4" style={{paddingTop:'2.5rem',paddingBottom:'4rem',display:'grid',gridTemplateColumns:'1fr',gap:'1.5rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem',alignItems:'start'}}>
          {/* Main */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
            <FadeContent delay={0.1} direction="up">
              <GlowCard style={{padding:'1.5rem'}}>
                <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>About this Donation</h2>
                <p style={{color:'#78716c',lineHeight:1.75,fontSize:'0.95rem'}}>{post.description}</p>
              </GlowCard>
            </FadeContent>

            <FadeContent delay={0.2} direction="up">
              <GlowCard style={{padding:'1.5rem'}}>
                <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>Availability</h2>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.875rem',marginBottom:'0.625rem'}}>
                  <span style={{color:'#78716c'}}>Items remaining</span>
                  <span style={{fontWeight:700,color:'#1c1917'}}>{post.remainingQty} of {post.quantity}</span>
                </div>
                <div style={{height:'10px',background:'#f5f5f4',borderRadius:'999px',overflow:'hidden',marginBottom:'0.5rem'}}>
                  <motion.div
                    initial={{width:0}}
                    animate={{width:`${100-progress}%`}}
                    transition={{duration:1,delay:0.4,ease:'easeOut'}}
                    style={{height:'100%',background:grad,borderRadius:'999px'}}
                  />
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'#a8a29e'}}>
                  <span>{progress}% claimed</span>
                  <span style={{fontWeight:600,color:isCompleted?'#a8a29e':'#16a34a'}}>{isCompleted?'Fully claimed':'Available'}</span>
                </div>
              </GlowCard>
            </FadeContent>

            {post.donor && (
              <FadeContent delay={0.3} direction="up">
                <GlowCard style={{padding:'1.5rem'}}>
                  <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>Donor Information</h2>
                  <div style={{display:'flex',alignItems:'center',gap:'0.875rem',marginBottom:'1rem'}}>
                    <motion.div whileHover={{scale:1.1}}
                      style={{width:'3rem',height:'3rem',borderRadius:'50%',background:'#ffedd5',display:'flex',alignItems:'center',justifyContent:'center',color:'#ea6c10',fontWeight:700,fontSize:'1.1rem'}}>
                      {post.donor.name?.charAt(0).toUpperCase()}
                    </motion.div>
                    <div>
                      <p style={{fontWeight:600,color:'#1c1917'}}>{post.donor.name}</p>
                      <p style={{fontSize:'0.8rem',color:'#a8a29e'}}>Donor</p>
                    </div>
                  </div>
                  {isCharity && (
                    <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                      {post.contactPhone && (
                        <motion.a whileHover={{x:4}} href={`tel:${post.contactPhone}`}
                          style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.75rem',background:'#fafaf9',borderRadius:'0.75rem',textDecoration:'none',color:'#1c1917',fontSize:'0.875rem'}}>
                          📞 {post.contactPhone}
                        </motion.a>
                      )}
                      {post.contactEmail && (
                        <motion.a whileHover={{x:4}} href={`mailto:${post.contactEmail}`}
                          style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.75rem',background:'#fafaf9',borderRadius:'0.75rem',textDecoration:'none',color:'#1c1917',fontSize:'0.875rem'}}>
                          📧 {post.contactEmail}
                        </motion.a>
                      )}
                    </div>
                  )}
                  {!isAuthenticated && <p style={{fontSize:'0.8rem',color:'#a8a29e',marginTop:'0.5rem'}}>Sign in as a charity to view contact details.</p>}
                </GlowCard>
              </FadeContent>
            )}
          </div>

          {/* Sidebar */}
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <FadeContent delay={0.15} direction="left">
              <GlowCard style={{padding:'1.5rem',textAlign:'center'}}>
                <motion.p
                  initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}}
                  transition={{type:'spring',stiffness:200,damping:15,delay:0.3}}
                  style={{fontFamily:'Playfair Display,serif',fontSize:'3.5rem',fontWeight:700,color:'#f97316',lineHeight:1}}
                >{post.remainingQty}</motion.p>
                <p style={{fontSize:'0.875rem',color:'#a8a29e',marginBottom:'1rem'}}>units available</p>
                <motion.span
                  animate={isCompleted ? {} : {boxShadow:['0 0 0 0 rgba(22,163,74,0.3)','0 0 0 8px rgba(22,163,74,0)','0 0 0 0 rgba(22,163,74,0)']}}
                  transition={{duration:2,repeat:Infinity}}
                  style={{
                    display:'inline-flex',alignItems:'center',padding:'0.375rem 1rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:700,marginBottom:'1.25rem',
                    background:isCompleted?'#f5f5f4':'#dcfce7',color:isCompleted?'#78716c':'#15803d'
                  }}
                >{isCompleted?'Fully Claimed':'✓ Available'}</motion.span>

                {isCharity && !isCompleted && (
                  <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                    <Button onClick={() => setClaimModal(true)} className="w-full">🤝 Claim Donation</Button>
                  </motion.div>
                )}
                {!isAuthenticated && (
                  <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                    <Button onClick={() => navigate('/login')} className="w-full">Sign In to Claim</Button>
                  </motion.div>
                )}
                {isCompleted && <p style={{fontSize:'0.8rem',color:'#a8a29e'}}>This donation has been fully claimed.</p>}
              </GlowCard>
            </FadeContent>

            <FadeContent delay={0.25} direction="left">
              <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'1.25rem'}}>
                {[['Category',post.donationType],['Total Quantity',`${post.quantity} units`],['Posted',formatDate(post.createdAt)]].map(([label,val]) => (
                  <div key={label} style={{display:'flex',justifyContent:'space-between',padding:'0.625rem 0',borderBottom:'1px solid #fafaf9',fontSize:'0.875rem'}}>
                    <span style={{color:'#a8a29e'}}>{label}</span>
                    <span style={{fontWeight:600,color:'#1c1917',textTransform:'capitalize'}}>{val}</span>
                  </div>
                ))}
              </div>
            </FadeContent>
          </div>
        </div>
      </div>

      {/* Claim modal */}
      <Modal isOpen={claimModal} onClose={() => setClaimModal(false)} title="Claim Donation"
        footer={<>
          <button onClick={() => setClaimModal(false)} className="btn-ghost">Cancel</button>
          <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
            <Button onClick={handleClaim} loading={claimLoading}>Confirm Claim</Button>
          </motion.div>
        </>}
      >
        <AnimatePresence mode="wait">
          {claimSuccess ? (
            <motion.div key="success"
              initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}}
              transition={{type:'spring',stiffness:260,damping:20}}
              style={{textAlign:'center',padding:'1.5rem'}}
            >
              <motion.p animate={{rotate:[0,10,-10,0]}} transition={{duration:0.5,delay:0.2}} style={{fontSize:'4rem',marginBottom:'1rem'}}>✅</motion.p>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>Claim Submitted!</h3>
              <p style={{color:'#78716c',fontSize:'0.9rem'}}>Your claim has been recorded successfully.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <p style={{color:'#78716c',fontSize:'0.875rem'}}>Available: <strong>{post.remainingQty} units</strong>. How many would you like to claim?</p>
              {claimError && (
                <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                  style={{padding:'0.75rem',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'0.75rem',color:'#dc2626',fontSize:'0.875rem'}}>
                  {claimError}
                </motion.div>
              )}
              <Input label="Quantity *" type="number" min="1" max={post.remainingQty} value={claimQty} onChange={e => setClaimQty(e.target.value)} />
              <Input label="Notes (optional)" as="textarea" rows={3} value={claimNotes} onChange={e => setClaimNotes(e.target.value)} placeholder="Any pickup instructions…" />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  )
}

export default PostDetail

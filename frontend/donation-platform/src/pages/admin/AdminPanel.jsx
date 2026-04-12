import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import { useClaims } from '../../hooks/useClaims'
import PostCard from '../../components/posts/PostCard'
import { formatDate, getDonationTypeInfo } from '../../utils/formatters'
import { FadeContent, ScrollReveal, BlurText, GlowCard } from '../../components/animations'

const AdminPanel = () => {
  const { posts, fetchPosts, deletePost } = usePosts()
  const { claims, fetchMyClaims, updateClaimStatus } = useClaims()
  const [tab, setTab] = useState('posts')

  useEffect(() => { fetchPosts({}); fetchMyClaims() }, [])

  const totalAvailable = posts.filter(p => p.status === 'available').length
  const totalCompleted = posts.filter(p => p.status === 'completed').length
  const pendingClaims  = claims.filter(c => c.status === 'pending').length

  const TABS = ['posts','claims','stats']

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#1c1917,#292524)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{rotate:[0,360]}} transition={{duration:40,repeat:Infinity,ease:'linear'}}
          style={{position:'absolute',top:'-5rem',right:'-5rem',width:'20rem',height:'20rem',borderRadius:'50%',border:'1px solid rgba(249,115,22,0.15)'}}
        />
        <motion.div animate={{rotate:[360,0]}} transition={{duration:28,repeat:Infinity,ease:'linear'}}
          style={{position:'absolute',bottom:'-3rem',left:'-3rem',width:'14rem',height:'14rem',borderRadius:'50%',border:'1px solid rgba(249,115,22,0.1)'}}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position:'relative',zIndex:1}}>
          <FadeContent direction="up">
            <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'white'}}>
              <motion.div whileHover={{rotate:15}} transition={{type:'spring',stiffness:400}}
                style={{width:'3rem',height:'3rem',borderRadius:'0.875rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem'}}>
                ⚙️
              </motion.div>
              <div>
                <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700}}>
                  <BlurText text="Admin Panel" delay={0.1} />
                </h1>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.875rem'}}>Monitor and manage the HopeLink platform</p>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'2.5rem',paddingBottom:'4rem'}}>
        {/* Stats */}
        <ScrollReveal stagger={0.08} direction="up" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
          {[
            {icon:'📦',label:'Total Posts',   value:posts.length,    bg:'#fff7ed'},
            {icon:'✅',label:'Available',     value:totalAvailable,  bg:'#f0fdf4'},
            {icon:'🏁',label:'Completed',     value:totalCompleted,  bg:'#fafaf9'},
            {icon:'🤝',label:'Total Claims',  value:claims.length,   bg:'#eff6ff'},
            {icon:'⏳',label:'Pending Claims',value:pendingClaims,   bg:'#fefce8'},
          ].map(s => (
            <GlowCard key={s.label} style={{padding:'1.25rem',display:'flex',alignItems:'center',gap:'0.875rem'}}>
              <div style={{width:'2.75rem',height:'2.75rem',borderRadius:'0.75rem',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>
                {s.icon}
              </div>
              <div>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
                  style={{fontFamily:'Playfair Display,serif',fontSize:'1.6rem',fontWeight:700,color:'#1c1917',lineHeight:1}}>
                  {s.value}
                </motion.p>
                <p style={{fontSize:'0.75rem',color:'#a8a29e',marginTop:'0.125rem'}}>{s.label}</p>
              </div>
            </GlowCard>
          ))}
        </ScrollReveal>

        {/* Tabs */}
        <FadeContent direction="up" delay={0.1}>
          <div style={{background:'white',borderRadius:'1rem 1rem 0 0',boxShadow:'0 -2px 20px rgba(0,0,0,0.04)',display:'flex',borderBottom:'1px solid #f5f5f4',overflow:'hidden',marginBottom:0}}>
            {TABS.map(t => (
              <motion.button key={t} onClick={() => setTab(t)}
                whileHover={{background:'#fafaf9'}}
                style={{
                  position:'relative',padding:'1rem 1.5rem',border:'none',background:'none',
                  cursor:'pointer',fontWeight:600,fontSize:'0.875rem',textTransform:'capitalize',
                  color:tab===t?'#f97316':'#78716c',transition:'color 0.2s',
                }}
              >
                {t}
                {tab===t && (
                  <motion.div layoutId="admin-tab-indicator"
                    style={{position:'absolute',bottom:0,left:'1rem',right:'1rem',height:'2px',borderRadius:'999px',background:'#f97316'}}
                    transition={{type:'spring',stiffness:380,damping:30}}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </FadeContent>

        <AnimatePresence mode="wait">
          {/* Posts tab */}
          {tab === 'posts' && (
            <motion.div key="posts"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{duration:0.3}}
              style={{paddingTop:'1.5rem'}}
            >
              {posts.length === 0 ? (
                <p style={{textAlign:'center',color:'#a8a29e',padding:'3rem'}}>No posts found.</p>
              ) : (
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.25rem'}}>
                  {posts.map(post => (
                    <PostCard key={post._id} post={post} showActions
                      onDelete={id => { if(window.confirm('Delete this post?')) deletePost(id) }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Claims tab */}
          {tab === 'claims' && (
            <motion.div key="claims"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{duration:0.3}}
              style={{paddingTop:'1.5rem',background:'white',borderRadius:'0 0 1rem 1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',overflow:'hidden'}}
            >
              {claims.length === 0 ? (
                <p style={{textAlign:'center',color:'#a8a29e',padding:'3rem'}}>No claims found.</p>
              ) : (
                claims.map((claim, i) => {
                  const t = getDonationTypeInfo(claim.post?.donationType)
                  return (
                    <motion.div key={claim._id}
                      initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}}
                      transition={{delay:i*0.05,duration:0.35}}
                      whileHover={{background:'#fafaf9'}}
                      style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.5rem',borderBottom:i<claims.length-1?'1px solid #f5f5f4':'none',transition:'background 0.15s'}}
                    >
                      <span style={{fontSize:'1.5rem'}}>{t.icon}</span>
                      <div style={{flex:1}}>
                        <p style={{fontWeight:600,color:'#1c1917',textTransform:'capitalize',fontSize:'0.9rem'}}>{claim.post?.donationType||'Donation'}</p>
                        <p style={{fontSize:'0.8rem',color:'#a8a29e'}}>{claim.quantity} units · {formatDate(claim.claimedAt)}</p>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'0.625rem',flexShrink:0}}>
                        <span style={{
                          padding:'0.2rem 0.625rem',borderRadius:'9999px',fontSize:'0.75rem',fontWeight:700,
                          background:claim.status==='confirmed'?'#dcfce7':'#fefce8',
                          color:claim.status==='confirmed'?'#15803d':'#a16207'
                        }}>{claim.status}</span>
                        {claim.status === 'pending' && (
                          <motion.button whileHover={{scale:1.06}} whileTap={{scale:0.94}}
                            onClick={() => updateClaimStatus(claim._id,'confirmed')}
                            style={{padding:'0.375rem 0.875rem',borderRadius:'0.5rem',border:'none',background:'#16a34a',color:'white',cursor:'pointer',fontSize:'0.78rem',fontWeight:600}}>
                            Confirm
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}

          {/* Stats tab */}
          {tab === 'stats' && (
            <motion.div key="stats"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{duration:0.3}}
              style={{paddingTop:'1.5rem'}}
            >
              <GlowCard style={{padding:'4rem',textAlign:'center'}}>
                <motion.p animate={{y:[0,-6,0]}} transition={{duration:2,repeat:Infinity}} style={{fontSize:'3.5rem',marginBottom:'1rem'}}>📊</motion.p>
                <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>Analytics Coming Soon</h3>
                <p style={{color:'#a8a29e',fontSize:'0.9rem'}}>Detailed charts and reporting will be available in the next release.</p>
              </GlowCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminPanel

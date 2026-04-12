import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useClaims } from '../../hooks/useClaims'
import { getDonationTypeInfo, formatDate } from '../../utils/formatters'
import { PageSpinner } from '../../components/common/Spinner'
import { FadeContent, ScrollReveal, BlurText, GlowCard } from '../../components/animations'

const ClaimsHistory = () => {
  const { claims, loading, fetchMyClaims } = useClaims()
  useEffect(() => { fetchMyClaims() }, [])

  if (loading) return <PageSpinner />

  const pending   = claims.filter(c => c.status === 'pending').length
  const confirmed = claims.filter(c => c.status === 'confirmed').length
  const totalQty  = claims.reduce((s,c) => s + (c.quantity||0), 0)

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#2d7a4f,#0d9488)',padding:'3rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{x:[-30,30,-30]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut'}}
          style={{position:'absolute',top:'-3rem',right:'-3rem',width:'14rem',height:'14rem',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}
        />
        <div className="max-w-5xl mx-auto px-4">
          <FadeContent direction="up">
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:700,color:'white',marginBottom:'0.5rem'}}>
              <BlurText text="Claims History" />
            </h1>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1rem'}}>Track all donations your organization has claimed.</p>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'2.5rem',paddingBottom:'4rem'}}>
        {/* Stats */}
        <ScrollReveal stagger={0.1} direction="up" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem',marginBottom:'2.5rem'}}>
          {[
            {icon:'📋',label:'Total Claims',  value:claims.length, bg:'#fff7ed'},
            {icon:'🎁',label:'Units Claimed', value:totalQty,      bg:'#eff6ff'},
            {icon:'⏳',label:'Pending',       value:pending,       bg:'#fefce8'},
            {icon:'✅',label:'Confirmed',     value:confirmed,     bg:'#f0fdf4'},
          ].map(s => (
            <GlowCard key={s.label} style={{padding:'1.25rem',textAlign:'center'}}>
              <div style={{width:'3rem',height:'3rem',borderRadius:'0.875rem',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',margin:'0 auto 0.75rem'}}>
                {s.icon}
              </div>
              <motion.p
                initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}}
                transition={{type:'spring',stiffness:200,delay:0.2}}
                style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,color:'#1c1917',lineHeight:1}}
              >{s.value}</motion.p>
              <p style={{fontSize:'0.8rem',color:'#a8a29e',marginTop:'0.25rem'}}>{s.label}</p>
            </GlowCard>
          ))}
        </ScrollReveal>

        {/* Claims list */}
        {claims.length === 0 ? (
          <FadeContent direction="up">
            <div style={{textAlign:'center',padding:'5rem 0'}}>
              <motion.p animate={{y:[0,-8,0]}} transition={{duration:2,repeat:Infinity}} style={{fontSize:'4rem',marginBottom:'1rem'}}>📭</motion.p>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>No claims yet</h3>
              <p style={{color:'#78716c',marginBottom:'1.5rem',fontSize:'0.95rem'}}>Browse available donations and submit your first claim.</p>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{display:'inline-block'}}>
                <Link to="/posts" className="btn-primary" style={{textDecoration:'none'}}>Browse Donations</Link>
              </motion.div>
            </div>
          </FadeContent>
        ) : (
          <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',overflow:'hidden'}}>
            {claims.map((claim, i) => {
              const t = getDonationTypeInfo(claim.post?.donationType)
              const isConfirmed = claim.status === 'confirmed'
              return (
                <motion.div key={claim._id}
                  initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
                  transition={{delay:i*0.06,duration:0.4,ease:[0.25,0.1,0.25,1]}}
                  whileHover={{background:'#fafaf9'}}
                  style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.5rem',borderBottom:i<claims.length-1?'1px solid #f5f5f4':'none',transition:'background 0.15s'}}
                >
                  <motion.div whileHover={{rotate:10}} style={{width:'3rem',height:'3rem',borderRadius:'0.875rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>
                    {t.icon}
                  </motion.div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontWeight:600,color:'#1c1917',textTransform:'capitalize',fontSize:'0.95rem'}}>{claim.post?.donationType||'Donation'}</p>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',marginTop:'0.2rem',fontSize:'0.8rem',color:'#a8a29e'}}>
                      <span>🎁 {claim.quantity} units</span>
                      <span>📅 {formatDate(claim.claimedAt)}</span>
                      {claim.notes && <span>📝 {claim.notes}</span>}
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexShrink:0}}>
                    <motion.span
                      animate={isConfirmed?{}:{opacity:[1,0.6,1]}}
                      transition={{duration:2,repeat:Infinity}}
                      style={{display:'inline-flex',alignItems:'center',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontSize:'0.78rem',fontWeight:700,
                        background:isConfirmed?'#dcfce7':'#fefce8',color:isConfirmed?'#15803d':'#a16207'}}
                    >{isConfirmed?'✅ Confirmed':'⏳ Pending'}</motion.span>
                    {claim.post?._id && (
                      <motion.div whileHover={{x:4}}>
                        <Link to={`/posts/${claim.post._id}`} style={{color:'#f97316',fontSize:'0.85rem',fontWeight:600,textDecoration:'none'}}>View →</Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClaimsHistory

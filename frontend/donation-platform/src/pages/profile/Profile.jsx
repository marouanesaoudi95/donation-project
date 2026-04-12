import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { FadeContent, GlowCard } from '../../components/animations'

const Profile = () => {
  const { user, updateUser, logout } = useAuth()
  const [form, setForm]     = useState({ name:user?.name||'', phone:user?.phone||'', organization:user?.organization||'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess(false)
    try {
      await updateUser(form)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#f97316,#ea6c10)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{rotate:[0,360]}} transition={{duration:30,repeat:Infinity,ease:'linear'}}
          style={{position:'absolute',top:'-4rem',right:'-4rem',width:'16rem',height:'16rem',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.08)'}}
        />
        <div className="max-w-2xl mx-auto px-4">
          <FadeContent direction="up">
            <div style={{display:'flex',alignItems:'center',gap:'1.25rem',color:'white'}}>
              <motion.div
                initial={{scale:0}} animate={{scale:1}}
                transition={{type:'spring',stiffness:260,damping:20,delay:0.15}}
                whileHover={{scale:1.08,rotate:5}}
                style={{width:'4rem',height:'4rem',borderRadius:'1.25rem',background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.75rem',fontWeight:700,cursor:'default'}}
              >{user?.name?.charAt(0).toUpperCase()}</motion.div>
              <div>
                <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'1.75rem',fontWeight:700}}>{user?.name}</h1>
                <p style={{color:'rgba(255,255,255,0.8)',textTransform:'capitalize',fontSize:'0.875rem'}}>{user?.role} · {user?.email}</p>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4" style={{paddingTop:'2.5rem',paddingBottom:'4rem',display:'flex',flexDirection:'column',gap:'1.25rem'}}>
        <FadeContent delay={0.1} direction="up">
          <GlowCard style={{padding:'2rem'}}>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'1.5rem'}}>Edit Profile</h2>

            {success && (
              <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}}
                style={{marginBottom:'1.25rem',padding:'1rem',borderRadius:'0.875rem',background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#15803d',fontSize:'0.875rem'}}>
                ✅ Profile updated successfully!
              </motion.div>
            )}
            {error && (
              <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
                style={{marginBottom:'1.25rem',padding:'1rem',borderRadius:'0.875rem',background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626',fontSize:'0.875rem'}}>
                ⚠️ {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.125rem'}}>
              <Input label="Full Name" value={form.name} onChange={set('name')} />
              <Input label="Email (cannot be changed)" value={user?.email||''} disabled className="opacity-60 cursor-not-allowed" />
              <Input label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
              {user?.role === 'charity' && (
                <Input label="Organization Name" value={form.organization} onChange={set('organization')} />
              )}
              <div style={{display:'flex',gap:'0.75rem',paddingTop:'0.5rem'}}>
                <motion.div style={{flex:1}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                  <Button type="submit" loading={loading} className="w-full">Save Changes</Button>
                </motion.div>
                <motion.div whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                  <Button variant="danger" onClick={logout} type="button">Sign Out</Button>
                </motion.div>
              </div>
            </form>
          </GlowCard>
        </FadeContent>

        <FadeContent delay={0.2} direction="up">
          <GlowCard style={{padding:'1.5rem'}}>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'#1c1917',marginBottom:'1rem'}}>Account Information</h3>
            <div>
              {[['Role',user?.role,'capitalize'],['Email',user?.email,undefined],['Member since',new Date(user?.createdAt||Date.now()).toLocaleDateString('en-US',{month:'long',year:'numeric'}),undefined]].map(([label,val,transform],i) => (
                <motion.div key={label}
                  initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.3+i*0.07}}
                  style={{display:'flex',justifyContent:'space-between',padding:'0.75rem 0',borderBottom:i<2?'1px solid #fafaf9':'none',fontSize:'0.875rem'}}>
                  <span style={{color:'#a8a29e'}}>{label}</span>
                  <span style={{fontWeight:600,color:'#1c1917',textTransform:transform}}>{val}</span>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </FadeContent>
      </div>
    </div>
  )
}

export default Profile

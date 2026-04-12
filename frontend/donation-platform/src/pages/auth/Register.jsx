import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateRegisterForm } from '../../utils/validators'

const HeartIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" style={{width:'1.5rem',height:'1.5rem'}}>
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
  </svg>
)

const ROLES = [
  { value:'donor',   label:'Donor',   desc:'I want to donate goods',           icon:'🎁' },
  { value:'charity', label:'Charity', desc:'We collect & distribute donations', icon:'🏛️' },
]

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name:'',email:'',password:'',role:'',phone:'',organization:'' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateRegisterForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setApiError(''); setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem',paddingTop:'6rem',paddingBottom:'3rem'}}>
      <motion.div
        initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}
        transition={{duration:0.5,ease:[0.25,0.1,0.25,1]}}
        style={{width:'100%',maxWidth:'32rem'}}
      >
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <motion.div whileHover={{scale:1.05}} style={{display:'inline-block',marginBottom:'1.25rem'}}>
            <Link to="/" style={{display:'flex',alignItems:'center',gap:'0.5rem',textDecoration:'none',justifyContent:'center'}}>
              <motion.div whileHover={{rotate:-10}} transition={{type:'spring',stiffness:400}}
                style={{width:'2.75rem',height:'2.75rem',borderRadius:'0.875rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
                <HeartIcon />
              </motion.div>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.6rem',fontWeight:700,color:'#1c1917'}}>
                Hope<span style={{color:'#f97316'}}>Link</span>
              </span>
            </Link>
          </motion.div>
          <motion.h2 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>
            Create your account
          </motion.h2>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}
            style={{color:'#78716c',fontSize:'0.95rem'}}>
            Already have one? <Link to="/login" style={{color:'#f97316',fontWeight:600,textDecoration:'none'}}>Sign in</Link>
          </motion.p>
        </div>

        {/* Card */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}}
          style={{background:'white',borderRadius:'1.5rem',boxShadow:'0 8px 40px rgba(0,0,0,0.09)',padding:'2rem'}}>

          {apiError && (
            <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
              style={{marginBottom:'1.25rem',padding:'1rem',borderRadius:'0.875rem',background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626',fontSize:'0.875rem'}}>
              ⚠️ {apiError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.125rem'}}>
            {/* Role picker */}
            <div>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:600,color:'#1c1917',marginBottom:'0.625rem'}}>I am a… *</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                {ROLES.map((r, i) => (
                  <motion.button
                    key={r.value} type="button"
                    whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                    onClick={() => setForm(f => ({ ...f, role:r.value }))}
                    style={{
                      display:'flex',alignItems:'flex-start',gap:'0.75rem',padding:'1rem',
                      borderRadius:'0.875rem',textAlign:'left',cursor:'pointer',transition:'border-color 0.2s, background 0.2s',
                      border: form.role === r.value ? '2px solid #f97316' : '2px solid #e7e5e4',
                      background: form.role === r.value ? '#fff7ed' : 'white',
                    }}
                  >
                    <motion.span animate={form.role === r.value ? {scale:[1,1.3,1]} : {scale:1}}
                      transition={{duration:0.3}} style={{fontSize:'1.5rem',marginTop:'0.125rem'}}>{r.icon}</motion.span>
                    <div>
                      <p style={{fontWeight:600,color:'#1c1917',fontSize:'0.875rem',marginBottom:'0.125rem'}}>{r.label}</p>
                      <p style={{fontSize:'0.75rem',color:'#78716c'}}>{r.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              {errors.role && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{marginTop:'0.375rem',fontSize:'0.875rem',color:'#ef4444'}}>{errors.role}</motion.p>}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <Input label="Full Name *" value={form.name} onChange={set('name')} error={errors.name} placeholder="Full Name" />
              <Input label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+213 000000000" />
            </div>
            <Input label="Email Address *" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="Youremail@gmail.com" />
            <Input label="Password *" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Min. 6 characters" hint="Use at least 6 characters" />

            <AnimatePresence>
              {form.role === 'charity' && (
                <>
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.3}}>
                    <Input label="Organization Name" value={form.organization} onChange={set('organization')} placeholder="Hope Foundation" />
                  </motion.div>
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.3}}>
                    <Input label="Registration Number *" value={form.registrationNumber} onChange={set('registrationNumber')} placeholder="123456" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <motion.div whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
              <Button type="submit" loading={loading} className="w-full" size="lg">Create Account →</Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register

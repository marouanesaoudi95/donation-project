import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateLoginForm } from '../../utils/validators'
import { BlurText, CountUp } from '../../components/animations'

const HeartIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" style={{width:'1.25rem',height:'1.25rem'}}>
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
  </svg>
)

const STATS = [['2,400','Donations'],['340','Charities'],['12K','Lives'],['98%','Satisfaction']]

const Login = () => {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm]       = useState({ email:'', password:'' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateLoginForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setApiError(''); setLoading(true)
    try {
      await login(form)
      navigate(from, { replace:true })
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#fef9f0'}}>

      {/* Left panel */}
      <div className="hidden lg:flex" style={{
        flex:1,position:'relative',overflow:'hidden',flexDirection:'column',justifyContent:'center',
        padding:'4rem',background:'linear-gradient(135deg,#f97316 0%,#ea6c10 55%,#c2570c 100%)'
      }}>
        {/* Animated bg elements */}
        {[
          {w:'20rem',h:'20rem',t:'-5rem',r:'-5rem',dur:8},
          {w:'12rem',h:'12rem',b:'-3rem',l:'-3rem',dur:10},
          {w:'8rem', h:'8rem', t:'40%',  l:'10%',  dur:7},
        ].map((b,i) => (
          <motion.div key={i}
            animate={{scale:[1,1.2,1],opacity:[0.4,0.7,0.4]}}
            transition={{duration:b.dur,repeat:Infinity,ease:'easeInOut',delay:i*1.5}}
            style={{position:'absolute',borderRadius:'50%',background:'rgba(255,255,255,0.07)',
              width:b.w,height:b.h,top:b.t,right:b.r,bottom:b.b,left:b.l}}
          />
        ))}

        <div style={{position:'relative',zIndex:1,color:'white'}}>
          {/* Logo */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'2.5rem'}}>
            <div style={{width:'3rem',height:'3rem',borderRadius:'0.875rem',background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <HeartIcon />
            </div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:700}}>HopeLink</span>
          </motion.div>

          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,lineHeight:1.2,marginBottom:'1.25rem'}}>
              Welcome Back<br />to HopeLink
            </h1>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1.05rem',lineHeight:1.7,maxWidth:'24rem',marginBottom:'3rem'}}>
              Every donation you make creates ripples of kindness that touch countless lives.
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.875rem'}}>
            {STATS.map(([val, label], i) => (
              <motion.div key={label}
                initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
                transition={{delay:0.3+i*0.08,type:'spring',stiffness:200}}
                whileHover={{scale:1.05,background:'rgba(255,255,255,0.25)'}}
                style={{background:'rgba(255,255,255,0.15)',backdropFilter:'blur(6px)',borderRadius:'1rem',padding:'1.1rem',border:'1px solid rgba(255,255,255,0.2)',cursor:'default'}}
              >
                <p style={{fontFamily:'Playfair Display,serif',fontSize:'1.6rem',fontWeight:700,marginBottom:'0.2rem'}}>{val}</p>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'0.8rem'}}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div style={{flex:1,maxWidth:'36rem',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
        <motion.div
          initial={{opacity:0,x:40}} animate={{opacity:1,x:0}}
          transition={{duration:0.5,ease:[0.25,0.1,0.25,1]}}
          style={{width:'100%',maxWidth:'26rem'}}
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden" style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'2.5rem',textDecoration:'none'}}>
            <div style={{width:'2rem',height:'2rem',borderRadius:'0.75rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
              <HeartIcon />
            </div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917'}}>
              Hope<span style={{color:'#f97316'}}>Link</span>
            </span>
          </Link>

          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,color:'#1c1917',marginBottom:'0.375rem'}}>Sign in</h2>
          <p style={{color:'#78716c',marginBottom:'2rem',fontSize:'0.95rem'}}>
            New here? <Link to="/register" style={{color:'#f97316',fontWeight:600,textDecoration:'none'}}>Create an account</Link>
          </p>

          {/* Error */}
          {apiError && (
            <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}}
              style={{marginBottom:'1.25rem',padding:'1rem',borderRadius:'0.875rem',background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626',fontSize:'0.875rem'}}>
              ⚠️ {apiError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.125rem'}}>
            <Input label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com"
              icon={<svg style={{width:'1rem',height:'1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
            <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="••••••••"
              icon={<svg style={{width:'1rem',height:'1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />
            <motion.div whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
              <Button type="submit" loading={loading} className="w-full" size="lg">Sign In →</Button>
            </motion.div>
          </form>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{marginTop:'1.5rem',padding:'1rem',borderRadius:'0.875rem',background:'#f5f5f4',fontSize:'0.8rem',color:'#78716c'}}>
            <p style={{fontWeight:600,color:'#1c1917',marginBottom:'0.375rem'}}>Demo accounts:</p>
            <p>Donor: donor@demo.com / password123</p>
            <p>Charity: charity@demo.com / password123</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login

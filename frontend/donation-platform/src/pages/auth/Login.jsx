import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateLoginForm } from '../../utils/validators'

const HeartIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" style={{width:'1.25rem',height:'1.25rem'}}>
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
  </svg>
)

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
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
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', background:'#fef9f0'}}>

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex" style={{
        flex:1,
        background:'linear-gradient(135deg, #f97316 0%, #ea6c10 50%, #c2570c 100%)',
        position:'relative', overflow:'hidden', flexDirection:'column', justifyContent:'center', padding:'4rem'
      }}>
        {/* Decorative circles */}
        <div style={{position:'absolute',bottom:'-5rem',right:'-5rem',width:'16rem',height:'16rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
        <div style={{position:'absolute',top:'-2.5rem',right:'-2.5rem',width:'10rem',height:'10rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
        <div style={{position:'absolute',top:'30%',left:'-3rem',width:'8rem',height:'8rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />

        <div style={{position:'relative', zIndex:10, color:'white'}}>
          {/* Logo mark */}
          <div style={{
            width:'3.5rem', height:'3.5rem', borderRadius:'1rem',
            background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'2rem'
          }}>
            <HeartIcon />
          </div>

          <h1 style={{fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:700, lineHeight:1.2, marginBottom:'1rem'}}>
            Welcome Back to<br />HopeLink
          </h1>
          <p style={{color:'rgba(255,255,255,0.8)', fontSize:'1.125rem', lineHeight:1.7, maxWidth:'22rem', marginBottom:'3rem'}}>
            Every donation you make creates ripples of kindness that touch countless lives.
          </p>

          {/* Stats grid */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            {[['2,400+','Donations'],['340+','Charities'],['12K+','Lives Impacted'],['98%','Satisfaction']].map(([v,l]) => (
              <div key={l} style={{
                background:'rgba(255,255,255,0.15)', backdropFilter:'blur(4px)',
                borderRadius:'1rem', padding:'1rem', border:'1px solid rgba(255,255,255,0.2)'
              }}>
                <p style={{fontFamily:'Playfair Display,serif', fontSize:'1.75rem', fontWeight:700, marginBottom:'0.25rem'}}>{v}</p>
                <p style={{color:'rgba(255,255,255,0.7)', fontSize:'0.875rem'}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{flex:1, maxWidth:'36rem', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem'}}>
        <div style={{width:'100%', maxWidth:'26rem', animation:'slideUp 0.4s ease-out both'}}>

          {/* Mobile logo */}
          <Link to="/" style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem', textDecoration:'none'}} className="lg:hidden">
            <div style={{width:'2rem',height:'2rem',borderRadius:'0.75rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
              <HeartIcon />
            </div>
            <span style={{fontFamily:'Playfair Display,serif', fontSize:'1.25rem', fontWeight:700, color:'#1c1917'}}>
              Hope<span style={{color:'#f97316'}}>Link</span>
            </span>
          </Link>

          <h2 style={{fontFamily:'Playfair Display,serif', fontSize:'2rem', fontWeight:700, color:'#1c1917', marginBottom:'0.25rem'}}>
            Sign in
          </h2>
          <p style={{color:'#78716c', marginBottom:'2rem', fontSize:'0.95rem'}}>
            New here?{' '}
            <Link to="/register" style={{color:'#f97316', fontWeight:600, textDecoration:'none'}}>
              Create an account
            </Link>
          </p>

          {/* API error */}
          {apiError && (
            <div style={{
              marginBottom:'1.25rem', padding:'1rem', borderRadius:'0.75rem',
              background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:'0.875rem'
            }}>
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              placeholder="you@example.com"
              icon={
                <svg style={{width:'1rem',height:'1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              placeholder="••••••••"
              icon={
                <svg style={{width:'1rem',height:'1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Demo hint */}
          <div style={{
            marginTop:'1.5rem', padding:'1rem', borderRadius:'0.75rem',
            background:'#f5f5f4', fontSize:'0.875rem', color:'#78716c'
          }}>
            <p style={{fontWeight:600, color:'#1c1917', marginBottom:'0.25rem'}}>Demo accounts:</p>
            <p>Donor: donor@demo.com / password123</p>
            <p>Charity: charity@demo.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

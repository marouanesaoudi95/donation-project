import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  { value: 'donor',   label: 'Donor',   desc: 'I want to donate goods',          icon: '🎁' },
  { value: 'charity', label: 'Charity', desc: 'We collect & distribute donations', icon: '🏛️' },
]

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'', phone:'', organization:'' })
  const [errors, setErrors] = useState({})
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
    <div style={{minHeight:'100vh', background:'#fef9f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', paddingTop:'6rem'}}>
      <div style={{width:'100%', maxWidth:'32rem', animation:'slideUp 0.4s ease-out both'}}>

        {/* Header */}
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <Link to="/" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', textDecoration:'none'}}>
            <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.75rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
              <HeartIcon />
            </div>
            <span style={{fontFamily:'Playfair Display,serif', fontSize:'1.5rem', fontWeight:700, color:'#1c1917'}}>
              Hope<span style={{color:'#f97316'}}>Link</span>
            </span>
          </Link>
          <h2 style={{fontFamily:'Playfair Display,serif', fontSize:'2rem', fontWeight:700, color:'#1c1917', marginBottom:'0.5rem'}}>
            Create your account
          </h2>
          <p style={{color:'#78716c', fontSize:'0.95rem'}}>
            Already have one?{' '}
            <Link to="/login" style={{color:'#f97316', fontWeight:600, textDecoration:'none'}}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Card */}
        <div style={{background:'white', borderRadius:'1.5rem', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', padding:'2rem'}}>

          {apiError && (
            <div style={{
              marginBottom:'1.25rem', padding:'1rem', borderRadius:'0.75rem',
              background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:'0.875rem'
            }}>
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>

            {/* Role picker */}
            <div>
              <label style={{display:'block', fontSize:'0.875rem', fontWeight:600, color:'#1c1917', marginBottom:'0.625rem'}}>
                I am a… *
              </label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                {ROLES.map(r => (
                  <button
                    type="button" key={r.value}
                    onClick={() => setForm(f => ({ ...f, role: r.value }))}
                    style={{
                      display:'flex', alignItems:'flex-start', gap:'0.75rem',
                      padding:'1rem', borderRadius:'0.75rem', textAlign:'left',
                      border: form.role === r.value ? '2px solid #f97316' : '2px solid #e7e5e4',
                      background: form.role === r.value ? '#fff7ed' : 'white',
                      cursor:'pointer', transition:'all 0.2s'
                    }}
                  >
                    <span style={{fontSize:'1.5rem', marginTop:'0.125rem'}}>{r.icon}</span>
                    <div>
                      <p style={{fontWeight:600, color:'#1c1917', fontSize:'0.875rem', marginBottom:'0.125rem'}}>{r.label}</p>
                      <p style={{fontSize:'0.75rem', color:'#78716c'}}>{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {errors.role && <p style={{marginTop:'0.375rem', fontSize:'0.875rem', color:'#ef4444'}}>{errors.role}</p>}
            </div>

            {/* Name + Phone */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <Input label="Full Name *" value={form.name} onChange={set('name')} error={errors.name} placeholder="Full Name" />
              <Input label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+213 00000000" />
            </div>

            <Input label="Email Address *" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="Youremail@gmail.com" />
            <Input label="Password *" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Min. 6 characters" hint="Use at least 6 characters" />

            {form.role === 'charity' && (
              <Input label="Organization Name" value={form.organization} onChange={set('organization')} placeholder="Hope Foundation" />
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateLoginForm } from '../../utils/validators'

const HeartIcon = ({ size = '1.25rem' }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: size, height: size }}>
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
  </svg>
)

const Particle = ({ style }) => (
  <motion.div
    animate={{ y: [-15, 15, -15], opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: style.dur, repeat: Infinity, ease: 'easeInOut', delay: style.delay }}
    style={{
      position: 'absolute', borderRadius: '50%',
      background: style.color, width: style.size, height: style.size,
      top: style.top, left: style.left, right: style.right, bottom: style.bottom,
      filter: 'blur(1px)', zIndex: 0
    }}
  />
)

const WORDS = ['kindness', 'hope', 'change', 'impact', 'love']

const CyclingWord = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ position: 'relative', display: 'inline-block', minWidth: '8rem' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ color: '#c2410c', display: 'inline-block' }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

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

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    
    // Validation structure requested by user
    if (!form.email.trim() || !form.password.trim()) {
      alert("All fields are required!");
      return;
    }

    setErrors({});
    setApiError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // Map data to expected context format if necessary, or just call login
        await login(data); // Assuming login handles token storage as before
        navigate('/');
      } else {
        const msg = data.msg || 'Invalid credentials. Please try again.';
        setApiError(msg);
        alert(msg);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setApiError(error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  const particles = [
    { size: '8px',  color: '#ea580c', top: '15%', left: '15%',  dur: 4,   delay: 0   },
    { size: '5px',  color: '#f97316', top: '45%', left: '80%',  dur: 5,   delay: 1   },
    { size: '10px', color: '#fb923c', top: '75%', left: '25%',  dur: 6,   delay: 0.5 },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ═══ GAUCHE — Panneau Orange Foncé Soft ═══ */}
      <div className="hidden lg:flex" style={{
        flex: 1.2, position: 'relative', overflow: 'hidden',
        background: '#ffedd5', // Orange ambré foncé
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: '4rem',
        borderRight: '1px solid #fed7aa'
      }}>
        
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {particles.map((p, i) => <Particle key={i} style={p} />)}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p style={{ color: '#c2410c', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Welcome back
            </p>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.8rem, 4.5vw, 3.8rem)',
              fontWeight: 900, lineHeight: 1.1, color: '#431407',
              marginBottom: '1.5rem',
            }}>
              Every act of<br />
              <CyclingWord /><br />
              <span style={{ color: 'rgba(67, 20, 7, 0.35)' }}>matters.</span>
            </h1>
            <p style={{ color: '#431407', opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '26rem' }}>
              Sign in to your HopeLink account and continue making a difference — one donation at a time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══ DROITE — Formulaire avec Logo au-dessus ═══ */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#fff' }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%', maxWidth: '26rem' }}>
          
          {/* LOGO CLIQUABLE — Juste au-dessus de "Sign in" */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem', width: 'fit-content' }}>
            <div style={{
              width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem',
              background: '#f97316', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white'
            }}>
              <HeartIcon size="1.1rem" />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 800, color: '#1c1917' }}>
              Hope<span style={{ color: '#ea580c' }}>Link</span>
            </span>
          </Link>

          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
            Sign in
          </h2>
          <p style={{ color: '#78716c', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            New here?{' '}
            <Link to="/register" style={{ color: '#ea580c', fontWeight: 700, textDecoration: 'none' }}>
              Create an account
            </Link>
          </p>

          {apiError && (
            <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.9rem' }}>
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Input label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
            <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="••••••••" />
            <Button type="submit" loading={loading} style={{ background: '#ea580c', padding: '1rem', fontSize: '1.1rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(234,88,12,0.2)' }}>
              Sign In →
            </Button>
          </form>

          <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '1.25rem', background: '#fff7ed', border: '1px solid #fed7aa', fontSize: '0.9rem' }}>
            <p style={{ fontWeight: 800, color: '#9a3412', marginBottom: '0.5rem' }}>DEMO CREDENTIALS:</p>
            <p style={{ color: '#7c2d12', opacity: 0.8 }}>Donor: donor@demo.com / password123</p>
            <p style={{ color: '#7c2d12', opacity: 0.8 }}>Charity: charity@demo.com / password123</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
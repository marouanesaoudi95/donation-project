import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Building2, Heart } from 'lucide-react' // Import des icônes Lucide
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateRegisterForm } from '../../utils/validators'

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

const ROLES = [
  { value: 'donor',   label: 'Donor',   icon: <Gift size={24} /> },
  { value: 'charity', label: 'Charity', icon: <Building2 size={24} /> },
]

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', phone: '', organization: '', registrationNumber: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();

    // Validation structure requested by user
    if (!form.role) {
      alert("Please select a role!");
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.phone.trim()) {
      alert("All fields are required!");
      return;
    }

    setErrors({});
    setApiError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password.trim(),
          phone: form.phone.trim(),
          role: form.role,
          organization: form.organization.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        // Following requested structure
        if (data.user) {
          localStorage.setItem('userId', data.user.id);
        }
        navigate('/');
      } else {
        const msg = data.msg || 'Registration failed.';
        setApiError(msg);
        alert(msg);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setApiError(error.message);
      console.error('Registration error:', error);
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
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif', background: '#fff' }}>

      {/* ═══ GAUCHE — Formulaire ═══ */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%', maxWidth: '28rem' }}>
          
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem', width: 'fit-content' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Heart size={20} fill="white" />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 800, color: '#1c1917' }}>
              Hope<span style={{ color: '#ea580c' }}>Link</span>
            </span>
          </Link>

          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>Create account</h2>
          <p style={{ color: '#78716c', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Already have one? <Link to="/login" style={{ color: '#ea580c', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>

          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {ROLES.map((r) => (
                <button key={r.value} type="button" onClick={() => setForm(f => ({ ...f, role: r.value }))}
                  style={{
                    padding: '1rem', borderRadius: '1rem', textAlign: 'left', cursor: 'pointer', transition: '0.2s',
                    border: form.role === r.value ? '2px solid #ea580c' : '2px solid #f5f5f4',
                    background: form.role === r.value ? '#fff7ed' : 'white',
                    color: form.role === r.value ? '#ea580c' : '#78716c'
                  }}>
                  <div style={{ marginBottom: '0.5rem' }}>{r.icon}</div>
                  <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.9rem' }}>{r.label}</div>
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Full Name" value={form.name} onChange={set('name')} error={errors.name} placeholder="Full Name" />
              <Input label="Phone" value={form.phone} onChange={set('phone')} placeholder="+213..." />
            </div>
            
            <Input label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
            <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Min. 6 characters" />

            <AnimatePresence mode="wait">
              {form.role === 'charity' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Input label="Organization Name" value={form.organization} onChange={set('organization')} placeholder="Hope Foundation" />
                  <Input label="Registration Number" value={form.registrationNumber} onChange={set('registrationNumber')} placeholder="REQ-12345" />
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" loading={loading} style={{ background: '#ea580c', padding: '1rem', fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(234,88,12,0.2)' }}>
              Create Account →
            </Button>
          </form>
        </motion.div>
      </div>

      {/* ═══ DROITE — Panneau Beige Ambré ═══ */}
      <div className="hidden lg:flex" style={{
        flex: 1.2, position: 'relative', overflow: 'hidden',
        background: '#ffedd5',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: '4rem',
        borderLeft: '1px solid #fed7aa'
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
              Join the community
            </p>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.8rem, 4.5vw, 3.8rem)',
              fontWeight: 900, lineHeight: 1.1, color: '#431407',
              marginBottom: '1.5rem',
            }}>
              Be part of<br />
              something<br />
              <span style={{ color: '#c2410c' }}>bigger.</span>
            </h1>
            <p style={{ color: '#431407', opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '26rem' }}>
              Thousands of donors and charities trust HopeLink to make every act of generosity count.
            </p>
          </motion.div>
        </div>
      </div>

    </div>
  )
}

export default Register
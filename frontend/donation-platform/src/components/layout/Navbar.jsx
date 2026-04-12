import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, isAuthenticated, isDonor, isCharity, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const [prevPath, setPrevPath]  = useState(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (location.pathname !== prevPath) {
      setMenuOpen(false)
      setPrevPath(location.pathname)
    }
  }, [location.pathname])

  const handleLogout = () => { logout(); navigate('/') }

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/posts', label: 'Donations' },
    { to: '/about', label: 'About' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ...(isCharity ? [{ to: '/claims', label: 'My Claims' }] : []),
    ...(isAdmin   ? [{ to: '/admin',  label: 'Admin' }]    : []),
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:40,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', height:'4rem'}}>

          {/* ── Logo ── */}
          <Link to="/" style={{display:'flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type:'spring', stiffness:400, damping:15 }}
              style={{width:'2rem',height:'2rem',borderRadius:'0.75rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white',flexShrink:0}}
            >
              <svg style={{width:'1.1rem',height:'1.1rem'}} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </motion.div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917'}}>
              Hope<span style={{color:'#f97316'}}>Link</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex" style={{alignItems:'center',gap:'0.25rem'}}>
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.end}
                style={({isActive}) => ({
                  position:'relative', padding:'0.375rem 0.875rem', borderRadius:'0.625rem',
                  fontSize:'0.875rem', fontWeight:500, textDecoration:'none',
                  color: isActive ? '#f97316' : '#44403c',
                  transition:'color 0.2s',
                })}
              >
                {({isActive}) => (
                  <>
                    {link.label}
                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        style={{
                          position:'absolute', bottom:0, left:'0.875rem', right:'0.875rem',
                          height:'2px', borderRadius:'999px', background:'#f97316',
                        }}
                        transition={{ type:'spring', stiffness:380, damping:30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Auth ── */}
          <div className="hidden md:flex" style={{alignItems:'center',gap:'0.75rem'}}>
            {isAuthenticated ? (
              <>
                <Link to="/profile" style={{display:'flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    style={{width:'2rem',height:'2rem',borderRadius:'50%',background:'#ffedd5',display:'flex',alignItems:'center',justifyContent:'center',color:'#ea6c10',fontWeight:700,fontSize:'0.875rem'}}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </motion.div>
                  <span style={{fontSize:'0.875rem',fontWeight:500,color:'#1c1917'}}>{user?.name?.split(' ')[0]}</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="btn-outline"
                  style={{padding:'0.5rem 1rem',fontSize:'0.8rem'}}
                >Sign Out</motion.button>
              </>
            ) : (
              <>
                <Link to="/login" style={{fontSize:'0.875rem',fontWeight:500,color:'#44403c',textDecoration:'none'}}>Sign In</Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className="btn-primary" style={{padding:'0.625rem 1.25rem',fontSize:'0.875rem',textDecoration:'none'}}>Get Started</Link>
                </motion.div>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{display:'flex',flexDirection:'column',gap:'5px',padding:'0.5rem',border:'none',background:'none',cursor:'pointer'}}
            className="md:hidden"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{display:'block',width:'20px',height:'2px',background:'#1c1917',borderRadius:'2px',transformOrigin:'center'}}
              transition={{ duration: 0.25 }}
            />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              style={{display:'block',width:'20px',height:'2px',background:'#1c1917',borderRadius:'2px'}}
              transition={{ duration: 0.2 }}
            />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{display:'block',width:'20px',height:'2px',background:'#1c1917',borderRadius:'2px',transformOrigin:'center'}}
              transition={{ duration: 0.25 }}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden', borderTop: '1px solid #f5f5f4' }}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '1rem 1.5rem 1.5rem', display:'flex', flexDirection:'column', gap:'0.25rem' }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <NavLink to={link.to} end={link.end}
                    onClick={() => setMenuOpen(false)}
                    style={({isActive}) => ({
                      display:'block', padding:'0.625rem 0.75rem', borderRadius:'0.5rem',
                      fontSize:'0.9rem', fontWeight:500, textDecoration:'none',
                      color: isActive ? '#f97316' : '#44403c',
                      background: isActive ? '#fff7ed' : 'transparent',
                    })}
                  >{link.label}</NavLink>
                </motion.div>
              ))}

              <div style={{borderTop:'1px solid #f5f5f4',paddingTop:'0.75rem',marginTop:'0.5rem',display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                {isAuthenticated ? (
                  <motion.button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    className="btn-outline"
                    style={{textAlign:'center'}}
                    whileTap={{ scale: 0.97 }}
                  >Sign Out</motion.button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline" style={{textAlign:'center',textDecoration:'none'}}>Sign In</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{textAlign:'center',textDecoration:'none'}}>Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

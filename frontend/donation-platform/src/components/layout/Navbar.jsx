import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, isAuthenticated, isDonor, isCharity, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  const linkStyle = (isActive) => ({
    fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none',
    color: isActive ? '#f97316' : '#1c1917',
    transition: 'color 0.2s',
  })

  const navStyle = {
    position:'fixed', top:0, left:0, right:0, zIndex:40,
    transition: 'all 0.3s',
    background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
  }

  return (
    <nav style={navStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'4rem'}}>

          {/* Logo */}
          <Link to="/" style={{display:'flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
            <div style={{width:'2rem',height:'2rem',borderRadius:'0.75rem',background:'#f97316',display:'flex',alignItems:'center',justifyContent:'center',color:'white',flexShrink:0}}>
              <svg style={{width:'1.1rem',height:'1.1rem'}} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'#1c1917'}}>
              Hope<span style={{color:'#f97316'}}>Link</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{alignItems:'center',gap:'2rem'}}>
            <NavLink to="/" end style={({isActive}) => linkStyle(isActive)}>Home</NavLink>
            <NavLink to="/posts" style={({isActive}) => linkStyle(isActive)}>Donations</NavLink>
            <NavLink to="/about" style={({isActive}) => linkStyle(isActive)}>About</NavLink>
            {isAuthenticated && <NavLink to="/dashboard" style={({isActive}) => linkStyle(isActive)}>Dashboard</NavLink>}
            {isCharity && <NavLink to="/claims" style={({isActive}) => linkStyle(isActive)}>My Claims</NavLink>}
            {isAdmin && <NavLink to="/admin" style={({isActive}) => linkStyle(isActive)}>Admin</NavLink>}
          </div>

          {/* Auth */}
          <div className="hidden md:flex" style={{alignItems:'center',gap:'0.75rem'}}>
            {isAuthenticated ? (
              <>
                <Link to="/profile" style={{display:'flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
                  <div style={{width:'2rem',height:'2rem',borderRadius:'50%',background:'#ffedd5',display:'flex',alignItems:'center',justifyContent:'center',color:'#ea6c10',fontWeight:700,fontSize:'0.875rem'}}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{fontSize:'0.875rem',fontWeight:500,color:'#1c1917'}}>{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn-outline" style={{padding:'0.5rem 1rem',fontSize:'0.8rem'}}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{fontSize:'0.875rem',fontWeight:500,color:'#1c1917',textDecoration:'none'}}>Sign In</Link>
                <Link to="/register" className="btn-primary" style={{padding:'0.625rem 1.25rem',fontSize:'0.875rem'}}>Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{display:'flex',flexDirection:'column',gap:'5px',padding:'0.5rem',border:'none',background:'none',cursor:'pointer'}} className="md:hidden">
            <span style={{display:'block',width:'20px',height:'2px',background:'#1c1917',transition:'all 0.3s',transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none'}} />
            <span style={{display:'block',width:'20px',height:'2px',background:'#1c1917',transition:'all 0.3s',opacity: menuOpen ? 0 : 1}} />
            <span style={{display:'block',width:'20px',height:'2px',background:'#1c1917',transition:'all 0.3s',transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none'}} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{borderTop:'1px solid #f5f5f4',padding:'1rem 0',animation:'slideUp 0.25s ease-out'}} className="md:hidden">
            <div style={{display:'flex',flexDirection:'column',gap:'0.25rem'}}>
              {[
                {to:'/',label:'Home',end:true},
                {to:'/posts',label:'Donations'},
                {to:'/about',label:'About'},
                ...(isAuthenticated ? [{to:'/dashboard',label:'Dashboard'}] : []),
                ...(isCharity ? [{to:'/claims',label:'My Claims'}] : []),
                ...(isAdmin ? [{to:'/admin',label:'Admin'}] : []),
              ].map(item => (
                <NavLink key={item.to} to={item.to} end={item.end}
                  onClick={() => setMenuOpen(false)}
                  style={({isActive}) => ({...linkStyle(isActive),padding:'0.625rem 0.5rem',display:'block'})}
                >{item.label}</NavLink>
              ))}
              <div style={{borderTop:'1px solid #f5f5f4',paddingTop:'0.75rem',marginTop:'0.25rem',display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="btn-outline" style={{textAlign:'center'}}>Sign Out</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline" style={{textAlign:'center',textDecoration:'none'}}>Sign In</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{textAlign:'center',textDecoration:'none'}}>Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

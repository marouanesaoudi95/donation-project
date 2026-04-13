import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
import { PageSpinner } from './components/common/Spinner'
import PageTransition from './components/animations/PageTransition'
import ScrollToTop from './components/animations/ScrollToTop'

import HomePage      from './pages/HomePage'
import About         from './pages/About'
import Login         from './pages/auth/Login'
import Register      from './pages/auth/Register'
import PostsList     from './pages/posts/PostsList'
import PostDetail    from './pages/posts/PostDetail'
import CreatePost    from './pages/posts/CreatePost'
import EditPost      from './pages/posts/EditPost'
import Dashboard     from './pages/dashboard/Dashboard'
import Profile       from './pages/profile/Profile'
import ClaimsHistory from './pages/claims/ClaimsHistory'
import AdminPanel    from './pages/admin/AdminPanel'

const Layout = ({ children, noFooter = false }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh', paddingTop: '4rem' }}>{children}</main>
    {!noFooter && <Footer />}
  </>
)

const NotFound = () => (
  <Layout>
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fef9f0'}}>
      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'5rem',marginBottom:'1.5rem'}}>🔍</p>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'3rem',fontWeight:700,color:'#1c1917',marginBottom:'0.75rem'}}>404</h1>
        <p style={{color:'#78716c',fontSize:'1.25rem',marginBottom:'2rem'}}>This page doesn't exist.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  </Layout>
)

/* AnimatePresence needs the location key — must be inside Router */
const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <>
    <ScrollToTop />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={
          <Layout><PageTransition><HomePage /></PageTransition></Layout>
        } />
        <Route path="/about" element={
          <Layout><PageTransition><About /></PageTransition></Layout>
        } />
        <Route path="/login"    element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/posts" element={
          <Layout><PageTransition><PostsList /></PageTransition></Layout>
        } />

        {/* /posts/create MUST be before /posts/:id */}
        <Route path="/posts/create" element={
          <ProtectedRoute roles={['donor','admin']}>
            <Layout><PageTransition><CreatePost /></PageTransition></Layout>
          </ProtectedRoute>
        } />
        <Route path="/posts/:id/edit" element={
          <ProtectedRoute roles={['donor','admin']}>
            <Layout><PageTransition><EditPost /></PageTransition></Layout>
          </ProtectedRoute>
        } />
        <Route path="/posts/:id" element={
          <Layout><PageTransition><PostDetail /></PageTransition></Layout>
        } />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><PageTransition><Dashboard /></PageTransition></Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><PageTransition><Profile /></PageTransition></Layout>
          </ProtectedRoute>
        } />
        <Route path="/claims" element={
          <ProtectedRoute roles={['charity','admin']}>
            <Layout><PageTransition><ClaimsHistory /></PageTransition></Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <Layout><PageTransition><AdminPanel /></PageTransition></Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageSpinner />}>
          <AnimatedRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

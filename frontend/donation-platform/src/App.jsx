import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
import { PageSpinner } from './components/common/Spinner'

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
    <main>{children}</main>
    {!noFooter && <Footer />}
  </>
)

const NotFound = () => (
  <Layout>
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fef9f0'}}>
      <div style={{textAlign:'center',animation:'slideUp 0.4s ease-out both'}}>
        <p style={{fontSize:'5rem',marginBottom:'1.5rem'}}>🔍</p>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'3rem',fontWeight:700,color:'#1c1917',marginBottom:'0.75rem'}}>404</h1>
        <p style={{color:'#78716c',fontSize:'1.25rem',marginBottom:'2rem'}}>This page doesn't exist.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  </Layout>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            {/* Public */}
            <Route path="/"        element={<Layout><HomePage /></Layout>} />
            <Route path="/about"   element={<Layout><About /></Layout>} />
            <Route path="/login"   element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts"   element={<Layout><PostsList /></Layout>} />

            {/* /posts/create MUST come before /posts/:id */}
            <Route path="/posts/create" element={
              <ProtectedRoute roles={['donor','admin']}>
                <Layout><CreatePost /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/posts/:id/edit" element={
              <ProtectedRoute roles={['donor','admin']}>
                <Layout><EditPost /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/posts/:id" element={<Layout><PostDetail /></Layout>} />

            {/* Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/claims" element={
              <ProtectedRoute roles={['charity','admin']}>
                <Layout><ClaimsHistory /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <Layout><AdminPanel /></Layout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

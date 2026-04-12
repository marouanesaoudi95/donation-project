import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import PostCard from '../../components/posts/PostCard'
import { DONATION_TYPES } from '../../utils/constants'
import { FadeContent, ScrollReveal, BlurText } from '../../components/animations'

const PostsList = () => {
  const { posts, loading, fetchPosts } = usePosts()
  const [searchParams] = useSearchParams()
  const [search,      setSearch]      = useState('')
  const [typeFilter,  setTypeFilter]  = useState(searchParams.get('type') || '')
  const [statusFilter,setStatusFilter]= useState('available')

  const load = useCallback(() => {
    const params = {}
    if (typeFilter)    params.donationType = typeFilter
    if (statusFilter)  params.status = statusFilter
    if (search.trim()) params.search = search.trim()
    fetchPosts(params)
  }, [typeFilter, statusFilter, search, fetchPosts])

  useEffect(() => { load() }, [load])

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(to right,#f97316,#fb923c)',padding:'3.5rem 0',position:'relative',overflow:'hidden'}}>
        <motion.div animate={{x:[-20,20,-20]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
          style={{position:'absolute',top:'-3rem',right:'-3rem',width:'16rem',height:'16rem',borderRadius:'50%',background:'rgba(255,255,255,0.07)'}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{textAlign:'center',color:'white',position:'relative',zIndex:1}}>
          <FadeContent direction="up">
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2rem,5vw,3rem)',fontWeight:700,marginBottom:'0.5rem'}}>
              <BlurText text="Browse Donations" />
            </h1>
            <p style={{color:'rgba(255,255,255,0.85)',fontSize:'1.1rem'}}>Find items your community needs most</p>
          </FadeContent>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'2.5rem',paddingBottom:'4rem'}}>
        {/* Filters */}
        <FadeContent direction="up" delay={0.1}>
          <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'1.25rem',marginBottom:'2rem'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                <div style={{position:'relative',flex:1,minWidth:'200px'}}>
                  <svg style={{position:'absolute',left:'0.875rem',top:'50%',transform:'translateY(-50%)',width:'1rem',height:'1rem',color:'#a8a29e'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input className="input-field" style={{paddingLeft:'2.5rem'}}
                    placeholder="Search donations…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="input-field" style={{width:'auto',minWidth:'140px'}}
                  value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
                {[{value:'',label:'All Types',icon:'🔍'}, ...DONATION_TYPES].map(t => (
                  <motion.button key={t.value || 'all'}
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => setTypeFilter(typeFilter === t.value ? '' : t.value)}
                    style={{
                      display:'inline-flex',alignItems:'center',gap:'0.375rem',
                      padding:'0.375rem 0.875rem',borderRadius:'9999px',border:'none',cursor:'pointer',
                      fontSize:'0.8rem',fontWeight:600,transition:'background 0.2s,color 0.2s',
                      background: typeFilter === t.value ? '#f97316' : '#f5f5f4',
                      color: typeFilter === t.value ? 'white' : '#78716c',
                    }}
                  >{t.icon} {t.label || 'All Types'}</motion.button>
                ))}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Results */}
        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.5rem'}}>
            {[...Array(6)].map((_,i) => (
              <motion.div key={i} animate={{opacity:[0.5,1,0.5]}} transition={{duration:1.5,repeat:Infinity,delay:i*0.1}}
                style={{background:'white',borderRadius:'1rem',height:'280px',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <FadeContent direction="up">
            <div style={{textAlign:'center',padding:'5rem 0'}}>
              <motion.p animate={{y:[0,-8,0]}} transition={{duration:2,repeat:Infinity}}
                style={{fontSize:'4rem',marginBottom:'1rem'}}>📭</motion.p>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>No donations found</h3>
              <p style={{color:'#78716c'}}>Try adjusting your filters or check back later.</p>
            </div>
          </FadeContent>
        ) : (
          <>
            <FadeContent direction="none">
              <p style={{color:'#78716c',fontSize:'0.875rem',marginBottom:'1.25rem'}}>
                {posts.length} donation{posts.length !== 1 ? 's' : ''} found
              </p>
            </FadeContent>
            <ScrollReveal stagger={0.07} direction="up">
              {posts.map(post => <PostCard key={post._id} post={post} />)}
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  )
}

export default PostsList

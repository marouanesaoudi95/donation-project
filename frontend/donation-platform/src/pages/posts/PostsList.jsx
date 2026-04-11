import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePosts } from '../../hooks/usePosts'
import PostCard from '../../components/posts/PostCard'
import { DONATION_TYPES } from '../../utils/constants'

const PostsList = () => {
  const { posts, loading, fetchPosts } = usePosts()
  const [searchParams] = useSearchParams()
  const [search,  setSearch]  = useState('')
  const [typeFilter,   setTypeFilter]   = useState(searchParams.get('type') || '')
  const [statusFilter, setStatusFilter] = useState('available')

  const load = useCallback(() => {
    const params = {}
    if (typeFilter)      params.donationType = typeFilter
    if (statusFilter)    params.status = statusFilter
    if (search.trim())   params.search = search.trim()
    fetchPosts(params)
  }, [typeFilter, statusFilter, search, fetchPosts])

  useEffect(() => { load() }, [load])

  return (
    <div className="min-h-screen pt-16" style={{background:'#fef9f0'}}>
      {/* Banner */}
      <div style={{background:'linear-gradient(to right, #f97316, #fb923c)', padding:'3.5rem 0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2.75rem',fontWeight:700,marginBottom:'0.5rem'}}>
            Browse Donations
          </h1>
          <p style={{color:'rgba(255,255,255,0.85)',fontSize:'1.125rem'}}>Find items your community needs most</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="card p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:'#78716c'}}
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="input-field pl-10"
                placeholder="Search donations…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Status */}
            <select className="input-field" style={{width:'auto',minWidth:'140px'}}
              value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Type filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setTypeFilter('')}
              className="badge cursor-pointer transition-all"
              style={{
                background: !typeFilter ? '#f97316' : '#f5f5f4',
                color: !typeFilter ? 'white' : '#78716c',
                padding:'0.375rem 1rem', fontSize:'0.8rem'
              }}
            >All Types</button>
            {DONATION_TYPES.map(t => (
              <button key={t.value}
                onClick={() => setTypeFilter(typeFilter === t.value ? '' : t.value)}
                className="badge cursor-pointer transition-all"
                style={{
                  background: typeFilter === t.value ? '#f97316' : '#f5f5f4',
                  color: typeFilter === t.value ? 'white' : '#78716c',
                  padding:'0.375rem 1rem', fontSize:'0.8rem'
                }}
              >{t.icon} {t.label}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => (
              <div key={i} className="card p-5" style={{animation:'pulse 2s infinite'}}>
                <div style={{height:'4px',background:'#e7e5e4',borderRadius:'2px',marginBottom:'1rem'}} />
                <div style={{height:'20px',background:'#f5f5f4',borderRadius:'4px',width:'50%',marginBottom:'0.75rem'}} />
                <div style={{height:'12px',background:'#fafaf9',borderRadius:'4px',marginBottom:'0.5rem'}} />
                <div style={{height:'12px',background:'#fafaf9',borderRadius:'4px',width:'75%'}} />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p style={{fontSize:'4rem',marginBottom:'1rem'}}>📭</p>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>
              No donations found
            </h3>
            <p style={{color:'#78716c'}}>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <>
            <p style={{color:'#78716c',fontSize:'0.875rem',marginBottom:'1.25rem'}}>
              {posts.length} donation{posts.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => <PostCard key={post._id} post={post} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostsList

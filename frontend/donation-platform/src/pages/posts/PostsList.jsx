import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  Utensils,
  Shirt,
  Gamepad2,
  Cpu,
  BookOpen,
  Package2,
} from 'lucide-react'
import { usePosts } from '../../hooks/usePosts'
import PostCard from '../../components/posts/PostCard'
import { DONATION_TYPES } from '../../utils/constants'
import { FadeContent, ScrollReveal } from '../../components/animations'

// Map iconName (string) → composant Lucide React
const LUCIDE_ICONS = {
  Utensils,
  Shirt,
  Gamepad2,
  Cpu,
  BookOpen,
  Package2,
}

// Helper : rendu d'une icône par nom
const DonationIcon = ({ iconName, size = 14 }) => {
  const Icon = LUCIDE_ICONS[iconName]
  return Icon ? <Icon size={size} /> : null
}

const PostsList = () => {
  const { posts, loading, fetchPosts } = usePosts()
  const [searchParams] = useSearchParams()
  const [search,       setSearch]       = useState('')
  const [typeFilter,   setTypeFilter]   = useState(searchParams.get('type') || '')
  const [statusFilter, setStatusFilter] = useState('available')

  const load = useCallback(() => {
    const p = {}
    if (typeFilter)    p.donationType = typeFilter
    if (statusFilter)  p.status       = statusFilter
    if (search.trim()) p.search       = search.trim()
    fetchPosts(p)
  }, [typeFilter, statusFilter, search, fetchPosts])

  useEffect(() => { load() }, [load])

  return (
    <div style={{ minHeight: '100vh', background: '#fef9f0', paddingTop: '4rem' }}>

      {/* ── Dark Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg,#1c1917 0%,#292524 60%,#1c1917 100%)',
        padding: '6rem 1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-5rem', right: '-5rem', width: '24rem', height: '24rem', borderRadius: '50%', background: 'rgba(249,115,22,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-3rem', left: '5%', width: '16rem', height: '16rem', borderRadius: '50%', background: 'rgba(249,115,22,0.06)' }} />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '12%', width: '10rem', height: '10rem', borderRadius: '50%', background: '#f97316', pointerEvents: 'none' }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '48rem', margin: '0 auto' }}>
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fb923c', marginBottom: '1rem' }}
          >
            Donations
          </motion.span>

          {/* Titre mot par mot */}
          <div style={{ marginBottom: '1.25rem' }}>
            {['Browse', 'Donations'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Playfair Display,serif',
                  fontSize: 'clamp(2.5rem,6vw,4rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginRight: '0.35em',
                  color: i === 1 ? '#f97316' : 'white',
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Trait animé */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            style={{ height: '3px', width: '5rem', background: 'rgba(249,115,22,0.6)', borderRadius: '9999px', margin: '0 auto 1.25rem', transformOrigin: 'left' }}
          />

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', lineHeight: 1.7 }}
          >
            Find items your community needs most
          </motion.p>
        </div>

        {/* Vague */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fef9f0" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

        {/* ── Filters ── */}
        <FadeContent direction="up" delay={0.1}>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', padding: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Search + Status */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                  <svg
                    style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#a8a29e' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Search donations…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="input-field"
                  style={{ width: 'auto', minWidth: '140px' }}
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* ── Type pills avec icônes Lucide ── */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

                {/* Pill "All Types" */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTypeFilter('')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.375rem 0.875rem', borderRadius: '9999px', border: 'none',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                    transition: 'background 0.2s,color 0.2s',
                    background: typeFilter === '' ? '#f97316' : '#f5f5f4',
                    color:      typeFilter === '' ? 'white'   : '#78716c',
                  }}
                >
                  <LayoutGrid size={14} />
                  All Types
                </motion.button>

                {/* Pills par type */}
                {DONATION_TYPES.map(t => (
                  <motion.button
                    key={t.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTypeFilter(typeFilter === t.value ? '' : t.value)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.375rem 0.875rem', borderRadius: '9999px', border: 'none',
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                      transition: 'background 0.2s,color 0.2s',
                      background: typeFilter === t.value ? '#f97316' : '#f5f5f4',
                      color:      typeFilter === t.value ? 'white'   : '#78716c',
                    }}
                  >
                    <DonationIcon iconName={t.iconName} size={14} />
                    {t.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* ── Results ── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: '1rem', height: '280px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <FadeContent direction="up">
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#d6d3d1' }}
              >
                <Package2 size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>
                No donations found
              </h3>
              <p style={{ color: '#78716c' }}>Try adjusting your filters or check back later.</p>
            </div>
          </FadeContent>
        ) : (
          <>
            <FadeContent direction="none">
              <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { useClaims } from '../../hooks/useClaims'
import PostCard from '../../components/posts/PostCard'
import { formatDate, getDonationTypeInfo, getProgressPercent } from '../../utils/formatters'
import { DONATION_TYPES } from '../../utils/constants'

/* ── tiny helpers ─────────────────────────────────────────── */
const StatCard = ({ icon, label, value, bg, sub }) => (
  <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'1.5rem',display:'flex',alignItems:'center',gap:'1rem'}}>
    <div style={{width:'3.5rem',height:'3.5rem',borderRadius:'1rem',background:bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0}}>
      {icon}
    </div>
    <div>
      <p style={{fontFamily:'Playfair Display,serif',fontSize:'1.75rem',fontWeight:700,color:'#1c1917',lineHeight:1}}>{value}</p>
      <p style={{fontSize:'0.8rem',color:'#78716c',marginTop:'0.2rem'}}>{label}</p>
      {sub && <p style={{fontSize:'0.75rem',color:'#a8a29e',marginTop:'0.1rem'}}>{sub}</p>}
    </div>
  </div>
)

const SectionTitle = ({ children, action }) => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
    <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'#1c1917'}}>{children}</h2>
    {action}
  </div>
)

const EmptyState = ({ icon, title, desc, to, cta }) => (
  <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'4rem',textAlign:'center'}}>
    <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>{icon}</div>
    <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',marginBottom:'0.5rem'}}>{title}</h3>
    <p style={{color:'#78716c',marginBottom:'1.5rem',fontSize:'0.95rem'}}>{desc}</p>
    <Link to={to} className="btn-primary">{cta}</Link>
  </div>
)

/* ── Post detail panel (slide-in) ─────────────────────────── */
const PostDetailPanel = ({ post, onClose, onEdit, onDelete }) => {
  if (!post) return null
  const progress = getProgressPercent(post.remainingQty, post.quantity)
  const TYPE_GRAD = {
    food:'linear-gradient(to right,#4ade80,#10b981)',
    clothes:'linear-gradient(to right,#60a5fa,#6366f1)',
    toys:'linear-gradient(to right,#fbbf24,#f97316)',
    electronics:'linear-gradient(to right,#a78bfa,#8b5cf6)',
    books:'linear-gradient(to right,#2dd4bf,#06b6d4)',
    other:'linear-gradient(to right,#a8a29e,#78716c)',
  }
  const grad = TYPE_GRAD[post.donationType] || TYPE_GRAD.other
  const typeInfo = getDonationTypeInfo(post.donationType)
  const isCompleted = post.status === 'completed'

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:40,animation:'fadeIn 0.2s ease-out'}} />
      {/* Panel */}
      <div style={{
        position:'fixed',top:0,right:0,bottom:0,width:'min(480px,100vw)',
        background:'white',zIndex:50,overflowY:'auto',
        boxShadow:'-8px 0 40px rgba(0,0,0,0.15)',
        animation:'slideRight 0.3s ease-out'
      }}>
        {/* Color bar */}
        <div style={{height:'5px',background:grad}} />

        {/* Header */}
        <div style={{padding:'1.5rem',borderBottom:'1px solid #f5f5f4',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <span style={{fontSize:'2rem'}}>{typeInfo.icon}</span>
            <div>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.25rem',fontWeight:700,color:'#1c1917',textTransform:'capitalize'}}>{post.donationType}</h3>
              <p style={{fontSize:'0.8rem',color:'#78716c'}}>Posted {formatDate(post.createdAt)}</p>
            </div>
          </div>
          <button onClick={onClose} style={{width:'2rem',height:'2rem',borderRadius:'50%',border:'none',background:'#f5f5f4',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem'}}>✕</button>
        </div>

        <div style={{padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1.25rem'}}>
          {/* Status badge */}
          <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
            <span style={{
              display:'inline-flex',alignItems:'center',padding:'0.25rem 0.875rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:600,
              background: isCompleted ? '#f5f5f4' : '#dcfce7',
              color: isCompleted ? '#78716c' : '#15803d'
            }}>{isCompleted ? '🏁 Completed' : '✅ Available'}</span>
            <span style={{display:'inline-flex',alignItems:'center',padding:'0.25rem 0.875rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:600,background:'#fff7ed',color:'#ea6c10'}}>
              🎁 {post.quantity} total units
            </span>
          </div>

          {/* Progress */}
          <div style={{background:'#fafaf9',borderRadius:'0.75rem',padding:'1rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.5rem',fontSize:'0.875rem'}}>
              <span style={{color:'#78716c'}}>Claim progress</span>
              <span style={{fontWeight:600,color:'#1c1917'}}>{post.remainingQty} / {post.quantity} remaining</span>
            </div>
            <div style={{height:'10px',background:'#e7e5e4',borderRadius:'999px',overflow:'hidden'}}>
              <div style={{height:'100%',width:`${100-progress}%`,background:grad,borderRadius:'999px',transition:'width 0.6s ease'}} />
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.375rem',fontSize:'0.75rem',color:'#a8a29e'}}>
              <span>{progress}% claimed</span>
              <span>{100-progress}% remaining</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p style={{fontSize:'0.8rem',fontWeight:600,color:'#78716c',marginBottom:'0.5rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>Description</p>
            <p style={{color:'#44403c',lineHeight:1.7,fontSize:'0.95rem'}}>{post.description}</p>
          </div>

          {/* Contact */}
          {(post.contactPhone || post.contactEmail) && (
            <div>
              <p style={{fontSize:'0.8rem',fontWeight:600,color:'#78716c',marginBottom:'0.5rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>Contact Info</p>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                {post.contactPhone && (
                  <a href={`tel:${post.contactPhone}`} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.75rem',background:'#f5f5f4',borderRadius:'0.5rem',textDecoration:'none',color:'#1c1917',fontSize:'0.875rem'}}>
                    📞 {post.contactPhone}
                  </a>
                )}
                {post.contactEmail && (
                  <a href={`mailto:${post.contactEmail}`} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.75rem',background:'#f5f5f4',borderRadius:'0.5rem',textDecoration:'none',color:'#1c1917',fontSize:'0.875rem'}}>
                    📧 {post.contactEmail}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{display:'flex',gap:'0.75rem',marginTop:'0.5rem'}}>
            <Link to={`/posts/${post._id}`} className="btn-primary" style={{flex:1,textAlign:'center',textDecoration:'none'}}>
              View Public Page
            </Link>
            {!isCompleted && (
              <button onClick={() => onEdit(post)} style={{
                flex:1,padding:'0.75rem',borderRadius:'9999px',border:'2px solid #e7e5e4',
                background:'white',cursor:'pointer',fontWeight:600,color:'#1c1917',fontSize:'0.875rem'
              }}>
                ✏️ Edit
              </button>
            )}
          </div>
          <button onClick={() => onDelete(post._id)} style={{
            width:'100%',padding:'0.75rem',borderRadius:'9999px',border:'2px solid #fecaca',
            background:'#fef2f2',cursor:'pointer',fontWeight:600,color:'#dc2626',fontSize:'0.875rem'
          }}>
            🗑️ Delete Post
          </button>
        </div>
      </div>
    </>
  )
}

/* ── Donor quick-stats bar ────────────────────────────────── */
const DonorProgressBar = ({ posts }) => {
  const byType = {}
  DONATION_TYPES.forEach(t => { byType[t.value] = 0 })
  posts.forEach(p => { byType[p.donationType] = (byType[p.donationType] || 0) + 1 })
  const top = DONATION_TYPES.filter(t => byType[t.value] > 0)
  if (!top.length) return null

  return (
    <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'1.25rem 1.5rem',marginBottom:'1.5rem'}}>
      <p style={{fontSize:'0.8rem',fontWeight:600,color:'#78716c',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.75rem'}}>Posts by Category</p>
      <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
        {top.map(t => (
          <div key={t.value} style={{display:'flex',alignItems:'center',gap:'0.375rem',padding:'0.375rem 0.875rem',background:'#fafaf9',borderRadius:'9999px',fontSize:'0.85rem'}}>
            <span>{t.icon}</span>
            <span style={{fontWeight:600,color:'#1c1917'}}>{byType[t.value]}</span>
            <span style={{color:'#78716c'}}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Dashboard ───────────────────────────────────────── */
const Dashboard = () => {
  const { user, isDonor, isCharity } = useAuth()
  const { posts, fetchMyPosts, deletePost } = usePosts()
  const { claims, fetchMyClaims } = useClaims()
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (isDonor)   fetchMyPosts()
    if (isCharity) fetchMyClaims()
  }, [isDonor, isCharity]) // eslint-disable-line

  /* donor stats */
  const totalQty     = posts.reduce((s,p) => s + p.quantity, 0)
  const totalClaimed = posts.reduce((s,p) => s + (p.quantity - p.remainingQty), 0)
  const activePosts  = posts.filter(p => p.status === 'available').length
  const completedPosts = posts.filter(p => p.status === 'completed').length

  /* charity stats */
  const pendingClaims   = claims.filter(c => c.status === 'pending').length
  const confirmedClaims = claims.filter(c => c.status === 'confirmed').length
  const totalClaimedQty = claims.reduce((s,c) => s + (c.quantity || 0), 0)

  /* filtered posts for donor tab */
  const filteredPosts = activeTab === 'all' ? posts
    : activeTab === 'available' ? posts.filter(p => p.status === 'available')
    : posts.filter(p => p.status === 'completed')

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this donation post?')) return
    await deletePost(id)
    setSelectedPost(null)
  }

  const handleEdit = (post) => {
    window.location.href = `/posts/${post._id}/edit`
  }

  return (
    <div style={{minHeight:'100vh',background:'#fef9f0',paddingTop:'4rem'}}>

      {/* ── Hero header ── */}
      <div style={{background:'linear-gradient(135deg,#f97316 0%,#ea6c10 60%,#c2570c 100%)',padding:'2.5rem 0',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-3rem',right:'-3rem',width:'12rem',height:'12rem',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}} />
        <div style={{position:'absolute',bottom:'-2rem',left:'10%',width:'8rem',height:'8rem',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative',zIndex:1}}>
          <div style={{color:'white'}}>
            <p style={{color:'rgba(255,255,255,0.75)',fontSize:'0.875rem',marginBottom:'0.25rem'}}>Welcome back 👋</p>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:700,marginBottom:'0.5rem'}}>{user?.name}</h1>
            <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'0.375rem',background:'rgba(255,255,255,0.2)',backdropFilter:'blur(4px)',padding:'0.25rem 0.875rem',borderRadius:'9999px',fontSize:'0.8rem',textTransform:'capitalize',fontWeight:500}}>
                {user?.role === 'donor' ? '🎁' : '🏛️'} {user?.role}
              </span>
              {user?.organization && (
                <span style={{display:'inline-flex',alignItems:'center',background:'rgba(255,255,255,0.15)',padding:'0.25rem 0.875rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:500}}>
                  {user.organization}
                </span>
              )}
            </div>
          </div>

          {isDonor && (
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',alignItems:'flex-end'}}>
              <Link to="/posts/create" style={{
                display:'inline-flex',alignItems:'center',gap:'0.5rem',
                background:'white',color:'#ea6c10',fontWeight:700,
                padding:'0.75rem 1.5rem',borderRadius:'9999px',textDecoration:'none',
                boxShadow:'0 4px 20px rgba(0,0,0,0.15)',fontSize:'0.95rem'
              }}>
                + New Donation
              </Link>
              <Link to="/posts" style={{color:'rgba(255,255,255,0.8)',fontSize:'0.8rem',textDecoration:'none'}}>
                Browse all donations →
              </Link>
            </div>
          )}
          {isCharity && (
            <Link to="/posts" style={{
              display:'inline-flex',alignItems:'center',gap:'0.5rem',
              background:'white',color:'#ea6c10',fontWeight:700,
              padding:'0.75rem 1.5rem',borderRadius:'9999px',textDecoration:'none',
              boxShadow:'0 4px 20px rgba(0,0,0,0.15)'
            }}>
              🔍 Browse Donations
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop:'2.5rem',paddingBottom:'4rem'}}>

        {/* ══════════════════════════════════════════════════════
            DONOR DASHBOARD
        ══════════════════════════════════════════════════════ */}
        {isDonor && (
          <>
            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
              <StatCard icon="📦" label="Total Posts"     value={posts.length}    bg="#fff7ed" sub={`${activePosts} active · ${completedPosts} completed`} />
              <StatCard icon="🎁" label="Total Items"     value={totalQty}         bg="#dbeafe" sub="units listed across all posts" />
              <StatCard icon="🤝" label="Items Claimed"   value={totalClaimed}     bg="#dcfce7" sub={totalQty ? `${Math.round((totalClaimed/totalQty)*100)}% of total` : '0%'} />
              <StatCard icon="✅" label="Active Posts"    value={activePosts}      bg="#fef9c3" sub="open for claiming" />
            </div>

            {/* Category breakdown */}
            <DonorProgressBar posts={posts} />

            {/* Tabs + Posts grid */}
            {posts.length > 0 && (
              <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',marginBottom:'1.5rem',overflow:'hidden'}}>
                {/* Tab bar */}
                <div style={{borderBottom:'1px solid #f5f5f4',padding:'0 1.5rem',display:'flex',gap:'0'}}>
                  {[
                    {key:'all',      label:`All (${posts.length})`},
                    {key:'available',label:`Active (${activePosts})`},
                    {key:'completed',label:`Completed (${completedPosts})`},
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                      padding:'1rem 1.25rem',border:'none',background:'none',cursor:'pointer',
                      fontWeight:600,fontSize:'0.875rem',
                      color: activeTab === tab.key ? '#f97316' : '#78716c',
                      borderBottom: activeTab === tab.key ? '2px solid #f97316' : '2px solid transparent',
                      transition:'all 0.2s',whiteSpace:'nowrap'
                    }}>{tab.label}</button>
                  ))}
                </div>

                {/* Posts list — click to open detail panel */}
                <div style={{padding:'1.5rem'}}>
                  {filteredPosts.length === 0 ? (
                    <p style={{textAlign:'center',color:'#78716c',padding:'2rem',fontSize:'0.95rem'}}>No posts in this category yet.</p>
                  ) : (
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem'}}>
                      {filteredPosts.map(post => {
                        const typeInfo = getDonationTypeInfo(post.donationType)
                        const prog = getProgressPercent(post.remainingQty, post.quantity)
                        const isCompleted = post.status === 'completed'
                        const TYPE_GRAD = {
                          food:'linear-gradient(to right,#4ade80,#10b981)',
                          clothes:'linear-gradient(to right,#60a5fa,#6366f1)',
                          toys:'linear-gradient(to right,#fbbf24,#f97316)',
                          electronics:'linear-gradient(to right,#a78bfa,#8b5cf6)',
                          books:'linear-gradient(to right,#2dd4bf,#06b6d4)',
                          other:'linear-gradient(to right,#a8a29e,#78716c)',
                        }
                        const grad = TYPE_GRAD[post.donationType] || TYPE_GRAD.other

                        return (
                          <div key={post._id}
                            onClick={() => setSelectedPost(post)}
                            style={{
                              border: selectedPost?._id === post._id ? '2px solid #f97316' : '2px solid #f5f5f4',
                              borderRadius:'0.875rem',overflow:'hidden',cursor:'pointer',
                              transition:'all 0.2s',background: selectedPost?._id === post._id ? '#fff7ed' : '#fafaf9'
                            }}
                            onMouseOver={e => { if(selectedPost?._id !== post._id) e.currentTarget.style.borderColor='#fdba74' }}
                            onMouseOut={e => { if(selectedPost?._id !== post._id) e.currentTarget.style.borderColor='#f5f5f4' }}
                          >
                            <div style={{height:'4px',background:grad}} />
                            <div style={{padding:'1rem'}}>
                              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.625rem'}}>
                                <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                                  <span style={{fontSize:'1.25rem'}}>{typeInfo.icon}</span>
                                  <span style={{fontWeight:700,color:'#1c1917',textTransform:'capitalize',fontSize:'0.95rem'}}>{post.donationType}</span>
                                </div>
                                <span style={{
                                  fontSize:'0.7rem',fontWeight:600,padding:'0.2rem 0.5rem',borderRadius:'9999px',
                                  background: isCompleted ? '#f5f5f4' : '#dcfce7',
                                  color: isCompleted ? '#78716c' : '#15803d'
                                }}>{isCompleted ? 'Completed' : 'Active'}</span>
                              </div>

                              {/* Mini progress */}
                              <div style={{height:'6px',background:'#e7e5e4',borderRadius:'999px',overflow:'hidden',marginBottom:'0.375rem'}}>
                                <div style={{height:'100%',width:`${100-prog}%`,background:grad,borderRadius:'999px'}} />
                              </div>
                              <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'#78716c'}}>
                                <span>{post.remainingQty} left</span>
                                <span>{prog}% claimed</span>
                              </div>

                              {/* Quick actions */}
                              <div style={{display:'flex',gap:'0.5rem',marginTop:'0.75rem'}} onClick={e => e.stopPropagation()}>
                                <button onClick={() => handleEdit(post)} style={{flex:1,padding:'0.375rem',border:'1px solid #e7e5e4',borderRadius:'0.5rem',background:'white',cursor:'pointer',fontSize:'0.75rem',color:'#78716c',fontWeight:500}}>✏️ Edit</button>
                                <button onClick={() => handleDelete(post._id)} style={{padding:'0.375rem 0.625rem',border:'1px solid #fecaca',borderRadius:'0.5rem',background:'#fef2f2',cursor:'pointer',fontSize:'0.75rem',color:'#dc2626'}}>🗑️</button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {posts.length === 0 && (
              <EmptyState icon="🎁" title="No donations yet" desc="Create your first donation post to start helping charities in your area." to="/posts/create" cta="Create Donation" />
            )}

            {/* Recent activity */}
            {posts.length > 0 && (
              <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',padding:'1.5rem'}}>
                <SectionTitle>Recent Activity</SectionTitle>
                <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  {posts.slice(0,5).map(post => {
                    const typeInfo = getDonationTypeInfo(post.donationType)
                    const claimed = post.quantity - post.remainingQty
                    return (
                      <div key={post._id}
                        onClick={() => setSelectedPost(post)}
                        style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.875rem',borderRadius:'0.75rem',cursor:'pointer',transition:'background 0.15s',background:'#fafaf9'}}
                        onMouseOver={e => e.currentTarget.style.background='#fff7ed'}
                        onMouseOut={e => e.currentTarget.style.background='#fafaf9'}
                      >
                        <div style={{width:'2.75rem',height:'2.75rem',borderRadius:'0.625rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>{typeInfo.icon}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <p style={{fontWeight:600,color:'#1c1917',textTransform:'capitalize',fontSize:'0.9rem'}}>{post.donationType}</p>
                          <p style={{fontSize:'0.8rem',color:'#78716c'}}>{claimed} of {post.quantity} units claimed · {formatDate(post.createdAt)}</p>
                        </div>
                        <span style={{
                          fontSize:'0.75rem',fontWeight:600,padding:'0.2rem 0.625rem',borderRadius:'9999px',flexShrink:0,
                          background: post.status === 'completed' ? '#f5f5f4' : '#dcfce7',
                          color: post.status === 'completed' ? '#78716c' : '#15803d'
                        }}>{post.status}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* ══════════════════════════════════════════════════════
            CHARITY DASHBOARD
        ══════════════════════════════════════════════════════ */}
        {isCharity && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
              <StatCard icon="📋" label="Total Claims"     value={claims.length}    bg="#fff7ed" />
              <StatCard icon="🎁" label="Units Claimed"    value={totalClaimedQty}  bg="#dbeafe" sub="across all claims" />
              <StatCard icon="⏳" label="Pending"          value={pendingClaims}    bg="#fef9c3" sub="awaiting confirmation" />
              <StatCard icon="✅" label="Confirmed"        value={confirmedClaims}  bg="#dcfce7" sub="successfully confirmed" />
            </div>

            <SectionTitle action={<Link to="/posts" className="btn-outline" style={{padding:'0.5rem 1.25rem',fontSize:'0.875rem'}}>Browse More →</Link>}>
              My Claims
            </SectionTitle>

            {claims.length === 0 ? (
              <EmptyState icon="🔍" title="No claims yet" desc="Browse available donations and start claiming for your community." to="/posts" cta="Browse Donations" />
            ) : (
              <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.07)',overflow:'hidden'}}>
                {claims.map((claim, i) => {
                  const t = getDonationTypeInfo(claim.post?.donationType)
                  const isConfirmed = claim.status === 'confirmed'
                  return (
                    <div key={claim._id} style={{
                      display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.5rem',
                      borderBottom: i < claims.length - 1 ? '1px solid #f5f5f4' : 'none',
                      transition:'background 0.15s'
                    }}
                      onMouseOver={e => e.currentTarget.style.background='#fafaf9'}
                      onMouseOut={e => e.currentTarget.style.background='white'}
                    >
                      <div style={{width:'3rem',height:'3rem',borderRadius:'0.75rem',background:'#fff7ed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>{t.icon}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontWeight:600,color:'#1c1917',textTransform:'capitalize'}}>{claim.post?.donationType || 'Donation'}</p>
                        <p style={{fontSize:'0.8rem',color:'#78716c'}}>{claim.quantity} units · {formatDate(claim.claimedAt)}</p>
                        {claim.notes && <p style={{fontSize:'0.8rem',color:'#a8a29e',marginTop:'0.125rem'}}>📝 {claim.notes}</p>}
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexShrink:0}}>
                        <span style={{
                          display:'inline-flex',alignItems:'center',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:600,
                          background: isConfirmed ? '#dcfce7' : '#fef9c3',
                          color: isConfirmed ? '#15803d' : '#a16207'
                        }}>{isConfirmed ? '✅ Confirmed' : '⏳ Pending'}</span>
                        {claim.post?._id && (
                          <Link to={`/posts/${claim.post._id}`} style={{color:'#f97316',fontSize:'0.85rem',fontWeight:600,textDecoration:'none',whiteSpace:'nowrap'}}>View →</Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Slide-in post detail panel */}
      {selectedPost && (
        <PostDetailPanel
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Dashboard

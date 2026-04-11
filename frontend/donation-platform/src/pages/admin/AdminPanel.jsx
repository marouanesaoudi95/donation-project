import React, { useEffect, useState } from 'react'
import { usePosts } from '../../hooks/usePosts'
import { useClaims } from '../../hooks/useClaims'
import PostCard from '../../components/posts/PostCard'
import { formatDate, getDonationTypeInfo } from '../../utils/formatters'
import { claimsAPI } from '../../services/api'

const AdminPanel = () => {
  const { posts, fetchPosts, deletePost } = usePosts()
  const { claims, fetchMyClaims, updateClaimStatus } = useClaims()
  const [tab, setTab] = useState('posts')
  const [allClaims, setAllClaims] = useState([])

  useEffect(() => { fetchPosts({}); fetchMyClaims() }, [])

  const totalAvailable = posts.filter(p => p.status === 'available').length
  const totalCompleted = posts.filter(p => p.status === 'completed').length

  const TABS = ['posts', 'claims', 'stats']

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      <div className="bg-gradient-to-r from-stone-900 to-stone-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">⚙️</div>
            <h1 className="font-serif text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className=" text-stone-400">Monitor and manage the HopeLink platform.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            ['📦','Total Posts', posts.length, 'bg-orange-50'],
            ['✅','Available',   totalAvailable, 'bg-green-50'],
            ['🏁','Completed',   totalCompleted, 'bg-stone-100'],
            ['🤝','Total Claims',claims.length, 'bg-amber-50'],
          ].map(([icon,label,val,col]) => (
            <div key={label} className="card p-5 flex items-center gap-3">
              <div className={`w-11 h-11 ${col} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>{icon}</div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900">{val}</p>
                <p className=" text-xs text-stone-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-stone-200">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5  font-medium text-sm capitalize transition-all ${tab === t ? 'text-orange-600 border-b-2 border-orange-500' : 'text-stone-500 hover:text-stone-900'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {tab === 'posts' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => (
              <PostCard key={post._id} post={post} showActions
                onDelete={(id) => { if (confirm('Delete this post?')) deletePost(id) }}
              />
            ))}
          </div>
        )}

        {/* Claims tab */}
        {tab === 'claims' && (
          <div className="space-y-3">
            {claims.length === 0 && <p className="text-stone-500  text-center py-12">No claims found.</p>}
            {claims.map(claim => {
              const t = getDonationTypeInfo(claim.post?.donationType)
              return (
                <div key={claim._id} className="card p-5 flex items-center gap-4">
                  <span className="text-2xl">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold  text-stone-900 capitalize">{claim.post?.donationType || 'Donation'}</p>
                    <p className="text-sm text-stone-500 ">{claim.quantity} units · {formatDate(claim.claimedAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${claim.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{claim.status}</span>
                    {claim.status === 'pending' && (
                      <button onClick={() => updateClaimStatus(claim._id, 'confirmed')}
                        className="text-xs px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg  transition-colors">
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stats tab */}
        {tab === 'stats' && (
          <div className="card p-8 text-center text-stone-500 ">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-serif text-xl font-bold text-stone-900 mb-2">Analytics Coming Soon</p>
            <p>Detailed charts and reporting will be available in the next release.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel

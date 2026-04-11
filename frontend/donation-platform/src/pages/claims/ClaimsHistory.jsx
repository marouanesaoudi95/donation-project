import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useClaims } from '../../hooks/useClaims'
import { getDonationTypeInfo, formatDate } from '../../utils/formatters'
import { PageSpinner } from '../../components/common/Spinner'

const ClaimsHistory = () => {
  const { claims, loading, fetchMyClaims } = useClaims()
  useEffect(() => { fetchMyClaims() }, [])

  if (loading) return <PageSpinner />

  const grouped = { pending: claims.filter(c => c.status === 'pending'), confirmed: claims.filter(c => c.status === 'confirmed') }

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      <div className="bg-gradient-to-r from-charity-green to-teal-500 py-10">
        <div className="max-w-5xl mx-auto px-4 text-white">
          <h1 className="font-serif text-3xl font-bold mb-1">Claims History</h1>
          <p className=" text-white/80">Track all the donations your organization has claimed.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[['📋','Total',claims.length,'bg-orange-50'],['⏳','Pending',grouped.pending.length,'bg-amber-50'],['✅','Confirmed',grouped.confirmed.length,'bg-green-50']].map(([icon,label,val,col]) => (
            <div key={label} className="card p-5 text-center">
              <div className={`w-12 h-12 ${col} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2`}>{icon}</div>
              <p className="font-serif text-2xl font-bold text-stone-900">{val}</p>
              <p className=" text-sm text-stone-500">{label}</p>
            </div>
          ))}
        </div>

        {claims.length === 0 ? (
          <div className="card p-16 text-center">
            <p className="text-6xl mb-4">📭</p>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">No claims yet</h3>
            <p className="text-stone-500  mb-6">Start browsing donations and submit your first claim.</p>
            <Link to="/posts" className="btn-primary">Browse Donations</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {claims.map(claim => {
              const t = getDonationTypeInfo(claim.post?.donationType)
              const isConfirmed = claim.status === 'confirmed'
              return (
                <div key={claim._id} className="card p-5 flex items-center gap-4 animate-fade-in">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{t.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold  text-stone-900 capitalize">{claim.post?.donationType || 'Donation'}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-stone-500 ">
                      <span>🎁 {claim.quantity} units</span>
                      <span>📅 {formatDate(claim.claimedAt)}</span>
                      {claim.notes && <span>📝 {claim.notes}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`badge ${isConfirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {isConfirmed ? '✅ Confirmed' : '⏳ Pending'}
                    </span>
                    {claim.post?._id && (
                      <Link to={`/posts/${claim.post._id}`} className="text-orange-500 hover:text-orange-600 font-medium text-sm  hidden sm:block">
                        View Post →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClaimsHistory

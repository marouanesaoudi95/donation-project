import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../../hooks/usePosts'
import { useClaims } from '../../hooks/useClaims'
import { useAuth } from '../../hooks/useAuth'
import { PageSpinner } from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import { getDonationTypeInfo, formatDate, getProgressPercent } from '../../utils/formatters'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loading, error, fetchPost } = usePosts()
  const { submitClaim } = useClaims()
  const { isAuthenticated, isCharity } = useAuth()

  const [claimModal, setClaimModal] = useState(false)
  const [claimQty, setClaimQty] = useState(1)
  const [claimNotes, setClaimNotes] = useState('')
  const [claimLoading, setClaimLoading] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [claimError, setClaimError] = useState('')

  useEffect(() => { fetchPost(id) }, [id])

  const handleClaim = async () => {
    if (claimQty < 1 || claimQty > post.remainingQty) {
      setClaimError(`Quantity must be between 1 and ${post.remainingQty}`)
      return
    }
    setClaimLoading(true); setClaimError('')
    try {
      await submitClaim(id, Number(claimQty), claimNotes)
      setClaimSuccess(true)
      setTimeout(() => { setClaimModal(false); setClaimSuccess(false); fetchPost(id) }, 2000)
    } catch (err) {
      setClaimError(err.response?.data?.message || 'Failed to submit claim')
    } finally { setClaimLoading(false) }
  }

  if (loading) return <PageSpinner />
  if (error || !post) return (
    <div className="min-h-screen bg-amber-50 pt-16 flex items-center justify-center">
      <div className="text-center"><p className="text-6xl mb-4">🔍</p>
        <h2 className="font-serif text-2xl font-bold mb-2">Post Not Found</h2>
        <button onClick={() => navigate('/posts')} className="btn-primary mt-4">Back to Donations</button>
      </div>
    </div>
  )

  const typeInfo = getDonationTypeInfo(post.donationType)
  const progress = getProgressPercent(post.remainingQty, post.quantity)
  const isCompleted = post.status === 'completed'

  return (
    <div className="min-h-screen bg-amber-50 pt-16">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-10">
        <div className="max-w-4xl mx-auto px-4 text-white">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white  text-sm mb-4 transition-colors">
            ← Back
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
              {typeInfo.icon}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold capitalize">{post.donationType} Donation</h1>
              <p className=" text-white/80">Posted {formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">About this Donation</h2>
            <p className=" text-stone-500 leading-relaxed">{post.description}</p>
          </div>

          {/* Progress */}
          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">Availability</h2>
            <div className="flex justify-between text-sm  mb-2">
              <span className="text-stone-500">Items remaining</span>
              <span className="font-bold text-stone-900">{post.remainingQty} of {post.quantity}</span>
            </div>
            <div className="h-3 bg-stone-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-400 rounded-full transition-all duration-700"
                style={{ width: `${100 - progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-stone-500 ">
              <span>{progress}% claimed</span>
              <span className={isCompleted ? 'text-stone-400' : 'text-emerald-600 font-semibold'}>
                {isCompleted ? 'Fully claimed' : 'Available for claiming'}
              </span>
            </div>
          </div>

          {/* Donor info */}
          {post.donor && (
            <div className="card p-6">
              <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">Donor Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                  {post.donor.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold  text-stone-900">{post.donor.name}</p>
                  <p className="text-sm text-stone-500 ">Donor</p>
                </div>
              </div>
              {isCharity && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {post.contactPhone && (
                    <a href={`tel:${post.contactPhone}`} className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl text-sm  hover:bg-stone-100 transition-colors">
                      📞 {post.contactPhone}
                    </a>
                  )}
                  {post.contactEmail && (
                    <a href={`mailto:${post.contactEmail}`} className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl text-sm  hover:bg-stone-100 transition-colors">
                      📧 {post.contactEmail}
                    </a>
                  )}
                </div>
              )}
              {!isAuthenticated && <p className="mt-3 text-sm text-stone-500 ">Sign in as a charity to view contact details.</p>}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="text-center mb-4">
              <p className="font-serif text-4xl font-bold text-orange-500">{post.remainingQty}</p>
              <p className="text-sm text-stone-500 ">units available</p>
            </div>
            <span className={`badge w-full justify-center py-2 mb-4 ${isCompleted ? 'badge bg-stone-100 text-stone-500' : 'badge bg-green-100 text-green-700'}`}>
              {isCompleted ? 'Fully Claimed' : '✓ Available'}
            </span>

            {isCharity && !isCompleted && (
              <Button onClick={() => setClaimModal(true)} className="w-full">
                🤝 Claim Donation
              </Button>
            )}
            {!isAuthenticated && (
              <Button onClick={() => navigate('/login')} className="w-full">
                Sign In to Claim
              </Button>
            )}
            {isCompleted && (
              <p className="text-center text-sm text-stone-500 ">This donation has been fully claimed.</p>
            )}
          </div>

          <div className="card p-5 text-sm  space-y-3">
            <div className="flex justify-between">
              <span className="text-stone-500">Category</span>
              <span className="font-semibold capitalize">{post.donationType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Total Quantity</span>
              <span className="font-semibold">{post.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Posted</span>
              <span className="font-semibold">{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claim modal */}
      <Modal isOpen={claimModal} onClose={() => setClaimModal(false)} title="Claim Donation"
        footer={
          <>
            <button onClick={() => setClaimModal(false)} className="btn-ghost">Cancel</button>
            <Button onClick={handleClaim} loading={claimLoading}>Confirm Claim</Button>
          </>
        }>
        {claimSuccess ? (
          <div className="text-center py-6">
            <p className="text-6xl mb-4">✅</p>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Claim Submitted!</h3>
            <p className="text-stone-500 ">Your claim has been recorded successfully.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-stone-500  text-sm">
              Available: <strong>{post.remainingQty} units</strong>. How many would you like to claim?
            </p>
            {claimError && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm ">{claimError}</div>}
            <Input label="Quantity *" type="number" min="1" max={post.remainingQty}
              value={claimQty} onChange={e => setClaimQty(e.target.value)} />
            <Input label="Notes (optional)" as="textarea" rows={3}
              value={claimNotes} onChange={e => setClaimNotes(e.target.value)}
              placeholder="Any pickup instructions or notes for the donor…" />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PostDetail

import React from 'react'
import { Link } from 'react-router-dom'
import { getDonationTypeInfo, formatDateRelative, getProgressPercent, truncate } from '../../utils/formatters'

const TYPE_GRAD = {
  food: 'linear-gradient(to right, #4ade80, #10b981)',
  clothes: 'linear-gradient(to right, #60a5fa, #6366f1)',
  toys: 'linear-gradient(to right, #fbbf24, #f97316)',
  electronics: 'linear-gradient(to right, #a78bfa, #8b5cf6)',
  books: 'linear-gradient(to right, #2dd4bf, #06b6d4)',
  other: 'linear-gradient(to right, #a8a29e, #78716c)',
}

const PostCard = ({ post, showActions, onEdit, onDelete }) => {
  const typeInfo = getDonationTypeInfo(post.donationType)
  const progress = getProgressPercent(post.remainingQty, post.quantity)
  const grad = TYPE_GRAD[post.donationType] || TYPE_GRAD.other
  const isCompleted = post.status === 'completed'

  return (
    <div className="card overflow-hidden animate-fade-in" style={{transition:'box-shadow 0.3s, transform 0.3s'}}>
      <div style={{height:'4px', background: grad}} />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl">{typeInfo.icon}</span>
            <div className="min-w-0">
              <h3 className="font-bold truncate capitalize" style={{fontFamily:'Playfair Display,serif', color:'#1c1917'}}>{post.donationType}</h3>
              <p className="text-xs" style={{color:'#78716c'}}>{formatDateRelative(post.createdAt)}</p>
            </div>
          </div>
          <span className={isCompleted ? 'badge bg-stone-100 text-stone-500 badge' : 'badge bg-green-100 text-green-700 badge'}>
            {isCompleted ? 'Completed' : 'Available'}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{color:'#78716c'}}>{truncate(post.description, 110)}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{color:'#78716c'}}>Remaining</span>
            <span className="font-semibold" style={{color:'#1c1917'}}>{post.remainingQty} / {post.quantity} units</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{background:'#f5f5f4'}}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{width:`${100 - progress}%`, background: grad}} />
          </div>
          <p className="text-xs mt-1" style={{color:'#78716c'}}>{progress}% claimed</p>
        </div>

        {/* Donor */}
        {post.donor && (
          <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl" style={{background:'#fafaf9'}}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{background:'#ffedd5', color:'#ea6c10'}}>
              {post.donor.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-semibold" style={{color:'#1c1917'}}>{post.donor.name}</p>
              <p className="text-xs" style={{color:'#78716c'}}>Donor</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/posts/${post._id}`}
            className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl transition-colors"
            style={{background:'#fff7ed', color:'#ea6c10'}}
            onMouseOver={e => e.currentTarget.style.background='#ffedd5'}
            onMouseOut={e => e.currentTarget.style.background='#fff7ed'}
          >
            View Details
          </Link>
          {showActions && (
            <>
              <button onClick={() => onEdit?.(post)}
                className="px-3 py-2.5 rounded-xl transition-colors"
                style={{background:'#f5f5f4'}} title="Edit">✏️</button>
              <button onClick={() => onDelete?.(post._id)}
                className="px-3 py-2.5 rounded-xl transition-colors"
                style={{background:'#fef2f2'}} title="Delete">🗑️</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard

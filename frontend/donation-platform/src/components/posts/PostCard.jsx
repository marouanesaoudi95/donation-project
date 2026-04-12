import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDonationTypeInfo, formatDateRelative, getProgressPercent, truncate } from '../../utils/formatters'

const TYPE_GRAD = {
  food:'linear-gradient(to right,#4ade80,#10b981)',
  clothes:'linear-gradient(to right,#60a5fa,#6366f1)',
  toys:'linear-gradient(to right,#fbbf24,#f97316)',
  electronics:'linear-gradient(to right,#a78bfa,#8b5cf6)',
  books:'linear-gradient(to right,#2dd4bf,#06b6d4)',
  other:'linear-gradient(to right,#a8a29e,#78716c)',
}

const PostCard = ({ post, showActions, onEdit, onDelete }) => {
  const typeInfo = getDonationTypeInfo(post.donationType)
  const progress = getProgressPercent(post.remainingQty, post.quantity)
  const grad     = TYPE_GRAD[post.donationType] || TYPE_GRAD.other
  const isCompleted = post.status === 'completed'

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      whileHover={{ y:-4, boxShadow:'0 16px 40px rgba(0,0,0,0.12)' }}
      transition={{ type:'spring', stiffness:280, damping:22 }}
      style={{background:'white',borderRadius:'1rem',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,0.07)'}}
    >
      <div style={{height:'4px',background:grad}} />
      <div style={{padding:'1.25rem'}}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'0.75rem',marginBottom:'0.875rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',flex:1,minWidth:0}}>
            <span style={{fontSize:'1.5rem'}}>{typeInfo.icon}</span>
            <div style={{minWidth:0}}>
              <h3 style={{fontWeight:700,color:'#1c1917',textTransform:'capitalize',fontSize:'1rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',fontFamily:'Playfair Display,serif'}}>
                {post.donationType}
              </h3>
              <p style={{fontSize:'0.75rem',color:'#a8a29e'}}>{formatDateRelative(post.createdAt)}</p>
            </div>
          </div>
          <motion.span
            initial={{ scale:0.8 }} animate={{ scale:1 }}
            style={{
              display:'inline-flex',alignItems:'center',padding:'0.2rem 0.625rem',borderRadius:'9999px',fontSize:'0.72rem',fontWeight:700,flexShrink:0,
              background: isCompleted ? '#f5f5f4' : '#dcfce7',
              color: isCompleted ? '#78716c' : '#15803d',
            }}
          >{isCompleted ? 'Completed' : '✓ Available'}</motion.span>
        </div>

        <p style={{fontSize:'0.875rem',color:'#78716c',lineHeight:1.6,marginBottom:'1rem'}}>{truncate(post.description, 110)}</p>

        {/* Progress */}
        <div style={{marginBottom:'1rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',marginBottom:'0.375rem'}}>
            <span style={{color:'#a8a29e'}}>Remaining</span>
            <span style={{fontWeight:700,color:'#1c1917'}}>{post.remainingQty} / {post.quantity} units</span>
          </div>
          <div style={{height:'6px',background:'#f5f5f4',borderRadius:'999px',overflow:'hidden'}}>
            <motion.div
              initial={{ width:0 }}
              animate={{ width:`${100 - progress}%` }}
              transition={{ duration:0.8, delay:0.2, ease:'easeOut' }}
              style={{height:'100%',borderRadius:'999px',background:grad}}
            />
          </div>
          <p style={{fontSize:'0.72rem',color:'#a8a29e',marginTop:'0.25rem'}}>{progress}% claimed</p>
        </div>

        {/* Donor */}
        {post.donor && (
          <div style={{display:'flex',alignItems:'center',gap:'0.625rem',padding:'0.625rem',background:'#fafaf9',borderRadius:'0.75rem',marginBottom:'1rem'}}>
            <div style={{width:'1.75rem',height:'1.75rem',borderRadius:'50%',background:'#ffedd5',display:'flex',alignItems:'center',justifyContent:'center',color:'#ea6c10',fontWeight:700,fontSize:'0.75rem',flexShrink:0}}>
              {post.donor.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{fontSize:'0.8rem',fontWeight:600,color:'#1c1917'}}>{post.donor.name}</p>
              <p style={{fontSize:'0.7rem',color:'#a8a29e'}}>Donor</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{display:'flex',gap:'0.5rem'}}>
          <motion.div style={{flex:1}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
            <Link to={`/posts/${post._id}`} style={{
              display:'block',textAlign:'center',padding:'0.625rem',
              background:'#fff7ed',color:'#ea6c10',fontWeight:600,fontSize:'0.875rem',
              borderRadius:'0.75rem',textDecoration:'none',transition:'background 0.2s',
            }}
              onMouseOver={e=>e.currentTarget.style.background='#ffedd5'}
              onMouseOut={e=>e.currentTarget.style.background='#fff7ed'}
            >View Details</Link>
          </motion.div>
          {showActions && (
            <>
              <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                onClick={() => onEdit?.(post)}
                style={{padding:'0.5rem 0.75rem',border:'none',background:'#f5f5f4',borderRadius:'0.75rem',cursor:'pointer',fontSize:'0.9rem'}}>✏️</motion.button>
              <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                onClick={() => onDelete?.(post._id)}
                style={{padding:'0.5rem 0.75rem',border:'none',background:'#fef2f2',borderRadius:'0.75rem',cursor:'pointer',fontSize:'0.9rem'}}>🗑️</motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard

/**
 * TextShimmer — ReactBits inspired
 * Animated shimmer/gradient sweep across text.
 */
import React from 'react'
import { motion } from 'framer-motion'

const TextShimmer = ({ text, className = '', style = {}, duration = 2.5, as: Tag = 'span' }) => (
  <span className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
    {/* Base text */}
    <span style={{ visibility: 'hidden' }}>{text}</span>
    {/* Shimmer layer */}
    <motion.span
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(90deg, #f97316 0%, #fbbf24 30%, #f97316 50%, #ea6c10 70%, #f97316 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'flex',
        alignItems: 'center',
      }}
      animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {text}
    </motion.span>
  </span>
)

export default TextShimmer

/**
 * GlowCard — ReactBits inspired
 * Card with animated gradient glow that follows mouse position.
 */
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const GlowCard = ({
  children,
  glowColor = '#f97316',
  className = '',
  style = {},
}) => {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px ${glowColor}33`
          : '0 4px 20px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
      className={className}
    >
      {/* Glow spotlight */}
      {hovered && (
        <div style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: '300px', height: '300px',
          borderRadius: '50%',
          left: pos.x - 150,
          top:  pos.y - 150,
          background: `radial-gradient(circle, ${glowColor}22 0%, transparent 70%)`,
          transition: 'none',
          zIndex: 0,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  )
}

export default GlowCard

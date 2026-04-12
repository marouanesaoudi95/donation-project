/**
 * FadeContent — ReactBits inspired
 * Fade + slide-up on mount, or triggered by scroll (IntersectionObserver).
 */
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const FadeContent = ({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',   // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 28,
  blur = false,
  className = '',
  style = {},
  once = true,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  const dirMap = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  }

  const hidden = {
    opacity: 0,
    ...(blur ? { filter: 'blur(8px)' } : {}),
    ...dirMap[direction],
  }
  const visible = {
    opacity: 1,
    y: 0, x: 0,
    filter: 'blur(0px)',
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden, visible }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default FadeContent

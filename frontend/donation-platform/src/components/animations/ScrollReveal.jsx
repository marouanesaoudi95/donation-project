/**
 * ScrollReveal — ReactBits inspired
 * Staggered children reveal as they enter the viewport.
 */
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ScrollReveal = ({
  children,
  stagger = 0.12,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.5,
  className = '',
  style = {},
  once = true,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })

  const dirMap = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const item = {
    hidden: { opacity: 0, ...dirMap[direction] },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {React.Children.map(children, (child, i) =>
        child ? (
          <motion.div key={i} variants={item} style={{ display: 'contents' }}>
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  )
}

export default ScrollReveal

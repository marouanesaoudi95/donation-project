/**
 * PageTransition — ReactBits inspired
 * Wraps each page with a smooth fade+slide-up entrance.
 * Use AnimatePresence in App.jsx for route-change transitions.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial:  { opacity: 0, y: 18, filter: 'blur(4px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] } },
  exit:     { opacity: 0, y: -10, filter: 'blur(4px)',
    transition: { duration: 0.25, ease: 'easeIn' } },
}

const PageTransition = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default PageTransition

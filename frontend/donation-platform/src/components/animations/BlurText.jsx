/**
 * BlurText — ReactBits inspired
 * Splits text word-by-word, each word fades + blurs in with a stagger.
 */
import React from 'react'
import { motion } from 'framer-motion'

const BlurText = ({
  text = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.07,
  as: Tag = 'span',
  className = '',
  style = {},
}) => {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const word = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'inline', ...style }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: 'inline-block', marginRight: '0.28em' }}>
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default BlurText

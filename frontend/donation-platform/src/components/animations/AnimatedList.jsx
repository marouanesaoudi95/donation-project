/**
 * AnimatedList — ReactBits inspired
 * List items animate in one by one with a spring stagger.
 */
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedList = ({ items = [], renderItem, keyExtractor, className = '', stagger = 0.08 }) => (
  <motion.div className={className}>
    <AnimatePresence initial={false}>
      {items.map((item, i) => (
        <motion.div
          key={keyExtractor ? keyExtractor(item, i) : i}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1,
            transition: { delay: i * stagger, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
          exit={{ opacity: 0, y: -10, scale: 0.97,
            transition: { duration: 0.2 } }}
        >
          {renderItem(item, i)}
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
)

export default AnimatedList

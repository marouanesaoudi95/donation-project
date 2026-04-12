/**
 * CountUp — ReactBits inspired
 * Animated number counter triggered on scroll into view.
 */
import React, { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const CountUp = ({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  style = {},
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [current, setCurrent] = useState(start)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const startTime = performance.now()
    const range = end - start

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCurrent(start + range * easeOut(progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, start, duration])

  const display = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString()

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  )
}

export default CountUp

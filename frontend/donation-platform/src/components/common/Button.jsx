import { motion } from 'framer-motion'
import React from 'react'
import Spinner from './Spinner'

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost:   'btn-ghost',
  danger:  'inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer border-none',
  success: 'inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer border-none',
}

const Button = ({
  children, variant = 'primary', size, loading = false,
  disabled = false, className = '', icon = null, iconRight = null,
  type = 'button', onClick, ...rest
}) => {
  const base = variants[variant] || variants.primary
  const disabledCls = (disabled || loading) ? 'opacity-60 cursor-not-allowed' : ''

  return (
    <motion.button
      whileHover={disabled||loading?{}:{scale:1.03}}
      whileTap={disabled||loading?{}:{scale:0.97}}
      type={type} onClick={onClick} disabled={disabled || loading}
      className={`${base} ${disabledCls} ${className}`}
      {...rest}
    >
      {loading ? <Spinner size="sm" color="current" /> : icon}
      {children}
      {!loading && iconRight}
    </motion.button>
  )
}

export default Button

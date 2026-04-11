import React from 'react'

const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' }

const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const borderColor = color === 'current' ? 'border-current border-t-transparent'
    : color === 'white' ? 'border-white border-t-transparent'
    : 'border-orange-200 border-t-orange-500'

  return (
    <div
      className={`${sizes[size]} rounded-full border-2 animate-spin ${borderColor} ${className}`}
      role="status" aria-label="Loading"
    />
  )
}

export const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center" style={{background:'#fef9f0'}}>
    <div className="text-center">
      <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin mx-auto mb-4" />
      <p className="text-stone-500">Loading…</p>
    </div>
  </div>
)

export default Spinner

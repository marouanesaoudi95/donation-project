import React from 'react'

const Input = React.forwardRef(({
  label, error, hint, icon, iconRight,
  className = '', wrapperClass = '',
  type = 'text', as = 'input', options = [],
  ...rest
}, ref) => {
  const Tag = as === 'select' ? 'select' : as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`w-full ${wrapperClass}`}>
      {label && (
        <label className="block text-sm font-semibold mb-1.5" style={{color:'#1c1917'}}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'#78716c'}}>
            {icon}
          </div>
        )}
        {as === 'select' ? (
          <select
            ref={ref}
            className={`input-field ${icon ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${error ? 'border-red-400 ring-1 ring-red-400' : ''} ${className}`}
            {...rest}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <Tag
            ref={ref} type={type}
            className={`input-field ${icon ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${error ? 'border-red-400 ring-1 ring-red-400' : ''} ${Tag === 'textarea' ? 'resize-none' : ''} ${className}`}
            {...rest}
          />
        )}
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:'#78716c'}}>{iconRight}</div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-sm" style={{color:'#78716c'}}>{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input

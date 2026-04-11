export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  if (!password || password.length < 6) return 'Password must be at least 6 characters'
  return null
}

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}

export const validateQuantity = (qty, max = Infinity) => {
  const n = Number(qty)
  if (!Number.isInteger(n) || n < 1) return 'Quantity must be a positive integer'
  if (n > max) return `Quantity cannot exceed ${max}`
  return null
}

export const validateRegisterForm = (data) => {
  const errors = {}
  if (!data.name?.trim()) errors.name = 'Full name is required'
  if (!validateEmail(data.email)) errors.email = 'Valid email is required'
  const pwErr = validatePassword(data.password)
  if (pwErr) errors.password = pwErr
  if (!data.role) errors.role = 'Please select a role'
  return errors
}

export const validateLoginForm = (data) => {
  const errors = {}
  if (!validateEmail(data.email)) errors.email = 'Valid email is required'
  if (!data.password) errors.password = 'Password is required'
  return errors
}

export const validatePostForm = (data) => {
  const errors = {}
  if (!data.donationType) errors.donationType = 'Donation type is required'
  const qtyErr = validateQuantity(data.quantity)
  if (qtyErr) errors.quantity = qtyErr
  if (!data.description?.trim() || data.description.trim().length < 20)
    errors.description = 'Description must be at least 20 characters'
  return errors
}

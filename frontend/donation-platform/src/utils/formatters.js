import { DONATION_TYPES } from './constants'

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(dateStr))
}

export const formatDateRelative = (dateStr) => {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return formatDate(dateStr)
}

export const getDonationTypeInfo = (type) =>
  DONATION_TYPES.find(t => t.value === type) || { label: type, icon: '📦', color: 'badge bg-stone-100 text-stone-600' }

export const getProgressPercent = (remaining, total) => {
  if (!total) return 0
  return Math.round(((total - remaining) / total) * 100)
}

export const truncate = (str, maxLen = 120) =>
  str?.length > maxLen ? str.slice(0, maxLen) + '…' : str

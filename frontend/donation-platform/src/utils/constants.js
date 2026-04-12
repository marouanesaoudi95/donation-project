export const API_BASE_URL = '/api/v1'

export const DONATION_TYPES = [
  { value: 'food',        label: 'Food & Groceries',  icon: '🍎', color: 'badge bg-green-100 text-green-700' },
  { value: 'clothes',     label: 'Clothing',           icon: '👕', color: 'badge bg-blue-100 text-blue-700' },
  { value: 'toys',        label: 'Toys & Games',       icon: '🧸', color: 'badge bg-yellow-100 text-yellow-700' },
  { value: 'electronics', label: 'Electronics',        icon: '📱', color: 'badge bg-stone-100 text-stone-600' },
  { value: 'books',       label: 'Books',              icon: '📚', color: 'badge bg-stone-100 text-stone-600' },
  { value: 'other',       label: 'Other',              icon: '📦', color: 'badge bg-stone-100 text-stone-600' },
]

export const ROLES = { DONOR: 'donor', CHARITY: 'charity', ADMIN: 'admin' }

export const POST_STATUS = { AVAILABLE: 'available', COMPLETED: 'completed' }

export const CLAIM_STATUS = { PENDING: 'pending', CONFIRMED: 'confirmed' }

export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Donations',  path: '/posts' },
  { label: 'About',      path: '/about' },
]

export const STATS = [
  { value: '2,400+', label: 'Donations Made',      icon: '🎁' },
  { value: '340+',   label: 'Charities Connected', icon: '🤝' },
  { value: '12K+',   label: 'Lives Impacted',      icon: '❤️' },
  { value: '98%',    label: 'Satisfaction Rate',   icon: '⭐' },
]

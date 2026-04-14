export const DONATION_TYPES = [
  { value: 'food',        label: 'Food',        icon: '🍎', iconName: 'Utensils' },
  { value: 'clothes',     label: 'Clothes',     icon: '👕', iconName: 'Shirt' },
  { value: 'toys',        label: 'Toys',        icon: '🧸', iconName: 'Gamepad2' },
  { value: 'books',       label: 'Books',       icon: '📚', iconName: 'BookOpen' },
  { value: 'electronics', label: 'Electronics', icon: '💻', iconName: 'Cpu' },
  { value: 'medical',     label: 'Medical',     icon: '🏥', iconName: 'Stethoscope' },
  { value: 'other',       label: 'Other',       icon: '📦', iconName: 'Package2' },
];
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
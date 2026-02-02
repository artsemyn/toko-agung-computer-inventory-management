import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Classname merge
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format Rupiah
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number with thousand separator
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num)
}

// Format date full
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

// Format date only
export function formatDateOnly(date) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(new Date(date))
}

// Format time only
export function formatTime(date) {
  return new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'short',
  }).format(new Date(date))
}

// Get stock status
export function getStockStatus(stock, minStock = 5) {
  if (stock === 0) {
    return {
      status: 'habis',
      label: 'Habis',
      color: 'destructive',
      className: 'bg-destructive/10 text-destructive'
    }
  }
  if (stock <= minStock) {
    return {
      status: 'hampir_habis',
      label: 'Hampir Habis',
      color: 'accent',
      className: 'bg-accent/10 text-accent'
    }
  }
  return {
    status: 'tersedia',
    label: 'Tersedia',
    color: 'primary',
    className: 'bg-primary/10 text-primary'
  }
}

// Truncate text
export function truncate(text, length) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Generate initials from name
export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Delay helper (for testing loading states)
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

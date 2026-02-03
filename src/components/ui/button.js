'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

/**
 * Button component with multiple variants and states
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.isLoading - Loading state (shows spinner, disables button)
 * @param {string} props.className - Additional CSS classes
 * @param {'button' | 'submit' | 'reset'} props.type - HTML button type
 * @param {Function} props.onClick - Click handler
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
    ghost: 'hover:bg-muted text-foreground',
    outline: 'border border-border hover:bg-muted text-foreground'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}

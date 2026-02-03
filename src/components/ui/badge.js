import { cn } from '@/lib/utils'

/**
 * Badge component for status indicators (stock levels, user roles, etc.)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge text
 * @param {'primary' | 'accent' | 'destructive' | 'neutral'} props.variant - Badge color variant
 * @param {'sm' | 'md' | 'lg'} props.size - Badge size
 * @param {boolean} props.dot - Show colored status dot
 * @param {string} props.className - Additional CSS classes
 */
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-full font-medium border'

  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    neutral: 'bg-muted text-muted-foreground border-border'
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  }

  const dotColors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    destructive: 'bg-destructive',
    neutral: 'bg-muted-foreground'
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && <span className={cn('w-2 h-2 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  )
}

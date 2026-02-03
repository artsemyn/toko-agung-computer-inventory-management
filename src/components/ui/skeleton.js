import { cn } from '@/lib/utils'

/**
 * Skeleton component for loading states
 *
 * @param {Object} props
 * @param {'text' | 'card' | 'avatar' | 'table'} props.variant - Skeleton shape variant
 * @param {number} props.count - Number of skeleton items (for arrays)
 * @param {string} props.className - Additional CSS classes
 */
export function Skeleton({ variant = 'text', count = 1, className }) {
  const variants = {
    text: 'h-4 bg-muted rounded',
    card: 'h-32 bg-muted rounded-lg',
    avatar: 'w-12 h-12 bg-muted rounded-full',
    table: 'h-12 bg-muted rounded'
  }

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(variants[variant], 'animate-pulse', className)}
          />
        ))}
      </div>
    )
  }

  return <div className={cn(variants[variant], 'animate-pulse', className)} />
}

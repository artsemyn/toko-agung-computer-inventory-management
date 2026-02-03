import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

/**
 * StatCard component for dashboard statistics
 *
 * @param {Object} props
 * @param {string} props.title - Stat name (e.g., "Total Produk")
 * @param {number|string} props.value - Main value to display
 * @param {string} props.description - Optional description text
 * @param {React.Component} props.icon - Lucide icon component
 * @param {Object} props.trend - Trend data: { value: number, direction: 'up' | 'down' | 'stable' }
 * @param {'primary' | 'accent' | 'destructive'} props.variant - Icon background color
 * @param {string} props.className - Additional CSS classes
 */
export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'primary',
  className
}) {
  const iconVariants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    destructive: 'bg-destructive/10 text-destructive'
  }

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus
  }

  const trendColors = {
    up: 'text-accent',
    down: 'text-destructive',
    stable: 'text-muted-foreground'
  }

  const TrendIcon = trend ? trendIcons[trend.direction] : null

  return (
    <div className={cn('bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
        </div>
        {Icon && (
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', iconVariants[variant])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mb-2">
        <p className="text-3xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </p>
      </div>

      {(description || trend) && (
        <div className="flex items-center gap-2 text-sm">
          {trend && TrendIcon && (
            <div className={cn('flex items-center gap-1', trendColors[trend.direction])}>
              <TrendIcon className="w-4 h-4" />
              <span className="font-medium">{trend.value}%</span>
            </div>
          )}
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}

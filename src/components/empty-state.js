import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'

/**
 * EmptyState component for displaying when no data is available
 *
 * @param {Object} props
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.title - Main message
 * @param {string} props.description - Optional description text
 * @param {React.ReactNode} props.action - Optional action button/component
 * @param {string} props.className - Additional CSS classes
 */
export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  className
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}

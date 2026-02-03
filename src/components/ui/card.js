import { cn } from '@/lib/utils'

/**
 * Card - Main container component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {'default' | 'hover' | 'flat'} props.variant - Card style variant
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Optional click handler (makes card interactive)
 */
export function Card({ children, variant = 'default', className, onClick, ...props }) {
  const baseStyles = 'bg-card rounded-lg p-6'

  const variants = {
    default: 'border border-border shadow-sm',
    hover: 'border border-border hover:shadow-lg hover:border-primary transition-all duration-300',
    flat: 'border-0 bg-muted'
  }

  const Component = onClick ? 'button' : 'div'
  const interactiveStyles = onClick
    ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-left w-full'
    : ''

  return (
    <Component
      className={cn(baseStyles, variants[variant], interactiveStyles, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * CardHeader - Header section of card
 */
export function CardHeader({ children, className }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

/**
 * CardTitle - Card title/heading
 */
export function CardTitle({ children, className }) {
  return <h3 className={cn('text-lg font-semibold text-foreground', className)}>{children}</h3>
}

/**
 * CardDescription - Card subtitle/description
 */
export function CardDescription({ children, className }) {
  return <p className={cn('text-sm text-muted-foreground mt-1', className)}>{children}</p>
}

/**
 * CardContent - Main content area
 */
export function CardContent({ children, className }) {
  return <div className={cn(className)}>{children}</div>
}

/**
 * CardFooter - Footer with actions
 */
export function CardFooter({ children, className }) {
  return <div className={cn('mt-4 flex items-center gap-3', className)}>{children}</div>
}

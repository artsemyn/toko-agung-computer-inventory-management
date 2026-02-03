import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

/**
 * Header component for page titles and breadcrumbs
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Optional page description
 * @param {React.ReactNode} props.action - Optional action button/component
 * @param {Array<string>} props.breadcrumbs - Optional breadcrumb array
 * @param {string} props.className - Additional CSS classes
 */
export function Header({ title, description, action, breadcrumbs, className }) {
  return (
    <header className={cn('border-b border-border bg-card px-6 py-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="w-4 h-4" />}
                  <span className={i === breadcrumbs.length - 1 ? 'text-foreground font-medium' : ''}>
                    {crumb}
                  </span>
                </div>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

/**
 * QuickActionCard component for dashboard quick actions
 *
 * @param {Object} props
 * @param {string} props.title - Action title
 * @param {string} props.description - Optional action type/description
 * @param {React.Component} props.icon - Lucide icon component
 * @param {'primary' | 'accent' | 'success'} props.variant - Color variant
 * @param {Function} props.onClick - Click handler (for button behavior)
 * @param {string} props.href - Link destination (for link behavior)
 * @param {string} props.className - Additional CSS classes
 */
export function QuickActionCard({
  title,
  description,
  icon: Icon,
  variant = 'primary',
  onClick,
  href,
  className
}) {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-accent/10 text-accent'
  }

  const content = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', variants[variant])}>
          <Icon className="w-8 h-8" />
        </div>
      </div>

      <div className="flex-1">
        {description && (
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {description}
          </p>
        )}
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      </div>

      <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
        <span>Buka</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </>
  )

  const cardClassName = cn(
    'group bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col h-full',
    className
  )

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cn(cardClassName, 'text-left')}>
      {content}
    </button>
  )
}

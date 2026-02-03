'use client'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { X, CheckCircle, XCircle, Info } from 'lucide-react'

/**
 * Toast Container Component
 * Displays all active toasts
 * Auto-included when you use ToastProvider
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

/**
 * Individual Toast Component
 */
function Toast({ toast, onClose }) {
  const { variant, title, description } = toast

  const variants = {
    success: {
      icon: CheckCircle,
      className: 'bg-primary/10 border-primary text-primary',
      iconColor: 'text-primary'
    },
    error: {
      icon: XCircle,
      className: 'bg-destructive/10 border-destructive text-destructive',
      iconColor: 'text-destructive'
    },
    info: {
      icon: Info,
      className: 'bg-accent/10 border-accent text-accent',
      iconColor: 'text-accent'
    }
  }

  const config = variants[variant] || variants.info
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right duration-300',
        'bg-card',
        config.className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)} />

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

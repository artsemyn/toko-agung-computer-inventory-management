'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

/**
 * Select dropdown component
 *
 * @param {Object} props
 * @param {string} props.label - Label text (optional)
 * @param {string} props.error - Error message (shows error state)
 * @param {Array<{value: string, label: string}>} props.options - Dropdown options
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder option text
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.className - Additional CSS classes
 */
export function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  placeholder = 'Pilih...',
  disabled = false,
  required = false,
  name,
  id,
  className,
  ...props
}) {
  // Generate unique ID if not provided
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`

  const baseStyles = 'w-full px-4 py-3 pr-10 rounded-lg border text-foreground transition-all focus:outline-none focus:ring-2 appearance-none'

  const variantStyles = error
    ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
    : 'border-border focus:border-primary focus:ring-primary/20'

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed bg-muted'
    : 'bg-input cursor-pointer'

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Select wrapper (for custom chevron icon) */}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={cn(baseStyles, variantStyles, disabledStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {/* Placeholder option */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm text-destructive flex items-center gap-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

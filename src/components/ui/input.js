'use client'

import { cn } from '@/lib/utils'

/**
 * Input component with validation states
 *
 * @param {Object} props
 * @param {'text' | 'email' | 'number' | 'password' | 'url'} props.type - Input type
 * @param {string} props.label - Label text (optional)
 * @param {string} props.error - Error message (shows error state)
 * @param {string} props.helperText - Helper text below input
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.value - Controlled value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @param {number} props.min - Min value (for number type)
 * @param {number} props.max - Max value (for number type)
 * @param {number} props.step - Step value (for number type)
 * @param {string} props.className - Additional CSS classes
 */
export function Input({
  type = 'text',
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  value,
  onChange,
  placeholder,
  id,
  name,
  min,
  max,
  step,
  className,
  ...props
}) {
  // Generate unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`

  const baseStyles = 'w-full px-4 py-3 rounded-lg border text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2'

  const variantStyles = error
    ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
    : 'border-border focus:border-primary focus:ring-primary/20'

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed bg-muted'
    : 'bg-input'

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        className={cn(baseStyles, variantStyles, disabledStyles, className)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive flex items-center gap-1"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

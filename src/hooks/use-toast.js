'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

/**
 * Toast Provider Component
 * Wrap your app with this to enable toast notifications
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = 'info', duration = 3000 }) => {
    const id = Math.random().toString(36).substr(2, 9)

    const newToast = {
      id,
      title,
      description,
      variant,
      duration
    }

    setToasts((prev) => [...prev.slice(-2), newToast]) // Max 3 toasts

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

/**
 * useToast hook
 * Use this hook to trigger toast notifications
 *
 * @returns {{ toast: Function, toasts: Array, removeToast: Function }}
 *
 * @example
 * const { toast } = useToast()
 *
 * toast({
 *   title: 'Success',
 *   description: 'Your changes have been saved',
 *   variant: 'success'
 * })
 */
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}

'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast'

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </SessionProvider>
  )
}

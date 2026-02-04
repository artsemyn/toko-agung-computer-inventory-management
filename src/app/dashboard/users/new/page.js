'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { UserForm } from '@/components/user-form'
import { useToast } from '@/hooks/use-toast'
import { createUser } from '@/actions/user-actions'

/**
 * Add New User Page
 * Owner only - creates new user
 */
export default function NewUserPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Role guard: owner only
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/')
      return
    }

    if (session.user.role !== 'owner') {
      toast({
        title: 'Akses Ditolak',
        description: 'Hanya owner yang dapat menambah pengguna',
        variant: 'error'
      })
      router.push('/dashboard/users')
    }
  }, [session, status, router, toast])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)

    const result = await createUser(formData)

    if (result.success) {
      toast({
        title: 'Berhasil',
        description: 'Pengguna berhasil ditambahkan',
        variant: 'success'
      })
      router.push('/dashboard/users')
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsSubmitting(false)
  }

  // Show loading while checking auth
  if (status === 'loading' || !session || session.user.role !== 'owner') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <Header
        title="Tambah Pengguna"
        description="Tambahkan pengguna baru ke sistem"
      />

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <UserForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}

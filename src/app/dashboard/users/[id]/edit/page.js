'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { UserForm } from '@/components/user-form'
import { EmptyState } from '@/components/empty-state'
import { useToast } from '@/hooks/use-toast'
import { getUserById, updateUser } from '@/actions/user-actions'
import { UserX } from 'lucide-react'

/**
 * Edit User Page
 * Owner only - edits existing user
 */
export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const userId = params.id

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
        description: 'Hanya owner yang dapat mengedit pengguna',
        variant: 'error'
      })
      router.push('/dashboard/users')
    }
  }, [session, status, router, toast])

  // Fetch user data
  useEffect(() => {
    if (!session || session.user.role !== 'owner') return

    async function loadUser() {
      setIsLoading(true)
      const result = await getUserById(userId)

      if (result.success) {
        setUser(result.data)
      } else {
        setNotFound(true)
        toast({
          title: 'Gagal',
          description: result.error,
          variant: 'error'
        })
      }

      setIsLoading(false)
    }

    loadUser()
  }, [userId, session, toast])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)

    const result = await updateUser(userId, formData)

    if (result.success) {
      toast({
        title: 'Berhasil',
        description: 'Pengguna berhasil diperbarui',
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

  // Show loading while checking auth or fetching user
  if (status === 'loading' || !session || session.user.role !== 'owner' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  // Show not found state
  if (notFound || !user) {
    return (
      <div className="space-y-6">
        <Header
          title="Edit Pengguna"
          description="Pengguna tidak ditemukan"
        />
        <EmptyState
          icon={UserX}
          title="Pengguna Tidak Ditemukan"
          description="Pengguna yang Anda cari mungkin sudah dihapus atau tidak ada"
          action={
            <button
              onClick={() => router.push('/dashboard/users')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Kembali ke Daftar Pengguna
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <Header
        title="Edit Pengguna"
        description={`Memperbarui informasi: ${user.name}`}
      />

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <UserForm
          mode="edit"
          initialData={user}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}

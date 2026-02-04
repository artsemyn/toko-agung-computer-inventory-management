'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { UserTable } from '@/components/user-table'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getUsers } from '@/actions/user-actions'
import { Plus } from 'lucide-react'

/**
 * User Management Page
 * Owner only - list users, toggle active/inactive
 */
export default function UsersPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
        description: 'Hanya owner yang dapat mengakses halaman ini',
        variant: 'error'
      })
      router.push('/dashboard')
    }
  }, [session, status, router, toast])

  // Load users
  useEffect(() => {
    if (!session || session.user.role !== 'owner') return

    loadUsers()
  }, [session])

  async function loadUsers() {
    setIsLoading(true)
    const result = await getUsers()
    if (result.success) {
      setUsers(result.data)
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }
    setIsLoading(false)
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
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Manajemen Pengguna"
        description="Kelola akun pengguna dan hak akses"
        action={
          <Link href="/dashboard/users/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pengguna
            </Button>
          </Link>
        }
      />

      {/* User Table */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Memuat data...</div>
      ) : (
        <UserTable
          users={users}
          currentUserId={session.user.id}
          onUpdate={loadUsers}
        />
      )}
    </div>
  )
}

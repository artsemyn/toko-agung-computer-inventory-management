'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { EmptyState } from '@/components/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { Pencil, Power, PowerOff, Users } from 'lucide-react'
import { toggleUserActive } from '@/actions/user-actions'
import { useToast } from '@/hooks/use-toast'

/**
 * UserTable Component
 * Display users list with edit and toggle active actions
 *
 * @param {Object} props
 * @param {Array} props.users - Array of users
 * @param {string} props.currentUserId - Current logged-in user ID (to prevent self-deactivation)
 * @param {Function} props.onUpdate - Callback after user updated
 */
export function UserTable({ users, currentUserId, onUpdate }) {
  const { toast } = useToast()
  const [isToggling, setIsToggling] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Role badge variants
  const getRoleBadge = (role) => {
    const roleConfig = {
      owner: { label: 'Owner', variant: 'primary' },
      gudang: { label: 'Gudang', variant: 'accent' },
      kasir: { label: 'Kasir', variant: 'neutral' }
    }
    return roleConfig[role] || { label: role, variant: 'neutral' }
  }

  // Handle toggle active confirmation
  const handleToggleClick = (user) => {
    // Prevent self-deactivation UI check
    if (user.id === currentUserId && user.isActive) {
      toast({
        title: 'Tidak Diizinkan',
        description: 'Anda tidak dapat menonaktifkan akun Anda sendiri',
        variant: 'error'
      })
      return
    }

    setSelectedUser(user)
    setShowConfirmModal(true)
  }

  // Confirm toggle active
  const handleConfirmToggle = async () => {
    if (!selectedUser) return

    setIsToggling(selectedUser.id)
    setShowConfirmModal(false)

    const result = await toggleUserActive(selectedUser.id)

    if (result.success) {
      toast({
        title: 'Berhasil',
        description: `Status pengguna ${selectedUser.isActive ? 'dinonaktifkan' : 'diaktifkan'}`,
        variant: 'success'
      })
      onUpdate()
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsToggling(null)
    setSelectedUser(null)
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        message="Belum ada pengguna"
        description="Tambahkan pengguna baru untuk mulai mengelola akses"
      />
    )
  }

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role)
                const isSelf = user.id === currentUserId

                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name}
                      {isSelf && (
                        <Badge variant="primary" size="sm" className="ml-2">
                          Anda
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleBadge.variant}>{roleBadge.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'primary' : 'neutral'}>
                        {user.isActive ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <Link href={`/dashboard/users/${user.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                            <span className="sr-only">Edit {user.name}</span>
                          </Button>
                        </Link>

                        {/* Toggle Active Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleClick(user)}
                          disabled={isToggling === user.id}
                          className={
                            user.isActive
                              ? 'text-destructive hover:text-destructive hover:bg-destructive/10'
                              : 'text-primary hover:text-primary hover:bg-primary/10'
                          }
                        >
                          {user.isActive ? (
                            <PowerOff className="w-4 h-4" />
                          ) : (
                            <Power className="w-4 h-4" />
                          )}
                          <span className="sr-only">
                            {user.isActive ? 'Nonaktifkan' : 'Aktifkan'} {user.name}
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title={selectedUser?.isActive ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowConfirmModal(false)}>
              Batal
            </Button>
            <Button
              variant={selectedUser?.isActive ? 'destructive' : 'primary'}
              onClick={handleConfirmToggle}
            >
              {selectedUser?.isActive ? 'Nonaktifkan' : 'Aktifkan'}
            </Button>
          </>
        }
      >
        <p>
          Yakin ingin {selectedUser?.isActive ? 'menonaktifkan' : 'mengaktifkan'} pengguna{' '}
          <strong>{selectedUser?.name}</strong>?
        </p>
        {selectedUser?.isActive && (
          <p className="text-muted-foreground mt-2">
            Pengguna yang dinonaktifkan tidak akan bisa login ke sistem.
          </p>
        )}
      </Modal>
    </>
  )
}

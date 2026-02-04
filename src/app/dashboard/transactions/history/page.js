'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TransactionHistoryTable } from '@/components/transaction-history-table'
import { useToast } from '@/hooks/use-toast'

/**
 * Transaction History Page
 * Owner-only page for viewing all transaction history
 */
export default function TransactionHistoryPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()

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
        description: 'Hanya owner yang dapat melihat riwayat transaksi',
        variant: 'error'
      })
      router.push('/dashboard/transactions')
    }
  }, [session, status, router, toast])

  // Show loading while checking auth
  if (status === 'loading' || !session || session.user.role !== 'owner') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Header
        title="Riwayat Transaksi"
        description="Lihat semua transaksi penjualan yang telah dilakukan"
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionHistoryTable />
        </CardContent>
      </Card>
    </div>
  )
}

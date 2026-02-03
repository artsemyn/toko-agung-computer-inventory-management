'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { StatCard } from '@/components/stat-card'
import { QuickActionCard } from '@/components/quick-action-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import {
  Package,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  Plus,
  RefreshCw,
  Receipt
} from 'lucide-react'
import { formatRupiah, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - will be replaced with real data later
  const stats = {
    totalProduk: 245,
    stokRendah: 8,
    transaksiHariIni: 12,
    revenueHariIni: 15750000
  }

  const recentTransactions = [
    { id: 1, product: 'AMD Ryzen 5 5600X', qty: 2, total: 5000000, time: new Date(Date.now() - 1000 * 60 * 30), cashier: 'Staff Kasir' },
    { id: 2, product: 'NVIDIA RTX 4060', qty: 1, total: 5500000, time: new Date(Date.now() - 1000 * 60 * 90), cashier: 'Staff Kasir' },
    { id: 3, product: 'Kingston DDR4 16GB', qty: 4, total: 2600000, time: new Date(Date.now() - 1000 * 60 * 120), cashier: 'Staff Kasir' },
  ]

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Header
        title={`Selamat Datang, ${session?.user?.name || 'User'}!`}
        description="Dashboard overview sistem inventory management"
      />

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Statistik</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Skeleton variant="card" count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Produk"
                value={stats.totalProduk}
                description="produk terdaftar"
                icon={Package}
                variant="primary"
                trend={{ value: 12, direction: 'up' }}
              />
              <StatCard
                title="Stok Rendah"
                value={stats.stokRendah}
                description="perlu restock"
                icon={AlertCircle}
                variant="accent"
                trend={{ value: 3, direction: 'down' }}
              />
              <StatCard
                title="Transaksi Hari Ini"
                value={stats.transaksiHariIni}
                description="transaksi selesai"
                icon={ShoppingCart}
                variant="primary"
                trend={{ value: 8, direction: 'up' }}
              />
              <StatCard
                title="Revenue Hari Ini"
                value={formatRupiah(stats.revenueHariIni)}
                description="total penjualan"
                icon={DollarSign}
                variant="primary"
                trend={{ value: 15, direction: 'up' }}
              />
            </div>
          )}
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton variant="card" count={3} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickActionCard
                title="Tambah Produk"
                description="Manajemen Produk"
                icon={Plus}
                variant="primary"
                href="/dashboard/products/new"
              />
              <QuickActionCard
                title="Update Stok"
                description="Manajemen Stok"
                icon={RefreshCw}
                variant="accent"
                href="/dashboard/stock"
              />
              <QuickActionCard
                title="Input Transaksi"
                description="Transaksi Penjualan"
                icon={Receipt}
                variant="primary"
                href="/dashboard/transactions"
              />
            </div>
          )}
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Transaksi Terbaru</h2>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              Lihat Semua
            </Button>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <Skeleton variant="table" count={3} />
              </CardContent>
            </Card>
          ) : recentTransactions.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  icon={ShoppingCart}
                  title="Belum ada transaksi"
                  description="Transaksi hari ini akan muncul di sini"
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {transaction.product}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {transaction.qty} unit • {formatDate(transaction.time)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground mb-1">
                          {formatRupiah(transaction.total)}
                        </p>
                        <Badge variant="neutral" size="sm">
                          {transaction.cashier}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}

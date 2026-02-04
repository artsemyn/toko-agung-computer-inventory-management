'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { StatCard } from '@/components/stat-card'
import { QuickActionCard } from '@/components/quick-action-card'
import { Card, CardContent } from '@/components/ui/card'
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
import { getProducts } from '@/actions/product-actions'
import { getTransactionStats, getTransactions } from '@/actions/transaction-actions'
import { useToast } from '@/hooks/use-toast'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProduk: 0,
    stokRendah: 0,
    transaksiHariIni: 0,
    revenueHariIni: 0
  })
  const [recentTransactions, setRecentTransactions] = useState([])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/')
    }
  }, [session, status, router])

  // Fetch real data from database
  useEffect(() => {
    async function fetchDashboardData() {
      if (!session) return

      setIsLoading(true)

      try {
        // Fetch products data
        const productsResult = await getProducts()
        let totalProduk = 0
        let stokRendah = 0

        if (productsResult.success) {
          const products = productsResult.data
          totalProduk = products.length

          // Count products with low stock (stock <= minStock)
          stokRendah = products.filter(p => p.stock <= p.minStock).length
        }

        // Fetch transaction stats (owner only)
        let transaksiHariIni = 0
        let revenueHariIni = 0

        if (session.user.role === 'owner') {
          const statsResult = await getTransactionStats()
          if (statsResult.success) {
            transaksiHariIni = statsResult.data.todayCount
            revenueHariIni = statsResult.data.todayRevenue
          }

          // Fetch recent transactions (limit 5)
          const transactionsResult = await getTransactions({ limit: 5 })
          if (transactionsResult.success) {
            setRecentTransactions(transactionsResult.data)
          }
        }

        setStats({
          totalProduk,
          stokRendah,
          transaksiHariIni,
          revenueHariIni
        })
      } catch (error) {
        console.error('Dashboard data fetch error:', error)
        toast({
          title: 'Gagal memuat data',
          description: 'Terjadi kesalahan saat mengambil data dashboard',
          variant: 'error'
        })
      }

      setIsLoading(false)
    }

    fetchDashboardData()
  }, [session, toast])

  // Show loading while checking auth
  if (status === 'loading' || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  const isOwner = session.user.role === 'owner'

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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Produk"
                value={stats.totalProduk}
                description="produk terdaftar"
                icon={Package}
                variant="primary"
              />
              <StatCard
                title="Stok Rendah"
                value={stats.stokRendah}
                description="perlu restock"
                icon={AlertCircle}
                variant="accent"
              />
              {isOwner && (
                <>
                  <StatCard
                    title="Transaksi Hari Ini"
                    value={stats.transaksiHariIni}
                    description="transaksi selesai"
                    icon={ShoppingCart}
                    variant="primary"
                  />
                  <StatCard
                    title="Revenue Hari Ini"
                    value={formatRupiah(stats.revenueHariIni)}
                    description="total penjualan"
                    icon={DollarSign}
                    variant="primary"
                  />
                </>
              )}
            </div>
          )}
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isOwner && (
                <QuickActionCard
                  title="Tambah Produk"
                  description="Manajemen Produk"
                  icon={Plus}
                  variant="primary"
                  href="/dashboard/products/new"
                />
              )}
              {(isOwner || session.user.role === 'gudang') && (
                <QuickActionCard
                  title="Update Stok"
                  description="Manajemen Stok"
                  icon={RefreshCw}
                  variant="accent"
                  href="/dashboard/stock"
                />
              )}
              {(isOwner || session.user.role === 'kasir') && (
                <QuickActionCard
                  title="Input Transaksi"
                  description="Transaksi Penjualan"
                  icon={Receipt}
                  variant="primary"
                  href="/dashboard/transactions"
                />
              )}
            </div>
          )}
        </section>

        {/* Recent Transactions (Owner Only) */}
        {isOwner && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Transaksi Terbaru</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/transactions/history')}
              >
                Lihat Semua
              </Button>
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : recentTransactions.length === 0 ? (
              <Card>
                <CardContent className="p-6">
                  <EmptyState
                    icon={ShoppingCart}
                    message="Belum ada transaksi"
                    description="Transaksi yang dilakukan akan muncul di sini"
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
                            {transaction.productName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {transaction.qty} unit • {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground mb-1">
                            {formatRupiah(transaction.totalPrice)}
                          </p>
                          <Badge variant="neutral" size="sm">
                            {transaction.cashierName}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

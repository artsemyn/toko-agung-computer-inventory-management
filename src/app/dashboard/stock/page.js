'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StockForm } from '@/components/stock-form'
import { StockLogTable } from '@/components/stock-log-table'
import { getLowStockProducts } from '@/actions/stock-actions'
import { getStockStatus } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * Stock Management Page
 * Owner + Gudang only
 * Features: Low stock alerts, stock adjustment form, stock history
 */
export default function StockPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [isLoadingLowStock, setIsLoadingLowStock] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Role guard: owner and gudang only
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/')
      return
    }

    if (session.user.role !== 'owner' && session.user.role !== 'gudang') {
      toast({
        title: 'Akses Ditolak',
        description: 'Hanya owner dan petugas gudang yang dapat mengakses halaman ini',
        variant: 'error'
      })
      router.push('/dashboard')
    }
  }, [session, status, router, toast])

  // Load low stock products
  useEffect(() => {
    if (!session || (session.user.role !== 'owner' && session.user.role !== 'gudang')) return

    async function loadLowStock() {
      setIsLoadingLowStock(true)
      const result = await getLowStockProducts()
      if (result.success) {
        setLowStockProducts(result.data)
      } else {
        toast({
          title: 'Gagal',
          description: result.error,
          variant: 'error'
        })
      }
      setIsLoadingLowStock(false)
    }
    loadLowStock()
  }, [session, refreshTrigger, toast])

  const handleStockUpdateSuccess = () => {
    // Refresh both low stock alerts and stock log table
    setRefreshTrigger(prev => prev + 1)
  }

  // Show loading while checking auth
  if (status === 'loading' || !session || (session.user.role !== 'owner' && session.user.role !== 'gudang')) {
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
        title="Manajemen Stok"
        description="Kelola stok produk dan lihat riwayat perubahan"
      />

      {/* Low Stock Alerts */}
      {isLoadingLowStock ? (
        <Card className="border-accent">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center">Memuat peringatan stok...</p>
          </CardContent>
        </Card>
      ) : lowStockProducts.length > 0 ? (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <AlertTriangle className="w-5 h-5" />
              Peringatan Stok Rendah ({lowStockProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map(product => {
                const stockStatus = getStockStatus(product.stock, product.minStock)

                return (
                  <div
                    key={product.id}
                    className="p-4 bg-accent/10 rounded-lg border border-accent"
                  >
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.category} - {product.brand}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                      <span className="text-sm font-medium">
                        {product.stock} unit
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (Min: {product.minStock})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Lokasi: {product.location}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Stock Form */}
      <Card>
        <CardHeader>
          <CardTitle>Perbarui Stok</CardTitle>
        </CardHeader>
        <CardContent>
          <StockForm onSuccess={handleStockUpdateSuccess} />
        </CardContent>
      </Card>

      {/* Stock History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Perubahan Stok</CardTitle>
        </CardHeader>
        <CardContent>
          <StockLogTable refreshTrigger={refreshTrigger} />
        </CardContent>
      </Card>
    </div>
  )
}

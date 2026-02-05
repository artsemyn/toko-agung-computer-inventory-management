'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/actions/product-actions'
import { formatRupiah, getStockStatus } from '@/lib/utils'
import { Clock, Package } from 'lucide-react'

export default function DisplayPage() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  // Fetch products
  const fetchProducts = async () => {
    const result = await getProducts()
    if (result.success) {
      setProducts(result.data)
    }
    setLoading(false)
  }

  // Initial fetch and auto-refresh every 30 seconds
  useEffect(() => {
    fetchProducts()
    const interval = setInterval(fetchProducts, 30000) // 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))]

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-2xl text-muted-foreground">Memuat data produk...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Store Name and Clock */}
      <header className="bg-primary text-primary-foreground py-8 px-6 shadow-lg">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2">Toko Agung Computer</h1>
              <p className="text-xl opacity-90">Daftar Harga & Ketersediaan Produk</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-3 mb-2">
                <Clock className="w-8 h-8" />
                <div className="text-6xl font-bold tabular-nums">
                  {formatTime(currentTime)}
                </div>
              </div>
              <div className="text-lg opacity-90">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter Tabs */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-lg font-semibold text-lg transition-all
                  ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-[1920px] mx-auto px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-3xl text-muted-foreground">
              Tidak ada produk di kategori ini
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock, product.minStock)
              return (
                <div
                  key={product.id}
                  className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  {/* Category & Brand */}
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-medium">
                      {product.brand}
                    </span>
                  </div>

                  {/* Price - Large and prominent */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Harga</p>
                    <p className="text-4xl font-bold text-primary">
                      {formatRupiah(product.price)}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span className={`
                        inline-block px-4 py-2 rounded-lg font-bold text-lg
                        ${stockStatus.className}
                      `}>
                        {stockStatus.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Stok</p>
                      <p className="text-3xl font-bold text-foreground">
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Lokasi Rak</p>
                    <p className="text-lg font-semibold text-foreground">{product.location}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer with refresh indicator */}
      <footer className="bg-card border-t border-border py-4 px-6 mt-8">
        <div className="max-w-[1920px] mx-auto text-center">
          <p className="text-muted-foreground">
            Data diperbarui otomatis setiap 30 detik • Terakhir diperbarui: {formatTime(currentTime)}
          </p>
        </div>
      </footer>
    </div>
  )
}

import { getProducts } from '@/actions/product-actions'
import DisplayContent from '@/components/display-content'

// Revalidate every 30 seconds
export const revalidate = 30

export const metadata = {
  title: 'Display Toko - Toko Agung Computer',
  description: 'Daftar harga dan ketersediaan stok produk komputer'
}

export default async function DisplayPage() {
  // Fetch products from database
  const result = await getProducts()

  // If fetch failed, show error state
  if (!result.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-destructive mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Gagal Memuat Data</h2>
          <p className="text-xl text-muted-foreground">{result.error}</p>
        </div>
      </div>
    )
  }

  // Pass products to client component
  return <DisplayContent initialProducts={result.data} />
}

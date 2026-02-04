'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DigitalClock from '@/components/digital-clock'
import ProductGrid from '@/components/product-grid'
import { Monitor } from 'lucide-react'

const CATEGORIES = [
  'All',
  'Processor',
  'VGA',
  'RAM',
  'Storage',
  'Mouse',
  'Keyboard',
  'Monitor'
]

export default function DisplayContent({ initialProducts }) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Auto-refresh every 30 seconds using router.refresh()
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh() // This will re-fetch server component data
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [router])

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? initialProducts
    : initialProducts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Store Name & Clock */}
      <header className="bg-card border-b-4 border-primary shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Store Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <Monitor className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Toko Agung Computer
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Daftar Harga & Ketersediaan Stok
                </p>
              </div>
            </div>

            {/* Digital Clock */}
            <DigitalClock />
          </div>
        </div>
      </header>

      {/* Category Filter Tabs */}
      <div className="bg-card border-b-2 border-border sticky top-[128px] md:top-[132px] z-40 shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => {
              const count = category === 'All'
                ? initialProducts.length
                : initialProducts.filter(p => p.category === category).length

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 rounded-xl font-semibold text-lg whitespace-nowrap transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }
                  `}
                >
                  {category}
                  <span className="ml-2 text-sm opacity-75">({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto px-6 py-8">
        <ProductGrid products={filteredProducts} />
      </main>

      {/* Footer with Auto-refresh indicator */}
      <footer className="bg-card border-t-2 border-border py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-lg">Auto-refresh setiap 30 detik</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

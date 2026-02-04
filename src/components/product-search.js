'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/empty-state'
import { getProducts } from '@/actions/product-actions'
import { formatRupiah, getStockStatus } from '@/lib/utils'
import { Search, ShoppingCart } from 'lucide-react'

// Product categories (same as ProductTable)
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

/**
 * ProductSearch Component
 * Search and select products to add to cart
 *
 * @param {Object} props
 * @param {Function} props.onAddToCart - Callback(product, qty) when adding to cart
 */
export function ProductSearch({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [quantities, setQuantities] = useState({}) // Track qty input per product

  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      const result = await getProducts()
      if (result.success) {
        setProducts(result.data)
        setFilteredProducts(result.data)
      }
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  // Filter products by search and category
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search query (name or brand)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory])

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1

    // Validate qty
    if (qty < 1) {
      return
    }

    if (qty > product.stock) {
      return
    }

    // Call parent callback
    onAddToCart(product, qty)

    // Reset qty input for this product
    setQuantities(prev => ({ ...prev, [product.id]: 1 }))
  }

  const handleQtyChange = (productId, value) => {
    const qty = parseInt(value) || 1
    setQuantities(prev => ({ ...prev, [productId]: qty }))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded-lg" />
        <div className="h-10 bg-muted animate-pulse rounded-lg" />
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari produk berdasarkan nama atau brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <EmptyState
            message="Tidak ada produk ditemukan"
            description="Coba ubah pencarian atau filter kategori"
          />
        ) : (
          filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock, product.minStock)
            const currentQty = quantities[product.id] || 1

            return (
              <div
                key={product.id}
                className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {product.brand}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-bold text-lg text-primary">
                        {formatRupiah(product.price)}
                      </span>
                      <Badge variant={stockStatus.color}>
                        Stok: {product.stock}
                      </Badge>
                    </div>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={currentQty}
                      onChange={(e) => handleQtyChange(product.id, e.target.value)}
                      disabled={product.stock === 0}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0 || currentQty > product.stock}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="sr-only">Tambah ke keranjang</span>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

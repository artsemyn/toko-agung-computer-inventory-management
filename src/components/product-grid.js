'use client'

import { Badge } from '@/components/ui/badge'
import { getStockStatus, formatRupiah } from '@/lib/utils'

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl text-muted-foreground mb-4">📦</div>
        <p className="text-3xl text-muted-foreground">Tidak ada produk tersedia</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock, product.minStock)

        return (
          <div
            key={product.id}
            className="bg-card rounded-2xl border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:shadow-2xl"
          >
            {/* Category & Brand */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-sm text-muted-foreground">{product.brand}</span>
            </div>

            {/* Product Name */}
            <h3 className="text-2xl font-bold text-foreground mb-4 line-clamp-2 min-h-[3.5rem]">
              {product.name}
            </h3>

            {/* Stock Status */}
            <div className="mb-4">
              <Badge variant={stockStatus.color} className="text-base px-4 py-1.5">
                {stockStatus.label}
              </Badge>
              {product.stock > 0 && (
                <span className="ml-3 text-xl text-muted-foreground">
                  Stok: {product.stock}
                </span>
              )}
            </div>

            {/* Price - Large Display */}
            <div className="mt-6 pt-4 border-t-2 border-border">
              <div className="text-sm text-muted-foreground mb-1">Harga</div>
              <div className="text-4xl font-bold text-primary">
                {formatRupiah(product.price)}
              </div>
            </div>

            {/* Location */}
            <div className="mt-4 text-sm text-muted-foreground">
              📍 Lokasi: <span className="font-medium text-foreground">{product.location}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { addStock, reduceStock, adjustStock } from '@/actions/stock-actions'
import { getProducts } from '@/actions/product-actions'

/**
 * StockForm Component
 * Tabbed form for Add/Reduce/Adjust stock operations
 *
 * @param {Object} props
 * @param {Function} props.onSuccess - Callback fired after successful stock update
 */
export function StockForm({ onSuccess }) {
  const [activeTab, setActiveTab] = useState('add') // 'add' | 'reduce' | 'adjust'
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      const result = await getProducts()
      if (result.success) {
        setProducts(result.data)
      } else {
        toast({
          title: 'Gagal',
          description: result.error,
          variant: 'error'
        })
      }
      setIsLoading(false)
    }
    loadProducts()
  }, [toast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const productId = e.target.productId.value
    const qty = parseInt(e.target.qty?.value) || 0
    const newStock = parseInt(e.target.newStock?.value) || 0
    const notes = e.target.notes.value.trim()

    let result
    if (activeTab === 'add') {
      result = await addStock(productId, qty, notes)
    } else if (activeTab === 'reduce') {
      result = await reduceStock(productId, qty, notes)
    } else {
      result = await adjustStock(productId, newStock, notes)
    }

    if (result.success) {
      toast({
        title: 'Berhasil',
        description: 'Stok berhasil diperbarui',
        variant: 'success'
      })
      e.target.reset()
      setSelectedProduct(null)
      onSuccess && onSuccess()
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsSubmitting(false)
  }

  const handleProductChange = (e) => {
    const productId = e.target.value
    const product = products.find(p => p.id === productId)
    setSelectedProduct(product)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedProduct(null)
  }

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Memuat produk...</div>
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 border-b border-border mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('add')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'add'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Tambah Stok
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('reduce')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'reduce'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Kurangi Stok
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('adjust')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'adjust'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sesuaikan Stok
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Select */}
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-foreground mb-2">
            Produk<span className="text-destructive ml-1">*</span>
          </label>
          <select
            id="productId"
            name="productId"
            value={selectedProduct?.id || ''}
            onChange={handleProductChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-input text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
          >
            <option value="" disabled>Pilih produk...</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Stok: {p.stock})
              </option>
            ))}
          </select>
        </div>

        {/* Display current stock info */}
        {selectedProduct && (
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Stok saat ini:</p>
                <p className="text-lg font-semibold">{selectedProduct.stock} unit</p>
              </div>
              <div>
                <p className="text-muted-foreground">Minimum stok:</p>
                <p className="text-lg font-semibold">{selectedProduct.minStock} unit</p>
              </div>
            </div>
          </div>
        )}

        {/* Qty input (for add/reduce modes) */}
        {(activeTab === 'add' || activeTab === 'reduce') && (
          <Input
            name="qty"
            label={activeTab === 'add' ? 'Jumlah Tambahan' : 'Jumlah Pengurangan'}
            type="number"
            min={1}
            max={activeTab === 'reduce' ? selectedProduct?.stock : undefined}
            required
            disabled={isSubmitting || !selectedProduct}
            placeholder="Masukkan jumlah"
          />
        )}

        {/* New stock input (for adjust mode) */}
        {activeTab === 'adjust' && (
          <Input
            name="newStock"
            label="Stok Baru"
            type="number"
            min={0}
            required
            disabled={isSubmitting || !selectedProduct}
            placeholder="Masukkan stok baru"
            helperText={
              selectedProduct
                ? `Stok saat ini: ${selectedProduct.stock} unit. Masukkan nilai stok baru.`
                : undefined
            }
          />
        )}

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
            Catatan
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Keterangan tambahan (opsional)"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !selectedProduct}
            isLoading={isSubmitting}
          >
            {activeTab === 'add' && 'Tambah Stok'}
            {activeTab === 'reduce' && 'Kurangi Stok'}
            {activeTab === 'adjust' && 'Sesuaikan Stok'}
          </Button>

          {selectedProduct && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSelectedProduct(null)
                document.querySelector('form').reset()
              }}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

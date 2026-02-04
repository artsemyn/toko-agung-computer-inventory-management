'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductSearch } from '@/components/product-search'
import { CartTable } from '@/components/cart-table'
import { TransactionReceipt } from '@/components/transaction-receipt'
import { CartProvider, useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { processTransaction } from '@/actions/transaction-actions'
import { formatRupiah } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

/**
 * POS Page Content (must be wrapped in CartProvider)
 */
function POSPageContent() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const {
    cartItems,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getCartSummary
  } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [receiptData, setReceiptData] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  // Role guard: owner + kasir only
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/')
      return
    }

    if (session.user.role !== 'owner' && session.user.role !== 'kasir') {
      toast({
        title: 'Akses Ditolak',
        description: 'Hanya owner dan kasir yang dapat mengakses halaman ini',
        variant: 'error'
      })
      router.push('/dashboard')
    }
  }, [session, status, router, toast])

  // Add product to cart handler
  const handleAddToCart = (product, qty) => {
    addToCart(product, qty)
    toast({
      title: 'Ditambahkan ke keranjang',
      description: `${product.name} (${qty} unit)`,
      variant: 'success',
      duration: 2000
    })
  }

  // Process transaction handler
  const handleProcessTransaction = async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Keranjang Kosong',
        description: 'Tambahkan produk ke keranjang terlebih dahulu',
        variant: 'error'
      })
      return
    }

    // Validate no qty exceeds maxStock
    const hasExceededQty = cartItems.some(item => item.qty > item.maxStock)
    if (hasExceededQty) {
      toast({
        title: 'Jumlah Melebihi Stok',
        description: 'Periksa kembali jumlah produk yang melebihi stok tersedia',
        variant: 'error'
      })
      return
    }

    setIsProcessing(true)

    // Prepare cart items for server action
    const items = cartItems.map(item => ({
      productId: item.productId,
      qty: item.qty
    }))

    const result = await processTransaction(items)

    if (result.success) {
      setReceiptData(result.data)
      setShowReceipt(true)
      toast({
        title: 'Transaksi Berhasil',
        description: `${result.data.totalItems} item terjual`,
        variant: 'success'
      })
    } else {
      toast({
        title: 'Transaksi Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsProcessing(false)
  }

  // Close receipt and clear cart
  const handleCloseReceipt = () => {
    setShowReceipt(false)
    clearCart()
    setReceiptData(null)
  }

  const { totalItems, subtotal } = getCartSummary()

  // Show loading while checking auth
  if (
    status === 'loading' ||
    !session ||
    (session.user.role !== 'owner' && session.user.role !== 'kasir')
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Header
        title="Point of Sale"
        description="Tambahkan produk ke keranjang dan proses transaksi penjualan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Product Search */}
        <Card>
          <CardHeader>
            <CardTitle>Pilih Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductSearch onAddToCart={handleAddToCart} />
          </CardContent>
        </Card>

        {/* Right: Cart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Keranjang ({totalItems} item)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CartTable
              cartItems={cartItems}
              onUpdateQty={updateCartQty}
              onRemove={removeFromCart}
            />

            {cartItems.length > 0 && (
              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleProcessTransaction}
                  disabled={isProcessing}
                  isLoading={isProcessing}
                  className="w-full"
                >
                  Proses Transaksi ({formatRupiah(subtotal)})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Receipt Modal */}
      <TransactionReceipt
        isOpen={showReceipt}
        onClose={handleCloseReceipt}
        receiptData={receiptData}
      />
    </div>
  )
}

/**
 * POS Page (wrapped in CartProvider)
 */
export default function POSPage() {
  return (
    <CartProvider>
      <POSPageContent />
    </CartProvider>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { formatRupiah } from '@/lib/utils'
import { Trash2, ShoppingCart } from 'lucide-react'

/**
 * CartTable Component
 * Display cart items with editable qty and remove action
 *
 * @param {Object} props
 * @param {Array} props.cartItems - Array of cart items
 * @param {Function} props.onUpdateQty - Callback(productId, newQty)
 * @param {Function} props.onRemove - Callback(productId)
 */
export function CartTable({ cartItems, onUpdateQty, onRemove }) {
  const handleQtyChange = (productId, value) => {
    const qty = parseInt(value) || 0
    onUpdateQty(productId, qty)
  }

  // Calculate grand total
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  )

  if (cartItems.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        message="Keranjang kosong"
        description="Tambahkan produk ke keranjang untuk memulai transaksi"
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead className="text-right">Harga Satuan</TableHead>
              <TableHead className="text-center w-32">Qty</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => {
              const subtotal = item.unitPrice * item.qty
              const isQtyExceeded = item.qty > item.maxStock

              return (
                <TableRow key={item.productId}>
                  <TableCell>
                    <div className="font-medium">{item.productName}</div>
                    {isQtyExceeded && (
                      <div className="text-xs text-destructive mt-1">
                        Melebihi stok tersedia ({item.maxStock} unit)
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(item.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={1}
                      max={item.maxStock}
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item.productId, e.target.value)}
                      className={`text-center ${
                        isQtyExceeded ? 'border-destructive' : ''
                      }`}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatRupiah(subtotal)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(item.productId)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Hapus item</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Cart Summary */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div>
          <div className="text-sm text-muted-foreground">Total Item</div>
          <div className="font-semibold text-lg">
            {cartItems.reduce((sum, item) => sum + item.qty, 0)} unit
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Grand Total</div>
          <div className="font-bold text-2xl text-primary">
            {formatRupiah(grandTotal)}
          </div>
        </div>
      </div>
    </div>
  )
}

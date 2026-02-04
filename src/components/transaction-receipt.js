'use client'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { formatRupiah, formatDate } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'

/**
 * TransactionReceipt Component
 * Success modal showing transaction receipt
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Object} props.receiptData - { transactions, grandTotal, totalItems, transactionDate }
 */
export function TransactionReceipt({ isOpen, onClose, receiptData }) {
  if (!receiptData) {
    return null
  }

  const { transactions, grandTotal, totalItems, transactionDate } = receiptData

  // Get cashier name from first transaction (all have same cashier)
  const cashierName = transactions[0]?.cashierName || 'N/A'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Transaksi Berhasil</h2>
            <p className="text-sm text-muted-foreground">
              Terima kasih atas pembeliannya
            </p>
          </div>
        </div>
      }
      footer={
        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Transaction Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">Tanggal</div>
            <div className="font-medium">{formatDate(transactionDate)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Kasir</div>
            <div className="font-medium">{cashierName}</div>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="font-semibold mb-3">Detail Pembelian</h3>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {transaction.productName}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.qty}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatRupiah(transaction.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatRupiah(transaction.totalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Total Summary */}
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Item</span>
            <span className="font-medium">{totalItems} unit</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold">Grand Total</span>
            <span className="text-2xl font-bold text-primary">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
          Barang yang sudah dibeli tidak dapat dikembalikan
        </div>
      </div>
    </Modal>
  )
}

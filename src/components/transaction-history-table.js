'use client'

import { useState, useEffect } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
import { getTransactions } from '@/actions/transaction-actions'
import { formatRupiah, formatDate } from '@/lib/utils'
import { Receipt, RotateCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * TransactionHistoryTable Component
 * Display transaction history with date range filter
 *
 * @param {Object} props
 * @param {number} props.refreshTrigger - Optional trigger to force re-fetch
 */
export function TransactionHistoryTable({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { toast } = useToast()

  // Fetch transactions
  const fetchTransactions = async (filters = {}) => {
    setIsLoading(true)
    const result = await getTransactions(filters)

    if (result.success) {
      setTransactions(result.data)
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
      setTransactions([])
    }

    setIsLoading(false)
  }

  // Initial load
  useEffect(() => {
    fetchTransactions()
  }, [refreshTrigger])

  // Apply filters
  const handleFilter = () => {
    const filters = {}

    if (startDate) {
      filters.startDate = startDate
    }

    if (endDate) {
      filters.endDate = endDate
    }

    fetchTransactions(filters)
  }

  // Reset filters
  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    fetchTransactions()
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="date"
            label="Tanggal Mulai"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Pilih tanggal mulai"
          />
        </div>
        <div className="flex-1">
          <Input
            type="date"
            label="Tanggal Akhir"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Pilih tanggal akhir"
          />
        </div>
        <div className="flex gap-2 items-end">
          <Button variant="primary" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            <RotateCw className="w-4 h-4" />
            <span className="sr-only">Reset filter</span>
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <EmptyState
          icon={Receipt}
          message="Belum ada transaksi"
          description="Transaksi yang dilakukan akan muncul di sini"
        />
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Harga Satuan</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Kasir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.productName}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.qty} unit
                    </TableCell>
                    <TableCell className="text-right">
                      {formatRupiah(transaction.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatRupiah(transaction.totalPrice)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {transaction.cashierName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Footer */}
          <div className="p-4 bg-muted border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Total: {transactions.length} transaksi
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Pendapatan</div>
              <div className="text-lg font-bold text-primary">
                {formatRupiah(
                  transactions.reduce((sum, t) => sum + t.totalPrice, 0)
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

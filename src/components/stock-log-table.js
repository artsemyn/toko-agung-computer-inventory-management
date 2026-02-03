'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/empty-state'
import { getStockLogs } from '@/actions/stock-actions'
import { formatDate } from '@/lib/utils'
import { History } from 'lucide-react'

/**
 * StockLogTable Component
 * Displays stock change history with filters
 *
 * @param {Object} props
 * @param {number} props.refreshTrigger - Change this value to trigger refresh
 */
export function StockLogTable({ refreshTrigger = 0 }) {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')

  // Fetch logs
  useEffect(() => {
    async function loadLogs() {
      setIsLoading(true)
      const result = await getStockLogs()
      if (result.success) {
        setLogs(result.data)
      }
      setIsLoading(false)
    }
    loadLogs()
  }, [refreshTrigger])

  // Filter logs by changeType
  const filteredLogs = filterType === 'all'
    ? logs
    : logs.filter(log => log.changeType === filterType)

  // Change type badge config
  const getChangeTypeBadge = (changeType) => {
    const configs = {
      in: { label: 'Masuk', variant: 'primary' },
      out: { label: 'Keluar', variant: 'destructive' },
      adjustment: { label: 'Penyesuaian', variant: 'accent' },
      sale: { label: 'Penjualan', variant: 'neutral' }
    }
    return configs[changeType] || { label: changeType, variant: 'neutral' }
  }

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Memuat riwayat...</div>
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="filterType" className="block text-sm font-medium text-foreground mb-2">
            Filter Tipe
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Semua Tipe</option>
            <option value="in">Masuk</option>
            <option value="out">Keluar</option>
            <option value="adjustment">Penyesuaian</option>
            <option value="sale">Penjualan</option>
          </select>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Menampilkan {filteredLogs.length} dari {logs.length} riwayat
        </p>
      </div>

      {/* Table */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          icon={History}
          title={filterType === 'all' ? 'Belum ada riwayat stok' : 'Tidak ada riwayat dengan filter ini'}
          description={filterType === 'all' ? 'Riwayat perubahan stok akan muncul di sini' : 'Coba ubah filter atau lakukan operasi stok baru'}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Waktu</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Perubahan</TableHead>
              <TableHead>Stok Sebelum</TableHead>
              <TableHead>Stok Sesudah</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Catatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map(log => {
              const badge = getChangeTypeBadge(log.changeType)
              const isPositive = log.changeQty > 0

              return (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">
                    {formatDate(log.createdAt)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {log.productName}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badge.variant}>
                      {badge.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                      {isPositive ? '+' : ''}{log.changeQty}
                    </span>
                  </TableCell>
                  <TableCell>{log.prevStock}</TableCell>
                  <TableCell className="font-medium">{log.newStock}</TableCell>
                  <TableCell className="text-sm">
                    {log.userName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs">
                    {log.notes || '-'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

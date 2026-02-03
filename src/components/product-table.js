'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { EmptyState } from '@/components/empty-state'
import { useToast } from '@/hooks/use-toast'
import { getProducts, deleteProduct } from '@/actions/product-actions'
import { formatRupiah, getStockStatus } from '@/lib/utils'
import { Search, Package, Pencil, Trash2 } from 'lucide-react'

/**
 * ProductTable Component
 * Displays products with search, filter, sort, and actions
 */
export function ProductTable() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const isOwner = session?.user?.role === 'owner'

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Categories from seed data
  const categories = ['All', 'Processor', 'VGA', 'RAM', 'Storage', 'Mouse', 'Keyboard', 'Monitor']

  // Fetch products on mount
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

  // Filtered + Sorted products (memoized for performance)
  const displayProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === categoryFilter)
    }

    // Search by name or brand
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [products, categoryFilter, searchQuery, sortConfig])

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        // Toggle direction
        if (prev.direction === 'asc') {
          return { key, direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null }
        }
      }
      // New sort key
      return { key, direction: 'asc' }
    })
  }

  // Handle delete
  const handleDeleteClick = (product) => {
    setSelectedProduct(product)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return

    setIsDeleting(true)
    const result = await deleteProduct(selectedProduct.id)

    if (result.success) {
      // Optimistic update
      setProducts(products.filter(p => p.id !== selectedProduct.id))
      toast({
        title: 'Berhasil',
        description: 'Produk berhasil dihapus',
        variant: 'success'
      })
      setDeleteModalOpen(false)
      setSelectedProduct(null)
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsDeleting(false)
  }

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Memuat data...</div>
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari produk berdasarkan nama atau brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoryFilter === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Menampilkan {displayProducts.length} dari {products.length} produk
      </div>

      {/* Table or Empty State */}
      {displayProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title={searchQuery || categoryFilter !== 'All' ? 'Tidak ada produk yang cocok' : 'Belum ada produk'}
          description={searchQuery || categoryFilter !== 'All' ? 'Coba ubah kata kunci pencarian atau filter' : 'Tambahkan produk pertama Anda'}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                onSort={() => handleSort('name')}
                sortDirection={sortConfig.key === 'name' ? sortConfig.direction : null}
              >
                Nama
              </TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead
                sortable
                onSort={() => handleSort('price')}
                sortDirection={sortConfig.key === 'price' ? sortConfig.direction : null}
              >
                Harga
              </TableHead>
              <TableHead
                sortable
                onSort={() => handleSort('stock')}
                sortDirection={sortConfig.key === 'stock' ? sortConfig.direction : null}
              >
                Stok
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lokasi</TableHead>
              {isOwner && <TableHead>Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayProducts.map(product => {
              const stockStatus = getStockStatus(product.stock, product.minStock)

              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{formatRupiah(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={stockStatus.color}>
                      {stockStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.location}</TableCell>
                  {isOwner && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        title="Hapus Produk?"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
              disabled={isDeleting}
            >
              Hapus
            </Button>
          </>
        }
      >
        <p className="text-foreground">
          Yakin ingin menghapus produk <strong>"{selectedProduct?.name}"</strong>?
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>
      </Modal>
    </div>
  )
}

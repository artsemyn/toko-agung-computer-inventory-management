'use client'

import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { ProductTable } from '@/components/product-table'
import { Plus } from 'lucide-react'
import Link from 'next/link'

/**
 * Products List Page
 * Shows all products with search, filter, sort
 * Owner: Can add/edit/delete
 * Gudang/Kasir: Can only view
 */
export default function ProductsPage() {
  const { data: session } = useSession()
  const isOwner = session?.user?.role === 'owner'

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Produk"
        description="Kelola produk toko komputer"
        action={
          isOwner && (
            <Link href="/dashboard/products/new">
              <Button variant="primary">
                <Plus className="w-5 h-5" />
                Tambah Produk
              </Button>
            </Link>
          )
        }
      />

      {/* Product Table */}
      <ProductTable />
    </div>
  )
}

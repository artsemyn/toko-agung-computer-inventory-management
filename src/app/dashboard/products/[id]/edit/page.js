'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { ProductForm } from '@/components/product-form'
import { EmptyState } from '@/components/empty-state'
import { useToast } from '@/hooks/use-toast'
import { getProductById, updateProduct } from '@/actions/product-actions'
import { PackageX } from 'lucide-react'

/**
 * Edit Product Page
 * Owner only - edits existing product
 */
export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const productId = params.id

  // Role guard: owner only
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/')
      return
    }

    if (session.user.role !== 'owner') {
      toast({
        title: 'Akses Ditolak',
        description: 'Hanya owner yang dapat mengedit produk',
        variant: 'error'
      })
      router.push('/dashboard/products')
    }
  }, [session, status, router, toast])

  // Fetch product data
  useEffect(() => {
    if (!session || session.user.role !== 'owner') return

    async function loadProduct() {
      setIsLoading(true)
      const result = await getProductById(productId)

      if (result.success) {
        setProduct(result.data)
      } else {
        setNotFound(true)
        toast({
          title: 'Gagal',
          description: result.error,
          variant: 'error'
        })
      }

      setIsLoading(false)
    }

    loadProduct()
  }, [productId, session, toast])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)

    const result = await updateProduct(productId, formData)

    if (result.success) {
      toast({
        title: 'Berhasil',
        description: 'Produk berhasil diperbarui',
        variant: 'success'
      })
      router.push('/dashboard/products')
    } else {
      toast({
        title: 'Gagal',
        description: result.error,
        variant: 'error'
      })
    }

    setIsSubmitting(false)
  }

  // Show loading while checking auth or fetching product
  if (status === 'loading' || !session || session.user.role !== 'owner' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  // Show not found state
  if (notFound || !product) {
    return (
      <div className="space-y-6">
        <Header
          title="Edit Produk"
          description="Produk tidak ditemukan"
        />
        <EmptyState
          icon={PackageX}
          title="Produk Tidak Ditemukan"
          description="Produk yang Anda cari mungkin sudah dihapus atau tidak ada"
          action={
            <button
              onClick={() => router.push('/dashboard/products')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Kembali ke Daftar Produk
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <Header
        title="Edit Produk"
        description={`Memperbarui informasi: ${product.name}`}
      />

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <ProductForm
          mode="edit"
          initialData={product}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}

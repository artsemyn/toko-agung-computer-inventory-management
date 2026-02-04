import { getProducts } from '@/actions/product-actions'
import DisplayContent from '@/components/display-content'

// Revalidate every 30 seconds
export const revalidate = 30

export const metadata = {
  title: 'Display Toko - Toko Agung Computer',
  description: 'Daftar harga dan ketersediaan stok produk komputer'
}

export default async function DisplayPage() {
  // Fetch products from database
  const result = await getProducts()

  // If fetch failed, show error state
  if (!result.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-destructive mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Gagal Memuat Data</h2>
          <p className="text-xl text-muted-foreground">{result.error}</p>
        </div>
      </div>
    )
  }

  // Pass products to client component
  return <DisplayContent initialProducts={result.data} />
}

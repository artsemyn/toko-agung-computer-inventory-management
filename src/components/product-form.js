'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { productSchema } from '@/lib/validations'

/**
 * Reusable Product Form Component
 * Used for both creating and editing products
 *
 * @param {Object} props
 * @param {'create' | 'edit'} props.mode - Form mode
 * @param {object} props.initialData - Initial form data (for edit mode)
 * @param {Function} props.onSubmit - Submit handler (receives validated form data)
 * @param {boolean} props.isLoading - Loading state
 */
export function ProductForm({ mode = 'create', initialData = null, onSubmit, isLoading = false }) {
  const router = useRouter()
  const [errors, setErrors] = useState({})

  // Category options from seed data
  const categoryOptions = [
    { value: 'Processor', label: 'Processor' },
    { value: 'VGA', label: 'VGA' },
    { value: 'RAM', label: 'RAM' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Mouse', label: 'Mouse' },
    { value: 'Keyboard', label: 'Keyboard' },
    { value: 'Monitor', label: 'Monitor' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Parse form data
    const formElements = e.target.elements
    const formData = {
      name: formElements.name.value.trim(),
      category: formElements.category.value,
      brand: formElements.brand.value.trim(),
      price: parseInt(formElements.price.value) || 0,
      stock: parseInt(formElements.stock.value) || 0,
      minStock: parseInt(formElements.minStock.value) || 0,
      location: formElements.location.value.trim(),
      imageUrl: formElements.imageUrl.value.trim() || ''
    }

    // Validate client-side
    const result = productSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }

    // Call parent onSubmit
    await onSubmit(result.data)
  }

  const handleCancel = () => {
    router.push('/dashboard/products')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        name="name"
        label="Nama Produk"
        type="text"
        defaultValue={initialData?.name || ''}
        error={errors.name?.[0]}
        required
        disabled={isLoading}
        placeholder="Contoh: AMD Ryzen 5 5600X"
      />

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
          Kategori<span className="text-destructive ml-1">*</span>
        </label>
        <select
          id="category"
          name="category"
          defaultValue={initialData?.category || ''}
          required
          disabled={isLoading}
          className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-input text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
        >
          <option value="" disabled>Pilih kategori produk</option>
          {categoryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.category?.[0] && (
          <p className="text-sm text-destructive mt-2">{errors.category[0]}</p>
        )}
      </div>

      {/* Brand */}
      <Input
        name="brand"
        label="Brand"
        type="text"
        defaultValue={initialData?.brand || ''}
        error={errors.brand?.[0]}
        required
        disabled={isLoading}
        placeholder="Contoh: AMD, Intel, NVIDIA"
      />

      {/* Price */}
      <Input
        name="price"
        label="Harga (Rp)"
        type="number"
        defaultValue={initialData?.price || ''}
        error={errors.price?.[0]}
        required
        disabled={isLoading}
        min={0}
        step={1000}
        placeholder="Contoh: 2500000"
        helperText="Harga dalam Rupiah (tanpa titik atau koma)"
      />

      {/* Stock */}
      <Input
        name="stock"
        label="Stok"
        type="number"
        defaultValue={initialData?.stock || 0}
        error={errors.stock?.[0]}
        required
        disabled={isLoading}
        min={0}
        step={1}
        placeholder="Contoh: 10"
        helperText="Jumlah barang yang tersedia"
      />

      {/* Min Stock */}
      <Input
        name="minStock"
        label="Minimum Stok"
        type="number"
        defaultValue={initialData?.minStock || 5}
        error={errors.minStock?.[0]}
        required
        disabled={isLoading}
        min={0}
        step={1}
        placeholder="Contoh: 5"
        helperText="Batas peringatan stok rendah"
      />

      {/* Location */}
      <Input
        name="location"
        label="Lokasi Rak"
        type="text"
        defaultValue={initialData?.location || ''}
        error={errors.location?.[0]}
        required
        disabled={isLoading}
        placeholder="Contoh: A1, B2, C3"
        helperText="Kode lokasi penyimpanan di gudang"
      />

      {/* Image URL (optional) */}
      <Input
        name="imageUrl"
        label="URL Gambar"
        type="url"
        defaultValue={initialData?.imageUrl || ''}
        error={errors.imageUrl?.[0]}
        disabled={isLoading}
        placeholder="https://example.com/image.jpg"
        helperText="Opsional: Link gambar produk"
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {mode === 'create' ? 'Tambah Produk' : 'Simpan Perubahan'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}

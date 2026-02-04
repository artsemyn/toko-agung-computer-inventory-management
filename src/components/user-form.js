'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { userSchema } from '@/lib/validations'

/**
 * UserForm Component
 * Reusable form for Add/Edit user
 *
 * @param {Object} props
 * @param {string} props.mode - 'create' | 'edit'
 * @param {Object} props.initialData - Initial data for edit mode
 * @param {Function} props.onSubmit - Callback(data) when form submitted
 * @param {boolean} props.isLoading - Loading state
 */
export function UserForm({ mode = 'create', initialData = null, onSubmit, isLoading = false }) {
  const router = useRouter()
  const [errors, setErrors] = useState({})

  const isEditMode = mode === 'edit'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Parse form data
    const formElements = e.target.elements
    const formData = {
      name: formElements.name.value.trim(),
      email: formElements.email.value.trim(),
      password: formElements.password.value.trim(),
      role: formElements.role.value
    }

    // Validate client-side
    // For edit mode, password is optional
    const validationSchema = isEditMode && !formData.password
      ? userSchema.omit({ password: true })
      : userSchema

    const result = validationSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }

    // If edit mode and password is empty, remove it from data
    if (isEditMode && !formData.password) {
      delete formData.password
    }

    // Call parent onSubmit
    await onSubmit(result.data)
  }

  const handleCancel = () => {
    router.push('/dashboard/users')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        name="name"
        label="Nama Lengkap"
        defaultValue={initialData?.name || ''}
        error={errors.name?.[0]}
        required
        disabled={isLoading}
        placeholder="Masukkan nama lengkap"
      />

      {/* Email */}
      <Input
        name="email"
        type="email"
        label="Email"
        defaultValue={initialData?.email || ''}
        error={errors.email?.[0]}
        required
        disabled={isLoading}
        placeholder="contoh@email.com"
        helperText="Email digunakan untuk login"
      />

      {/* Password */}
      <Input
        name="password"
        type="password"
        label={isEditMode ? 'Password Baru (opsional)' : 'Password'}
        error={errors.password?.[0]}
        required={!isEditMode}
        disabled={isLoading}
        placeholder={isEditMode ? 'Kosongkan jika tidak ingin mengubah password' : 'Minimal 6 karakter'}
        helperText={
          isEditMode
            ? 'Kosongkan jika tidak ingin mengubah password'
            : 'Password minimal 6 karakter'
        }
      />

      {/* Role */}
      <Select
        name="role"
        label="Role"
        defaultValue={initialData?.role || 'kasir'}
        error={errors.role?.[0]}
        required
        disabled={isLoading}
        helperText="Tentukan hak akses pengguna"
      >
        <option value="kasir">Kasir - Input transaksi penjualan</option>
        <option value="gudang">Gudang - Manajemen stok produk</option>
        <option value="owner">Owner - Full access ke semua fitur</option>
      </Select>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isEditMode ? 'Simpan Perubahan' : 'Tambah Pengguna'}
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

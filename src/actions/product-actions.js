'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { productSchema } from '@/lib/validations'
import { auth } from '@/lib/auth'

/**
 * Helper function: Check if user is owner
 * @returns {{ success: boolean, error?: string, session?: object }}
 */
async function requireOwner() {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Anda harus login terlebih dahulu' }
  }

  if (session.user.role !== 'owner') {
    return { success: false, error: 'Akses ditolak. Hanya owner yang bisa melakukan aksi ini.' }
  }

  return { success: true, session }
}

/**
 * Get all active products
 * No auth required - all roles can view
 *
 * @returns Promise<{ success: boolean, data?: Array, error?: string }>
 */
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, data: products }
  } catch (error) {
    console.error('getProducts error:', error)
    return { success: false, error: 'Gagal mengambil data produk' }
  }
}

/**
 * Get product by ID
 * No auth required
 *
 * @param {string} id - Product ID
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function getProductById(id) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
        isActive: true
      }
    })

    if (!product) {
      return { success: false, error: 'Produk tidak ditemukan' }
    }

    return { success: true, data: product }
  } catch (error) {
    console.error('getProductById error:', error)
    return { success: false, error: 'Gagal mengambil data produk' }
  }
}

/**
 * Create new product
 * Auth required: owner only
 *
 * @param {object} formData - Product data
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function createProduct(formData) {
  try {
    // Check auth
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Validate data
    const result = productSchema.safeParse(formData)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return { success: false, error: firstError || 'Data tidak valid' }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: result.data.name,
        category: result.data.category,
        brand: result.data.brand,
        price: result.data.price,
        stock: result.data.stock,
        minStock: result.data.minStock,
        location: result.data.location,
        imageUrl: result.data.imageUrl || null
      }
    })

    // Revalidate products page
    revalidatePath('/dashboard/products')

    return { success: true, data: product }
  } catch (error) {
    console.error('createProduct error:', error)
    return { success: false, error: 'Gagal menambahkan produk' }
  }
}

/**
 * Update existing product
 * Auth required: owner only
 *
 * @param {string} id - Product ID
 * @param {object} formData - Updated product data
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function updateProduct(id, formData) {
  try {
    // Check auth
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id, isActive: true }
    })

    if (!existing) {
      return { success: false, error: 'Produk tidak ditemukan' }
    }

    // Validate data
    const result = productSchema.safeParse(formData)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return { success: false, error: firstError || 'Data tidak valid' }
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: result.data.name,
        category: result.data.category,
        brand: result.data.brand,
        price: result.data.price,
        stock: result.data.stock,
        minStock: result.data.minStock,
        location: result.data.location,
        imageUrl: result.data.imageUrl || null
      }
    })

    // Revalidate products page
    revalidatePath('/dashboard/products')
    revalidatePath(`/dashboard/products/${id}/edit`)

    return { success: true, data: product }
  } catch (error) {
    console.error('updateProduct error:', error)
    return { success: false, error: 'Gagal memperbarui produk' }
  }
}

/**
 * Delete product (soft delete)
 * Auth required: owner only
 *
 * @param {string} id - Product ID
 * @returns Promise<{ success: boolean, error?: string }>
 */
export async function deleteProduct(id) {
  try {
    // Check auth
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id, isActive: true }
    })

    if (!existing) {
      return { success: false, error: 'Produk tidak ditemukan' }
    }

    // Check if product has transactions
    const transactionCount = await prisma.transaction.count({
      where: { productId: id }
    })

    if (transactionCount > 0) {
      return {
        success: false,
        error: 'Produk tidak dapat dihapus karena sudah memiliki riwayat transaksi'
      }
    }

    // Soft delete (set isActive to false)
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })

    // Revalidate products page
    revalidatePath('/dashboard/products')

    return { success: true }
  } catch (error) {
    console.error('deleteProduct error:', error)
    return { success: false, error: 'Gagal menghapus produk' }
  }
}

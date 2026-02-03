'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Helper function: Check if user is owner or gudang
 * @returns {{ success: boolean, error?: string, session?: object }}
 */
async function requireOwnerOrGudang() {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Anda harus login terlebih dahulu' }
  }

  if (session.user.role !== 'owner' && session.user.role !== 'gudang') {
    return {
      success: false,
      error: 'Akses ditolak. Hanya owner dan petugas gudang yang bisa mengakses fitur ini.'
    }
  }

  return { success: true, session }
}

/**
 * Get low stock products (stock <= minStock)
 * Auth: owner, gudang can view
 *
 * @returns Promise<{ success: boolean, data?: Array, error?: string }>
 */
export async function getLowStockProducts() {
  try {
    // Auth check
    const authCheck = await requireOwnerOrGudang()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Fetch all active products
    const allProducts = await prisma.product.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        stock: 'asc' // Lowest stock first
      }
    })

    // Filter where stock <= minStock (Prisma doesn't support column comparison)
    const lowStockProducts = allProducts.filter(product => product.stock <= product.minStock)

    return { success: true, data: lowStockProducts }
  } catch (error) {
    console.error('getLowStockProducts error:', error)
    return { success: false, error: 'Gagal mengambil data produk stok rendah' }
  }
}

/**
 * Get stock logs (optionally filtered by productId)
 * Auth: owner, gudang can view
 *
 * @param {string} productId - Optional product ID to filter
 * @param {number} limit - Maximum number of logs to return
 * @returns Promise<{ success: boolean, data?: Array, error?: string }>
 */
export async function getStockLogs(productId = null, limit = 50) {
  try {
    // Auth check
    const authCheck = await requireOwnerOrGudang()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const where = productId ? { productId } : {}

    const logs = await prisma.stockLog.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return { success: true, data: logs }
  } catch (error) {
    console.error('getStockLogs error:', error)
    return { success: false, error: 'Gagal mengambil riwayat stok' }
  }
}

/**
 * Add stock (increase)
 * Auth: owner, gudang only
 *
 * @param {string} productId - Product ID
 * @param {number} qty - Quantity to add (must be > 0)
 * @param {string} notes - Optional notes
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function addStock(productId, qty, notes = '') {
  try {
    // Auth check
    const authCheck = await requireOwnerOrGudang()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Validate quantity
    if (!qty || qty <= 0) {
      return { success: false, error: 'Jumlah harus lebih dari 0' }
    }

    // Use Prisma transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get current product
      const product = await tx.product.findUnique({
        where: { id: productId, isActive: true }
      })

      if (!product) {
        throw new Error('Produk tidak ditemukan')
      }

      const newStock = product.stock + qty

      // 2. Create StockLog entry
      const log = await tx.stockLog.create({
        data: {
          productId,
          productName: product.name,
          changeType: 'in',
          changeQty: qty,
          prevStock: product.stock,
          newStock: newStock,
          notes: notes || null,
          userId: session.user.id,
          userName: session.user.name
        }
      })

      // 3. Update Product stock
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { stock: newStock }
      })

      return { product: updatedProduct, log }
    })

    // Revalidate stock page
    revalidatePath('/dashboard/stock')

    return { success: true, data: result }
  } catch (error) {
    console.error('addStock error:', error)
    return {
      success: false,
      error: error.message || 'Gagal menambah stok'
    }
  }
}

/**
 * Reduce stock (decrease)
 * Auth: owner, gudang only
 *
 * @param {string} productId - Product ID
 * @param {number} qty - Quantity to reduce (must be > 0 and <= current stock)
 * @param {string} notes - Optional notes
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function reduceStock(productId, qty, notes = '') {
  try {
    // Auth check
    const authCheck = await requireOwnerOrGudang()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Validate quantity
    if (!qty || qty <= 0) {
      return { success: false, error: 'Jumlah harus lebih dari 0' }
    }

    // Use Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get current product
      const product = await tx.product.findUnique({
        where: { id: productId, isActive: true }
      })

      if (!product) {
        throw new Error('Produk tidak ditemukan')
      }

      // Validate: qty <= current stock
      if (qty > product.stock) {
        throw new Error(`Jumlah pengurangan (${qty}) melebihi stok saat ini (${product.stock})`)
      }

      const newStock = product.stock - qty

      // 2. Create StockLog entry
      const log = await tx.stockLog.create({
        data: {
          productId,
          productName: product.name,
          changeType: 'out',
          changeQty: -qty, // Negative for reduction
          prevStock: product.stock,
          newStock: newStock,
          notes: notes || null,
          userId: session.user.id,
          userName: session.user.name
        }
      })

      // 3. Update Product stock
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { stock: newStock }
      })

      return { product: updatedProduct, log }
    })

    // Revalidate stock page
    revalidatePath('/dashboard/stock')

    return { success: true, data: result }
  } catch (error) {
    console.error('reduceStock error:', error)
    return {
      success: false,
      error: error.message || 'Gagal mengurangi stok'
    }
  }
}

/**
 * Adjust stock (set to specific value)
 * Auth: owner, gudang only
 *
 * @param {string} productId - Product ID
 * @param {number} newStock - New stock value (must be >= 0)
 * @param {string} notes - Optional notes
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function adjustStock(productId, newStock, notes = '') {
  try {
    // Auth check
    const authCheck = await requireOwnerOrGudang()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Validate new stock value
    if (newStock < 0) {
      return { success: false, error: 'Stok baru tidak boleh negatif' }
    }

    // Use Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get current product
      const product = await tx.product.findUnique({
        where: { id: productId, isActive: true }
      })

      if (!product) {
        throw new Error('Produk tidak ditemukan')
      }

      // Calculate change
      const changeQty = newStock - product.stock

      // 2. Create StockLog entry
      const log = await tx.stockLog.create({
        data: {
          productId,
          productName: product.name,
          changeType: 'adjustment',
          changeQty: changeQty, // Can be positive or negative
          prevStock: product.stock,
          newStock: newStock,
          notes: notes || null,
          userId: session.user.id,
          userName: session.user.name
        }
      })

      // 3. Update Product stock
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { stock: newStock }
      })

      return { product: updatedProduct, log }
    })

    // Revalidate stock page
    revalidatePath('/dashboard/stock')

    return { success: true, data: result }
  } catch (error) {
    console.error('adjustStock error:', error)
    return {
      success: false,
      error: error.message || 'Gagal menyesuaikan stok'
    }
  }
}

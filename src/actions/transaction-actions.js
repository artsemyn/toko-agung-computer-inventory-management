'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { transactionItemSchema } from '@/lib/validations'

/**
 * Helper function: Check if user is owner or kasir
 * @returns {{ success: boolean, error?: string, session?: object }}
 */
async function requireOwnerOrKasir() {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Anda harus login terlebih dahulu' }
  }

  if (session.user.role !== 'owner' && session.user.role !== 'kasir') {
    return {
      success: false,
      error: 'Akses ditolak. Hanya owner dan kasir yang bisa mengakses fitur ini.'
    }
  }

  return { success: true, session }
}

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
    return {
      success: false,
      error: 'Akses ditolak. Hanya owner yang bisa melihat riwayat transaksi.'
    }
  }

  return { success: true, session }
}

/**
 * Process transaction (create transaction records + reduce stock)
 * Auth: owner, kasir only
 *
 * @param {Array} cartItems - Array of { productId, qty }
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function processTransaction(cartItems) {
  try {
    // Auth check
    const authCheck = await requireOwnerOrKasir()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Validate cart not empty
    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'Keranjang belanja kosong' }
    }

    // Validate each item
    for (const item of cartItems) {
      const result = transactionItemSchema.safeParse(item)
      if (!result.success) {
        return { success: false, error: 'Data item tidak valid' }
      }
    }

    // Use Prisma transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      const createdTransactions = []
      const createdStockLogs = []

      // Process each cart item
      for (const item of cartItems) {
        // 1. Get current product and lock row
        const product = await tx.product.findUnique({
          where: { id: item.productId, isActive: true }
        })

        if (!product) {
          throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`)
        }

        // 2. Validate stock availability
        if (product.stock < item.qty) {
          throw new Error(
            `Stok ${product.name} tidak mencukupi. Tersedia: ${product.stock}, diminta: ${item.qty}`
          )
        }

        const totalPrice = product.price * item.qty

        // 3. Create Transaction record (snapshot productName, unitPrice, cashierName)
        const transaction = await tx.transaction.create({
          data: {
            productId: product.id,
            productName: product.name,
            qty: item.qty,
            unitPrice: product.price,
            totalPrice: totalPrice,
            cashierId: session.user.id,
            cashierName: session.user.name
          }
        })
        createdTransactions.push(transaction)

        // 4. Reduce product stock
        const newStock = product.stock - item.qty
        await tx.product.update({
          where: { id: product.id },
          data: { stock: newStock }
        })

        // 5. Create StockLog entry (changeType: "sale")
        const stockLog = await tx.stockLog.create({
          data: {
            productId: product.id,
            productName: product.name,
            changeType: 'sale',
            changeQty: -item.qty,
            prevStock: product.stock,
            newStock: newStock,
            notes: `Penjualan oleh ${session.user.name}`,
            userId: session.user.id,
            userName: session.user.name
          }
        })
        createdStockLogs.push(stockLog)
      }

      return {
        transactions: createdTransactions,
        stockLogs: createdStockLogs
      }
    })

    // Calculate totals for receipt
    const grandTotal = result.transactions.reduce((sum, t) => sum + t.totalPrice, 0)
    const totalItems = result.transactions.reduce((sum, t) => sum + t.qty, 0)

    // Revalidate relevant pages
    revalidatePath('/dashboard/transactions')
    revalidatePath('/dashboard/products')
    revalidatePath('/dashboard/stock')

    return {
      success: true,
      data: {
        transactions: result.transactions,
        grandTotal,
        totalItems,
        transactionDate: new Date()
      }
    }
  } catch (error) {
    console.error('processTransaction error:', error)
    return {
      success: false,
      error: error.message || 'Gagal memproses transaksi'
    }
  }
}

/**
 * Get transactions with optional filters
 * Auth: owner only
 *
 * @param {Object} filters - { startDate?, endDate?, limit? }
 * @returns Promise<{ success: boolean, data?: Array, error?: string }>
 */
export async function getTransactions(filters = {}) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const { startDate, endDate, limit = 100 } = filters

    // Build where clause
    const where = {}

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        // Set to end of day
        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)
        where.createdAt.lte = endOfDay
      }
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return { success: true, data: transactions }
  } catch (error) {
    console.error('getTransactions error:', error)
    return { success: false, error: 'Gagal mengambil data transaksi' }
  }
}

/**
 * Get transaction statistics for dashboard
 * Auth: owner only
 *
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function getTransactionStats() {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Get today's transactions
    const todayTransactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    const todayCount = todayTransactions.length
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.totalPrice, 0)

    return {
      success: true,
      data: {
        todayCount,
        todayRevenue
      }
    }
  } catch (error) {
    console.error('getTransactionStats error:', error)
    return { success: false, error: 'Gagal mengambil statistik transaksi' }
  }
}

/**
 * Validate product stock before adding to cart (client-side helper)
 * Auth: owner, kasir only
 *
 * @param {string} productId - Product ID
 * @param {number} requestedQty - Requested quantity
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function validateProductStock(productId, requestedQty) {
  try {
    // Auth check
    const authCheck = await requireOwnerOrKasir()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true }
    })

    if (!product) {
      return { success: false, error: 'Produk tidak ditemukan' }
    }

    if (product.stock < requestedQty) {
      return {
        success: false,
        error: `Stok tidak mencukupi. Tersedia: ${product.stock} unit`
      }
    }

    return {
      success: true,
      data: {
        product,
        available: product.stock
      }
    }
  } catch (error) {
    console.error('validateProductStock error:', error)
    return { success: false, error: 'Gagal memvalidasi stok produk' }
  }
}

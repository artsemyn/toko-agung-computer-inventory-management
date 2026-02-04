'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { userSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

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
      error: 'Akses ditolak. Hanya owner yang bisa mengelola pengguna.'
    }
  }

  return { success: true, session }
}

/**
 * Get all users
 * Auth: owner only
 *
 * @returns Promise<{ success: boolean, data?: Array, error?: string }>
 */
export async function getUsers() {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
        // Exclude password from response
      }
    })

    return { success: true, data: users }
  } catch (error) {
    console.error('getUsers error:', error)
    return { success: false, error: 'Gagal mengambil data pengguna' }
  }
}

/**
 * Get single user by ID
 * Auth: owner only
 *
 * @param {string} userId - User ID
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function getUserById(userId) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
        // Exclude password from response
      }
    })

    if (!user) {
      return { success: false, error: 'Pengguna tidak ditemukan' }
    }

    return { success: true, data: user }
  } catch (error) {
    console.error('getUserById error:', error)
    return { success: false, error: 'Gagal mengambil data pengguna' }
  }
}

/**
 * Create new user
 * Auth: owner only
 *
 * @param {Object} formData - User data { name, email, password, role }
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function createUser(formData) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Validate data
    const result = userSchema.safeParse(formData)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return { success: false, error: firstError || 'Data tidak valid' }
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email }
    })

    if (existingUser) {
      return { success: false, error: 'Email sudah terdaftar' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        role: result.data.role,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })

    // Revalidate users page
    revalidatePath('/dashboard/users')

    return { success: true, data: user }
  } catch (error) {
    console.error('createUser error:', error)
    return { success: false, error: 'Gagal menambahkan pengguna' }
  }
}

/**
 * Update user
 * Auth: owner only
 *
 * @param {string} userId - User ID
 * @param {Object} formData - User data { name, email, password?, role }
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function updateUser(userId, formData) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return { success: false, error: 'Pengguna tidak ditemukan' }
    }

    // Validate data (password is optional for update)
    const validationSchema = formData.password
      ? userSchema
      : userSchema.omit({ password: true })

    const result = validationSchema.safeParse(formData)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return { success: false, error: firstError || 'Data tidak valid' }
    }

    // Check if email is taken by another user
    if (result.data.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: result.data.email }
      })

      if (emailExists && emailExists.id !== userId) {
        return { success: false, error: 'Email sudah digunakan pengguna lain' }
      }
    }

    // Prepare update data
    const updateData = {
      name: result.data.name,
      email: result.data.email,
      role: result.data.role
    }

    // Hash new password if provided
    if (formData.password) {
      updateData.password = await bcrypt.hash(formData.password, 10)
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    })

    // Revalidate users page
    revalidatePath('/dashboard/users')

    return { success: true, data: user }
  } catch (error) {
    console.error('updateUser error:', error)
    return { success: false, error: 'Gagal memperbarui pengguna' }
  }
}

/**
 * Toggle user active/inactive status
 * Auth: owner only
 * Prevents self-deactivation
 *
 * @param {string} userId - User ID
 * @returns Promise<{ success: boolean, data?: object, error?: string }>
 */
export async function toggleUserActive(userId) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Prevent self-deactivation
    if (userId === session.user.id) {
      return {
        success: false,
        error: 'Anda tidak dapat menonaktifkan akun Anda sendiri'
      }
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { success: false, error: 'Pengguna tidak ditemukan' }
    }

    // Toggle isActive
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    })

    // Revalidate users page
    revalidatePath('/dashboard/users')

    return { success: true, data: updatedUser }
  } catch (error) {
    console.error('toggleUserActive error:', error)
    return { success: false, error: 'Gagal mengubah status pengguna' }
  }
}

/**
 * Delete user (soft delete - mark as inactive)
 * Auth: owner only
 * Prevents self-deletion
 *
 * @param {string} userId - User ID
 * @returns Promise<{ success: boolean, error?: string }>
 */
export async function deleteUser(userId) {
  try {
    // Auth check
    const authCheck = await requireOwner()
    if (!authCheck.success) {
      return { success: false, error: authCheck.error }
    }

    const session = authCheck.session

    // Prevent self-deletion
    if (userId === session.user.id) {
      return {
        success: false,
        error: 'Anda tidak dapat menghapus akun Anda sendiri'
      }
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { success: false, error: 'Pengguna tidak ditemukan' }
    }

    // Soft delete - mark as inactive
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false }
    })

    // Revalidate users page
    revalidatePath('/dashboard/users')

    return { success: true }
  } catch (error) {
    console.error('deleteUser error:', error)
    return { success: false, error: 'Gagal menghapus pengguna' }
  }
}

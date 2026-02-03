import { z } from "zod"

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(6, "Password minimal 6 karakter")
})

// Product validation schema (untuk Phase 5 nanti)
export const productSchema = z.object({
  name: z.string().min(1, "Nama produk harus diisi"),
  category: z.string().min(1, "Kategori harus diisi"),
  brand: z.string().min(1, "Brand harus diisi"),
  price: z.number().min(0, "Harga harus positif"),
  stock: z.number().int().min(0, "Stok harus 0 atau lebih"),
  minStock: z.number().int().min(0, "Minimum stok harus 0 atau lebih"),
  location: z.string().min(1, "Lokasi harus diisi"),
  imageUrl: z.string().url().optional().or(z.literal("")),
})

// User validation schema (untuk Phase 8 nanti)
export const userSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["owner", "gudang", "kasir"], {
    errorMap: () => ({ message: "Role tidak valid" })
  }),
})

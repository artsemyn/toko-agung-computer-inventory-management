# 🖥️ Web Monitoring & Pengelolaan Stok Gudang Toko Komputer

## 1️⃣ Tujuan Aplikasi
Aplikasi ini bertujuan untuk:
- Memantau ketersediaan stok produk komputer di gudang
- Mengelola data produk komputer secara terstruktur
- Mengelola transaksi penjualan agar stok selalu ter-update
- Menampilkan informasi produk di layar toko

---

## 2️⃣ Tech Stack

### Frontend & Backend
- Next.js (App Router)
- Tailwind CSS

### Database
- PostgreSQL (Neon)

### ORM
- Prisma

### Authentication
- NextAuth

### Deployment
- Vercel

---

## 3️⃣ Role Pengguna & Hak Akses

### 👑 Owner / Admin Utama
- Login
- CRUD produk
- Melihat seluruh stok
- Melihat riwayat transaksi
- Mengelola user & role

### 📦 Petugas Gudang
- Login
- Melihat produk
- Menambah / mengurangi stok
- Tidak bisa menghapus produk

### 💰 Kasir
- Login
- Melihat produk & harga
- Input transaksi penjualan
- Stok otomatis berkurang

### 🖥️ User Display (Public)
- Tanpa login
- Melihat produk
- Melihat harga & status stok

---

## 4️⃣ Modul Aplikasi

### 📦 Manajemen Produk
- Tambah produk komputer
- Edit produk
- Hapus produk
- Lihat daftar produk

**Data Produk:**
- Nama produk
- Kategori
- Merek
- Harga
- Stok
- Lokasi rak

### 📊 Monitoring Stok
- Daftar stok produk
- Status stok: Aman, Hampir Habis, Habis

### 💸 Transaksi Penjualan
- Input transaksi oleh kasir
- Total harga otomatis
- Stok otomatis berkurang
- Riwayat transaksi oleh owner

### 👥 Manajemen User
- Tambah user
- Atur role
- Lihat daftar user

---

## 5️⃣ Struktur Database

### Tabel `users`
- id
- name
- email
- password
- role (owner | gudang | kasir)

### Tabel `products`
- id
- name
- category
- brand
- price
- stock
- location
- created_at

### Tabel `transactions`
- id
- product_id
- qty
- total_price
- cashier_id
- created_at

---

## 6️⃣ Relasi Database
- users (1) → (N) transactions
- products (1) → (N) transactions

---

## 7️⃣ Aturan & Validasi
- Harga > 0
- Stok ≥ 0
- Qty transaksi ≤ stok tersedia
- Role menentukan hak akses

---

## 8️⃣ Struktur Halaman (Next.js)
```
/app
 ├─ /login
 ├─ /dashboard
 ├─ /products
 │   ├─ /new
 │   ├─ /[id]/edit
 ├─ /transactions
 ├─ /users
 └─ /display
```

---

## 9️⃣ Alur Aplikasi

### Barang Masuk (Gudang)
- Gudang update stok
- Data tersimpan di database

### Penjualan (Kasir)
- Input transaksi
- Stok berkurang otomatis

### Monitoring (Owner)
- Dashboard untuk cek stok & transaksi

---

## 🔟 Deployment Plan
1. Buat project PostgreSQL di Neon
2. Setup Prisma & migrate database
3. Push source code ke GitHub
4. Deploy aplikasi ke Vercel
5. Set environment variables
6. Testing aplikasi

---

## 1️⃣1️⃣ Batasan Scope
- Tidak mendukung multi cabang
- Tidak ada fitur supplier
- Tidak ada laporan keuangan detail
- Tidak ada mobile application

---

## 1️⃣2️⃣ Nilai Akademis
- CRUD lengkap
- Database relasional SQL
- Role-based access
- Studi kasus nyata toko komputer
- Tech stack modern

---

## 1️⃣3️⃣ Output Akhir
- Source code aplikasi
- Database schema
- Screenshot aplikasi
- Dokumentasi laporan


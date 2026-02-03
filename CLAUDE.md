# CLAUDE.md - Toko Agung Computer's Inventory Management System

> **⚠️ LIVING DOCUMENT**: File ini adalah panduan utama untuk Claude Code. Update file ini setiap kali ada perubahan signifikan pada project.

---

## 📋 Meta Instructions

### Cara Menggunakan File Ini

1. **Baca seluruh file** sebelum memulai task apapun
2. **Update progress** di section `Development Progress` setelah menyelesaikan task
3. **Catat perubahan** di section `Changelog` untuk setiap modifikasi signifikan
4. **Update Known Issues** jika menemukan bug atau masalah
5. **Sync dengan kode** - pastikan dokumentasi selalu reflect state terkini

### Kapan Harus Update CLAUDE.md

| Situasi | Action |
|---------|--------|
| Selesai implement fitur | Update checkbox di Progress Tracking |
| Menambah dependency baru | Update di Tech Stack & Dependencies |
| Membuat component baru | Tambahkan di Component Registry |
| Menemukan bug | Catat di Known Issues |
| Mengubah struktur folder | Update Project Structure |
| Menambah API endpoint | Update di API Documentation |
| Selesai sesi kerja | Tambah entry di Changelog |

### Format Update Progress

```markdown
- [x] Task selesai <!-- DONE: 2025-02-02 -->
- [ ] Task belum selesai
- [~] Task in progress <!-- WIP: keterangan -->
- [!] Task blocked <!-- BLOCKED: alasan -->
```

---

## 🎯 Project Overview

**Nama Project**: TechStore Inventory Management System
**Versi**: 0.1.0-dev
**Status**: 🟡 In Progress
**Last Updated**: 2025-02-02

### Deskripsi
Aplikasi web untuk monitoring dan pengelolaan stok gudang toko komputer dengan fitur manajemen produk, monitoring stok real-time, transaksi penjualan, dan role-based access control.

### Target Users
- **Owner**: Full access, monitoring bisnis
- **Petugas Gudang**: Manajemen stok
- **Kasir**: Input transaksi penjualan
- **Public**: Melihat produk dan harga (display toko)

---

## 📊 Development Progress

### Overall Progress
<!-- AUTO-UPDATE: Hitung persentase dari total checkbox yang sudah di-check -->
```
[█████░░░░░░░░░░░░░░░] 25% Complete
```

**Total Tasks**: 67
**Completed**: 17
**In Progress**: 0
**Blocked**: 0

<!-- 
INSTRUKSI UPDATE PROGRESS:
1. Setelah menyelesaikan task, ubah [ ] menjadi [x]
2. Tambahkan komentar <!-- DONE: YYYY-MM-DD --> setelah checkbox
3. Update angka di "Completed" dan progress bar di atas
4. Progress bar: setiap █ = 5%, total 20 karakter
-->

---

### Phase 1: Project Setup ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Foundation & Configuration -->

- [x] Initialize Next.js 15 project dengan JavaScript <!-- DONE: 2025-02-02 -->
- [x] Setup Tailwind CSS v4 dengan design tokens di globals.css <!-- DONE: 2025-02-02 -->
- [x] Install dan setup Prisma ORM <!-- DONE: 2025-02-02 -->
- [x] Create Neon PostgreSQL database <!-- DONE: 2025-02-02 (ready for user setup) -->
- [x] Setup NextAuth.js v5 <!-- DONE: 2025-02-02 (dependencies installed) -->
- [x] Create base layout.js <!-- DONE: 2025-02-02 -->
- [x] Create globals.css dengan semua design tokens <!-- DONE: 2025-02-02 -->
- [x] Setup folder structure sesuai dokumentasi <!-- DONE: 2025-02-02 -->
- [x] Create .env.example <!-- DONE: 2025-02-02 -->

**Phase Status**: 🟢 Complete (9/9)
**Blockers**: _None_
**Notes**: _Phase 1 completed! Ready for database setup and Phase 2._

---

### Phase 2: Database & Authentication ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Data layer & Auth -->

- [x] Define Prisma schema lengkap (Users, Products, Transactions, StockLogs) <!-- DONE: 2025-02-02 -->
- [x] Run initial database migration <!-- DONE: 2025-02-02 (used db push) -->
- [x] Create seed.js dengan demo data <!-- DONE: 2025-02-02 -->
- [x] Run seed data <!-- DONE: 2025-02-02 (verified in Prisma Studio) -->
- [x] Implement NextAuth dengan Credentials provider <!-- DONE: 2025-02-03 -->
- [x] Create auth middleware untuk protected routes <!-- DONE: 2025-02-03 -->
- [x] Create login page UI <!-- DONE: 2025-02-03 -->
- [x] Test login flow untuk semua roles <!-- DONE: 2025-02-03 -->

**Phase Status**: 🟢 Complete (8/8)
**Blockers**: _None_
**Notes**: _Authentication system fully implemented with NextAuth.js v5, Credentials provider, JWT sessions, and role-based access control._

---

### Phase 3: Core UI Components ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Reusable components library -->

- [ ] Button component (primary, secondary, destructive, ghost)
- [ ] Input component dengan validation states
- [ ] Card component
- [ ] Badge component (untuk status)
- [ ] Table component dengan sorting
- [ ] Modal/Dialog component
- [ ] Skeleton loading components
- [ ] Toast notification component
- [ ] Select/Dropdown component
- [ ] Sidebar navigation component
- [ ] Header component
- [ ] StatCard component (untuk dashboard)
- [ ] QuickActionCard component (untuk dashboard)
- [ ] EmptyState component
- [ ] ErrorBoundary component

**Phase Status**: 🟡 In Progress (0/15)
**Blockers**: _None_
**Notes**: _Buat sesuai design-language.md. Starting with base UI components._

---

### Phase 4: Dashboard Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Main dashboard page -->

- [ ] Dashboard layout dengan sidebar
- [ ] Stat cards (Total Produk, Stok Rendah, Transaksi Hari Ini, Revenue)
- [ ] Quick action cards (Tambah Produk, Update Stok, Input Transaksi)
- [ ] Recent transactions table
- [ ] Role-based content filtering
- [ ] Loading states
- [ ] Empty states

**Phase Status**: 🔴 Not Started (0/7)  
**Blockers**: _Waiting for Phase 2 & 3_  
**Notes**: _-_

---

### Phase 5: Product Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: CRUD Produk (Owner only) -->

- [ ] Product list page dengan DataTable
- [ ] Search products by name/brand
- [ ] Filter products by category
- [ ] Sort products by columns
- [ ] Add product form dengan validation
- [ ] Edit product form
- [ ] Delete product dengan confirmation modal
- [ ] Product stock status indicators
- [ ] Server actions untuk CRUD operations
- [ ] Optimistic updates

**Phase Status**: 🔴 Not Started (0/10)  
**Blockers**: _Waiting for Phase 3 & 4_  
**Notes**: _-_

---

### Phase 6: Stock Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Fitur untuk Petugas Gudang -->

- [ ] Stock overview page
- [ ] Update stock form (tambah stok)
- [ ] Reduce stock form (manual reduction)
- [ ] Stock adjustment dengan notes
- [ ] Stock history/log table
- [ ] Low stock alerts list
- [ ] Server actions untuk stock operations
- [ ] Stock log entries automatic

**Phase Status**: 🔴 Not Started (0/8)  
**Blockers**: _Waiting for Phase 5_  
**Notes**: _-_

---

### Phase 7: Transaction Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Fitur untuk Kasir -->

- [ ] Transaction/POS page layout
- [ ] Product search untuk add to cart
- [ ] Cart management (add, remove, update qty)
- [ ] Calculate subtotal dan total otomatis
- [ ] Validate qty tidak melebihi stock
- [ ] Process transaction (create record, reduce stock)
- [ ] Transaction success receipt view
- [ ] Transaction history page (owner only)
- [ ] Filter transactions by date range
- [ ] Server actions untuk transactions

**Phase Status**: 🔴 Not Started (0/10)  
**Blockers**: _Waiting for Phase 5_  
**Notes**: _-_

---

### Phase 8: User Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Admin features (Owner only) -->

- [ ] User list page
- [ ] Add user form dengan role selection
- [ ] Edit user form
- [ ] Toggle user active/inactive
- [ ] Role badges display
- [ ] Server actions untuk user management
- [ ] Prevent self-deactivation

**Phase Status**: 🔴 Not Started (0/7)  
**Blockers**: _Waiting for Phase 4_  
**Notes**: _-_

---

### Phase 9: Public Display ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Display untuk layar toko -->

- [ ] Public display page (no auth)
- [ ] Product grid responsive
- [ ] Category filter tabs
- [ ] Real-time stock status colors
- [ ] Large price display
- [ ] Auto-refresh data (polling atau revalidate)
- [ ] Digital clock display
- [ ] Optimize untuk TV/large monitor

**Phase Status**: 🔴 Not Started (0/8)  
**Blockers**: _Waiting for Phase 5_  
**Notes**: _-_

---

### Phase 10: Polish & Deployment ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Production ready -->

- [ ] Add error boundaries semua pages
- [ ] Loading states untuk semua async operations
- [ ] Form validation error messages
- [ ] Toast notifications untuk actions
- [ ] SEO metadata (title, description)
- [ ] Favicon dan app icons
- [ ] Performance audit dan optimization
- [ ] Security review
- [ ] Create Vercel project
- [ ] Setup environment variables di Vercel
- [ ] Deploy ke Vercel
- [ ] Test production deployment
- [ ] Final QA testing semua features

**Phase Status**: 🔴 Not Started (0/13)  
**Blockers**: _Waiting for all phases_  
**Notes**: _-_

---

## 🛠️ Tech Stack & Dependencies

### Core Stack

| Package | Version | Status | Purpose |
|---------|---------|--------|---------|
| next | 16.1.6 | 🟢 Installed | React framework |
| react | 19.2.3 | 🟢 Installed | UI library |
| react-dom | 19.2.3 | 🟢 Installed | React DOM |
| tailwindcss | ^4.0.0 | 🟢 Installed | Styling |
| @prisma/client | 7.3.0 | 🟢 Installed | Database client |
| prisma | 7.3.0 | 🟢 Installed | ORM CLI (dev) |
| next-auth | ^5.0.0-beta.30 | 🟢 Installed | Authentication |

### Additional Dependencies

| Package | Version | Status | Purpose |
|---------|---------|--------|---------|
| bcryptjs | ^3.0.3 | 🟢 Installed | Password hashing |
| lucide-react | ^0.563.0 | 🟢 Installed | Icons |
| clsx | ^2.1.1 | 🟢 Installed | Classname utility |
| tailwind-merge | ^3.4.0 | 🟢 Installed | Tailwind class merge |
| zod | ^4.3.6 | 🟢 Installed | Schema validation |

### Dev Dependencies

| Package | Version | Status | Purpose |
|---------|---------|--------|---------|
| eslint | ^9.0.0 | 🟢 Installed | Linting |
| eslint-config-next | 16.1.6 | 🟢 Installed | Next.js ESLint |
| @tailwindcss/postcss | ^4.0.0 | 🟢 Installed | Tailwind PostCSS |

<!-- 
INSTRUKSI UPDATE:
Setelah install package, ubah status menjadi:
🟢 Installed - jika sudah terinstall
🟡 Outdated - jika perlu update
🔴 Not Installed - belum install
-->

---

## 📁 Project Structure

```
/techstore
├── 📄 CLAUDE.md                 # File ini (living document)
├── 📄 README.md                 # Project readme
├── 📄 package.json              # Dependencies
├── 📄 tsconfig.json             # TypeScript config
├── 📄 tailwind.config.ts        # Tailwind config  
├── 📄 next.config.ts            # Next.js config
├── 📄 .env.local                # Environment variables (gitignored)
├── 📄 .env.example              # Env template
├── 📄 .gitignore                # Git ignore rules
│
├── 📁 prisma/
│   ├── 📄 schema.prisma         # Database schema
│   └── 📄 seed.ts               # Seed data
│
├── 📁 public/
│   ├── 📄 favicon.ico
│   └── 📁 images/
│
├── 📁 docs/
│   ├── 📄 planning.md           # Project planning doc
│   └── 📄 design-language.md    # Design system doc
│
└── 📁 src/
    ├── 📁 app/
    │   ├── 📄 layout.tsx        # Root layout
    │   ├── 📄 page.tsx          # Login page (/)
    │   ├── 📄 globals.css       # Global styles + tokens
    │   ├── 📄 loading.tsx       # Root loading
    │   ├── 📄 error.tsx         # Root error
    │   ├── 📄 not-found.tsx     # 404 page
    │   │
    │   ├── 📁 dashboard/
    │   │   ├── 📄 layout.tsx    # Dashboard layout + sidebar
    │   │   ├── 📄 page.tsx      # Dashboard home
    │   │   ├── 📄 loading.tsx   # Dashboard loading
    │   │   │
    │   │   ├── 📁 products/
    │   │   │   ├── 📄 page.tsx          # List products
    │   │   │   ├── 📄 loading.tsx
    │   │   │   ├── 📁 new/
    │   │   │   │   └── 📄 page.tsx      # Add product
    │   │   │   └── 📁 [id]/
    │   │   │       └── 📁 edit/
    │   │   │           └── 📄 page.tsx  # Edit product
    │   │   │
    │   │   ├── 📁 stock/
    │   │   │   ├── 📄 page.tsx          # Stock management
    │   │   │   └── 📄 loading.tsx
    │   │   │
    │   │   ├── 📁 transactions/
    │   │   │   ├── 📄 page.tsx          # Transaction/POS
    │   │   │   └── 📄 loading.tsx
    │   │   │
    │   │   └── 📁 users/
    │   │       ├── 📄 page.tsx          # User management
    │   │       └── 📄 loading.tsx
    │   │
    │   ├── 📁 display/
    │   │   └── 📄 page.tsx      # Public display
    │   │
    │   └── 📁 api/
    │       └── 📁 auth/
    │           └── 📁 [...nextauth]/
    │               └── 📄 route.ts
    │
    ├── 📁 components/
    │   ├── 📁 ui/               # Base UI components
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 input.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 badge.tsx
    │   │   ├── 📄 table.tsx
    │   │   ├── 📄 modal.tsx
    │   │   ├── 📄 select.tsx
    │   │   ├── 📄 skeleton.tsx
    │   │   └── 📄 toast.tsx
    │   │
    │   ├── 📄 sidebar.tsx
    │   ├── 📄 header.tsx
    │   ├── 📄 stat-card.tsx
    │   ├── 📄 quick-action-card.tsx
    │   ├── 📄 product-table.tsx
    │   ├── 📄 product-form.tsx
    │   ├── 📄 transaction-form.tsx
    │   ├── 📄 stock-form.tsx
    │   ├── 📄 user-form.tsx
    │   └── 📄 empty-state.tsx
    │
    ├── 📁 lib/
    │   ├── 📄 prisma.ts         # Prisma client singleton
    │   ├── 📄 auth.ts           # NextAuth config
    │   ├── 📄 utils.ts          # Helper functions
    │   └── 📄 validations.ts    # Zod schemas
    │
    ├── 📁 actions/              # Server Actions
    │   ├── 📄 auth-actions.ts
    │   ├── 📄 product-actions.ts
    │   ├── 📄 stock-actions.ts
    │   ├── 📄 transaction-actions.ts
    │   └── 📄 user-actions.ts
    │
    ├── 📁 hooks/                # Custom hooks
    │   ├── 📄 use-toast.ts
    │   └── 📄 use-cart.ts
    │
    └── 📁 types/                # TypeScript types
        └── 📄 index.ts
```

### File Creation Registry
<!-- Check [x] saat file dibuat, tambah tanggal -->

#### Config Files
- [x] `package.json` <!-- 2025-02-02 -->
- [x] `jsconfig.json` <!-- 2025-02-02 (JavaScript, not TypeScript) -->
- [x] `next.config.mjs` <!-- 2025-02-02 -->
- [x] `postcss.config.mjs` <!-- 2025-02-02 -->
- [x] `eslint.config.mjs` <!-- 2025-02-02 -->
- [x] `prisma.config.js` <!-- 2025-02-02 (Prisma 7 config with defineConfig) -->
- [x] `.env.example` <!-- 2025-02-02 -->
- [x] `.gitignore` <!-- 2025-02-02 -->
- [x] `README.md` <!-- 2025-02-02 -->
- [x] `middleware.js` <!-- 2025-02-03 (NextAuth route protection) -->

#### Prisma
- [x] `prisma/schema.prisma` <!-- 2025-02-02 -->
- [x] `prisma/seed.js` <!-- 2025-02-02 (JavaScript) -->

#### App Routes
- [x] `src/app/layout.js` <!-- 2025-02-02 (JavaScript, updated 2025-02-03) -->
- [x] `src/app/page.js` <!-- 2025-02-03 (Login page) -->
- [x] `src/app/globals.css` <!-- 2025-02-02 -->
- [ ] `src/app/loading.tsx`
- [ ] `src/app/error.tsx`
- [ ] `src/app/not-found.tsx`
- [ ] `src/app/dashboard/layout.tsx`
- [x] `src/app/dashboard/page.js` <!-- 2025-02-03 (JavaScript) -->
- [ ] `src/app/dashboard/loading.tsx`
- [ ] `src/app/dashboard/products/page.tsx`
- [ ] `src/app/dashboard/products/loading.tsx`
- [ ] `src/app/dashboard/products/new/page.tsx`
- [ ] `src/app/dashboard/products/[id]/edit/page.tsx`
- [ ] `src/app/dashboard/stock/page.tsx`
- [ ] `src/app/dashboard/stock/loading.tsx`
- [ ] `src/app/dashboard/transactions/page.tsx`
- [ ] `src/app/dashboard/transactions/loading.tsx`
- [ ] `src/app/dashboard/users/page.tsx`
- [ ] `src/app/dashboard/users/loading.tsx`
- [ ] `src/app/display/page.tsx`
- [x] `src/app/api/auth/[...nextauth]/route.js` <!-- 2025-02-03 (JavaScript) -->

#### UI Components
- [ ] `src/components/ui/button.tsx`
- [ ] `src/components/ui/input.tsx`
- [ ] `src/components/ui/card.tsx`
- [ ] `src/components/ui/badge.tsx`
- [ ] `src/components/ui/table.tsx`
- [ ] `src/components/ui/modal.tsx`
- [ ] `src/components/ui/select.tsx`
- [ ] `src/components/ui/skeleton.tsx`
- [ ] `src/components/ui/toast.tsx`

#### Feature Components
- [x] `src/components/providers.js` <!-- 2025-02-03 (SessionProvider wrapper) -->
- [ ] `src/components/sidebar.tsx`
- [ ] `src/components/header.tsx`
- [ ] `src/components/stat-card.tsx`
- [ ] `src/components/quick-action-card.tsx`
- [ ] `src/components/product-table.tsx`
- [ ] `src/components/product-form.tsx`
- [ ] `src/components/transaction-form.tsx`
- [ ] `src/components/stock-form.tsx`
- [ ] `src/components/user-form.tsx`
- [ ] `src/components/empty-state.tsx`

#### Lib & Utils
- [x] `src/lib/prisma.js` <!-- 2025-02-02 (JavaScript) -->
- [x] `src/lib/auth.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/lib/utils.js` <!-- 2025-02-02 (JavaScript) -->
- [x] `src/lib/validations.js` <!-- 2025-02-03 (JavaScript) -->

#### Server Actions
- [ ] `src/actions/auth-actions.ts`
- [ ] `src/actions/product-actions.ts`
- [ ] `src/actions/stock-actions.ts`
- [ ] `src/actions/transaction-actions.ts`
- [ ] `src/actions/user-actions.ts`

#### Hooks & Types
- [ ] `src/hooks/use-toast.ts`
- [ ] `src/hooks/use-cart.ts`
- [ ] `src/types/index.ts`

---

## 🗄️ Database Schema

### Schema Status
- [x] Schema file created <!-- 2025-02-02 -->
- [x] Initial migration created <!-- DONE: 2025-02-02 (npx prisma db push) -->
- [x] Migration applied to database <!-- DONE: 2025-02-02 -->
- [x] Seed file created <!-- 2025-02-02 -->
- [x] Seed data applied <!-- DONE: 2025-02-02 (npx prisma db seed) -->

**Note**: Using Neon PostgreSQL development branch with **Prisma 7.3.0**. Connection URL configured in `prisma.config.js` (not in schema file).

### Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // URL moved to prisma.config.js (Prisma 7 requirement)
}

// ==================== ENUMS ====================

enum Role {
  owner
  gudang
  kasir
}

// ==================== MODELS ====================

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // hashed with bcrypt
  role      Role     @default(kasir)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  transactions Transaction[]
  stockLogs    StockLog[]

  @@map("users")
}

model Product {
  id        String   @id @default(cuid())
  name      String
  category  String
  brand     String
  price     Int      // dalam Rupiah
  stock     Int      @default(0)
  minStock  Int      @default(5) // threshold warning
  location  String   // lokasi rak: "A1", "B2"
  imageUrl  String?  // optional product image
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  transactions Transaction[]
  stockLogs    StockLog[]

  @@map("products")
}

model Transaction {
  id          String   @id @default(cuid())
  productId   String
  productName String   // snapshot nama produk
  qty         Int
  unitPrice   Int      // snapshot harga saat transaksi
  totalPrice  Int      // qty * unitPrice
  cashierId   String
  cashierName String   // snapshot nama kasir
  createdAt   DateTime @default(now())

  // Relations
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)
  cashier User    @relation(fields: [cashierId], references: [id], onDelete: Restrict)

  @@index([productId])
  @@index([cashierId])
  @@index([createdAt])
  @@map("transactions")
}

model StockLog {
  id          String   @id @default(cuid())
  productId   String
  productName String   // snapshot nama produk
  changeType  String   // "in" | "out" | "adjustment" | "sale"
  changeQty   Int      // positive = masuk, negative = keluar
  prevStock   Int      // stok sebelum perubahan
  newStock    Int      // stok setelah perubahan
  notes       String?  // keterangan optional
  userId      String
  userName    String   // snapshot nama user
  createdAt   DateTime @default(now())

  // Relations
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)
  user    User    @relation(fields: [userId], references: [id], onDelete: Restrict)

  @@index([productId])
  @@index([userId])
  @@index([createdAt])
  @@map("stock_logs")
}
```

### Seed Data

```typescript
// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.stockLog.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const owner = await prisma.user.create({
    data: {
      name: 'Admin Owner',
      email: 'owner@techstore.com',
      password: hashedPassword,
      role: 'owner',
    }
  })

  const gudang = await prisma.user.create({
    data: {
      name: 'Staff Gudang',
      email: 'gudang@techstore.com',
      password: hashedPassword,
      role: 'gudang',
    }
  })

  const kasir = await prisma.user.create({
    data: {
      name: 'Staff Kasir',
      email: 'kasir@techstore.com',
      password: hashedPassword,
      role: 'kasir',
    }
  })

  console.log('✅ Users created')

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      // Processors
      { name: 'AMD Ryzen 5 5600X', category: 'Processor', brand: 'AMD', price: 2500000, stock: 15, minStock: 5, location: 'A1' },
      { name: 'AMD Ryzen 7 5800X', category: 'Processor', brand: 'AMD', price: 3800000, stock: 8, minStock: 3, location: 'A1' },
      { name: 'Intel Core i5-12400F', category: 'Processor', brand: 'Intel', price: 2300000, stock: 12, minStock: 5, location: 'A2' },
      { name: 'Intel Core i7-12700K', category: 'Processor', brand: 'Intel', price: 5200000, stock: 5, minStock: 2, location: 'A2' },
      
      // VGA
      { name: 'NVIDIA RTX 4060', category: 'VGA', brand: 'NVIDIA', price: 5500000, stock: 6, minStock: 3, location: 'B1' },
      { name: 'NVIDIA RTX 4070', category: 'VGA', brand: 'NVIDIA', price: 9500000, stock: 3, minStock: 2, location: 'B1' },
      { name: 'AMD RX 7600', category: 'VGA', brand: 'AMD', price: 4500000, stock: 8, minStock: 3, location: 'B2' },
      
      // RAM
      { name: 'Kingston DDR4 16GB 3200MHz', category: 'RAM', brand: 'Kingston', price: 650000, stock: 25, minStock: 10, location: 'C1' },
      { name: 'Corsair DDR4 32GB 3600MHz', category: 'RAM', brand: 'Corsair', price: 1500000, stock: 10, minStock: 5, location: 'C1' },
      { name: 'G.Skill DDR5 32GB 6000MHz', category: 'RAM', brand: 'G.Skill', price: 2200000, stock: 5, minStock: 3, location: 'C2' },
      
      // Storage
      { name: 'Samsung 970 EVO Plus 1TB', category: 'Storage', brand: 'Samsung', price: 1500000, stock: 15, minStock: 5, location: 'D1' },
      { name: 'WD Blue SN580 1TB', category: 'Storage', brand: 'Western Digital', price: 1100000, stock: 20, minStock: 8, location: 'D1' },
      { name: 'Seagate Barracuda 2TB HDD', category: 'Storage', brand: 'Seagate', price: 850000, stock: 12, minStock: 5, location: 'D2' },
      
      // Peripherals
      { name: 'Logitech G502 Hero', category: 'Mouse', brand: 'Logitech', price: 850000, stock: 0, minStock: 5, location: 'E1' },
      { name: 'Razer DeathAdder V3', category: 'Mouse', brand: 'Razer', price: 1200000, stock: 7, minStock: 3, location: 'E1' },
      { name: 'Keychron K8 Pro', category: 'Keyboard', brand: 'Keychron', price: 1800000, stock: 4, minStock: 2, location: 'E2' },
      { name: 'Royal Kludge RK84', category: 'Keyboard', brand: 'Royal Kludge', price: 750000, stock: 10, minStock: 5, location: 'E2' },
      
      // Monitor
      { name: 'LG 27GP850-B 27" 165Hz', category: 'Monitor', brand: 'LG', price: 5500000, stock: 3, minStock: 2, location: 'F1' },
      { name: 'ASUS VG249Q 24" 144Hz', category: 'Monitor', brand: 'ASUS', price: 2800000, stock: 6, minStock: 3, location: 'F1' },
    ]
  })

  console.log('✅ Products created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

---

## 🔐 Role-Based Access Control

### Permission Matrix

| Resource | Action | Owner | Gudang | Kasir | Public |
|----------|--------|:-----:|:------:|:-----:|:------:|
| **Auth** | Login | ✅ | ✅ | ✅ | ❌ |
| **Dashboard** | View Full | ✅ | ❌ | ❌ | ❌ |
| **Dashboard** | View Limited | - | ✅ | ✅ | ❌ |
| **Products** | List | ✅ | ✅ | ✅ | ✅ |
| **Products** | Create | ✅ | ❌ | ❌ | ❌ |
| **Products** | Update | ✅ | ❌ | ❌ | ❌ |
| **Products** | Delete | ✅ | ❌ | ❌ | ❌ |
| **Stock** | View | ✅ | ✅ | ✅ | ✅ |
| **Stock** | Update | ✅ | ✅ | ❌ | ❌ |
| **Stock** | View Logs | ✅ | ✅ | ❌ | ❌ |
| **Transactions** | Create | ✅ | ❌ | ✅ | ❌ |
| **Transactions** | View Own | - | ❌ | ✅ | ❌ |
| **Transactions** | View All | ✅ | ❌ | ❌ | ❌ |
| **Users** | List | ✅ | ❌ | ❌ | ❌ |
| **Users** | Create | ✅ | ❌ | ❌ | ❌ |
| **Users** | Update | ✅ | ❌ | ❌ | ❌ |
| **Users** | Deactivate | ✅ | ❌ | ❌ | ❌ |

### Route Protection

```typescript
// Protected routes mapping
const routePermissions = {
  '/dashboard': ['owner', 'gudang', 'kasir'],
  '/dashboard/products': ['owner', 'gudang', 'kasir'],
  '/dashboard/products/new': ['owner'],
  '/dashboard/products/*/edit': ['owner'],
  '/dashboard/stock': ['owner', 'gudang'],
  '/dashboard/transactions': ['owner', 'kasir'],
  '/dashboard/users': ['owner'],
  '/display': [], // public, no auth required
}
```

---

## 🎨 Design System Quick Reference

### Color Tokens

```css
/* Primary - Blue */
--color-primary: oklch(0.45 0.15 260);
--color-primary-foreground: oklch(0.99 0 0);

/* Accent - Teal */
--color-accent: oklch(0.55 0.12 200);
--color-accent-foreground: oklch(0.99 0 0);

/* Destructive - Red */
--color-destructive: oklch(0.65 0.2 30);
--color-destructive-foreground: oklch(0.99 0 0);

/* Neutrals */
--color-background: oklch(0.99 0 0);
--color-foreground: oklch(0.15 0 0);
--color-card: oklch(1 0 0);
--color-muted: oklch(0.92 0 0);
--color-muted-foreground: oklch(0.5 0 0);
--color-border: oklch(0.9 0 0);
```

### Stock Status Colors

| Status | Condition | Color Token | Badge Class |
|--------|-----------|-------------|-------------|
| Tersedia | stock > minStock | `primary` | `bg-primary/10 text-primary` |
| Hampir Habis | stock <= minStock && stock > 0 | `accent` | `bg-accent/10 text-accent` |
| Habis | stock === 0 | `destructive` | `bg-destructive/10 text-destructive` |

### Component Classes

```tsx
// Card
className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300"

// Button Primary
className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"

// Button Secondary
className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"

// Button Destructive
className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"

// Input
className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"

// Table Header
className="bg-muted text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider"

// Table Row
className="border-b border-border hover:bg-muted/50 transition-colors"
```

### Icons (Lucide React)

```tsx
import {
  // Navigation
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  
  // Actions
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  
  // Status
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  
  // Misc
  Monitor,
  Clock,
  ChevronRight,
  ChevronDown,
  MoreVertical,
} from 'lucide-react'

// Usage: <Package className="w-5 h-5" />
```

---

## 🔧 Utility Functions

```typescript
// src/lib/utils.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Classname merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format Rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number with thousand separator
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

// Format date full
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

// Format date only
export function formatDateOnly(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(new Date(date))
}

// Format time only
export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'short',
  }).format(new Date(date))
}

// Get stock status
export function getStockStatus(stock: number, minStock: number = 5) {
  if (stock === 0) {
    return { 
      status: 'habis', 
      label: 'Habis', 
      color: 'destructive',
      className: 'bg-destructive/10 text-destructive'
    }
  }
  if (stock <= minStock) {
    return { 
      status: 'hampir_habis', 
      label: 'Hampir Habis', 
      color: 'accent',
      className: 'bg-accent/10 text-accent'
    }
  }
  return { 
    status: 'tersedia', 
    label: 'Tersedia', 
    color: 'primary',
    className: 'bg-primary/10 text-primary'
  }
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Delay helper (for testing loading states)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

---

## 🚨 Known Issues

<!-- Update section ini saat menemukan bug -->

| ID | Severity | Description | Status | Found | Notes |
|----|----------|-------------|--------|-------|-------|
| _none_ | - | _Belum ada issue_ | - | - | - |

### Severity Legend
- 🔴 **Critical**: App tidak bisa jalan
- 🟠 **High**: Fitur utama broken
- 🟡 **Medium**: Fitur minor broken
- 🟢 **Low**: Cosmetic / nice to fix

### Status Legend
- 🔴 Open
- 🟡 In Progress
- 🟢 Resolved
- ⚪ Won't Fix

### Issue Template
```markdown
| ISS-001 | 🟡 Medium | Deskripsi singkat | 🔴 Open | 2025-02-02 | Detail tambahan |
```

---

## 📝 Changelog

<!-- Format: [YYYY-MM-DD] Category: Description -->
<!-- Categories: Setup, Feature, Fix, Docs, Refactor, Style -->

### [2025-02-02] Setup
- ✅ **Phase 1 Complete!** Initialized project foundation
- 🚀 Initialized Next.js 15 with JavaScript (no TypeScript)
- 🎨 Created globals.css with complete design tokens (OKLCH colors)
- 📦 Installed all core dependencies (Next.js, React 19, **Prisma 7.3.0**, NextAuth, Tailwind v4)
- 🗄️ Created Prisma schema with all models (User, Product, Transaction, StockLog)
- 🔧 Upgraded to **Prisma 7.3.0** with `prisma.config.js` (defineConfig pattern)
- 🔧 Configured database connection via `prisma.config.js` (DIRECT_DATABASE_URL)
- 🌱 Created seed.js with demo products and users
- ⚙️ Created utility functions (formatRupiah, getStockStatus, etc.)
- 🔧 Created Prisma client singleton
- 📝 Created .env.example template
- 📄 Updated base layout.js with Indonesian locale
- ✅ **Database Setup Complete!** Pushed schema and seeded data
- 🎲 Seeded 3 users (owner, gudang, kasir) and 19 products
- 🏢 Using Neon PostgreSQL development branch
- ✅ Verified data in Prisma Studio

### [2025-02-02] Docs
- ✨ Created comprehensive CLAUDE.md with progress tracking
- 📋 Defined complete project structure
- 📋 Defined database schema with all models
- 📋 Defined role-based access control matrix
- 📋 Added design system quick reference
- 📋 Added utility functions reference
- 📋 Created file creation registry

### [2025-02-03] Feature
- ✅ **Phase 2 Complete!** Implemented authentication system
- 🔐 Created NextAuth.js v5 configuration with Credentials provider
- 🔑 Implemented login page with email/password form
- 🛡️ Created middleware for route protection
- 👥 Added role-based access control (owner, gudang, kasir)
- 📦 Created SessionProvider wrapper component
- 🎨 Login UI follows design system (OKLCH colors, design tokens)
- ✅ Password verification dengan bcryptjs
- ✅ JWT-based session strategy
- ✅ User isActive status validation
- 📄 Created validation schemas dengan Zod
- 🧪 Created test dashboard page untuk verify auth flow
- 📊 Progress: 17/67 tasks (25% complete)

---

## 🔑 Environment Variables

### Required Variables

```env
# .env.local (copy dari .env.example)

# Database - Neon PostgreSQL
DATABASE_URL="postgresql://username:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### Setup Checklist
- [x] Create `.env.example` file <!-- 2025-02-02 -->
- [x] Copy to `.env.local` <!-- 2025-02-02 -->
- [x] Create Neon database project <!-- 2025-02-02 -->
- [x] Get database connection string (pooled) <!-- 2025-02-02 -->
- [x] Set `DATABASE_URL` <!-- 2025-02-02 -->
- [x] Generate `NEXTAUTH_SECRET` <!-- 2025-02-02 -->
- [x] Set `NEXTAUTH_URL` <!-- 2025-02-02 -->

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

---

## ⚡ Quick Commands

```bash
# ===== Development =====
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# ===== Database =====
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema (dev, no migration)
npx prisma migrate dev   # Create & apply migration
npx prisma migrate deploy # Apply migrations (prod)
npx prisma studio        # Open database GUI
npx prisma db seed       # Run seed script

# ===== Utilities =====
npx tsc --noEmit         # Type check only
npm run lint -- --fix    # Fix linting issues
```

---

## 🤖 Claude Code Self-Update Instructions

### Setelah Menyelesaikan Task

1. **Update progress checkbox** yang relevan:
   ```markdown
   - [x] Task name <!-- DONE: 2025-02-02 -->
   ```

2. **Update overall progress**:
   - Hitung total checkbox yang sudah [x]
   - Update angka di `**Completed**: X/67`
   - Update progress bar (setiap 5% = 1 block █)

3. **Update phase status**:
   ```markdown
   **Phase Status**: 🟢 Complete (9/9)
   ```
   Status options: 🔴 Not Started, 🟡 In Progress, 🟢 Complete

4. **Update file registry** jika buat file baru:
   ```markdown
   - [x] `src/components/ui/button.tsx` <!-- 2025-02-02 -->
   ```

5. **Update dependencies** jika install package:
   ```markdown
   | next | ^15.0.0 | 🟢 Installed | React framework |
   ```

6. **Add changelog entry**:
   ```markdown
   ### [2025-02-02] Feature
   - ✨ Added Button component with all variants
   - ✨ Added Input component with validation states
   ```

### Saat Menemukan Bug

1. **Add ke Known Issues**:
   ```markdown
   | ISS-001 | 🟡 Medium | Login tidak redirect | 🔴 Open | 2025-02-02 | Cek middleware |
   ```

2. **Update bila resolved**:
   ```markdown
   | ISS-001 | 🟡 Medium | Login tidak redirect | 🟢 Resolved | 2025-02-02 | Fixed di auth.ts |
   ```

### Code Quality Checklist

Sebelum menganggap task selesai:

- [ ] TypeScript strict compliant (no `any`)
- [ ] Menggunakan design tokens
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Responsive design
- [ ] Accessible (labels, focus states)
- [ ] No console.log left
- [ ] CLAUDE.md updated

---

## 📚 Reference Documents

| Document | Path | Description |
|----------|------|-------------|
| Project Planning | `docs/planning.md` | Full requirements spec |
| Design Language | `docs/design-language.md` | Complete design system |
| Next.js Docs | https://nextjs.org/docs | Framework documentation |
| Prisma Docs | https://prisma.io/docs | ORM documentation |
| NextAuth Docs | https://authjs.dev | Auth documentation |
| Tailwind Docs | https://tailwindcss.com/docs | CSS framework |
| Lucide Icons | https://lucide.dev/icons | Icon library |

---

**End of CLAUDE.md**

---

_Document Version: 1.0.0_  
_Last Updated: 2025-02-02_  
_Total Tasks: 67_  
_Progress: 0%_

# GEMINI.md - Toko Agung Computer's Inventory Management System

> **⚠️ LIVING DOCUMENT**: File ini adalah panduan utama untuk Gemini Code. Update file ini setiap kali ada perubahan signifikan pada project.

---

## 📋 Meta Instructions

### Cara Menggunakan File Ini

1. **Baca seluruh file** sebelum memulai task apapun
2. **Update progress** di section `Development Progress` setelah menyelesaikan task
3. **Catat perubahan** di section `Changelog` untuk setiap modifikasi signifikan
4. **Update Known Issues** jika menemukan bug atau masalah
5. **Sync dengan kode** - pastikan dokumentasi selalu reflect state terkini

### Kapan Harus Update GEMINI.md

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
**Last Updated**: 2025-02-04

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
[██████████████████░░] 92% Complete
```

**Total Tasks**: 74
**Completed**: 68
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
**Notes**: _Authentication system fully implemented and tested! NextAuth.js v5 with Credentials provider, JWT sessions, role-based access control, and working login flow._

---

### Phase 3: Core UI Components ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Reusable components library (Dashboard-First Approach) -->

- [x] Button component (primary, secondary, destructive, ghost) <!-- DONE: 2025-02-03 -->
- [ ] Input component dengan validation states <!-- DEFERRED: Phase 5 -->
- [x] Card component <!-- DONE: 2025-02-03 -->
- [x] Badge component (untuk status) <!-- DONE: 2025-02-03 -->
- [ ] Table component dengan sorting <!-- DEFERRED: Phase 5 -->
- [ ] Modal/Dialog component <!-- DEFERRED: Phase 5 -->
- [x] Skeleton loading components <!-- DONE: 2025-02-03 -->
- [ ] Toast notification component <!-- DEFERRED: Phase 5 -->
- [ ] Select/Dropdown component <!-- DEFERRED: Phase 5 -->
- [x] Sidebar navigation component <!-- DONE: 2025-02-03 -->
- [x] Header component <!-- DONE: 2025-02-03 -->
- [x] StatCard component (untuk dashboard) <!-- DONE: 2025-02-03 -->
- [x] QuickActionCard component (untuk dashboard) <!-- DONE: 2025-02-03 -->
- [x] EmptyState component <!-- DONE: 2025-02-03 -->
- [ ] ErrorBoundary component <!-- DEFERRED: Phase 10 -->

**Phase Status**: 🟢 Complete (9/15 essential + 6 deferred)
**Blockers**: _None_
**Notes**: _Dashboard-first approach! Built 9 essential components for dashboard. Remaining 6 components (Input, Table, Select, Modal, Toast, ErrorBoundary) deferred to Phase 5 when needed for Product management forms._

---

### Phase 4: Dashboard Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Main dashboard page -->

- [x] Dashboard layout dengan sidebar <!-- DONE: 2025-02-03 -->
- [x] Stat cards (Total Produk, Stok Rendah, Transaksi Hari Ini, Revenue) <!-- DONE: 2025-02-03 -->
- [x] Quick action cards (Tambah Produk, Update Stok, Input Transaksi) <!-- DONE: 2025-02-03 -->
- [x] Recent transactions preview <!-- DONE: 2025-02-03 (simple card list) -->
- [x] Role-based content filtering <!-- DONE: 2025-02-03 (Sidebar menu) -->
- [x] Loading states <!-- DONE: 2025-02-03 (Skeleton) -->
- [x] Empty states <!-- DONE: 2025-02-03 (EmptyState) -->

**Phase Status**: 🟢 Complete (7/7)
**Blockers**: _None_
**Notes**: _Dashboard fully functional with mock data! Sidebar navigation with role-based filtering, 4 StatCards with trends, 3 QuickActionCards, recent transactions preview, loading states with Skeleton, and empty states._

---

### Phase 5: Product Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: CRUD Produk (Owner only) -->

- [x] Product list page dengan DataTable <!-- DONE: 2025-02-03 -->
- [x] Search products by name/brand <!-- DONE: 2025-02-03 -->
- [x] Filter products by category <!-- DONE: 2025-02-03 -->
- [x] Sort products by columns <!-- DONE: 2025-02-03 -->
- [x] Add product form dengan validation <!-- DONE: 2025-02-03 -->
- [x] Edit product form <!-- DONE: 2025-02-03 -->
- [x] Delete product dengan confirmation modal <!-- DONE: 2025-02-03 -->
- [x] Product stock status indicators <!-- DONE: 2025-02-03 -->
- [x] Server actions untuk CRUD operations <!-- DONE: 2025-02-03 -->
- [x] Optimistic updates <!-- DONE: 2025-02-03 -->

**Phase Status**: 🟢 Complete (10/10)
**Blockers**: _None_
**Notes**: _Phase 5 complete! Built 15 files: 5 UI components (Input, Select, Table, Modal, Toast), 1 server actions file, 2 feature components (ProductForm, ProductTable), 3 pages (List, Add, Edit). Full CRUD with search/filter/sort, role-based access (owner: full, gudang/kasir: read-only), client+server validation, toast notifications, soft delete._

---

### Phase 6: Stock Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Fitur untuk Petugas Gudang -->

- [x] Stock overview page <!-- DONE: 2025-02-03 -->
- [x] Update stock form (tambah stok) <!-- DONE: 2025-02-03 -->
- [x] Reduce stock form (manual reduction) <!-- DONE: 2025-02-03 -->
- [x] Stock adjustment dengan notes <!-- DONE: 2025-02-03 -->
- [x] Stock history/log table <!-- DONE: 2025-02-03 -->
- [x] Low stock alerts list <!-- DONE: 2025-02-03 -->
- [x] Server actions untuk stock operations <!-- DONE: 2025-02-03 -->
- [x] Stock log entries automatic <!-- DONE: 2025-02-03 -->

**Phase Status**: 🟢 Complete (8/8)
**Blockers**: _None_
**Notes**: _Phase 6 complete! Built 4 files: 1 server actions (5 functions with Prisma transactions), 2 feature components (StockForm with tabs, StockLogTable with filters), 1 page (Stock management with 3 sections). Role-based access (owner + gudang only), automatic StockLog snapshots, low stock alerts._

---

### Phase 7: Transaction Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Fitur untuk Kasir -->

- [x] Transaction/POS page layout <!-- DONE: 2025-02-04 -->
- [x] Product search untuk add to cart <!-- DONE: 2025-02-04 -->
- [x] Cart management (add, remove, update qty) <!-- DONE: 2025-02-04 -->
- [x] Calculate subtotal dan total otomatis <!-- DONE: 2025-02-04 -->
- [x] Validate qty tidak melebihi stock <!-- DONE: 2025-02-04 -->
- [x] Process transaction (create record, reduce stock) <!-- DONE: 2025-02-04 -->
- [x] Transaction success receipt view <!-- DONE: 2025-02-04 -->
- [x] Transaction history page (owner only) <!-- DONE: 2025-02-04 -->
- [x] Filter transactions by date range <!-- DONE: 2025-02-04 -->
- [x] Server actions untuk transactions <!-- DONE: 2025-02-04 -->

**Phase Status**: 🟢 Complete (10/10)
**Blockers**: _None_
**Notes**: _Phase 7 complete! Built 10 new files for POS system with atomic transaction processing, cart state management (React Context), stock validation (client + server), and transaction history with date filtering. Dashboard updated to use real database stats._

---

### Phase 8: User Management Module ━━━━━━━━━━━━━━━━━━━━
<!-- Target: Admin features (Owner only) -->

- [x] User list page <!-- DONE: 2026-02-04 -->
- [x] Add user form dengan role selection <!-- DONE: 2026-02-04 -->
- [x] Edit user form <!-- DONE: 2026-02-04 -->
- [x] Toggle user active/inactive <!-- DONE: 2026-02-04 -->
- [x] Role badges display <!-- DONE: 2026-02-04 -->
- [x] Server actions untuk user management <!-- DONE: 2026-02-04 -->
- [x] Prevent self-deactivation <!-- DONE: 2026-02-04 -->

**Phase Status**: 🟢 Complete (7/7)
**Blockers**: _None_
**Notes**: _Phase 8 complete! Built 5 files: 1 server actions (6 functions with auth checks), 2 feature components (UserForm with create/edit modes, UserTable with toggle active/role badges), 3 pages (List, Add, Edit). Owner-only access with role guard, self-deactivation prevention, password hashing with bcrypt, email uniqueness validation._

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
| @prisma/client | 6.19.2 | 🟢 Installed | Database client |
| prisma | 6.19.2 | 🟢 Installed | ORM CLI (dev) |
| next-auth | ^5.0.0-beta.30 | 🟢 Installed | Authentication |

### Additional Dependencies

| Package | Version | Status | Purpose |
|---------|---------|--------|---------|
| bcryptjs | ^3.0.3 | 🟢 Installed | Password hashing |
| lucide-react | ^0.563.0 | 🟢 Installed | Icons |
| clsx | ^2.1.1 | 🟢 Installed | Classname utility |
| tailwind-merge | ^3.4.0 | 🟢 Installed | Tailwind class merge |
| zod | ^4.3.6 | 🟢 Installed | Schema validation |
| @neondatabase/serverless | ^1.0.2 | 🟢 Installed | Neon serverless driver |
| @prisma/adapter-neon | ^7.3.0 | 🟢 Installed | Prisma Neon adapter |
| ws | ^8.19.0 | 🟢 Installed | WebSocket library |

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
├── 📄 GEMINI.md                 # File ini (living document)
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
- [x] `middleware.js` <!-- 2025-02-03 (NextAuth v5 route protection, updated) -->

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
- [x] `src/app/dashboard/page.js` <!-- 2025-02-03 (JavaScript, updated 2025-02-04 with real database stats) -->
- [ ] `src/app/dashboard/loading.tsx`
- [x] `src/app/dashboard/products/page.js` <!-- 2025-02-03 (JavaScript) -->
- [ ] `src/app/dashboard/products/loading.tsx`
- [x] `src/app/dashboard/products/new/page.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/app/dashboard/products/[id]/edit/page.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/app/dashboard/stock/page.js` <!-- 2025-02-03 (JavaScript, Phase 6) -->
- [ ] `src/app/dashboard/stock/loading.tsx`
- [x] `src/app/dashboard/transactions/page.js` <!-- 2025-02-04 (JavaScript, Phase 7 POS page) -->
- [x] `src/app/dashboard/transactions/history/page.js` <!-- 2025-02-04 (JavaScript, Phase 7 History page) -->
- [ ] `src/app/dashboard/transactions/loading.tsx`
- [x] `src/app/dashboard/users/page.js` <!-- 2026-02-04 (JavaScript, Phase 8 user list) -->
- [x] `src/app/dashboard/users/new/page.js` <!-- 2026-02-04 (JavaScript, Phase 8 add user) -->
- [x] `src/app/dashboard/users/[id]/edit/page.js` <!-- 2026-02-04 (JavaScript, Phase 8 edit user) -->
- [ ] `src/app/dashboard/users/loading.tsx`
- [ ] `src/app/display/page.tsx`
- [x] `src/app/api/auth/[...nextauth]/route.js` <!-- 2025-02-03 (JavaScript, updated for NextAuth v5) -->

#### UI Components
- [x] `src/components/ui/button.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/ui/input.js` <!-- 2025-02-03 (JavaScript, Phase 5) -->
- [x] `src/components/ui/card.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/ui/badge.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/ui/table.js` <!-- 2025-02-03 (JavaScript, Phase 5 compound components) -->
- [x] `src/components/ui/modal.js` <!-- 2025-02-03 (JavaScript, Phase 5) -->
- [x] `src/components/ui/select.js` <!-- 2025-02-03 (JavaScript, Phase 5) -->
- [x] `src/components/ui/skeleton.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/ui/toast.js` <!-- 2025-02-03 (JavaScript, Phase 5) -->

#### Feature Components
- [x] `src/components/providers.js` <!-- 2025-02-03 (SessionProvider + ToastProvider wrapper, updated) -->
- [x] `src/components/sidebar.js` <!-- 2025-02-03 (JavaScript, updated 2025-02-04 with History menu) -->
- [x] `src/components/header.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/stat-card.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/quick-action-card.js` <!-- 2025-02-03 (JavaScript) -->
- [x] `src/components/product-table.js` <!-- 2025-02-03 (JavaScript, Phase 5 with search/filter/sort) -->
- [x] `src/components/product-form.js` <!-- 2025-02-03 (JavaScript, Phase 5 reusable for Add/Edit) -->
- [x] `src/components/product-search.js` <!-- 2025-02-04 (JavaScript, Phase 7 for POS cart) -->
- [x] `src/components/cart-table.js` <!-- 2025-02-04 (JavaScript, Phase 7 cart display) -->
- [x] `src/components/transaction-receipt.js` <!-- 2025-02-04 (JavaScript, Phase 7 success modal) -->
- [x] `src/components/transaction-history-table.js` <!-- 2025-02-04 (JavaScript, Phase 7 with date filters) -->
- [x] `src/components/stock-form.js` <!-- 2025-02-03 (JavaScript, Phase 6 with 3 tabs) -->
- [x] `src/components/stock-log-table.js` <!-- 2025-02-03 (JavaScript, Phase 6 with filters) -->
- [x] `src/components/user-form.js` <!-- 2026-02-04 (JavaScript, Phase 8 create/edit) -->
- [x] `src/components/user-table.js` <!-- 2026-02-04 (JavaScript, Phase 8 with toggle active) -->
- [x] `src/components/empty-state.js` <!-- 2025-02-03 (JavaScript) -->

#### Lib & Utils
- [x] `src/lib/prisma.js` <!-- 2025-02-02 (JavaScript) -->
- [x] `src/lib/auth.js` <!-- 2025-02-03 (JavaScript, updated for NextAuth v5) -->
- [x] `src/lib/utils.js` <!-- 2025-02-02 (JavaScript) -->
- [x] `src/lib/validations.js` <!-- 2025-02-03 (JavaScript, updated 2025-02-04 with transaction schemas) -->

#### Server Actions
- [ ] `src/actions/auth-actions.ts`
- [x] `src/actions/product-actions.js` <!-- 2025-02-03 (JavaScript, Phase 5 with 5 CRUD functions) -->
- [x] `src/actions/stock-actions.js` <!-- 2025-02-03 (JavaScript, Phase 6 with 5 functions) -->
- [x] `src/actions/transaction-actions.js` <!-- 2025-02-04 (JavaScript, Phase 7 with 4 functions + Prisma transactions) -->
- [x] `src/actions/user-actions.js` <!-- 2026-02-04 (JavaScript, Phase 8 with 6 functions) -->

#### Hooks & Types
- [x] `src/hooks/use-toast.js` <!-- 2025-02-03 (JavaScript, Phase 5 Toast system) -->
- [x] `src/hooks/use-cart.js` <!-- 2025-02-04 (JavaScript, Phase 7 cart state with Context API) -->
- [ ] `src/types/index.ts`

---

## 🗄️ Database Schema

### Schema Status
- [x] Schema file created <!-- 2025-02-02 -->
- [x] Initial migration created <!-- DONE: 2025-02-02 (npx prisma db push) -->
- [x] Migration applied to database <!-- DONE: 2025-02-02 -->
- [x] Seed file created <!-- 2025-02-02 -->
- [x] Seed data applied <!-- DONE: 2025-02-02 (npx prisma db seed) -->

**Note**: Using Neon PostgreSQL development branch with **Prisma 6.19.2**. Connection URL configured in both `prisma.config.js` (for CLI) and `schema.prisma` (for runtime).

### Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DIRECT_DATABASE_URL")
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
| ISS-001 | 🔴 Critical | PrismaClientInitializationError on login | 🟢 Resolved | 2025-02-03 | Fixed by adding datasource URL to schema.prisma |
| ISS-002 | 🔴 Critical | NextAuth Function.prototype.apply error | 🟢 Resolved | 2025-02-03 | Fixed by restructuring NextAuth v5 config |

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
- ✨ Created comprehensive GEMINI.md with progress tracking
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

### [2025-02-03] Feature (Continued)
- ✅ **Phases 3 & 4 Complete!** Dashboard-first approach implemented
- 🎨 Built 9 essential UI components:
  - Button (primary, secondary, destructive, ghost, outline variants)
  - Badge (stock status indicators with OKLCH colors)
  - Card (with sub-components: Header, Title, Description, Content, Footer)
  - Skeleton (loading states with pulse animation)
  - EmptyState (no-data scenarios with icon and actions)
  - Header (page titles with breadcrumbs support)
  - Sidebar (role-based navigation with mobile toggle)
  - StatCard (dashboard statistics with trend indicators)
  - QuickActionCard (action cards with hover effects)
- 📊 Created complete dashboard page:
  - 4 StatCards grid (Total Produk, Stok Rendah, Transaksi, Revenue)
  - 3 QuickActionCards grid (Tambah Produk, Update Stok, Transaksi)
  - Recent transactions preview
  - Loading states with Skeleton components
  - Empty states with EmptyState component
- 🎯 Dashboard layout with Sidebar navigation
- 🔐 Role-based menu filtering (owner sees all, gudang/kasir filtered)
- 📱 Responsive design (mobile toggle, desktop fixed sidebar)
- ⚙️ All components follow design system (OKLCH colors, Tailwind v4)
- 📊 Progress: 33/67 tasks (49% complete)
- 🚀 Deferred 6 components to Phase 5 (Input, Table, Select, Modal, Toast, ErrorBoundary)

### [2025-02-03] Feature (Phase 5)
- ✅ **Phase 5 Complete!** Product Management Module fully implemented
- 🎨 Built 5 deferred UI components:
  - Input (validation states, error display, helper text)
  - Select (native select with custom styling, chevron icon)
  - Table (compound components: Table, TableHeader, TableBody, TableRow, TableHead, TableCell)
  - Modal (backdrop overlay, ESC key close, focus trap, body scroll lock)
  - Toast (notification system with Context, auto-dismiss, success/error/info variants)
- 📦 Created server actions with auth & validation:
  - product-actions.js with 5 CRUD functions (getProducts, getProductById, createProduct, updateProduct, deleteProduct)
  - Auth checks: requireOwner() helper for owner-only operations
  - Zod validation with productSchema
  - Soft delete implementation (isActive = false)
  - Transaction safety check on delete
- 🧩 Built 2 feature components:
  - ProductForm (reusable for Add/Edit, 8 fields, client+server validation, role guard)
  - ProductTable (search by name/brand, filter by category tabs, sort by columns, delete modal, role-based actions)
- 📄 Created 3 pages:
  - Product List page (ProductTable integration, owner-only Add button)
  - Add Product page (ProductForm, toast notifications, redirect on success)
  - Edit Product page (fetch by ID, pre-fill form, update on submit)
- 🔐 Two-layer role-based access control:
  - UI hiding: owner sees Add/Edit/Delete, gudang/kasir read-only
  - Server enforcement: requireOwner() checks in all CUD operations
- 🔍 Search & Filter features:
  - Client-side search (debounced, filters by name/brand)
  - Category filter tabs (All + 7 categories)
  - Column sorting (name, price, stock with ASC/DESC/none)
- ✅ Toast notification system integrated:
  - ToastProvider added to root layout
  - Success/error toasts on all CRUD operations
- 📊 Progress: 43/67 tasks (64% complete)
- 🎯 Ready for Phase 6: Stock Management Module

### [2025-02-03] Feature (Phase 6)
- ✅ **Phase 6 Complete!** Stock Management Module fully implemented
- 📦 Created server actions with Prisma transactions:
  - stock-actions.js with 5 functions (getLowStockProducts, getStockLogs, addStock, reduceStock, adjustStock)
  - Auth checks: requireOwnerOrGudang() helper for owner + gudang only
  - Prisma $transaction API for atomicity (StockLog + Product update)
  - Automatic snapshot creation (productName, userName) in StockLog
  - revalidatePath for cache invalidation
- 🧩 Built 2 feature components:
  - StockForm (tabbed UI with 3 modes: Add/Reduce/Adjust, dynamic fields per mode)
  - StockLogTable (history table with changeType filter, badge colors)
- 📄 Created 1 page:
  - Stock Management page with 3 sections (low stock alerts, stock form, stock history)
  - Role guard: owner + gudang can access, kasir blocked
  - Refresh mechanism: refreshTrigger syncs alerts and history after operations
- 🔐 Two-layer role-based access control:
  - UI level: redirect to dashboard with error toast if kasir tries to access
  - Server level: requireOwnerOrGudang() checks in all stock operations
- 🎨 Low stock alerts:
  - Card grid showing products where stock <= minStock
  - Displays name, category, brand, current stock, min stock
  - Updates automatically after stock operations
- 📊 Stock operations with validation:
  - Add stock: validate qty > 0, create "in" log entry, increase stock
  - Reduce stock: validate qty > 0 and qty <= current stock, create "out" log entry, decrease stock
  - Adjust stock: validate newStock >= 0, create "adjustment" log entry, set to new value
  - All operations use Prisma transactions for data consistency
- 📋 Stock history features:
  - 8 columns: Waktu, Produk, Tipe, Perubahan, Stok Sebelum, Stok Sesudah, User, Catatan
  - Filter by changeType (All/Masuk/Keluar/Penyesuaian/Penjualan)
  - Badge colors: primary (Masuk), destructive (Keluar), accent (Penyesuaian), neutral (Penjualan)
  - Positive changes in green, negative changes in red
- ✅ Toast notification system for all operations:
  - Success toast on stock update
  - Error toast with specific messages
- 📊 Progress: 51/67 tasks (76% complete)
- 🎯 Ready for Phase 7: Transaction Module

### [2025-02-04] Feature (Phase 7)
- ✅ **Phase 7 Complete!** Transaction Module (POS System) fully implemented
- 📦 Created server actions with atomic Prisma transactions:
  - transaction-actions.js with 4 functions (processTransaction, getTransactions, getTransactionStats, validateProductStock)
  - Auth checks: requireOwnerOrKasir() for POS access, requireOwner() for history/stats
  - Prisma $transaction for multi-item cart processing (atomicity guaranteed)
  - Automatic snapshot creation (productName, unitPrice, cashierName) for historical data integrity
  - Stock validation (server-side): prevents overselling with specific error messages
  - StockLog creation: automatic "sale" type entries for all transactions
  - revalidatePath for cache invalidation across multiple pages
- 🛒 Built cart state management system:
  - use-cart.js hook with React Context API (CartProvider pattern)
  - 5 cart operations: addToCart, removeFromCart, updateCartQty, clearCart, getCartSummary
  - Client-side stock validation with maxStock tracking
- 🧩 Built 4 feature components:
  - ProductSearch (search by name/brand, category filter tabs, stock badges, qty input)
  - CartTable (editable qty, remove button, subtotal calculation, empty state)
  - TransactionReceipt (success modal with itemized list, grand total, transaction metadata)
  - TransactionHistoryTable (date range filter, sortable columns, revenue summary)
- 📄 Created 2 pages:
  - POS page (2-column layout: product search + cart, process transaction button)
  - Transaction History page (owner-only, date filtering, transaction list with cashier names)
- 🔐 Two-layer role-based access control:
  - UI level: owner + kasir can access POS, only owner can access history
  - Server level: requireOwnerOrKasir() for transactions, requireOwner() for history/stats
- 🎯 Transaction processing features:
  - Atomic processing: all cart items processed together (all succeed or all rollback)
  - Stock reduction: automatic deduction from product stock
  - Stock validation: prevents qty > available stock with clear error messages
  - Historical snapshots: preserves product/user data even if records deleted
  - Error handling: specific messages for each failure scenario
- 📊 Transaction history features:
  - Date range filtering (start date, end date)
  - Transaction list: product, qty, unit price, total, cashier, timestamp
  - Revenue summary: total count and total revenue for filtered period
  - Formatted display: formatRupiah for prices, formatDate for timestamps
- 🎨 Added menu item to sidebar:
  - "Riwayat Transaksi" menu (owner-only) with FileText icon
  - Sidebar updated with new navigation item
- 📊 **Dashboard updated with real database data**:
  - Total Produk: fetched from getProducts() - counts active products
  - Stok Rendah: filtered from products where stock <= minStock
  - Transaksi Hari Ini (owner only): from getTransactionStats() - today's count
  - Revenue Hari Ini (owner only): from getTransactionStats() - today's total revenue
  - Recent Transactions (owner only): from getTransactions({ limit: 5 }) - 5 latest transactions
  - Role-based display: owner sees all stats, gudang/kasir see limited stats
  - Quick actions: filtered by role (owner: all, gudang: stock only, kasir: transactions only)
- 📊 Progress: 61/67 tasks (91% complete)
- 🎯 Ready for Phase 8: User Management Module

### [2026-02-04] Feature (Phase 8)
- ✅ **Phase 8 Complete!** User Management Module fully implemented
- 📦 Created server actions with auth checks:
  - user-actions.js with 6 functions (getUsers, getUserById, createUser, updateUser, toggleUserActive, deleteUser)
  - Auth checks: requireOwner() helper for owner-only operations
  - Password hashing with bcryptjs (10 rounds)
  - Email uniqueness validation (check before create/update)
  - Self-deactivation prevention (owner cannot deactivate own account)
  - Zod validation with userSchema and userUpdateSchema
  - revalidatePath for cache invalidation
- 🧩 Built 2 feature components:
  - UserForm (reusable for create/edit, 4 fields: name, email, password, role)
    - Edit mode: password optional (leave blank to keep current)
    - Client-side validation with Zod safeParse
    - Native select for role dropdown (Owner/Gudang/Kasir)
  - UserTable (user list with edit and toggle active actions)
    - Role badges: Owner (primary/blue), Gudang (accent/teal), Kasir (neutral)
    - Active/Inactive status badges
    - "Anda" badge on current user row
    - Toggle confirmation modal with context-aware messaging
    - Self-deactivation prevention (UI + server check)
- 📄 Created 3 pages:
  - User List page (UserTable integration, "Tambah Pengguna" button)
  - Add User page (UserForm in create mode, toast notifications, redirect on success)
  - Edit User page (fetch user by ID, pre-fill form, update on submit)
- 🔐 Owner-only access control:
  - UI level: redirect to dashboard with error toast if non-owner
  - Server level: requireOwner() checks in all operations
- 📊 Progress: 68/74 tasks (92% complete)
- 🎯 Ready for Phase 9: Public Display

### [2025-02-03] Fix
- 🐛 Fixed PrismaClientInitializationError on startup
  - Added `url = env("DIRECT_DATABASE_URL")` to prisma/schema.prisma
  - Simplified PrismaClient initialization in src/lib/prisma.js
  - Issue: Prisma 6 requires datasource URL in schema file
- 🐛 Fixed NextAuth "Function.prototype.apply" error
  - Restructured auth setup to use NextAuth v5 pattern
  - Created proper NextAuth() instance with handlers export
  - Updated middleware to use auth export from lib/auth.js
  - Fixed API route to import handlers from centralized config
- 🔧 Clarified Prisma version: Using **Prisma 6.19.2** (not 7.x)
- ✅ Authentication flow now fully working (login → dashboard redirect)

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

## 🤖 Gemini Code Self-Update Instructions

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
- [ ] GEMINI.md updated

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

**End of GEMINI.md**

---

_Document Version: 1.0.1_
_Last Updated: 2025-02-03_
_Total Tasks: 67_
_Progress: 25%_

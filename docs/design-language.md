# TechStore Design Language

Dokumentasi lengkap design system UI/UX untuk TechStore Inventory Management System. Panduan ini memastikan konsistensi visual dan pengalaman pengguna di seluruh aplikasi.

---

## 1. Filosofi Desain

**Core Principles:**
- **Modern & Clean**: Desain minimalis dengan fokus pada fungsionalitas
- **Intuitif**: Interface yang mudah dipahami untuk semua level pengguna (owner, gudang, kasir)
- **Accessible**: Memenuhi standar aksesibilitas untuk karyawan dengan berbagai kemampuan
- **Efisien**: Workflow yang cepat dan tidak membingungkan
- **Konsisten**: Visual language yang uniform di seluruh aplikasi

---

## 2. Color System

### Palet Warna Utama

**Primary Color - Blue**
- Token: `--primary` 
- Light Mode: `oklch(0.45 0.15 260)`
- Dark Mode: `oklch(0.65 0.15 260)`
- Foreground: `oklch(0.99 0 0)` (White)
- Usage: Primary actions, navigation highlights, key information

**Accent Color - Teal**
- Token: `--accent`
- Light Mode: `oklch(0.55 0.12 200)`
- Dark Mode: `oklch(0.7 0.12 200)`
- Foreground: `oklch(0.99 0 0)` (White)
- Usage: Secondary actions, status indicators, complementary highlights

**Destructive Color - Red**
- Token: `--destructive`
- Light Mode: `oklch(0.65 0.2 30)`
- Dark Mode: `oklch(0.7 0.2 30)`
- Foreground: `oklch(0.99 0 0)` (White)
- Usage: Delete, error states, critical warnings

### Neutral Colors

**Background & Surfaces**
- Background: `oklch(0.99 0 0)` (Light) / `oklch(0.12 0 0)` (Dark)
- Card: `oklch(1 0 0)` (White)
- Muted (Secondary Surface): `oklch(0.92 0 0)` (Light) / `oklch(0.3 0 0)` (Dark)

**Text & Foreground**
- Foreground: `oklch(0.15 0 0)` (Dark Gray)
- Muted Foreground: `oklch(0.5 0 0)` (Medium Gray)

**Borders**
- Token: `--border`
- Color: `oklch(0.9 0 0)` (Light) / `oklch(0.25 0 0)` (Dark)
- Usage: Dividers, card borders, subtle separations

### Status Indicators

| Status | Color | Meaning |
|--------|-------|---------|
| Success | Primary Blue | Tersedia/Aman |
| Warning | Accent Teal | Hampir Habis |
| Error | Destructive Red | Habis/Error |
| Neutral | Muted Gray | Informasi |

### Warna Tidak Digunakan

- **Tidak ada emoji** - Semua ikon menggunakan SVG
- **Tidak ada gradient** - Semua warna solid dari design tokens
- **Tidak ada warna sekunder yang kuat** - Fokus pada primary, accent, dan neutral

---

## 3. Typography

### Font Stack

```css
Font Sans (Body): 'Geist', 'Geist Fallback'
Font Mono (Code): 'Geist Mono', 'Geist Mono Fallback'
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 48px / 3rem | Bold (700) | 1.2 | Page titles |
| H2 | 32px / 2rem | Bold (700) | 1.25 | Section titles |
| H3 | 24px / 1.5rem | Semibold (600) | 1.3 | Subsections |
| H4 | 18px / 1.125rem | Semibold (600) | 1.4 | Card titles |
| Body Large | 18px / 1.125rem | Regular (400) | 1.5 | Large body text |
| Body | 16px / 1rem | Regular (400) | 1.6 | Standard text |
| Body Small | 14px / 0.875rem | Regular (400) | 1.5 | Secondary text |
| Label | 12px / 0.75rem | Semibold (600) | 1.4 | Form labels |
| Caption | 11px / 0.6875rem | Regular (400) | 1.4 | Captions |

### Typography Rules

- **Body Text**: Line-height 1.4-1.6 untuk keterbacaan optimal
- **Headings**: Gunakan `text-balance` atau `text-pretty` untuk line breaks yang optimal
- **Minimum Size**: Tidak pernah lebih kecil dari 12px untuk aksesibilitas
- **Font Families**: Maksimal 2 font family di seluruh aplikasi

---

## 4. Layout & Grid System

### Spacing Scale

Menggunakan Tailwind spacing scale berdasarkan `0.25rem` (4px) base unit:

```
0 = 0
1 = 4px
2 = 8px
3 = 12px
4 = 16px
6 = 24px
8 = 32px
12 = 48px
16 = 64px
```

### Grid Layout

**Primary Layout Method: Flexbox**
```jsx
// Untuk kebanyakan layout
<div className="flex items-center justify-between gap-4">
```

**Secondary Layout Method: CSS Grid**
```jsx
// Untuk layout 2D kompleks (bento grid)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Mobile | 320-640px | 1 column |
| Tablet (sm) | 640px | 2 columns |
| Tablet (md) | 768px | 2-3 columns |
| Desktop (lg) | 1024px | 3-4 columns |
| Desktop (xl) | 1280px | 4+ columns |

### Bento Grid Patterns

**Dashboard Stats (4-column grid)**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4 stat cards */}
</div>
```

**Quick Actions (3-column grid)**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* 3 action cards */}
</div>
```

**Feature Cards (3-column grid)**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Feature cards */}
</div>
```

### Margin & Padding Rules

- **Spacing**: Gunakan gap classes untuk spacing di flex/grid containers
- **JANGAN MIX**: Jangan campur margin/padding dengan gap pada elemen yang sama
- **Konsistensi**: Gunakan spacing scale konsisten di seluruh app

---

## 5. Component Library

### Card Component

**Base Card:**
```jsx
<div className="bg-card rounded-lg border border-border p-6">
  {/* Content */}
</div>
```

**States:**
- Default: Border gray, no shadow
- Hover: Shadow-lg, border-primary
- Transition: all 300ms

**Variants:**
- Stat Card: Dengan icon indicator dan trend info
- Action Card: Dengan SVG icon dan interactive state
- Feature Card: Larger padding dengan hover effect
- Transaction Card: Table-like layout

### Button Component

**Primary Button:**
```jsx
<button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
  Action
</button>
```

**Secondary Button:**
```jsx
<button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
  Action
</button>
```

**Disabled State:**
```jsx
<button disabled className="opacity-70 cursor-not-allowed">
  Disabled
</button>
```

### Input Component

**Base Input:**
```jsx
<input
  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
/>
```

**States:**
- Default: Border-border
- Focus: Border-primary, ring-2 ring-primary ring-opacity-20
- Error: Border-destructive
- Disabled: Opacity-50

### Header Component

**Structure:**
- Brand logo/name left aligned
- Navigation items center/right aligned
- Responsive burger menu on mobile
- Border-bottom with border-border

### Sidebar Component

**Structure:**
- Logo/brand at top
- Navigation items with icons
- Active state: bg-sidebar-primary
- Hover state: bg-sidebar-accent
- Responsive collapse on mobile

### Stat Card Component

**Structure:**
- Icon indicator top-right (12x12 rounded bg-secondary)
- Title (uppercase, small, muted)
- Large value (28-32px, bold)
- Description + percentage
- Trend icon with color indicator

**Colors by Trend:**
- Up: text-accent
- Down: text-destructive
- Stable: text-primary

### Quick Action Card Component

**Structure:**
- Large icon (8x8 rounded bg with color)
- Action type label (small, muted)
- Action title (18px bold)
- Hover: opacity-100 on "Buka" text
- Height: full flex layout

**Color Variants:**
- Add: blue-50 / blue-600
- Update: teal-50 / teal-600
- Transaction: green-50 / green-600

### Table Component

**Structure:**
- Header: bg-muted border-b border-border
- Rows: divide-y divide-border hover:bg-muted
- Cells: px-6 py-4 sm:py-3
- Responsive: overflow-x-auto

### Status Indicator

**Colors:**
- Green (Primary): Aman/Tersedia
- Teal (Accent): Hampir Habis
- Red (Destructive): Habis

**Markup:**
```jsx
<div className="flex items-center gap-2">
  <div className="w-3 h-3 rounded-full bg-primary" />
  <span className="text-sm font-semibold">Tersedia</span>
</div>
```

---

## 6. Icons

### SVG Icon Standards

**Specifications:**
- Stroke-based SVG (outline style)
- `stroke="currentColor"` untuk color inheritance
- `strokeWidth={2}` untuk consistency
- `strokeLinecap="round"` dan `strokeLinejoin="round"`

**Sizing:**
- UI Icons (buttons): 16px, 20px, 24px
- Feature Icons: 24px, 32px
- Display Icons: 32px, 48px, 64px

### Icon Usage Guidelines

- **Navigation Icons**: 20x20, primary color
- **Action Icons**: 16x16, primary color
- **Status Icons**: 16x16, status color
- **Large Icons**: 48x48 or larger, in containers
- **NEVER USE EMOJI**: All icons are SVG-based

### Common Icons

| Icon | SVG Path | Usage |
|------|----------|-------|
| Plus | M12 4v16m8-8H4 | Add action |
| Refresh | M4 4v5h.582m15.356 2A8.001... | Update action |
| Check | M9 12l2 2 4-4 | Confirm/success |
| X | M6 18L18 6M6 6l12 12 | Close/delete |
| Arrow Right | M9 5l7 7-7 7 | Navigate forward |
| Chart | M9 19v-6a2 2 0 00-2-2H5... | Stats/analytics |
| Monitor | M9 17h6m-3-6v6m5-15H5... | Product/device |
| Settings | M10.325 4.317c.426-1.756... | Configuration |

---

## 7. Visual Hierarchy

### Emphasis Levels

**Level 1 - Critical/Primary**
- Size: H1-H3 (24px+)
- Weight: Semibold/Bold (600-700)
- Color: foreground
- Spacing: Generous margin
- Example: Page title, primary action

**Level 2 - Important/Secondary**
- Size: Body/H4 (14-18px)
- Weight: Semibold (600)
- Color: foreground
- Example: Section title, secondary action

**Level 3 - Supporting**
- Size: Body Small (12-14px)
- Weight: Regular (400)
- Color: muted-foreground
- Example: Labels, descriptions, metadata

**Level 4 - Tertiary**
- Size: Caption (11-12px)
- Weight: Regular (400)
- Color: muted-foreground
- Opacity: 70-80%
- Example: Timestamps, hints

### Visual Separation

**Use borders for:**
- Card separation
- Section dividers
- Input fields

**Use spacing for:**
- Component groups
- Section breaks
- Layout sections

**Use color for:**
- Status indicators
- Active states
- Interactive elements

---

## 8. Interaction Patterns

### Hover States

**Cards:**
```css
hover:shadow-lg
hover:border-primary
transition-all duration-300
```

**Buttons:**
```css
hover:opacity-90
transition-opacity duration-200
```

**Inputs:**
```css
focus:border-primary
focus:ring-2
focus:ring-primary
focus:ring-opacity-20
transition-all duration-200
```

### Loading States

**Spinner:**
```jsx
<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
```

**Button Loading:**
- Disabled state
- Spinner icon
- "Loading..." text

### Focus States

**Always visible focus ring:**
- `focus:ring-2 focus:ring-primary focus:ring-opacity-20`
- Untuk aksesibilitas keyboard navigation

### Transitions

**Standard Duration:** 200-300ms
**Standard Easing:** Smooth (ease-in-out default)
**Applied to:** background, color, shadow, scale, opacity

---

## 9. Accessibility

### Color Contrast

- **Body Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Icons/Components**: Minimum 3:1 contrast ratio
- **Test**: Gunakan contrast checker tools

### Keyboard Navigation

- **Tab Order**: Logical flow top-to-bottom, left-to-right
- **Focus Visible**: Selalu tampilkan focus indicator
- **ARIA Labels**: Tambahkan untuk icon-only buttons
- **Semantic HTML**: `<button>`, `<input>`, `<label>`, etc.

### Screen Reader Support

```jsx
// For icon-only buttons
<button aria-label="Delete item">
  {/* Icon SVG */}
</button>

// For decorative elements
<span className="sr-only">Loading...</span>

// For form inputs
<label htmlFor="username">Username</label>
<input id="username" />
```

### Motion & Animation

- **Reduce Motion**: Respect `prefers-reduced-motion`
- **No Auto-play**: Animations tidak auto-play
- **Purpose**: Animations harus meningkatkan UX, bukan distract

---

## 10. Component Patterns

### Form Pattern

```jsx
<form className="space-y-5">
  <div>
    <label className="block text-sm font-semibold text-foreground mb-2">
      Label
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-border bg-input..."
      required
    />
  </div>
</form>
```

### List Pattern

```jsx
<ul className="divide-y divide-border">
  {items.map((item) => (
    <li className="px-6 py-4 hover:bg-muted transition-colors">
      {item.name}
    </li>
  ))}
</ul>
```

### Modal/Dialog Pattern

```jsx
<div className="bg-card rounded-lg border border-border p-8">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-muted-foreground mb-6">Content</p>
  <div className="flex gap-3">
    <button>Cancel</button>
    <button className="bg-primary...">Confirm</button>
  </div>
</div>
```

### Status Badge Pattern

```jsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
  <div className="w-2 h-2 rounded-full bg-primary" />
  <span className="text-sm font-medium">Status</span>
</div>
```

---

## 11. Dark Mode

### Light Mode Colors

```css
--background: oklch(0.99 0 0);
--foreground: oklch(0.15 0 0);
--card: oklch(1 0 0);
--primary: oklch(0.45 0.15 260);
```

### Dark Mode Colors

```css
.dark {
  --background: oklch(0.12 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.18 0 0);
  --primary: oklch(0.65 0.15 260);
}
```

### Implementation

- Use `prefers-color-scheme` media query
- Toggle dengan `.dark` class
- All colors use CSS variables
- Automatic based on system preference

---

## 12. Usage Guidelines

### Do's

- Use design tokens untuk semua colors
- Follow spacing scale konsisten
- Use flexbox untuk kebanyakan layouts
- Apply focus rings untuk accessibility
- Test contrast ratios untuk readability
- Use SVG icons everywhere
- Maintain 2-font maximum
- Use semantic HTML

### Don'ts

- Jangan hardcode warna (gunakan tokens)
- Jangan mix margin dengan gap
- Jangan pakai decorative shapes/blobs
- Jangan gunakan emoji sebagai icons
- Jangan pakai lebih dari 5 warna utama
- Jangan buat custom colors tanpa alasan
- Jangan skip focus states
- Jangan gunakan gradients kecuali diminta

---

## 13. Pages & Layouts

### Login Page

- Centered card layout
- 1-column form layout
- Logo/brand at top
- Demo credentials section
- Alternative access link

### Dashboard Page

- Header dengan greeting
- 4-column stat card grid
- 3-column quick action grid
- Full-width transaction table
- Responsive stacking

### Products Page

- Header with title & description
- Search & filter bar
- Product table/grid
- Action buttons per row
- Pagination controls

### Stock Page

- Update form at top
- Product list dengan stok info
- Quick update buttons
- Visual progress indicators
- Bulk action options

### Transactions Page

- Form untuk checkout
- Shopping cart preview
- Transaction history table
- Receipt/detail view
- Timestamp tracking

### Users Page

- User list table
- Role badges
- Status indicators
- Action buttons (edit/deactivate)
- Add new user form

### Display Page (Public)

- Category filter
- Product cards grid
- Large product images
- Price display prominent
- Stock status colorful
- Clock showing time
- Responsive mobile-first

---

## 14. Code Organization

### File Structure

```
/app
  /layout.tsx           # Root layout dengan metadata
  /page.tsx             # Login page
  /dashboard
    /layout.tsx         # Dashboard wrapper
    /page.tsx           # Dashboard home
    /products           # Product management
    /stock              # Stock management
    /transactions       # Transaction history
    /users              # User management
  /display
    /page.tsx           # Public display

/components
  /sidebar.tsx          # Navigation
  /header.tsx           # Page header
  /stat-card.tsx        # Stat component
  /quick-action-card.tsx # Action component

/app
  /globals.css          # Design tokens + global styles
```

### Component Naming

- Use PascalCase: `StatCard`, `QuickActionCard`
- Use descriptive names: `ProductTable`, `StockForm`
- Use suffixes: `...Card`, `...Button`, `...Form`, `...Page`

---

## 15. Design Token Reference

### Complete Token Map

```css
:root {
  /* Colors - Backgrounds */
  --background: oklch(0.99 0 0);
  --card: oklch(1 0 0);
  --muted: oklch(0.92 0 0);
  
  /* Colors - Text */
  --foreground: oklch(0.15 0 0);
  --muted-foreground: oklch(0.5 0 0);
  
  /* Colors - Brand */
  --primary: oklch(0.45 0.15 260);        /* Blue */
  --accent: oklch(0.55 0.12 200);         /* Teal */
  --destructive: oklch(0.65 0.2 30);      /* Red */
  
  /* Colors - UI */
  --border: oklch(0.9 0 0);
  --input: oklch(0.96 0 0);
  --ring: oklch(0.45 0.15 260);
  
  /* Radius */
  --radius: 0.5rem;
  
  /* Sidebar */
  --sidebar: oklch(0.98 0 0);
  --sidebar-foreground: oklch(0.15 0 0);
  --sidebar-primary: oklch(0.45 0.15 260);
  --sidebar-accent: oklch(0.92 0 0);
  --sidebar-border: oklch(0.9 0 0);
}
```

---

## 16. Version & Updates

**Current Version:** 1.0
**Last Updated:** February 2026
**Framework:** Next.js 16 with React 19
**CSS Framework:** Tailwind CSS v4
**Typography:** Geist Font Family

---

## Appendix: Quick Reference

### Most Used Classes

| Purpose | Tailwind Classes |
|---------|-----------------|
| Card | `bg-card rounded-lg border border-border p-6` |
| Primary Button | `bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90` |
| Input | `px-4 py-3 rounded-lg border border-border bg-input focus:border-primary focus:ring-2` |
| Flex Center | `flex items-center justify-center` |
| Grid 3col | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Text Muted | `text-sm text-muted-foreground` |
| Hover Shadow | `hover:shadow-lg transition-all` |
| Focus Ring | `focus:ring-2 focus:ring-primary focus:ring-opacity-20` |

---

**End of Design Language Document**

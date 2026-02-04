'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  Package2,
  FileText
} from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['owner', 'gudang', 'kasir']
  },
  {
    name: 'Produk',
    path: '/dashboard/products',
    icon: Package,
    roles: ['owner', 'gudang', 'kasir']
  },
  {
    name: 'Stok',
    path: '/dashboard/stock',
    icon: Warehouse,
    roles: ['owner', 'gudang']
  },
  {
    name: 'Transaksi',
    path: '/dashboard/transactions',
    icon: ShoppingCart,
    roles: ['owner', 'kasir']
  },
  {
    name: 'Riwayat Transaksi',
    path: '/dashboard/transactions/history',
    icon: FileText,
    roles: ['owner']
  },
  {
    name: 'Pengguna',
    path: '/dashboard/users',
    icon: Users,
    roles: ['owner']
  }
]

/**
 * Sidebar component with role-based navigation
 */
export function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const userRole = session?.user?.role || 'kasir'

  // Filter menu items by user role
  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(userRole)
  )

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const closeMobileMenu = () => {
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar border border-sidebar-border lg:hidden focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          'fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <div className="p-6 border-b border-sidebar-border">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground group-hover:text-primary transition-colors">
                  TechStore
                </h1>
                <p className="text-xs text-sidebar-muted-foreground">Inventory System</p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.path

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={closeMobileMenu}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        isActive
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-sidebar-border">
            {session?.user && (
              <div className="mb-3 px-4">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {session.user.name}
                </p>
                <p className="text-xs text-sidebar-muted-foreground">{session.user.email}</p>
                <p className="text-xs text-sidebar-muted-foreground capitalize mt-1">
                  Role: {session.user.role}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  )
}

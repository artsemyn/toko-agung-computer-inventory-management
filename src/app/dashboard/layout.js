import { Sidebar } from '@/components/sidebar'

export const metadata = {
  title: 'Dashboard - TechStore Inventory',
  description: 'Sistem Manajemen Stok Gudang'
}

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

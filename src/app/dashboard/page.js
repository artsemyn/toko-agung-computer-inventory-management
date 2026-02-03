'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut, User, Shield } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    router.push('/')
    return null
  }

  // Get role badge color
  const getRoleBadge = (role) => {
    const badges = {
      owner: {
        label: 'Owner',
        className: 'bg-primary/10 text-primary border-primary/20'
      },
      gudang: {
        label: 'Staff Gudang',
        className: 'bg-accent/10 text-accent border-accent/20'
      },
      kasir: {
        label: 'Kasir',
        className: 'bg-destructive/10 text-destructive border-destructive/20'
      }
    }
    return badges[role] || badges.kasir
  }

  const roleBadge = getRoleBadge(session.user.role)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-foreground">
              Toko Agung Computer
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Selamat Datang, {session.user.name}!
              </h2>
              <p className="text-muted-foreground mb-4">
                Anda berhasil login ke sistem inventory management.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${roleBadge.className}`}>
                    {roleBadge.label}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Email:</span> {session.user.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Info (Development Only) */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Session Information (Dev Mode)
          </h3>
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-auto">
            <pre className="text-foreground whitespace-pre-wrap">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>

        {/* Next Steps Info */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            🚀 Next Steps
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✅ Phase 2 Complete - Authentication system working!</li>
            <li>⏭️ Phase 3 - Build core UI components (Button, Input, Card, etc.)</li>
            <li>⏭️ Phase 4 - Create dashboard with stats and quick actions</li>
            <li>⏭️ Phase 5+ - Implement product, stock, and transaction management</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

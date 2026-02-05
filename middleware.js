import { auth } from "@/lib/auth"

export const runtime = 'nodejs'

export default auth((req) => {
  // Middleware logic
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/', req.url))
  }
})

// Protect all routes under /dashboard
export const config = {
  matcher: ['/dashboard/:path*']
}

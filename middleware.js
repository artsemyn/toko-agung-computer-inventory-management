
import { authOptions } from "@/lib/auth"

export default auth(authOptions)

// Protect all routes under /dashboard
export const config = {
  matcher: ['/dashboard/:path*']
}

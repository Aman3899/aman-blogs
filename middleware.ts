import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const response = await updateSession(request)

    // Get the pathname
    const { pathname } = request.nextUrl

    // Check if user is authenticated by looking for session cookie
    const sessionCookie = request.cookies.get('sb-gwbcoswrhevbmajrsqtl-auth-token')
    const isAuthenticated = !!sessionCookie

    // Protected routes - require authentication
    const protectedRoutes = ['/create-post']

    // Public only routes - redirect to home if authenticated
    const publicOnlyRoutes = ['/login', '/signup']

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname.startsWith(route))

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !isAuthenticated) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // Redirect authenticated users from public-only routes to home
    if (isPublicOnlyRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api routes
         * - auth callback
         */
        '/((?!_next/static|_next/image|favicon.ico|api|auth/callback|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

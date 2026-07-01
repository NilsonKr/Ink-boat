import { NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'

import { PUBLIC_ROUTES, AUTH_ROUTES } from '@/lib/constants'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const session = getSessionCookie(request)

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/drafts', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'

export async function GET(request: Request) {
  await auth.api.signOut({
    headers: await headers(),
  })

  return NextResponse.redirect(new URL('/login', request.url))
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const response = await fetch(`${request.nextUrl.origin}/api/get-session`, {
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    })
    const { session } = await response.json()

    if (request.nextUrl.pathname.startsWith('/protected') && !session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch {
    if (request.nextUrl.pathname.startsWith('/protected')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import { auth } from './model/notion/auth/auth'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.cookies.get("user_token")) {
    const token = request.cookies.get("user_token")?.value
    if (! await auth({token})) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
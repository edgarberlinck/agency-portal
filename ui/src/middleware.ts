import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // const strapiApiToken = process.env.STRAPI_API_ACCESS
  
  const requestHeaders = new Headers(request.headers)
  // requestHeaders.append('Authorization', `Bearer ${strapiApiToken}`)
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  return response
}

export const config = {
  matcher: '/api/cms/:path*',
}
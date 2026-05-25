import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_dev_only');
const COOKIE_NAME = 'admin_session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPrefixes = [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/setup',
    '/admin/register'
  ];

  const isPublicRoute = publicPrefixes.some(prefix => pathname.startsWith(prefix));

  // Only protect /admin routes, but exclude public admin routes
  if (pathname.startsWith('/admin') && !isPublicRoute) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token');

  if (!refreshToken) {
    const requestedUrl = req.nextUrl.pathname + req.nextUrl.search;
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirectTo', requestedUrl);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/stock', '/sales', '/reports'],
};

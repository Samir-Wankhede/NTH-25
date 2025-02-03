import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const tokenCookie = req.cookies.get('token');
  const isAuthenticated = tokenCookie !== undefined;

  if (!isAuthenticated && !pathname.startsWith('/login')) {
    const url = new URL('/login', req.url);
    url.searchParams.set('unauthenticated', 'true');
    return NextResponse.redirect(new URL( url));
  }
  return NextResponse.next();
}

export const config = {
    matcher: ['/question/:path*'],
};
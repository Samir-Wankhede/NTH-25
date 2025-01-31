import { NextResponse } from 'next/server';

const isAuthenticated = (req) => {
  const userToken = req.cookies.get('token') || null;
  return userToken === null;
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (isAuthenticated(req) && !pathname.startsWith('/login')) {
    const url = new URL('/login', req.url);
    url.searchParams.set('unauthenticated', 'true');
    return NextResponse.redirect(new URL( url));
  }
  return NextResponse.next();
}

export const config = {
    matcher: ['/question/:path*'],
};
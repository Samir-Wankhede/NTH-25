import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token')?.value;
  console.log("token: ",tokenCookie);
  if (!tokenCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('unauthenticated', 'true');
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/question/:path*'],
};

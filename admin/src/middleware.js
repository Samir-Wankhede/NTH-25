import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 
import bcrypt from 'bcryptjs';

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;

  // Allow unauthenticated access to the login page
  if (request.nextUrl.pathname === '/' && !token) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access other routes
  if (!token) {
    return NextResponse.redirect(new URL('/superusers-admin', request.url));
  }

  try {
    // Verify JWT token
    const decode = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-secret-key'));
    const password = process.env.SECURE_PASSWORD
    if (!bcrypt.compareSync(password, decode.payload.encoded)) throw new Error("wrong password in access token"); 
    if (request.nextUrl.pathname === '/' && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch (err) {
    // Invalid token - redirect to login
    console.log(err)
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // Expired
      path: '/',
    });
    return response;
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'], // Apply to these routes
};

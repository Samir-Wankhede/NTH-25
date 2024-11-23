import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Set the cookie to expire immediately
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Expired
    path: '/',
  });

  return response;
}

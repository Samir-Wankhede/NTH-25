import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(req) {
  const { password } = await req.json();
  console.log(password)
  // Dummy user data (replace with DB call)
  const user = { type: 'admin', passwordHash: bcrypt.hashSync(process.env.SECURE_PASSWORD, 10) };

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const encoded = user.passwordHash;
  // Generate JWT
  const token = jwt.sign({ encoded }, SECRET_KEY, { expiresIn: '30h' });

  // Set token as an HTTP-only cookie
  const response = NextResponse.json({ message: 'Login successful' });
  // response.cookies.set('auth-token', token, { httpOnly: true, secure: true, path: '/', sameSite:true }); open this during deployment
  response.cookies.set('auth-token', token, { httpOnly: true, path: '/', sameSite:true });

  return response;
}

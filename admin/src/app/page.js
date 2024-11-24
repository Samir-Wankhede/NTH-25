'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(password)

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)

    if (response.ok) {
      console.log('here')
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <p className="text-center w-full text-4xl md:text-7xl">Admin Panel</p>
      <form onSubmit={handleLogin} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type=""
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
        />
        <Button type="submit" className="">Go</Button>
      </form>
    </div>
  );
}

"use client"
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react'; 

export default function NotFound() {

  const router = useRouter();

  useEffect(() => {
    router.push('/');

  }, []);



  return null; // No need to render any UI here as we immediately redirect

}
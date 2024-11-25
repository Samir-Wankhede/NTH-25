"use client"
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading} = useAuth();  
    const router = useRouter();

    useEffect(() => {
        console.log(user)
        if (!loading){
            if (!user) {
                router.push('/login');
                toast.info("Please login first")
              }
        }
      
    }, [user, router, loading]);

    if (user) {
      return <WrappedComponent {...props} />;
    }
    if (loading){
        return <div>Loading...</div>;
    }

    return null
    
  };
};

export default withAuth;

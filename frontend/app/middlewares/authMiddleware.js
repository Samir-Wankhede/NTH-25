import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();  
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        toast.info("Please login first")
        router.push('/login');
      }
    }, [user, router]);

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return <div>Loading...</div>;
  };
};

export default withAuth;

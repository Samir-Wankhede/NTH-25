"use client"
import { useAuth } from "@/context/AuthProvider";
import API from "@/utils/api"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";

import { toast } from "react-toastify";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('')
    const {login} = useAuth();
    const router = useRouter();

    const searchParams = useSearchParams();
    const unauthenticated = searchParams.get("unauthenticated");

  useEffect(() => {
    if (unauthenticated) {
      toast.info("Please login first.");
    }
  }, [unauthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await API.post('/auth/login', { username, password });
            login(res.data.user);
            router.push('/home')
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || 'Login failed');
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="h-[100%] flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
  
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
  
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
  
          <p className="mt-4 text-center">
            Not a user yet?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-blue-500 hover:text-blue-700"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    );
}
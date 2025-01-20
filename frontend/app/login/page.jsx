"use client"
import { useAuth } from "@/context/AuthProvider";
import API from "@/utils/api"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
import { Button } from "pixel-retroui";
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
            router.push('/')
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || 'Login failed');
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="h-[100%] flex items-center justify-center p-4 relative">
          <img
            src={`night-pokemon-bg.webp`}
            alt="Background"
            className="absolute w-full h-full -z-10 bottom-0 object-cover xl:object-fill opacity-75"
          />
          <div className="">
              <img
                src={`/bulba_reg.gif`}
                alt="Background"
                className="absolute right-[8%] bottom-0 -translate-y-[60%] object-cover xl:object-fill z-5 sm:block sm:w-auto sm:h-auto  sm:scale-[2] scale-[1] hidden"
              />
              <img
                src={`/char_reg.gif`}
                alt="Background"
                className="absolute left-[8%] bottom-0 -translate-y-[60%] object-cover xl:object-fill z-5 sm:block sm:w-auto sm:h-auto  sm:scale-[2] scale-[1] hidden"
              />
          </div>
        <div className="bg-gray-500 pixel-corners p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">Login</h1>
  
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black text-lg"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black text-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-[95%] py-3 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
  
          {error && <p className="mt-4 text-red-900 text-center text-lg">{error}</p>}
  
          <p className="mt-4 text-center">
            Not a user yet?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-gray-200 underline hover:text-gray-400"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    );
}
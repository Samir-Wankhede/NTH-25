"use client"
import { useAuth } from "@/context/AuthProvider";
import API from "@/utils/api"
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation";
import { Button, Card } from "pixel-retroui";
import { toast } from "react-toastify";

function ToastFunction(){
  const toastShown = useRef(false);
    const {logout} = useAuth();
    const searchParams = useSearchParams();
    useEffect(() => {
      if(JSON.parse(searchParams.get("unauthenticated"))&& !toastShown.current){
        toast.info("Please login first.");
        toastShown.current = true;
        logout();
      }
    },[searchParams]);
  return (
    <></>
  )
};

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // setLoading(true)
        // if(!username || !password){
        //   setLoading(false);
        //   toast.error("Please fill all the fields");
        //   return;
        // }
        // try {
        //     const res = await API.post('/auth/login', { username, password });
        //     login(res.data.user);
        //     router.push('/')
        // } catch (err) {
        //     toast.error(err.response?.data?.error || 'Login failed');
        // }finally{
        //     setLoading(false)
        // }
    };

    return (
      <div className="h-[100%] flex items-center justify-center p-4 relative">
        <Suspense fallback={null}>
          <ToastFunction />
        </Suspense>
        <img
          src={`night-pokemon-bg.webp`}
          alt="Background"
          className="absolute w-full h-full -z-10 bottom-0 object-cover xl:object-fill opacity-75"
        />
        <div className="">
            <img
              src={`/pokemons/p12.gif`}
              alt="Background"
              className="absolute right-[8%] bottom-0 sm:-translate-y-[60%] -translate-y-[25%] object-cover xl:object-fill z-[5] sm:w-auto sm:h-auto  sm:scale-[2] scale-[1.5]"
            />
            <img
              src={`/pokemons/p13.gif`}
              alt="Background"
              className="absolute left-[8%] bottom-0 sm:-translate-y-[60%] -translate-y-[25%] object-cover xl:object-fill z-[5] sm:w-auto sm:h-auto  sm:scale-[2] scale-[1.5]"
            />
        </div>
        <Card 
          bg="#111827"
          borderColor="#4b5563"
          shadowColor="#4b5563"
          className="py-4 px-8 min-w-[350px] w-[50vw] xl:w-[30vw]"
        >
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
          <p className="mt-4 text-center text-gray-400">
            Not a user yet?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-gray-200 underline hover:text-gray-400"
            >
              Register here
            </button>
          </p>
        </Card>
      </div>
    );
}
"use client"
import { useAuth } from "@/context/AuthProvider";
import API from "@/utils/api"
import { useRouter } from "next/navigation";
import { Button, Card } from "pixel-retroui";
import { useState } from "react"
import { toast } from "react-toastify";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const router = useRouter();

    const validateForm = () => {
        if (!username || !email || !phone || !password) {
            toast.error('All fields are required.');
            return false;
        }

        const usernameRegex = /^[a-zA-Z0-9]{1,16}$/;
        if (!usernameRegex.test(username)) {
          toast.error('Username should be alphanumeric and up to 15 characters long.');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          toast.error('Please enter a valid email address.');
            return false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
          toast.error('Phone number must be 10 digits.');
            return false;
        }

        if (password.length < 6) {
          toast.error('Password must be at least 6 characters.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        setLoading(true);
        try {
            const res = await API.post('/auth/register', { username, password, phone, email });
            login(res.data.user);
        } catch (err) {

            if (err.response.status==429){
              toast.error(err.response.data)
              setLoading(false)
            }
            else{
              toast.error(err.response?.data?.error || 'Register failed');
              setLoading(false)
            }
            
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
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">Register</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black text-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            className={`w-[95%] py-3 text-white rounded-md text-lg focus:outline-none ${loading ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already registered?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-gray-200 underline hover:text-gray-400"
          >
            Login here
          </button>
        </p>
      </Card>
      </div> 
    
    )
}
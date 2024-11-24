"use client"

import API from "@/utils/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react"


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [keys, setKeys] = useState(0)
    const router = useRouter()
    const login = (userData) => {
        console.log(userData)
        setUser(userData)
        router.push('/home')};
    const logout = ()=> {
        setUser(null)
        API.post('/auth/logout')
    };
    const keyUpdate = (n)=>setKeys(n);

    return (
        <AuthContext.Provider value={{user, keys,login, logout, keyUpdate}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
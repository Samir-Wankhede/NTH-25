"use client"

import API from "@/utils/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react"
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [keys, setKeys] = useState(0)
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    const login = (userData) => {
        console.log(userData)
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData));
        router.push('/')};

    const logout = ()=> {
        setUser(null)
        localStorage.removeItem("user");
        API.post('/auth/logout')
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false); 
      }, []);

    

    return (
        <AuthContext.Provider value={{user, keys,login, logout, setKeys, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
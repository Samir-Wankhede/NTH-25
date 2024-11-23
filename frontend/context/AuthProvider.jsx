"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [keys, setKeys] = useState(0)
    const login = (userData) => {
        console.log(userData)
        setUser(userData)};
    const logout = ()=> setUser(null);
    const keyUpdate = (n)=>setKeys(n);

    return (
        <AuthContext.Provider value={{user, keys,login, logout, keyUpdate}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
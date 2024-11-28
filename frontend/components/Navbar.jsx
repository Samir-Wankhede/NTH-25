"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

const Navbar = () => {
    const { user, logout } = useAuth(); 
    return (
      <nav className="bg-gray-800 text-white h-[100%] py-4 ">
        <div className="container mx-auto flex items-center justify-between px-4 ">
          <Link href="/">
            <p className="text-2xl font-bold">NTH</p>
          </Link>
  
          <div className="flex space-x-6">
            <Link href="/">
              <p className="hover:text-blue-400">Home</p>
            </Link>
            <Link href="/leaderboard">
              <p className="hover:text-blue-400">Leader Board</p>
            </Link>
            <Link href="/question/put_your_answer_here">
              <p className="hover:text-blue-400">Hunt</p>
            </Link>
            <Link href="/about">
              <p className="hover:text-blue-400">About Us</p>
            </Link>
            {!user ? (
              <Link href="/register">
                <p className="hover:text-blue-400">Register</p>
              </Link>
            ) : (
              <>
                <button
                  onClick={logout}
                  className="hover:text-blue-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar;

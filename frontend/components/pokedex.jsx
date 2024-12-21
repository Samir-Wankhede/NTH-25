'use client';
import React, { useEffect, useState } from "react";
import API from "@/utils/api"; 
import { toast } from "react-toastify";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import Loader from "./Loader";

export default function Pokedex() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [usersPerPage] = useState(10); 

    useEffect(() => {
        const fetchLeaderboardData = async () => {
          try {
            const res = await API.get(`/leaderboard`); 
            if (res.status === 200) {
                
              setLeaderboardData(res.data);
            } else {
              toast.error("Failed to fetch leaderboard data.");
            }
          } catch (error) {
            console.error("Error fetching leaderboard:", error);
            toast.error("An error occurred while fetching leaderboard data.");
          } finally {
            await new Promise(resolve => {
                setTimeout(() => { resolve('') }, 1000);
            })
            setLoading(false);
          }
        };
    
        fetchLeaderboardData();
      }, []);

    const totalPages = Math.ceil(leaderboardData.length / usersPerPage);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = leaderboardData.slice(indexOfFirstUser, indexOfLastUser);

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <Loader/>;
    }


    return (
      <div className="h-[100vh] top-[-10%] w-[40%] flex flex-col gap-8 items-center justify-center relative scale-75 md:scale-105 [@media(max-height:790px)]:scale-90 [@media(max-height:800px)]:scale-75 [@media(max-height:620px)]:scale-50 md:[@media(min-height:960px)]:translate-y-[10%] left-1/2 -translate-x-1/2">
        <div className="relative aspect-[450/700] rounded-[40px] border-black border-2 bg-red-700 p-4 shadow-2xl">
          {/* Black border effect */}
          <div className="absolute inset-0 -z-[1] rounded-[40px] bg-red-900 -translate-x-2 translate-y-2 border-2 border-black" />
  
          {/* Top section with lights */}
          <div className="flex flex-wrap items-start gap-4 mb-4">
            {/* Main blue light */}
            <div className="relative h-16 w-16 rounded-full bg-cyan-400 border-2 border-black">
              <div className="absolute inset-1 rounded-full bg-cyan-400 border-2 border-black" />
              <div className="absolute inset-0 rounded-full border-4 border-white" />
            </div>
  
            {/* Small indicator lights */}
            <div className="flex flex-col gap-4 items-start">
                <div className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-red-400 border border-black" />
                    <div className="h-4 w-4 rounded-full bg-yellow-400 border border-black" />
                    <div className="h-4 w-4 rounded-full bg-green-400 border border-black" />
                </div>
                <h1 className="text-3xl text-white">LeaderBoard</h1>
            </div>
            
          </div>
  
          {/* Decorative line */}
          <div className="absolute left-0 top-[5.5rem] h-2 border border-black w-full bg-red-700" />
  
          {/* Main screen */}
          <div
            className="relative my-4 rounded-lg bg-white p-6"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50px 100%, 0 calc(100% - 50px))",
            }}
          >
            {/* Screen dots */}
            <div className="absolute top-0 mt-2 left-1/2 flex -translate-x-1/2 gap-4">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-red-500" />
            </div>
  
            {/* Screen display */}
            <div className="rounded bg-gray-600 border-4 border-white/15">
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b border-gray-500">
                    <th className="px-4 py-1 text-left text-xl">Rank</th>
                    <th className="px-4 py-1 text-left text-xl">Username</th>
                    <th className="px-4 py-1 text-left text-xl">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="text-center px-4 py-36">
                        No leaderboard data available.
                        </td>
                    </tr>
                    ) : (
                    currentUsers.map((user, index) => (
                        <tr key={user.id} className="border-t border-gray-500">
                        <td className="px-4 text-xl py-[0.135rem]">{indexOfFirstUser + index + 1}</td>
                        <td className="px-4 text-xl py-[0.135rem]">{user.username}</td>
                        <td className="px-4 text-xl py-[0.135rem]">{user.curr_level}</td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
            </div>
  
            {/* Bottom screen details */}
            <div className="mt-4 ml-5 flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-red-500 border-2 border-black" />
              <div className="space-y-1 w-[30%]">
                <div className="h-1 w-full bg-black rounded-full" />
                <div className="h-1 w-full bg-black rounded-full" />
                <div className="h-1 w-full bg-black rounded-full" />
                <div className="h-1 w-full bg-black rounded-full" />
              </div>
            </div>
          </div>
  
          {/* Bottom controls */}
          <div className="flex mx-4 relative">
            <div className="flex flex-col justify-start gap-1 items-end">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-800 border-2 border-black" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 rounded-full bg-red-600 border-2 border-black" />
                  <div className="h-4 w-16 rounded-full bg-cyan-500 border-2 border-black" />
                </div>
              </div>
              <div className="h-12 w-28 rounded bg-green-500 border-black border-2" />
            </div>
  
            {/* D-pad */}
            <div className="relative h-24 w-24 mx-auto">
              {/* Vertical bar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-6 bg-gray-800 border-2 border-black" />
              </div>
              {/* Horizontal bar */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-20 bg-gray-800 border-2 border-black" />
              </div> */}
              {/* Center button */}
              <div className="absolute z-30 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="h-6 w-6 rounded-sm bg-gray-700" />
              </div>
              {/* Left button */}
              <button
                className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-full h-6 w-10 bg-gray-800 border-2 border-black rounded pointer-events-auto hover:cursor-pointer z-20 flex justify-start items-center px-1"
                aria-label="Left button"
                onClick={handlePrevPage}
              >
                <GrCaretPrevious className="w-3 h-3 text-gray-500 animate-pulse"/>
              </button>
              {/* Right button */}
              <button
                className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-full h-6 w-10 bg-gray-800 border-2 border-black rounded pointer-events-auto hover:cursor-pointer z-20 flex justify-end items-center px-1"
                aria-label="Right button"
                onClick={handleNextPage}
              >
                <GrCaretNext className="w-3 h-3 text-gray-500 animate-pulse"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
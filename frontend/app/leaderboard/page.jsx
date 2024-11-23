"use client";

import React, { useEffect, useState } from "react";
import API from "@/utils/api"; 
import { toast } from "react-toastify";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [usersPerPage] = useState(8); 

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
    return <div className="text-center">Loading leaderboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[100%]">
    <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

    <div className="flex flex-col h-[88%]">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg flex-grow">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center px-4 py-4">
                  No leaderboard data available.
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{indexOfFirstUser + index + 1}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.curr_level}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 mb-4 h-[10%]">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex items-center mx-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  );
};

export default LeaderboardPage;

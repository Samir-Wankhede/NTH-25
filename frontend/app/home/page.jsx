"use client";

import API from "@/utils/api";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [eventStartTime, setEventStartTime ]= useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [hasEventStarted, setHasEventStarted] = useState(false);

  function calculateTimeRemaining() {
    const now = new Date();
    const diff = eventStartTime - now;
    if (diff <= 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  const fetchEventStartTime = async () => {
    try {
      const response = await API.get("/timer/time");
      if (response.status === 200) {
        const { start_time } = response.data; 
        setEventStartTime(new Date(start_time));
      } else {
        console.error("Failed to fetch event start time.");
      }
    } catch (error) {
      console.error("Error fetching event start time:", error);
    }
  };

  useEffect(() => {
    if (eventStartTime) {
      setTimeRemaining(calculateTimeRemaining(eventStartTime));

      const timer = setInterval(() => {
        const remaining = calculateTimeRemaining(eventStartTime);

        if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
          setHasEventStarted(true);
          clearInterval(timer); 
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [eventStartTime]);

  useEffect(() => {
    fetchEventStartTime();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100%] bg-gray-900 text-white">
      <div className="text-center mb-10">
        <img
          src="/logo.png" 
          alt="NTH Logo"
          className="w-40 h-40 mx-auto"
        />
        <h1 className="text-4xl font-bold mt-4">Network Treasure Hunt</h1>
      </div>

      {hasEventStarted ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold">The Hunt Has Begun!</h2>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Time Remaining:</h2>
          <div className="flex justify-center space-x-6 mt-4 text-4xl font-mono">
            <div>
              <span>{timeRemaining?.days}</span>
              <div className="text-sm uppercase">Days</div>
            </div>
            <div>
              <span>{timeRemaining?.hours}</span>
              <div className="text-sm uppercase">Hours</div>
            </div>
            <div>
              <span>{timeRemaining?.minutes}</span>
              <div className="text-sm uppercase">Minutes</div>
            </div>
            <div>
              <span>{timeRemaining?.seconds}</span>
              <div className="text-sm uppercase">Seconds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

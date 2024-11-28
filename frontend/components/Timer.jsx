"use client";

import API from "@/utils/api";
import { useState, useEffect } from "react";
import './Pixelated-borders.css'

const Timer = () => {
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
    <div className="flex flex-col items-center justify-center h-fit text-white"
    style={{
    textShadow: `
      3px 0 #000, 
      -3px 0 #000, 
      0 3px #000, 
      0 -3px #000, 
      2px 2px #000, 
      -2px -2px #000, 
      2px -2px #000, 
      -2px 2px #000,
      4px 0 #000,
      -4px 0 #000,
      0 4px #000,
      0 -4px #000`
    }}
    >
      <div className="text-center mb-10">
        <img
          src="/nth-logo.png" 
          alt="NTH Logo"
          className="w-[35vh] h-[35vh] mx-auto"
        />
        <h1 className="md:text-6xl text-5xl font-bold mt-4">Network Treasure Hunt</h1>
      </div>

      {hasEventStarted ? (
        <div className="text-center">
          <h2 className="md:text-4xl text-2xl font-bold">The Hunt Has Begun!</h2>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Time Remaining:</h2>
          <div className="flex justify-center space-x-6 mt-4 text-4xl ">
            <div>
              <span>{timeRemaining?.days}</span>
              <div className="text-lg uppercase">Days</div>
            </div>
            <div>
              <span>{timeRemaining?.hours}</span>
              <div className="text-lg uppercase">Hours</div>
            </div>
            <div>
              <span>{timeRemaining?.minutes}</span>
              <div className="text-lg uppercase">Minutes</div>
            </div>
            <div>
              <span>{timeRemaining?.seconds}</span>
              <div className="text-lg uppercase">Seconds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;

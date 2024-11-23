"use client";

import { useState, useEffect } from "react";

const HomePage = () => {
  const eventStartTime = new Date("2024-11-22T18:00:00Z");
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [hasEventStarted, setHasEventStarted] = useState(false);

  function calculateTimeRemaining() {
    const now = new Date();
    const diff = eventStartTime - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      console.log(remaining)
      if (remaining==null) {
        setHasEventStarted(true);
        clearInterval(timer); 
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-10">
        <img
          src="/logo.png" 
          alt="NTH Logo"
          className="w-40 h-40 mx-auto"
        />
        <h1 className="text-4xl font-bold mt-4">Network Treasure Hunt</h1>
      </div>

      {/* Countdown Timer */}
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

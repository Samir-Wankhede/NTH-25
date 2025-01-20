"use client";

import TrainerCard from '@/components/TrainerCard';
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  // Importing necessary icons

const QuestionSetters = () => {
  const trainers = [
      {
        name: "B Shrinidhi",
        id: "28030",
        pokedex: "224",
        time: "299:05",
        badges: [
          "/badges/9.png",
          "/badges/8.png",
          "/badges/7.png",
          "/badges/6.png"
        ],
        avatar: "https://i.postimg.cc/mrynJPNw/IMG-20240621-WA0013-2.jpg",
        linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
        instagram: 'https://www.instagram.com/_nidhi1214/',
        github: 'https://github.com/shrinidhib',
      },
      {
        name: "B Shrinidhi",
        id: "28030",
        pokedex: "224",
        time: "299:05",
        badges: [
          "/badges/9.png",
          "/badges/8.png",
          "/badges/7.png",
          "/badges/6.png"
        ],
        avatar: "https://i.postimg.cc/mrynJPNw/IMG-20240621-WA0013-2.jpg",
        linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
        instagram: 'https://www.instagram.com/_nidhi1214/',
        github: 'https://github.com/shrinidhib',
      },
      {
        name: "B Shrinidhi",
        id: "28031",
        pokedex: "225",
        time: "299:05",
        badges: [
          "/badges/3.png",
          "/badges/12.png",
          "/badges/11.png",
          "/badges/6.png"
        ],
        avatar: "https://i.postimg.cc/mrynJPNw/IMG-20240621-WA0013-2.jpg",
        linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
        instagram: 'https://www.instagram.com/_nidhi1214/',
      }
]

  return (
    <div className="p-8 relative h-full w-screen overflow-hidden">
      <img
        src={`main-bg-night.webp`}
        alt="Background"
        className="absolute w-full h-full -z-10 bottom-0 left-0 object-cover xl:object-fill"
      />
      <h1 className="md:text-7xl text-4xl font-bold text-center mb-8 text-shadow">Question Setting Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto h-full md:h-fit pt-10 pb-20 md:pb-0 [&::-webkit-scrollbar]:w-0">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer}/>
          
        ))}
      </div>
    </div>
  );
};

export default QuestionSetters;

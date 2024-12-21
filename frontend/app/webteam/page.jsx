"use client";

import TrainerCard from '@/components/TrainerCard';
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  

const Webteam = () => {

    const trainers = [
        {
            name: "B Shrinidhi",
            id: "28030",
            pokedex: "224",
            time: "299:05",
            badges: [
              "/badges/1.png",
              "/badges/2.png",
              "/badges/4.png",
              "/badges/5.png",

            ],
            avatar: "https://i.postimg.cc/mrynJPNw/IMG-20240621-WA0013-2.jpg",
            linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
            instagram: 'https://www.instagram.com/_nidhi1214/',
            phone: 7506211747,
          },
          {
            name: "B Shrinidhi",
            id: "28031",
            pokedex: "225",
            time: "299:05",
            badges: [
              "/badges/10.png",
              "/badges/7.png",
              "/badges/8.png",
              "/badges/11.png"
            ],
            avatar: "https://i.postimg.cc/mrynJPNw/IMG-20240621-WA0013-2.jpg",
            linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
            instagram: 'https://www.instagram.com/_nidhi1214/',
            phone: 7506211747,
          }
    ]
   
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Webteam</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer}/>
          
        ))}
      </div>
    </div>
  );
};

export default Webteam;

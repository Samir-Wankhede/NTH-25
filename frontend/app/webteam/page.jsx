"use client";

import TrainerCard from '@/components/TrainerCard';
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  

const Webteam = () => {
    const badges = ['https://archives.bulbagarden.net/media/upload/7/7d/Soul_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/6/6b/Marsh_Badge.png?download' ,
      'https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/7/78/Earth_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/4/4a/Zephyr_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/0/08/Hive_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/a/a7/Plain_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/7/7b/Mineral_Badge.png?download',
        'https://archives.bulbagarden.net/media/upload/e/e6/Glacier_Badge.png?download']
    const trainers = [
        {
            name: "B Shrinidhi",
            id: "28030",
            pokedex: "224",
            time: "299:05",
            badges: [
              "https://archives.bulbagarden.net/media/upload/thumb/d/dd/Boulder_Badge.png/480px-Boulder_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png?download",
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
              "https://archives.bulbagarden.net/media/upload/thumb/d/dd/Boulder_Badge.png/480px-Boulder_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png?download",
              "https://archives.bulbagarden.net/media/upload/a/a7/Plain_Badge.png?download",
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

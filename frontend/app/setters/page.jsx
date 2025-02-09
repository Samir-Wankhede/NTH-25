"use client";

import TrainerCard from '@/components/TrainerCard';
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  // Importing necessary icons

const QuestionSetters = () => {
  const trainers = [
      {
        name: "Aabha Jog",
        id: "28029",
        pokedex: "224",
        time: "299:05",
        badges: [
          "/badges/9.png",
          "/badges/8.png",
          "/badges/7.png",
          "/badges/6.png"
        ],
        avatar: "/admin/aabha.jpg",
        linkedin: 'https://www.linkedin.com/in/aabha-jog-68aa162b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        instagram: 'https://www.instagram.com/aabhaj25/',
        github: 'https://github.com/aabha25',
      },
      {
        name: "Karan Mittal",
        id: "28030",
        pokedex: "225",
        time: "299:05",
        badges: [
          "/badges/9.png",
          "/badges/8.png",
          "/badges/7.png",
          "/badges/6.png"
        ],
        avatar: "/admin/karan.jpg",
        linkedin: 'https://www.linkedin.com/in/karan-mittal-59a41a23a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        instagram: 'https://www.instagram.com/karanmittal7303/',
        github: 'https://github.com/karan-mittal06',
      },
      {
        name: "Rashmi Abhyankar",
        id: "28031",
        pokedex: "226",
        time: "299:05",
        badges: [
          "/badges/3.png",
          "/badges/12.png",
          "/badges/11.png",
          "/badges/6.png"
        ],
        avatar: "/admin/rashmi.jpg",
        linkedin: 'https://www.linkedin.com/in/rashmiabhyankar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        instagram: 'https://www.instagram.com/_nidhi1214/',
        github: 'https://github.com/ Rashmi-05',
      },
      {
        name: "Shlok Sangamnerkar",
        id: "28032",
        pokedex: "227",
        time: "299:05",
        badges: [
          "/badges/10.png",
          "/badges/12.png",
          "/badges/1.png",
          "/badges/4.png"
        ],
        avatar: "/admin/shlok.jpg",
        linkedin: ' https://www.linkedin.com/in/shlok-sangamnerkar/',
        instagram: 'https://www.instagram.com/shlok__vic/',
        github: 'https://github.com/Vic710',
      },
      {
        name: "Anushree Kamath",
        id: "28033",
        pokedex: "228",
        time: "299:05",
        badges: [
          "/badges/3.png",
          "/badges/7.png",
          "/badges/11.png",
          "/badges/2.png"
        ],
        avatar: "/admin/anushree.jpg",
        linkedin: 'https://www.linkedin.com/in/anushreekamath04/',
        instagram: 'https://www.instagram.com/kamathanushree/',
        github: 'https://github.com/siriuslycoding ',
      },
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

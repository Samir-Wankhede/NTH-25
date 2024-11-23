"use client";

import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  // Importing necessary icons

const Webteam = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Lead Developer",
      image: "https://placehold.co/600x400",
      insta: "https://www.instagram.com/johndoe",
      linkedin: "https://www.linkedin.com/in/johndoe",
      phone: "+1234567890"
    },
    {
      name: "Jane Smith",
      role: "Frontend Developer",
      image: "https://placehold.co/600x400",
      insta: "https://www.instagram.com/janesmith",
      linkedin: "https://www.linkedin.com/in/janesmith",
      phone: "+0987654321"
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Webteam</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-center">{member.name}</h2>
            <p className="text-center text-gray-500">{member.role}</p>

            <div className="flex justify-center space-x-4 mt-4">
              <a
                href={member.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={`tel:${member.phone}`}
                className="text-green-500 hover:text-green-700"
              >
                <FaPhone size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webteam;

import './Pixelated-borders.css'
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  


const TrainerCard = ({ trainer }) => {
    const { name, id, pokedex, time, badges, avatar, instagram, linkedin, phone, github } = trainer;
  
    return (
      <div className="bg-[repeating-linear-gradient(to_bottom,_#fcf197,_#fcf197_3px,_#fcf197_3px,_white_9px)] border-4 border-gray-400  rounded-lg max-w-md mx-auto relative py-4  shadow-md w-full">
        {/* Header */}
        <div className=" flex justify-between items-center px-5 bg-[#e3c427] opacity-65 h-12 w-full z">
        
          <h1 className="bg-blue-400 text-black text-lg md:text-xl h-[60%] font-bold px-2 rounded">
            TRAINER CARD
          </h1>
          <p className=" font-bold text-black text-sm md:text-2xl">ID No.{id}</p>
       
        </div>
  
        {/* Trainer Info */}
        <div className="flex m-4 flex-col sm:flex-row justify-between items-center">
          <div className="ml-4 w-full">
            <p className="font-bold text-lg md:text-2xl text-gray-700"> <span className="w-2 h-4 bg-yellow-400 border-yellow-500 border-2 mr-2 inline-block"></span>NAME: {name}</p>
            <hr className="border-t-2 w-[80%] border-gray-600 mb-2"></hr>
            <p className="text-gray-700 text-sm md:text-xl"><span className="w-2 h-4 bg-yellow-400 border-yellow-500 border-2 mr-2 inline-block"></span>Role: Developer</p>
            <p className="text-gray-700 text-sm md:text-xl"><span className="w-2 h-4 bg-yellow-400 border-yellow-500 border-2 mr-2 inline-block"></span>Pokédex: {pokedex}</p>
            { phone && 
              <div className="flex flex-wrap gap-2 items-center">
                <p className="text-gray-700 md:text-xl text-sm"><span className="w-2 h-4 bg-yellow-400 border-yellow-500 border-2 mr-2 inline-block"></span>Contact: </p>
                <p className="text-gray-700 text-sm md:text-xl">{phone}</p>
              </div>
            }
            <div className='flex flex-wrap gap-2 items-center'>
            <p className="text-gray-700 md:text-xl text-sm"><span className="w-2 h-4 bg-yellow-400 border-yellow-500 border-2 mr-2 inline-block"></span>Social: </p>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/instagram.png" className="h-6 w-6" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/linkedin.png" className="h-6 w-6" />
              </a>
              <a
                href={github}
                target="_blank"
              >
                <img src="/icons/github.png" className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-200 border-2 border-gray-400 rounded-full overflow-hidden flex-shrink-0 mt-4 md:mt-0">
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
  
        {/* Badge Section */}
        <div className=" flex flex-col md:flex-row justify-between items-center px-5 bg-[#e3c427] opacity-65 h-auto w-full py-2">
          <p className="font-bold text-white text-lg md:text-2xl">BADGES</p>
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="w-6 h-6  md:w-8 md:h-8 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img src={badge} alt={`Badge ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default TrainerCard;
  
  

  
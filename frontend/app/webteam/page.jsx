import TrainerCard from '@/components/TrainerCard';

const Webteam = () => {

    const trainers = [
        {
            name: "Samir Wankhede",
            id: "28030",
            pokedex: "224",
            time: "299:05",
            badges: [
              "/badges/1.png",
              "/badges/2.png",
              "/badges/4.png",
              "/badges/5.png",

            ],
            avatar: "/admin/samir.jpg",
            linkedin: 'https://www.linkedin.com/in/samir-wankhede/',
            instagram: 'https://www.instagram.com/_samirwankhede_/',
            github: 'https://github.com/Samir-Wankhede',
            phone: 7770011526,
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
            avatar: "/admin/shrinidhi.jpg",
            linkedin: 'https://www.linkedin.com/in/b-shrinidhi/',
            instagram: 'https://www.instagram.com/_nidhi1214/',
            github: 'https://github.com/shrinidhib',
            phone: 7506211747,
          }
    ]
   
  return (
    <div className="px-8 relative h-full w-screen overflow-hidden">
      <img
        src={`main-bg-night.webp`}
        alt="Background"
        className="absolute w-full h-full -z-10 bottom-0 left-0 object-cover xl:object-fill"
      />
      <div className='h-full w-full overflow-y-scroll pb-10 [&::-webkit-scrollbar]:w-0 '>
      <h1 className="text-7xl font-bold text-center my-8 text-shadow">Web Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 h-full md:h-fit pt-10 pb-20 md:pb-0 [&::-webkit-scrollbar]:w-0">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer}/>
        ))}
        <div className='flex-grow h-8'></div>
      </div>
      </div>
    </div>
  );
};

export default Webteam;

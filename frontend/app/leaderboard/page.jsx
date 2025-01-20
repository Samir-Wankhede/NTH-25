import Pokedex from '@/components/pokedex'
const page = () => {
  return (
    <div className="w-screen h-full relative overflow-hidden">
      <img
          src={`night-pokemon-bg.jpg`}
          alt="Background"
          className="absolute w-full h-full -z-10 bottom-0 object-cover xl:object-fill"
      />
      <div className='h-full w-full flex items-center justify-center overflow-auto'>
        <Pokedex />
      </div>
      
    </div>
  )
}

export default page

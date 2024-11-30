import Pokedex from '@/components/pokedex'
const page = () => {
  return (
    <div className="w-screen h-full relative">
      <img
          src={`night-pokemon-bg.jpg`}
          alt="Background"
          className="fixed md:absolute inset-0 w-full h-full -z-10 bottom-0 object-cover xl:object-fill opacity-75"
      />
      <Pokedex />
    </div>
  )
}

export default page

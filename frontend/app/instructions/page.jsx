import Instruction from "@/components/Instruction-component"

const page = () => {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center overflow-hidden relative">
      <img
        src={`main-bg.jpg`}
        alt="Background"
        className="absolute w-full h-full  bottom-0 object-cover xl:object-fill opacity-75 z-0"
      />
      <main className="h-full w-full">
        <Instruction/>
      </main>
    </div>
  )
}

export default page

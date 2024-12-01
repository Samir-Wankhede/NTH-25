import About from '@/components/about-component'
import Loader from '@/components/Loader'
import React from 'react'

const page = () => {
  return (
    <div className="w-screen h-full relative bg-[#3e8981]">
      <img
        src={`About.png`}
        alt="Background"
        className="absolute inset-0 w-full h-full -top-[10vh] object-cover xl:object-fill bg-[#3e8981]"
      />
      <main className="h-full flex flex-col gap-8 items-center justify-center relative z-10">
        <About/>
      </main>
    </div>
  )
}

export default page

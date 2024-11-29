'use client';

import { useEffect, useState } from "react";

const Loader = () => {
    const [loader,setLoader] = useState(null);
    useEffect(()=>{
        setLoader(Math.floor((Math.random()*10)+1));
    },[])
  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-1'>
      {loader && 
      <div className="text-2xl flex flex-col justify-center items-center gap-1">
      <img src={`loader${loader}.gif`}/>
      <h1>Loading...</h1> 
      </div>
      }
    </div>
  )
}

export default Loader

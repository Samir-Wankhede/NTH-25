"use client";
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

const page = () => {
    const [searchBox, setSearchBox] = useState("");
  return (
    <div className="flex flex-col justify-start items-center pt-20 w-screen pb-20">
      <div className="flex flex-wrap w-screen justify-center gap-4">
        <Input
          type="text"
          placeholder="Search Username"
          value={searchBox}
          onChange={(e) => {
            setSearchBox(e.target.value)
          }}
          className="w-[80%] lg:w-[30%]"
        />
      </div>
      
    </div>
  )
}

export default page

"use client";
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [startTime, setStartTime] = useState("")
  const [status, setStatus] = useState('inactive');
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/timer");
        const data = await response.json(); // Await the parsing of JSON
        if (!response.ok) {
          if (response.status === 404) {
            setWarning(true);
          } 
        }
        const date = new Date(data.start_time);
        const date_time = date.toLocaleString().split(' ');
        const datePart = date_time[0].replaceAll(',','').split('/').reverse().join('-');
        const startDate = datePart+'T'+date_time[1];
        setStartTime(startDate || ""); // Fallback to empty string
        setStatus(data.status || "inactive"); // Fallback to "inactive"
      } catch (error) {
        console.error("Error fetching data:", error); // Log detailed error info
      }
    };
    getData();
  }, []);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(startTime);
    const date = new Date(startTime);
    console.log(date.toISOString());
    if (status === 'active'){
      try{
        const response = await fetch("/api/timer",{
          method: "DELETE",
        });
        const data = await response.json(); // Await the parsing of JSON
        if (!response.ok) {
          throw new Error(data.error);
        }
        alert(data.message);
      }catch (error){
        console.error("Error fetching data:", error);
      }
    }else{
      try{
        const response = await fetch("/api/timer",{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({start_time: date.toISOString()}),
        });
        const data = await response.json(); // Await the parsing of JSON
        if (!response.ok) {
          throw new Error(data.error);
        }
      }catch (error){
        console.error("Error fetching data:", error);
      }
    }
  }

  return (
    <div className="flex flex-col px-4 justify-center items-center h-screen py-20 ">
      {warning && <p className='text-center text-red-600'>Create new Timer</p>}
      <h1 className="text-2xl font-bold mb-6 text-center">TIMER</h1>
      <form className="space-y-6 md:w-[40vw]" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2 px-4">
          <Label htmlFor="start_time" className="">
            Start Time
          </Label>
          <input 
            id="start_time" 
            type="datetime-local" 
            className=' bg-transparent p-2 rounded-lg border active:border-white [&::-webkit-calendar-picker-indicator]:invert'
            value={startTime}
            onChange={(e)=>{
              setStartTime(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-2 px-4">
          <Label htmlFor="Status" className="">
            Event Status (checked - active)
          </Label>
          <Checkbox 
            id="Status" 
            checked={status==='active'?true:false} 
            disabled = {true}
          />
        </div>
        <div className="w-full flex flex-col gap-2 px-4">
          <Button 
            className="mx-auto w-fit"
            type="submit"
          >
            {status==='active'?"End Event":"Start Timer"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default page

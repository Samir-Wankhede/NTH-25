"use client"
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/components/CustomModal";
import {FaQuestionCircle, FaPhoneAlt} from 'react-icons/fa'
import { IoMdKey } from "react-icons/io";
import { Button } from 'pixel-retroui';
import { FaLightbulb } from "react-icons/fa";

const PromoPage = ({params})=>{
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); 
    const [isHintModalOpen, setIsHintModalOpen] = useState(false); 
    const [isContactModalOpen, setIsContactModalOpen] = useState(false); 
    const {answer} = React.use(params)
    const [keys, setKeys] = useState(2);
    const router = useRouter()
    const [paidHint, setPaidHint] = useState("You just got ___?")
    const submitting = useRef(false);
    const [hintTaken,setHintTaken] = useState(false)


    useEffect(() => {
      const handleAnswer = async () => {
        if (answer && answer !== "put_your_answer_here" && !submitting.current) {
          await submitAnswer(answer);
        }
      };
      
      handleAnswer();
    }, [answer]);


    const openHintModal = () => {
      setIsHintModalOpen(true);
    };
  
    const closeHintModal = () => {
      setIsHintModalOpen(false);
    };
    const openContactModal = () => {
      setIsContactModalOpen(true);
    };
  
    const closeContactModal = () => {
      setIsContactModalOpen(false);
    };
    const openInfoModal = () => {
      setIsInfoModalOpen(true);
    };
  
    const closeInfoModal = () => {
      setIsInfoModalOpen(false);
    };

    const submitAnswer = async (submittedAnswer) => {
      if (submittedAnswer=="rickrolled"){
        toast.success("Correct Answer!");
        router.push("/")
      }else{
        toast.error("Try Again!!")
        window.history.pushState(null, '', '/promo/put_your_answer_here')
      }
    };

    const buyHint = async () => {
      setKeys(0)
      setHintTaken(true)
    };

 

    return (
      <div className="h-[100%]">
      <div className="">
          <img
            src={`/pokemons/p${2}.gif`}
            alt="Background"
            className="absolute right-[8%] bottom-[15%] object-cover xl:object-fill z-[-2] sm:block sm:w-auto sm:h-auto  sm:scale-[2] scale-[1] hidden"
          />
      </div>
  
      <div className="p-8 max-w-3xl mx-auto h-[100%]">
       
        <div className="flex justify-center gap-10 items-center">
        <div className="flex flex-col items-center mb-2 group relative">
          <img
            src="/pika.gif"
            alt="Pika Gif"
            className="cursor-pointer h-10"
          />
          <div className="absolute hidden group-hover:block bg-gray-100 text-black sm:text-sm font-bold rounded-lg px-4 py-2 right-[105%] border-[0.20rem] border-yellow-500 shadow-lg sm:w-max text-xs w-20">
            {"keep trying..."}
          </div>
        </div>
        <h1 className="text-2xl font-bold flex items-center">
            
            <img
              src="/key.png"
              alt="Key"
              className="ml-2 mr-2 h-10 r"
              
            />
            {keys}
            
          </h1>
        
        </div>

        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold">
            Level: 1
          </h1>
        </div>
  
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 col-span-3 lg:col-span-4">
            <div className="bg-black z-0 flex justify-center items-center h-96">
              <img
                src={"/rickroll-rick.gif"}
                alt="Image 1"
                className="w-full h-full  rounded-lg shadow-lg aspect-video"
                
              />
            </div>
            <div className="bg-black z-0 flex justify-center items-center h-96">
              <img
                src={"/rickroll-rick.gif"}
                alt="Image 2"
                className="w-full h-full  rounded-lg shadow-lg aspect-video"
              />
            </div>
          </div>
         
          {/* Hint and Contact Icon */}
          <div className="absolute top-[40%] left-0 z-50 flex flex-col gap-4">
            <div className="flex items-center">
              <FaQuestionCircle
                className="text-2xl text-gray-200 cursor-pointer hover:text-blue-500"
                onClick={openInfoModal}
              />
            </div>
            <div className="flex items-center">
              <FaLightbulb
                className="text-2xl text-gray-200 cursor-pointer hover:text-blue-500"
                onClick={openHintModal}
              />
            </div>

            {/* Contact Icon */}
            <div className="flex items-center">
              <FaPhoneAlt
                className="text-2xl text-gray-200 cursor-pointer hover:text-blue-500"
                onClick={openContactModal} 
              />
            </div>
          </div>
    
      {/* Modal for Hint */}
      <CustomModal isOpen={isHintModalOpen} onClose={closeHintModal}>
        <h2 className="text-2xl font-semibold mb-4 text-black self-center">HINTS</h2>
        {"Never gonna...".split(',').map((h,i)=>(
          <p key={i} className=" text-lg mb-4">{i+1}. {h}</p>
        ))}
        
        { hintTaken? (
          <div>
            <p className="text-xl">Paid Hint: </p>
            {paidHint.split(',').map((h,i)=>(
              <p key={i} className=" text-lg mb-4">{i+1}. {h}</p>
            ))}
          </div>
        ) : (
          <div className="flex mt-2 gap-1 items-center text-xl">
            <p className="font-bold ">Paid Hint Cost:    2 </p>
            <IoMdKey className=" rotate-90" size={15}/>
          </div>
        )}
        <div className="flex justify-between items-center gap-5 mt-6">
          {!hintTaken &&
        <Button
          
          onClick={buyHint}
          className="text-sm flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg disabled:hover:bg-gray-500 hover:bg-gray-600"
          disabled={keys < 2}
          
        >
          {keys >= 2 ? 'Buy Hint' : 'Not enough keys'}
        </Button>}
    
      
        </div>
      </CustomModal>

      {/* Modal for Contact */}
      <CustomModal isOpen={isContactModalOpen} onClose={closeContactModal}>
        <h2 className="text-2xl font-semibold mb-4 text-black self-center">Contacts</h2>
       
        <p className="text-lg">B Shrinidhi : 7506211747</p>
        <p className="text-lg"> Samir Wankhede : 7770011526</p>
        <div className="flex justify-between items-center gap-5 mt-6">
         
        </div>
      </CustomModal>

      {/* Modal for Info */}
      <CustomModal isOpen={isInfoModalOpen} onClose={closeInfoModal}>
        <h2 className="text-2xl font-semibold mb-4 text-black self-center">How to Hunt</h2>
       
        <p className="text-lg">1. Images provide the clues to victory.</p>
        <p className="text-lg">2. Enter your answer in the URL and you shall proceed!</p>
        <p className="text-lg">3. Happy Hunting!</p>
        <div className="flex justify-between items-center gap-5 mt-6">
        </div>
      </CustomModal>

      
    </div>
    </div>
  );
}

export default PromoPage;
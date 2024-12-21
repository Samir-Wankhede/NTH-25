"use client"

import API from "@/utils/api";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/components/CustomModal";
import {FaQuestionCircle, FaPhoneAlt} from 'react-icons/fa'
import { useAuth } from "@/context/AuthProvider";

const QuestionPage = ({params})=>{
    const [question, setQuestion] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [loading, setLoading] = useState(false);
    const {answer} = React.use(params)
    const {keys, setKeys} = useAuth();
    const router = useRouter()
    const initialized = useRef(false);
    const submitting = useRef(false);

    const fetchEventStartTime = async () => {
      try {
        const res = await API.get("/timer/time");
        if (res.status === 200) {
          const { start_time } = res.data; 
          console.log(start_time)
          return start_time
        } else {
          toast.error("Failed to fetch event start time.");
        }
      } catch (error) {
        console.error("Error fetching event start time:", error);
        toast.error("An error occurred while fetching event start time.");
      }
    };

    
    
    useEffect(() => {
      const checkEventTime = async () => {
        try {
          if (initialized.current || loading || question) return;
        
          initialized.current = true;
          setLoading(true);
    
          const start = new Date(await fetchEventStartTime());
          const currentTime = new Date();
    
          if (currentTime < start) {
            toast.info("Hunt hasn't started yet!");
            router.push("/");
          } else {
            await fetchQuestion();
          }
        } catch (error) {
          console.error("Error checking event time:", error);
        } finally {
          setLoading(false);
        }
      };
    
      checkEventTime();
    }, []);
    

    useEffect(() => {
      const handleAnswer = async () => {
        if (answer && answer !== "put_your_answer_here" && !submitting.current) {
          await submitAnswer(answer);
        }
      };
      
      handleAnswer();
    }, [answer]);


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const submitAnswer = async (submittedAnswer) => {
      if (submitting.current) return;
        submitting.current = true;
      try {
        
        const response = await API.post("/answer", { answer: submittedAnswer });
        if (response.status === 200) {
          toast.success("Correct answer!");
          
          router.push('/question/put_your_answer_here')
        } else if (response.status==205){
          toast.dark(response.data.message || "You are close.");
          window.history.pushState(null, '', '/question/put_your_answer_here');
        }else {
          toast.error(response.data.message || "Wrong answer, please try again.");
          window.history.pushState(null, '', '/question/put_your_answer_here');

        }
      } catch (err) {
        if (err.response.status==400) {
          toast.error(err.response?.data?.message);
          console.log('replacing')
          window.history.replaceState(null, '', '/question/put_your_answer_here');
      
        } else {
          console.log(err)
          toast.error("An unexpected error occurred");
        }
      }
    };

    const buyHint = async () => {
        try {
          const response = await API.post("question/hint", { level: question.level });
          if (response.status === 200) {
            setQuestion({...question, paid_hint : response.data.paid_hint})
            toast.success("Hint purchased successfully!");
          }
        } catch (err) {
          if (err.response) {
            console.log(err)
            toast.error(err.response?.data?.error || "Error purchasing hint");
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      };

      const fetchQuestion = async () => {
        if (question) return; 
        try {
          console.log("Fetching question");
          const response = await API.get('/question/curr');
          if (response.status === 200) {
            setQuestion(response.data.question);
            console.log(response.data.question)
            setKeys(response.data.keys);
          } else {
            toast.error(response.data);
          }
        } catch (err) {
          if (err.response.status==403) {
            toast.info(err.response?.data?.error || "Error fetching current question");
            router.push('/home')
          } else if (err.request) {
            toast.error("Network error. Please try again");
          } else{
            console.log(err)
            toast.error("An unexpected error occurred");
          }
        }
      };

    

    if (!question) {
        return <div>Loading question...</div>;
      }

    return (
      <div className="h-[100%]">
      <div className="">
          <img
            src={`/pokemons/p${question.level % 10}.gif`}
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
            {question.tooltip}
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
            Level: {question.level}
          </h1>
        </div>
  
        {question.img1 && !question.img2? (
          <div className="relative aspect-w-1 aspect-h-1 col-span-1">
            <img
              src={question.img1}
              alt="Image 1"
              className="absolute inset-0 w-full  object-contain rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 col-span-3 lg:col-span-4">
          {question.img1 && (
            <div className="bg-black z-0 flex justify-center items-center h-60">
              <img
                src={question.img1}
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          {question.img2 && (
            <div className="bg-black z-0 flex justify-center items-center h-60">
              <img
                src={question.img2}
                alt="Image 2"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          {question.img3 && (
            <div className="bg-black z-0 flex justify-center items-center h-60">
              <img
                src={question.img3}
                alt="Image 3"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          {question.img4 && (
            <div className="bg-black z-0 flex justify-center items-center h-60">
              <img
                src={question.img4}
                alt="Image 4"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
            )}

          {/* Hint and Contact Icon */}
          <div className="absolute top-10 left-0 z-50 flex gap-4">
            {/* Hint Icon */}
            <div className="flex items-center">
              <FaQuestionCircle
                className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={openModal}
              />
            </div>

            {/* Contact Icon */}
            <div className="flex items-center">
              <FaPhoneAlt
                className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={null} // Ensure you have the `openContactModal` method for this
              />
            </div>
          </div>
    
      {/* Modal for Hint */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Hint</h2>
        <p className="mb-4">{question.hint}</p>
        {question.paid_hint ? (
          <p className="font-bold">{question.paid_hint}</p>
        ) : (
          <p className="font-bold">Paid Hint Cost: {question.hint_cost}</p>
        )}
        <button
          onClick={buyHint}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={keys < question.hint_cost}
        >
          {keys >= question.hint_cost ? 'Buy Hint' : 'Not Enough Keys'}
        </button>
    
        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </CustomModal>
    </div>
    </div>
  );
}

export default QuestionPage;
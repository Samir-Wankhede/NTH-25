"use client"

import API from "@/utils/api";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/components/CustomModal";
import {FaQuestionCircle} from 'react-icons/fa'
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import withAuth from "@/app/middlewares/authMiddleware";
const QuestionPage = ({params})=>{
    const [question, setQuestion] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const {answer} = React.use(params)
    const {keys, keyUpdate} = useAuth();
    const router = useRouter()
    

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
          if (loading) return;
          setLoading(true);
    
          const start = new Date(await fetchEventStartTime());
          const currentTime = new Date();
    
          if (currentTime < start) {
            toast.info("Hunt hasn't started yet!");
            router.push("/home");
          } else if (!question && !loading) {
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
      
      if (answer && answer !== "put_your_answer_here") {
          console.log(answer)
          submitAnswer(answer)
      }
  }, [answer]);


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const submitAnswer = async (submittedAnswer) => {
      try {
        const response = await API.post("/answer", { answer: submittedAnswer });
        if (response.status === 200) {
          toast.success("Correct answer!");
          setRefetch(true);
          
          router.push('/question/put_your_answer_here')
        } else {
          toast.error(response.data.message || "Wrong answer, please try again.");
          window.history.replaceState(null, '', '/question/put_your_answer_here');
          // router.replace('/question/put_your_answer_here')
          // router.push('/question/put_your_answer_here')
        }
      } catch (err) {
        if (err.response.status==400) {
          toast.error(err.response?.data?.message);
          console.log('replacing')
          window.history.replaceState(null, '', '/question/put_your_answer_here');
          // router.replace('/question/put_your_answer_here')
          // router.push('/question/put_your_answer_here')
        } else {
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
            keyUpdate(response.data.keys);
          } else {
            toast.error(response.data);
          }
        } catch (err) {
          if (err.response) {
            toast.error(err.response?.data?.error || "Error fetching current question");
          } else if (err.request) {
            toast.error("Network error. Please try again");
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      };

    

    if (!question) {
        return <div>Loading question...</div>;
      }

    return (
    <div className="p-8 max-w-3xl mx-auto h-[100%]">
      {/* Question Level */}
      <h1 className="text-2xl font-bold mb-6 text-center">Level: {question.level}  {keys}</h1>

      {/* Images Grid */}
      <div className="grid grid-cols-8 gap-10 ">
      <div className="grid grid-cols-2 gap-4 mb-6 col-span-7 ">
        {question.img1 && (
          <div className="relative pb-[100%]">
            <img src={question.img1} alt="Image 1" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        )}
        {question.img2 && (
          <div className="relative pb-[100%]">
            <img src={question.img2} alt="Image 2" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        )}
        {question.img3 && (
          <div className="relative pb-[100%]">
            <img src={question.img3} alt="Image 3" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        )}
        {question.img4 && (
          <div className="relative pb-[100%]">
            <img src={question.img4} alt="Image 4" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        )}
      </div>

      {/* Hint Icon */}
      <div className="text-right col-span-1">
        <FaQuestionCircle 
          className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={openModal} 
        />
      </div>
      </div>

      {/* Modal for Hint */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
      <h2 className="text-xl font-semibold mb-4">Hint</h2>
        <p className="mb-4">{question.hint}</p>
        {question.paid_hint ?<p className="font-bold">{question.paid_hint}</p> :
        <p className="font-bold">Paid Hint Cost: {question.hint_cost}</p>
    }
        <button
          onClick={buyHint}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={keys < question.hint_cost}
        >
          {keys >= question.hint_cost ? "Buy Hint" : "Not Enough Keys"}
        </button>

        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </CustomModal>
    </div>
  );
}

export default withAuth(QuestionPage);
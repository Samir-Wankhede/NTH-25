"use client"

import API from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/components/CustomModal";
import {FaQuestionCircle} from 'react-icons/fa'
import { useAuth } from "@/context/AuthProvider";
const QuestionPage = ()=>{
    const [question, setQuestion] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [error,setError] = useState("");
    const router = useRouter();
    const {keys, keyUpdate} = useAuth();

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
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

    useEffect(()=>{
        const fetchQuestion = async ()=>{
            try{
                const response = await API.get('/question/curr');
                if (response.status==200){
                    setQuestion(response.data.question)
                    keyUpdate(response.data.keys)
                }else{
                    toast.error(response.data)
                }
            }catch(err){
                if (err.response){
                    toast.error(err.response?.data?.error || "Error fetching current question")
                }else if (err.request){
                    toast.error("Network error. Please try again")
                }else{
                    toast.error("An unexpected error occurred")
                }

            }
        }

        fetchQuestion();
    },[])

    if (!question) {
        return <div>Loading question...</div>;
      }

    return (
    <div className="p-8 max-w-3xl mx-auto">
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

export default QuestionPage;
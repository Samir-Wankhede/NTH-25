"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Instruction = () => {
  const [pika1, setPika1] = useState(false);
  const [pika1_text, setPika1_Text] = useState("");
  const [pika2, setPika2] = useState(false);
  const [pika2_text, setPika2_Text] = useState("");
  const [meowth1, setMeowth1] = useState(false);
  const [meowth1_text, setMeowth1_Text] = useState("");
  const [meowth2, setMeowth2] = useState(false);
  const [meowth2_text, setMeowth2_Text] = useState("");
  const [inst, setInst] = useState(false);

  const skipInst = (e) => {
    if (e.key === "Escape") {
      setInst(true);
      setPika1(false);
      setPika2(false);
      setMeowth1(false);
      setMeowth2(false);
    }
  };

  const skipInstClick = () => {
    setInst(true);
    setPika1(false);
    setPika2(false);
    setMeowth1(false);
    setMeowth2(false);
  };

  const typeWriter = async(text, func) => {
    const speed = 50;
    let currentText = "";
    for(let i=0; i<text.length; i++){
        currentText += text[i];  // Append one character at a time
        func(currentText);  // Update state with the currentText
        await new Promise(resolve => setTimeout(resolve, speed));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setPika1(true);
      typeWriter("Pika Pika Pikaa!!!!",setPika1_Text);
    }, 1000);
    setTimeout(() => {
      setMeowth1(true);
      typeWriter("Wait for real? NTH is Here!!!!!",setMeowth1_Text);
    }, 3000);
    setTimeout(() => {
      setPika2(true);
      typeWriter("Pikaaa Pikaaa Pikaaa!!!",setPika2_Text);
    }, 6000);
    setTimeout(() => {
      setMeowth2(true);
      typeWriter("I know it's hard!! But that's the fun part! Just follow these instructions.",setMeowth2_Text);
    }, 9000);
    setTimeout(() => {
      setInst(true);
      setPika1(false);
      setPika2(false);
      setMeowth1(false);
      setMeowth2(false);
    }, 14000);

    window.addEventListener("keydown", skipInst);
    return () => {
      window.removeEventListener("keydown", skipInst);
    };
  }, []);

  return !inst ? (
    <div className="lg:px-16 h-full gap-[5vh] flex flex-col justify-center text-2xl xl:text-3xl">
      {pika1 && (
        <div className="flex gap-4 items-center">
          <img src="pika.gif" className="md:w-20 md:h-20 h-16 w-16 z-10 absolute translate-y-1/2 translate-x-1/3" />
          <div className="bg-white pixel-corners-blue md:w-[40%] w-[80%] h-[10vh] mx-12 px-8 py-2 text-black">
            {pika1_text}
          </div>
        </div>
      )}
      {meowth1 && (
        <div className="flex gap-4 items-center justify-end">
          <div className="bg-white pixel-corners-blue md:w-[40%] w-[80%] h-[10vh] mx-12 px-8 py-2 text-black">
            {meowth1_text}
          </div>
          <img src="meowth.gif" className="md:w-20 md:h-20 h-16 w-16 z-10 absolute translate-y-1/2 -translate-x-1/3" />
        </div>
      )}
      {pika2 && (
        <div className="flex gap-4 items-center">
          <img src="pika.gif" className="md:w-20 md:h-20 h-16 w-16 z-10 absolute translate-y-1/2 translate-x-1/3" />
          <div className="bg-white pixel-corners-blue md:w-[40%] w-[80%] h-[10vh] mx-12 px-8 py-2 text-black">
            {pika2_text}
          </div>
        </div>
      )}
      {meowth2 && (
        <div className="flex gap-4 items-center justify-end">
        <div className="bg-white pixel-corners-blue md:w-[60%] w-[80%] h-[14vh] mx-12 px-8 py-2 text-black leading-none md:leading-tight">
            {meowth2_text}
          </div>
          <img src="meowth.gif" className="md:w-20 md:h-20 h-16 w-16 z-10 absolute translate-y-1/2 -translate-x-1/3" />
        </div>
      )}
      <div onClick={skipInstClick} className="flex gap-4 items-end justify-center  z-10 cursor-pointer">
        <h1 className="md:text-3xl text-2xl text-shadow">Click here or press Escape Key to Skip!</h1>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <img src="instruction.png" className=" absolute z-10 h-[90%] w-[80%]" />
        <div className="h-[80%] w-[70%] z-20 flex flex-col gap-4">
            <h1 className="text-3xl md:text-6xl text-blue-400 mx-auto">INSTRUCTIONS</h1>
            <ol className="list-decimal pl-10 md:text-3xl text-black space-y-1 md:space-y-4 mx-auto overflow-y-scroll [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400">
                <li>
                    After logging in, there will be a question displayed which
                    includes pictures and hints.
                </li>
                <li>
                    Your URL will be nth.credenz.co.in /
                    question / put_your_answer_here. To submit your answer, you have to replace put_your_answer_here with your answer.
                </li>
                <li>
                    If your answer is correct, you will go to the next level,
                    otherwise, you will be greeted with the same question with
                    same level.
                </li>
                <li>
                    The leaderboard displays players with highest levels.
                </li>
               
                <li>
                    After the 24-hour hunt, the one on the top of the
                    leaderboard wins!
                </li>
                <li>
                    The winner will be declared once and there will be no
                    change in our decision. Furthermore, users should play
                    with one account only.
                </li>
            </ol>
            <Link href={'/question/put_your_answer_here'}>
                <div className=" mx-auto w-fit px-4 py-2 pixel-corners rounded-xl text-black text-2xl bg-white flex justify-center items-center">
                    Start Hunting
                </div>
            </Link>
        </div>
    </div>
  );
};

export default Instruction;

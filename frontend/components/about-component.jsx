'use client';

import { useEffect, useState } from "react";

const About = () => {
    const [step, setStep] = useState(0);
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(false);

    const dialogues = [
        `Hello, there! \nGlad to meet you!`,
        `Welcome to the world of Curiosity! Where PICT IEEE Student Branch presents...`,
        `Network Treasure Hunt`,
        `Decrypt The Encrypted`,
        `Network Treasure Hunt is an online Treasure Hunt played across the globe.`,
        `Read between the lines, find the hidden clues and connect the dots.`,
        `You can use every tool at your disposal.`,
        `Even with Google and Wikipedia by your side, it's going to be fun and challenging.`
    ];

    const typeWriter = async (text, func, signal) => {
        setTyping(true);
        const speed = 30;
        let currentText = "";

        for (let i = 0; i < text.length; i++) {
            if (signal?.aborted) return; // Stop typing if navigation occurs
            currentText += text[i];
            func(currentText);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        setTyping(false);
    };

    const handleNext = () => {
        if (step < dialogues.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleKey = (e) => {
        if (e.key === 'a' || e.key === 'A') handleNext();
        else if (e.key === 'b' || e.key === 'B') handlePrev();
    };

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setText(''); // Clear text immediately when navigating
        typeWriter(dialogues[step], setText, signal);

        window.addEventListener('keypress', handleKey);
        return () => {
            controller.abort(); // Stop typing on cleanup
            window.removeEventListener('keypress', handleKey);
        };
    }, [step]);

    return (
        <div className="h-full w-full flex flex-col justify-between items-center">
            <div className="w-full h-[20vh] mx-12 px-8 py-2 flex justify-between items-start">
                <div className="flex gap-3">
                    <img src='back.png' className="md:w-auto md:h-auto h-4" />
                    <img src='next.png' className="md:w-auto md:h-auto h-4" />
                </div>
                <div className="flex gap-3 z-10">
                    <button
                        className="text-black text-xl py-2 px-4 border-black border-2 rounded-lg bg-white font-bold"
                        onClick={handlePrev}
                        disabled={step === 0}
                    >
                        B
                    </button>
                    <button
                        className="text-black text-xl py-2 px-4 border-black border-2 rounded-lg bg-white font-bold"
                        onClick={handleNext}
                        disabled={step === dialogues.length - 1}
                    >
                        A
                    </button>
                </div>
            </div>
            <div className="mx-12 px-8 py-2">
                {   step < 2 ?
                    <img
                        src="oak.png"
                        className="md:w-[24vh] md:h-[28vh] -translate-y-[25%]"
                        alt="Decorative"
                    />
                    :
                    <div className="relative">
                        <img 
                            src="pokeball2.png"
                            className="w-[30vh] md:h-[36vh] -translate-y-[25%]"
                            alt="Decorative"
                        />
                        <img 
                            src="nth-logo.png"
                            className="absolute w-[22vh] md:w-[18vh] md:h-[20vh] top-1/2 left-1/2 -translate-y-[90%] -translate-x-[47%]"
                            alt="Decorative"
                        />
                    </div>
                }
            </div>
            <div className="bg-white pixel-corners-blue w-[80%] max-h-[20vh] mx-2 md:mx-12 my-6 md:p-10 p-4 inner-block text-wrap">
                <div className="flex items-center my-auto">
                    <span className={`inline-block text-black ${step==2 ? "text-2xl md:text-6xl" :"text-lg md:text-4xl"}`}>
                        {text}
                        {!typing && text !== '' && (
                            <img
                                src="red-arrow.png"
                                className="ml-1 md:h-8 h-4 md:w-8 w-4 animate-bounce inline-block"
                                alt="Arrow"
                            />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default About;

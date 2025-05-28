import React, { useState, useEffect } from "react";
import VarshilImage from "../../assets/Varshil.jpg";

interface RotatingWordsProps {
  rotatingWords: string[];
}

const RotatingWords: React.FC<RotatingWordsProps> = ({ rotatingWords }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [rotatingWords.length]);

  return (
    <div
      className="relative text-3xl px-6 py-2
               before:content-['']
               before:block
               before:absolute
               before:inset-0
              before:bg-black
               lg:before:-skew-x-12
               lg:before:-z-10
               w-full"
    >
      <div className="h-[1.3em] overflow-hidden relative">
        <div
          className="flex flex-col transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${currentWordIndex * 1.3}em)` }}
        >
          {rotatingWords.map((word, index) => (
            <span
              key={index}
              className="block h-[1.3em] text-lime-300 font-extrabold italic text-center md:text-left"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const rotatingWords1 = ["Engineer", "Architect", "Designer"];
  const rotatingWords2 = ["Hiker", "Explorer", "Enthusiast"];
  const rotatingWords3 = ["Tennis", "Badminton", "Formula 1"];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-x-16 p-4 sm:p-9 text-white">
      <div className="flex-shrink-0 mb-8 md:mb-0">
        <img
          src={VarshilImage}
          alt="Profile"
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-lime-400 shadow-xl"
        />
      </div>

      <div className="flex flex-col items-center lg:items-start gap-y-9 italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
        <div className="flex flex-row items-baseline">
          <p className="text-gray-300">Hi I'm</p>
          <p className="text-lime-400">&nbsp;Varshil!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center">
          <RotatingWords rotatingWords={rotatingWords1} />
          <RotatingWords rotatingWords={rotatingWords2} />
          <RotatingWords rotatingWords={rotatingWords3} />
        </div>
      </div>
    </div>
  );
};

export default Home;

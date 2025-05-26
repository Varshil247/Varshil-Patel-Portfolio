import React, { useState, useEffect } from "react";
import VarshilImage from "../../assets/Varshil.jpg";

// ! ----------------------------------------------------------------------------------------------

const RotatingWords = ({ rotatingWords }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[1.2em] overflow-hidden relative text-8xl">
      <div
        className="flex flex-col transition-transform duration-700 ease-in-out"
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
  );
};

// ! ----------------------------------------------------------------------------------------------

const Home = () => {
  const rotatingWords = ["Developer.", "Innovator.", "Designer."];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-row italic text-8xl font-extrabold gap-5">
        <img
          src={VarshilImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-lime-400"
        />
        <p className="text-gray-300">Hey, I'm</p>
        <p className="text-lime-400">Varshil!</p>
        <RotatingWords rotatingWords={rotatingWords} />
      </div>

      <div className="flex flex-row italic text-2xl font-semibold gap-2">
        <p className="text-gray-300/90">A passionate developer contributing to the future of</p>
        <p className="text-lime-300/90 underline decoration-lime-400/50">
          Artificial Intelligence powered Web Applications.
        </p>
      </div>
    </div>
  );
};

export default Home;

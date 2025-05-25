import React, { useState, useEffect } from "react";

const rotatingWords = ["Developer", "Innovator", "Designer"];

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 gap-6 md:gap-8 text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-x-3 md:gap-x-4 lg:gap-x-5">
        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
          <span className="italic text-gray-300">Hey, I'm </span>
          <span className="italic text-lime-400 shine-effect-text">Varshil!</span>
        </p>

        <div className="h-[1.2em] overflow-hidden relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 md:mt-0">
          <div
            className="flex flex-col transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(-${currentWordIndex * 1.2}em)` }}
          >
            {rotatingWords.map((word, index) => (
              <span
                key={index}
                className="block h-[1.2em] leading-[1.2em] text-lime-300 font-bold italic text-center md:text-left"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xl sm:text-2xl md:text-3xl font-semibold italic leading-relaxed">
        <span className="text-gray-300/90">
          A passionate developer contributing to the future of{" "}
        </span>
        <span className="text-lime-300 underline decoration-lime-500/50 underline-offset-4 decoration-2">
          Artificial Intelligence powered Web Applications.
        </span>
      </p>
    </div>
  );
};

export default Home;

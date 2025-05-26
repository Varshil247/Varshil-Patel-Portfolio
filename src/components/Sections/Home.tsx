import React, { useState, useEffect } from "react";
import VarshilImage from "../../assets/Varshil.jpg";

// --- Home Component and Sub-component ---

interface RotatingWordsProps {
  rotatingWords: string[];
}

const RotatingWords: React.FC<RotatingWordsProps> = ({ rotatingWords }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 5000); // Change word every 3 seconds
    return () => clearInterval(intervalId);
  }, [rotatingWords.length]);

  return (
    <div
      className="relative text-3xl w-fit px-6 py-2
               before:content-['']
               before:block
               before:absolute
               before:inset-0
               before:bg-black
               before:-skew-x-12
               before:-z-10"
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
    // Main container updated for a two-column layout.
    // Stacks vertically on mobile, row on medium screens and up.
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-x-10 lg:gap-x-16 p-4 sm:p-9 text-white">
      {/* --- Left Column: Image --- */}
      {/* The image is now uncommented and will appear on the left. */}
      <div className="flex-shrink-0 mb-8 md:mb-0">
        <img
          src={VarshilImage} // Using the imported image
          alt="Profile"
          // Styling for the profile image
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-lime-400 shadow-xl"
        />
      </div>

      {/* --- Right Column: Text Section --- */}
      {/* This div wraps the greeting and rotating words to form the right column. */}
      <div className="flex flex-col items-center md:items-start gap-y-9">
        {/* Top part: Greeting Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold">
          <div className="flex flex-row items-baseline gap-x-3 sm:gap-x-4">
            <p className="text-gray-300">Hey, I'm</p>
            <p className="text-lime-400">Varshil!</p>
          </div>
        </div>

        {/* Bottom part: Rotating Words Component */}
        <div className="flex flex-row gap-3">
          <RotatingWords rotatingWords={rotatingWords1} />
          <RotatingWords rotatingWords={rotatingWords2} />
          <RotatingWords rotatingWords={rotatingWords3} />
        </div>

        {/* Bottom section: Description */}
        {/* <div className="flex flex-col md:flex-row text-center md:text-left italic text-xl sm:text-2xl font-semibold gap-1 md:gap-2">
          <p className="text-gray-300/90">A passionate developer contributing to the future of</p>
          <p className="text-lime-300/90 underline decoration-lime-400/50 decoration-2 underline-offset-4">
            Artificial Intelligence powered Web Applications.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Home;

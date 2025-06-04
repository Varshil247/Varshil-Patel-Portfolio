import React from "react";
import { Sun, Moon } from "lucide-react";

// ! ----------------------------------------------------------------------------------------------

interface ThemeToggleAnimatedProps {
  theme: "light" | "dark";
  handleThemeChange: (theme: "light" | "dark") => void;
}

// ! ----------------------------------------------------------------------------------------------

const ThemeToggleAnimated: React.FC<ThemeToggleAnimatedProps> = ({ theme, handleThemeChange }) => {
  return (
    <div className="relative flex flex-row items-center justify-center gap-1 p-1 border border-dark rounded-lg md:w-full shadow-sm">
      <button
        onClick={() => handleThemeChange("light")}
        className={`flex-1 p-1.5 rounded-md focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-light focus-visible:ring-sky-500 transition-all duration-200 ease-in-out
          ${
            theme === "light"
              ? `bg-[#F18F01] text-white`
              : `text-regular hover:bg-[#F18F01] hover:text-white`
          }`}
      >
        <Sun size={18} className="mx-auto" />
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        className={`flex-1 p-1.5 rounded-md focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-light focus-visible:ring-sky-500 transition-all duration-200 ease-in-out
          ${
            theme === "dark"
              ? `bg-[#0EA5E9] text-white`
              : `text-regular hover:bg-[#0EA5E9] hover:text-white`
          }`}
      >
        <Moon size={18} className="mx-auto" />
      </button>
    </div>
  );
};

export default ThemeToggleAnimated;

// ! ----------------------------------------------------------------------------------------------

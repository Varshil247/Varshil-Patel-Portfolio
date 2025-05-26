// src/components/Sections/Experience.js
import React, { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  Building,
  CalendarDays,
  Target,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"; // Added Star for highlights

// --- Placeholder Experience Data ---
const experienceData = [
  {
    id: 1,
    company: "Nottingham Racing Formula Students Al",
    role: "Project Manager & Path Planning Lead", // Shortened for better fit
    date: "Sep 2024 - Present",
    location: "Nottingham, UK",
    description:
      "Leading a 22-engineer team in developing perception, path planning, and control algorithms for an autonomous race car. Spearheaded Python path planning solutions (RRT, Delaunay).",
    responsibilities: [
      "Overseeing technical direction, sprint planning, and integration.",
      "Delivering a reliable autonomous navigation system for Silverstone.",
      "Managing cross-functional sub-teams for perception and control systems.",
    ],
    defaultIcon: <Target size={28} />,
  },
  {
    id: 2,
    company: "Cboe Global Markets",
    role: "Software Engineering Intern",
    date: "Jun 2024 - Aug 2024",
    location: "London, UK",
    description:
      "Engineered and modernised 3 market data tools (Django, PostgreSQL, React), delivering low-latency trade data services and improving system reliability across 15+ global exchange venues.",
    responsibilities: [
      "Improved system reliability across 15+ global exchange venues.",
      "Led sprint planning, code reviews, and optimisation in an agile team.",
      "Directed client review sessions to refine requirements (Jira, Bitbucket).",
      "Developed scalable search algorithms for European services.",
    ],
    defaultIcon: <Briefcase size={28} />,
  },
  {
    id: 3,
    company: "University of Nottingham",
    role: "Fullstack Software Engineer",
    date: "Sep 2023 - Jun 2024",
    location: "Nottingham, UK",
    description:
      "Developed a real-time whiteboard app (JavaScript, PostgreSQL, Supabase, React). Optimised Ul performance by 80% (Redux, CDN caching, on-demand loading).",
    responsibilities: [
      "Ensured scalable state management for 500+ demo day users.",
      "Led a 7-person cross-functional team with TDD practices.",
      "Achieved low-latency data synchronisation.",
    ],
    defaultIcon: <Building size={28} />,
  },
  {
    id: 4,
    company: "Nottingham Street Aid",
    role: "Fullstack Software Engineer",
    date: "Sep 2023 - Jan 2024",
    location: "Nottingham, UK",
    description:
      "Built a scalable MERN platform for grant distribution, aiding 1,600+ individuals. Created a secure portal (JWT, Bcrypt, 2FA) & cut page load times by 25%.",
    responsibilities: [
      "Optimised state management with Redux and implemented lazy loading.",
      "Reduced MongoDB queries to enhance backend performance.",
      "Improved accessibility standards for 52 partner organisations.",
    ],
    defaultIcon: <CheckCircle size={28} />,
  },
];

// --- Experience Card Sub-component ---
const ExperienceCard = ({ entry }) => {
  // Hardcoded Green Theme Styles for Card
  const cardBg = "bg-emerald-800/70";
  const cardText = "text-lime-300";
  const cardIconColor = "text-lime-400";
  const cardHighlightDotColor = "text-lime-500";
  const cardSubtleBorder = "border-white/5";
  const cardHoverBorder = "hover:border-lime-500/40";
  const cardHoverShadow = "hover:shadow-lime-500/20";

  if (!entry) return null;

  return (
    // Consistent card width: w-96 (384px). h-full makes it stretch to parent's item height.
    <div
      className={`flex-shrink-0 w-96 h-full rounded-2xl shadow-xl overflow-hidden 
                    transition-all duration-300 ease-in-out 
                    transform hover:-translate-y-1 hover:scale-[1.01] 
                    ${cardBg} 
                    p-6 flex flex-col 
                    border ${cardSubtleBorder} ${cardHoverBorder} ${cardHoverShadow} group`}
    >
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br from-lime-500/20 to-emerald-600/30 mr-4 shrink-0 shadow-lg`}
        >
          {React.cloneElement(entry.defaultIcon, { className: cardIconColor, size: 24 })}
        </div>
        <div className="flex-grow">
          <h3 className={`text-lg font-bold ${cardText} leading-tight`}>{entry.role}</h3>
          <p className={`text-sm font-medium text-gray-300/80 flex items-center mt-0.5`}>
            <Building size={14} className="mr-1.5 opacity-70 shrink-0" /> {entry.company}
          </p>
        </div>
      </div>

      {/* Date and Location */}
      <div className="flex items-center justify-between text-xs text-gray-400/80 mb-4">
        <div className="flex items-center">
          <CalendarDays size={14} className="mr-1.5 opacity-70" />
          <span>{entry.date}</span>
        </div>
        {entry.location && <span className="italic">{entry.location}</span>}
      </div>

      {/* Main Content Area (Description + Responsibilities) - This div will grow */}
      <div className="flex flex-col flex-grow justify-between">
        {/* Description */}
        <p className="text-gray-300 text-sm mb-5 leading-relaxed min-h-[70px] line-clamp-4 group-hover:line-clamp-none transition-all duration-200">
          {entry.description}
        </p>

        {/* Responsibilities / Key Points - Pushed to the bottom by justify-between on parent */}
        {entry.responsibilities && entry.responsibilities.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400/70 mb-2.5 flex items-center">
              <CheckCircle size={14} className="mr-2 opacity-70" /> Key Contributions
            </h4>
            <ul className="space-y-1.5">
              {entry.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start text-xs text-gray-300/90">
                  <Star
                    size={12}
                    className={`mr-2 mt-[3px] shrink-0 ${cardHighlightDotColor} opacity-80`}
                    fill="currentColor"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Experience Component ---
const Experience = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sectionTitleFrom = "from-green-400";
  const sectionTitleVia = "via-lime-400";
  const sectionTitleTo = "to-emerald-500";
  const buttonBg = "bg-lime-500/90 hover:bg-lime-500 backdrop-blur-sm";
  const buttonTextColor = "text-emerald-900";

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const atLeft = scrollLeft <= 5;
      const atRight = scrollLeft >= scrollWidth - clientWidth - 5;
      setCanScrollLeft(!atLeft);
      setCanScrollRight(!atRight);
    }
  };

  useEffect(() => {
    setTimeout(checkScrollability, 100);
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      const resizeObserver = new ResizeObserver(checkScrollability);
      Array.from(container.children).forEach((child) => resizeObserver.observe(child));

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
        resizeObserver.disconnect();
      };
    }
  }, [experienceData]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 384;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 400);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 text-left">
      <div className="w-full max-w-7xl relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full shadow-xl transition-all duration-200 ${buttonBg} ${buttonTextColor} hover:scale-110`}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full shadow-xl transition-all duration-200 ${buttonBg} ${buttonTextColor} hover:scale-110`}
            aria-label="Scroll Right"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 md:space-x-6 py-4 snap-x snap-mandatory scrollbar-hide items-stretch" // items-stretch is key for same height
        >
          {experienceData.map((entry) => (
            <ExperienceCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .group:hover .line-clamp-4 {
          -webkit-line-clamp: unset;
        }
      `}</style>
    </div>
  );
};

export default Experience;

// src/components/Sections/Experience.tsx
import React, { useState } from "react";
import type { FC, ReactElement } from "react";
import { Briefcase, Building, CalendarDays, Target, CheckCircle, Star } from "lucide-react";

interface StylableIconProps {
  className?: string;
  size?: number | string;
}

interface ExperienceEntry {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  responsibilities: string[];
  defaultIcon: ReactElement<StylableIconProps>;
}

interface ExperienceDetailCardProps {
  entry: ExperienceEntry | undefined;
}

const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    company: "Formula Students Al",
    role: "Project Manager & Path Planning Lead",
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

const ExperienceDetailCard: FC<ExperienceDetailCardProps> = ({ entry }) => {
  const cardBg = "bg-emerald-800/80";
  const cardText = "text-lime-300";
  const cardIconColor = "text-lime-400";
  const cardHighlightDotColor = "text-lime-500";
  const cardSubtleBorder = "border-lime-500/20";

  if (!entry) {
    return (
      <div
        className={`w-full h-full min-h-[400px] flex items-center justify-center ${cardBg} rounded-2xl p-6 border ${cardSubtleBorder} shadow-xl`}
      >
        <p className="text-gray-400 text-lg">Select an experience to view details.</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full min-h-[400px] rounded-2xl shadow-2xl overflow-hidden 
               transition-all duration-300 ease-in-out 
               ${cardBg} 
               p-6 flex flex-col 
               border ${cardSubtleBorder}`}
    >
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br from-lime-500/30 to-emerald-600/40 mr-4 shrink-0 shadow-lg`}
        >
          {React.cloneElement(entry.defaultIcon, { className: cardIconColor, size: 28 })}
        </div>
        <div className="flex-grow">
          <h3 className={`text-xl font-bold ${cardText} leading-tight`}>{entry.role}</h3>
          <p className={`text-md font-medium text-gray-300/90 flex items-center mt-1`}>
            <Building size={16} className="mr-2 opacity-80 shrink-0" /> {entry.company}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400/90 mb-5">
        <div className="flex items-center">
          <CalendarDays size={15} className="mr-2 opacity-80" />
          <span>{entry.date}</span>
        </div>
        {entry.location && <span className="italic">{entry.location}</span>}
      </div>

      <div className="flex flex-col flex-grow justify-between space-y-5">
        <p className="text-gray-200 text-sm leading-relaxed">{entry.description}</p>

        {entry.responsibilities && entry.responsibilities.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400/80 mb-3 flex items-center">
              <CheckCircle size={15} className="mr-2 opacity-80" /> Key Contributions
            </h4>
            <ul className="space-y-2">
              {entry.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-gray-200/95">
                  <Star
                    size={14}
                    className={`mr-2.5 mt-0.5 shrink-0 ${cardHighlightDotColor} opacity-90`}
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

const Experience: FC = () => {
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(
    experienceData.length > 0 ? experienceData[0].id : null
  );

  const sectionTitleFrom = "from-green-400";
  const sectionTitleVia = "via-lime-400";
  const sectionTitleTo = "to-emerald-500";

  const selectedExperience = experienceData.find((exp) => exp.id === selectedExperienceId);

  const selectedBgStyle = {
    background: "radial-gradient(circle at 3% 50%, rgba(163, 230, 53, 0.15) 0%, transparent 40%)",
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 text-left">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r ${sectionTitleFrom} ${sectionTitleVia} ${sectionTitleTo} text-center`}
      >
        My Professional Experience
      </h2>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-1 bg-emerald-900/50 p-4 sm:p-6 rounded-2xl shadow-lg border border-lime-500/20 h-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-lime-600/50 scrollbar-track-emerald-900/30">
          <h3 className="text-xl font-semibold text-lime-300 mb-5 pl-1">Timeline</h3>
          <div className="relative">
            {experienceData.map((entry, index) => (
              <div
                key={entry.id}
                className={`relative flex items-start pb-6 last:pb-0 cursor-pointer p-2 -ml-2 rounded-lg border transition-all duration-300 ease-in-out ${
                  selectedExperienceId === entry.id ? "border-lime-500/40" : "border-transparent"
                }`}
                style={selectedExperienceId === entry.id ? selectedBgStyle : {}}
                onClick={() => setSelectedExperienceId(entry.id)}
              >
                <div className="absolute left-4 top-2 w-8 flex flex-col items-center -ml-[16px] h-full">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 shadow-md transition-all duration-300 
                        ${
                          selectedExperienceId === entry.id
                            ? "bg-lime-500 border-lime-300 scale-110"
                            : "bg-emerald-700 border-lime-500/70"
                        }`}
                  >
                    {React.cloneElement(entry.defaultIcon, {
                      className: `${
                        selectedExperienceId === entry.id ? "text-emerald-900" : "text-lime-300"
                      } transition-colors duration-300`,
                      size: 16,
                    })}
                  </div>
                  {index < experienceData.length - 1 && (
                    <div
                      className={`w-0.5 flex-grow mt-1 transition-colors duration-300 
                          ${
                            selectedExperienceId === entry.id ||
                            (experienceData[index + 1] &&
                              selectedExperienceId === experienceData[index + 1].id)
                              ? "bg-lime-400/70"
                              : "bg-lime-500/30"
                          }`}
                    ></div>
                  )}
                </div>

                <div
                  className={`ml-10 pl-3 flex-grow transition-opacity duration-300 ${
                    selectedExperienceId === entry.id ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <p
                    className={`font-semibold text-sm transition-colors duration-300 ${
                      selectedExperienceId === entry.id ? "text-lime-200" : "text-gray-200"
                    }`}
                  >
                    {entry.company}
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      selectedExperienceId === entry.id ? "text-gray-300" : "text-gray-400"
                    }`}
                  >
                    {entry.role.substring(0, 30)}
                    {entry.role.length > 30 ? "..." : ""}
                  </p>
                  <p
                    className={`text-xs mt-0.5 transition-colors duration-300 ${
                      selectedExperienceId === entry.id ? "text-lime-400/80" : "text-gray-500"
                    }`}
                  >
                    {entry.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 h-full min-h-[400px] md:min-h-0">
          <ExperienceDetailCard entry={selectedExperience} />
        </div>
      </div>
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb);
          border-radius: 10px;
          border: 2px solid var(--scrollbar-track);
        }
      `}</style>
      <style>{`
        :root {
          --scrollbar-thumb: #84cc16; /* lime-500 */
          --scrollbar-track: #065f46; /* emerald-900 */
        }
      `}</style>
    </div>
  );
};

export default Experience;

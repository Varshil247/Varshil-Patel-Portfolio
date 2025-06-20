import React, { useState } from "react";
import type { FC, ReactElement } from "react";
import { Briefcase, Building, Target, CheckCircle, Star } from "lucide-react";

// ! ----------------------------------------------------------------------------------------------

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

// ! ----------------------------------------------------------------------------------------------

const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    company: "Formula Students Al",
    role: "Project Manager & Path Planning Lead",
    date: "Sep 2024 - Present",
    location: "Nottingham",
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
    location: "London",
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
    location: "Nottingham",
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
    location: "Nottingham",
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

// ! ----------------------------------------------------------------------------------------------

const ExperienceDetailCard: FC<ExperienceDetailCardProps> = ({ entry }) => {
  if (!entry) {
    return;
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 border border-dark rounded-lg transition-all duration-300 ease-in-out bg-light h-full">
      <div className="flex flex-col gap-3 p-2 sm:p-3">
        <div className="flex flex-row gap-3 items-center">
          <div className="p-2 sm:p-3 rounded-md bg-special shadow-md shrink-0">
            {React.cloneElement(entry.defaultIcon, {
              className: "text-light",
              size: window.innerWidth < 640 ? 32 : 28,
            })}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3 w-full">
            <div className="flex flex-col min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-special truncate">
                {entry.company}
              </h3>
              <p className="text-sm sm:text-md font-medium text-dark">{entry.role}</p>
              <div className="flex sm:hidden flex-row gap-2 text-regular text-xs mt-1">
                <p className="whitespace-nowrap">{entry.date}</p>
                <p>•</p>
                <p className="whitespace-nowrap">{entry.location}</p>
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-right text-regular text-xs sm:text-sm shrink-0">
              <p className="whitespace-nowrap">{entry.date}</p>
              <p className="whitespace-nowrap">{entry.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 sm:p-3">
        <p className="text-dark text-xs sm:text-sm leading-relaxed">{entry.description}</p>
      </div>
      {entry.responsibilities && entry.responsibilities.length > 0 && (
        <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-3">
          <div className="border-t border-regular" />
          <h4 className="flex flex-row gap-2 sm:gap-3 items-center text-xs sm:text-sm font-semibold uppercase text-regular tracking-wider">
            <CheckCircle
              size={window.innerWidth < 640 ? 12 : 15}
              className="text-special shrink-0"
            />
            <p>Key Contributions</p>
          </h4>
          <ul className="space-y-1.5 sm:space-y-2 pl-0 sm:pl-1">
            {entry.responsibilities.map((item, index) => (
              <li
                key={index}
                className="flex flex-row gap-2 sm:gap-2.5 items-start text-xs sm:text-sm text-dark"
              >
                <Star
                  size={window.innerWidth < 640 ? 12 : 14}
                  className="text-special fill-special opacity-80 shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ! ----------------------------------------------------------------------------------------------

const Experience: FC = () => {
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(
    experienceData.length > 0 ? experienceData[0].id : null
  );

  const selectedExperience = experienceData.find((exp) => exp.id === selectedExperienceId);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[95vh] p-6 gap-3">
      <h2 className="italic text-3xl font-bebas font-extrabold text-special">
        Professional Experience
      </h2>

      <div className="max-w-5xl grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="col-span-1">
          <div className="flex flex-col gap-3 p-3 rounded-lg border border-dark">
            {experienceData.map((entry) => (
              <div
                key={entry.id}
                className={`cursor-pointer flex flex-row gap-3 p-3 rounded-md transition-all duration-300 ease-in-out
                  ${
                    selectedExperienceId === entry.id
                      ? "shadow-sm shadow-special"
                      : "hover:shadow-sm hover:shadow-regular"
                  }`}
                onClick={() => setSelectedExperienceId(entry.id)}
              >
                <div className="flex flex-row">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 
                      ${selectedExperienceId === entry.id ? "bg-special scale-105" : "bg-light"}`}
                  >
                    {React.cloneElement(entry.defaultIcon, {
                      className: `transition-colors duration-300 ${
                        selectedExperienceId === entry.id ? "text-light" : "text-special"
                      }`,
                      size: 16,
                    })}
                  </div>
                </div>

                <div>
                  <p
                    className={`font-semibold text-sm transition-colors duration-300 ${
                      selectedExperienceId === entry.id ? "text-special" : "text-dark"
                    }`}
                  >
                    {entry.company}
                  </p>
                  <p className="text-xs text-dark transition-colors duration-300">{entry.role}</p>
                  <p className="text-xs text-regular transition-colors duration-300">
                    {entry.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <ExperienceDetailCard entry={selectedExperience} />
        </div>
      </div>
    </div>
  );
};

export default Experience;

// ! ----------------------------------------------------------------------------------------------

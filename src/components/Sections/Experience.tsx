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
    location: "Nottingham, United Kingdom",
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
    location: "London, United Kingdom",
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
    location: "Nottingham, United Kingdom",
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
    location: "Nottingham, United Kingdom",
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
    <div className="flex flex-col gap-3 p-3 border border-dark rounded-lg transition-all duration-300 ease-in-out bg-light h-full">
      <div className="flex flex-row gap-3 p-3 items-center">
        <div className="p-3 rounded-md bg-special shadow-md">
          {React.cloneElement(entry.defaultIcon, { className: "text-light", size: 28 })}
        </div>
        <div className="flex flex-row items-end justify-between gap-3 w-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-special">{entry.company}</h3>
            <p className="text-md font-medium text-dark flex items-center">{entry.role}</p>
          </div>
          <div className="flex flex-col text-right text-regular text-sm shrink-0">
            <p>{entry.date}</p>
            <p>{entry.location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3">
        <p className="text-dark text-sm leading-relaxed">{entry.description}</p>
      </div>

      {entry.responsibilities && entry.responsibilities.length > 0 && (
        <div className="flex flex-col gap-3 p-3">
          <div className="border-t border-regular" />
          <h4 className="flex flex-row gap-3 items-center text-sm font-semibold uppercase text-regular tracking-wider">
            <CheckCircle size={15} className="text-special" />
            <p>Key Contributions</p>
          </h4>
          <ul className="space-y-2 pl-1">
            {entry.responsibilities.map((item, index) => (
              <li key={index} className="flex flex-row gap-2.5 items-start text-sm text-dark">
                <Star size={14} className="text-special fill-special opacity-80 shrink-0 mt-0.5" />
                <span>{item}</span>
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
    <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-3">
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

// src/components/Education.tsx

import React from "react";
import type { FC, ReactElement } from "react";
import { BookOpen, Award, CalendarDays, Briefcase } from "lucide-react";

// --- TypeScript Interfaces ---

interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface EducationEntry {
  id: number;
  institution: string;
  degree: string;
  date: string;
  description: string;
  highlights: string[];
  projects: Project[];
  icon: ReactElement;
  bgColor: string;
  textColor: string;
}

// --- Education Data ---
const educationData: EducationEntry[] = [
  {
    id: 1,
    institution: "University of Nottingham",
    degree: "BSc Computer Science with Artificial Intelligence",
    date: "2022 - 2025",
    description:
      "Focused on machine learning, natural language processing, and computer vision. Key modules include Advanced AI, Neural Networks, and Data Ethics. Currently working on a final year project involving generative models for creative content.",
    highlights: [
      "Recipient of the 'Academic Excellence Scholarship' (2023)",
      "Lead Developer for 'AI for Social Good' hackathon winning team",
      "Contributor to open-source NLP library",
      "Expected First Class Honours",
    ],
    projects: [
      {
        id: "p1-1",
        year: "2025",
        title: "Generative AI Capstone Project",
        description:
          "Developing a novel approach for creative content generation using advanced GANs and transformer models.",
      },
      {
        id: "p1-2",
        year: "2024",
        title: "NLP Research Contribution",
        description:
          "Contributed to an open-source library for sentiment analysis, improving accuracy by 8%.",
      },
      {
        id: "p1-3",
        year: "2023",
        title: "AI Hackathon Winner: 'AI for Social Good'",
        description:
          "Led a team to develop an AI-powered solution for optimizing local food bank logistics.",
      },
    ],
    icon: <Award size={28} className="text-lime-400" />,
    bgColor: "bg-emerald-800/70",
    textColor: "text-lime-300",
  },
];

// --- Prop Types for Sub-component ---
interface EducationCardProps {
  entry: EducationEntry;
}

// --- Education Card Sub-component ---
const EducationCard: FC<EducationCardProps> = ({ entry }) => {
  return (
    <div
      className={`group relative rounded-xl shadow-xl overflow-hidden 
               transition-all duration-300 ease-in-out 
               transform hover:-translate-y-0.5 hover:scale-[1.01] 
               ${entry.bgColor} 
               p-6 md:p-8 flex flex-col min-h-[320px] md:min-h-[340px]
               border border-white/10 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-600/20`}
    >
      {/* Card Header */}
      <div className="flex items-start mb-5">
        <div className={`p-3 rounded-lg bg-black/40 mr-4 shrink-0 shadow-md`}>{entry.icon}</div>
        <div className="flex-grow">
          <h3 className={`text-lg md:text-xl font-bold ${entry.textColor} leading-tight mb-0.5`}>
            {entry.institution}
          </h3>
          <p
            className={`text-sm font-semibold ${entry.textColor
              .replace("-300", "-500")
              .replace("-400", "-500")} mb-1.5`}
          >
            {entry.degree}
          </p>
          <div className="flex items-center text-xs text-gray-400">
            <CalendarDays size={14} className="mr-1.5 opacity-80" />
            <span>{entry.date}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-5 leading-relaxed">{entry.description}</p>

      {/* Highlights */}
      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-medium uppercase tracking-wider text-gray-400/80 mb-2.5">
            Key Highlights:
          </h4>
          <ul className="space-y-1.5">
            {entry.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start text-xs text-gray-300/90">
                <span
                  className={`mr-2.5 mt-1 inline-block h-1.5 w-1.5 rounded-full bg-lime-500 opacity-70 shrink-0`}
                ></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Relevant Projects Timeline */}
      {entry.projects && entry.projects.length > 0 && (
        <div className="mt-auto pt-5 border-t border-white/15">
          <h4 className="text-xs font-medium uppercase tracking-wider text-gray-400/80 mb-4 flex items-center">
            <Briefcase size={14} className="mr-2 opacity-80" />
            Relevant Projects Timeline:
          </h4>
          <div className="relative pl-5 space-y-6 border-l-2 border-gray-600/50">
            {entry.projects.map((project) => (
              <div key={project.id} className="relative">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[29px] top-1.5 h-4 w-4 rounded-full border-2 border-gray-600/50 ${entry.bgColor} flex items-center justify-center`}
                >
                  <div className={`h-2 w-2 rounded-full bg-lime-500`}></div>
                </div>
                <p
                  className={`text-xs font-semibold ${entry.textColor
                    .replace("-300", "-500")
                    .replace("-400", "-500")} mb-0.5`}
                >
                  {project.year}
                </p>
                <h5 className={`text-sm font-semibold ${entry.textColor} mb-1`}>{project.title}</h5>
                <p className="text-xs text-gray-400 leading-snug">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Education Component ---
const Education: FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 gap-6 md:gap-8 text-left">
      <div className="w-full max-w-5xl grid grid-cols-1 gap-8 md:gap-12">
        {educationData.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Education;

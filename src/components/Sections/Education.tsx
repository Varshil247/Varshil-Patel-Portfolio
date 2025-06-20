import React from "react";
import type { FC, ReactElement } from "react";
import { Award, CalendarDays, Briefcase, Star } from "lucide-react";

// ! ----------------------------------------------------------------------------------------------

interface StylableIconProps {
  className?: string;
  size?: number | string;
}

interface ProjectTimelineEntry {
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
  projects: ProjectTimelineEntry[];
  icon: ReactElement<StylableIconProps>;
}

interface EducationCardProps {
  entry: EducationEntry;
}

// ! ----------------------------------------------------------------------------------------------

const educationData: EducationEntry[] = [
  {
    id: 1,
    institution: "University of Nottingham",
    degree: "BSc Computer Science with Artificial Intelligence",
    date: "2022 - 2025",
    description:
      "Focused on Machine Learning, Heuristic Optimisation, and Data Visualisation. Key modules include Artificial Intelligence Methods, Designing Intelligent Agents, and Software Engineering Group Project. Developed complex, robust and scalable projects with high impact and research novelty.",
    highlights: [
      "Artificial Intelligence Research Programme with Google DeepMind",
      "Lead Backend Developer for Software Engineering Group Project",
      "Advanced XGBoost-FinBERT model for financial investments",
      "Top 5 Duo at HackNotts24, GeoGuesserAI CNN-LSTM vs Humans",
    ],
    projects: [
      {
        id: "p2",
        year: "Sep 2024 - May 2025",
        title: "FinVis-AI: Stock Analysis Platform",
        description:
          "Designed a comprehensive stock analysis platform that provides a holistic view of fundamental, technical and sentiment analysis. Architected an XGBoost-SHAP model to enhance technical analysis of stock symbols. Utilised Gemini-LLM and FinBERT to extract sentiment and collate financial literacy insights. Developed a novel 2-dimensional financial ratios Treemap to allow investors to extract deeper sector wide comparisons.",
      },
      {
        id: "p1",
        year: "Apr 2025 - May 2025",
        title: "DRL Agents for Automated Trading",
        description:
          "Developed robust A2C and PPO agents to trade on the S&P 500 index. Evaluated the effects of data rich quantitative environments, strategic agent reward functions and hyper-parameter tuning to balance exploration-exploitation factors. Created a robust and profitable environment-agent architecture that has agent stability and 6.5x returns when backtested.",
      },
    ],
    icon: <Award size={28} />,
  },
];

// ! ----------------------------------------------------------------------------------------------

const EducationCard: FC<EducationCardProps> = ({ entry }) => {
  return (
    <div
      className={
        "group relative rounded-xl shadow-xl overflow-hidden " +
        "transition-all duration-300 ease-in-out " +
        "transform hover:-translate-y-1 hover:scale-[1.015] " +
        "bg-light " +
        "p-6 md:p-8 flex flex-col min-h-[320px] md:min-h-[340px] " +
        "border border-dark/20 hover:border-special/70 hover:shadow-2xl"
      }
    >
      <div className="flex items-start mb-5">
        <div className={"p-3 rounded-lg mr-4 shrink-0 shadow-md bg-special/10"}>
          {React.cloneElement(entry.icon, {
            className: "text-special",
            size: 28,
          })}
        </div>
        <div className="flex-grow">
          <h3 className={"text-lg md:text-xl font-semibold leading-tight mb-0.5 text-dark"}>
            {entry.institution}
          </h3>
          <p className={"text-sm font-medium mb-1.5 text-special"}>{entry.degree}</p>
          <div className={"flex items-center text-xs text-regular"}>
            <CalendarDays size={14} className="mr-1.5 opacity-80" />
            <span>{entry.date}</span>
          </div>
        </div>
      </div>

      <p className={"text-sm mb-5 leading-relaxed text-regular"}>{entry.description}</p>

      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mb-6">
          <h4
            className={
              "text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center text-regular"
            }
          >
            <Star size={15} className={"mr-2 opacity-80 text-special"} />
            Key Highlights
          </h4>
          <ul className="space-y-1.5 pl-1">
            {entry.highlights.map((highlight, index) => (
              <li key={index} className={"flex items-start text-xs text-regular"}>
                <span className="mr-2.5 mt-1 inline-block h-1.5 w-1.5 rounded-full opacity-80 shrink-0 bg-special"></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {entry.projects && entry.projects.length > 0 && (
        <div className="mt-auto pt-5 border-t border-dark/20">
          <h4
            className={
              "text-xs font-semibold uppercase tracking-wider mb-4 flex items-center text-regular"
            }
          >
            <Briefcase size={14} className={"mr-2 opacity-80 text-special"} />
            Relevant Projects Timeline
          </h4>
          <div className="relative pl-5 space-y-6 border-l-2 border-regular/50">
            {entry.projects.map((project) => (
              <div key={project.id} className="relative">
                <div className="absolute -left-[30.5px] top-1 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-light border-special">
                  <div className="h-1.5 w-1.5 rounded-full bg-special"></div>
                </div>
                <p className="text-xs font-semibold mb-0.5 text-special">{project.year}</p>
                <h5 className="text-sm font-semibold mb-1 text-dark">{project.title}</h5>
                <p className="text-xs leading-snug text-regular">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ! ----------------------------------------------------------------------------------------------

const Education: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full min-h-[95vh] p-6">
      <h2 className="italic text-3xl font-bebas font-extrabold text-special">
        Educational Journey
      </h2>
      <div className="flex flex-col max-w-3xl items-center justify-center gap-3">
        {educationData.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Education;

// ! ----------------------------------------------------------------------------------------------

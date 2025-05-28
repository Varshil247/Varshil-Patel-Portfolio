import type { FC, ReactElement } from "react";
import { Award, CalendarDays, Briefcase } from "lucide-react";

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
    icon: <Award size={28} className="text-lime-400" />,
    bgColor: "bg-emerald-800/70",
    textColor: "text-lime-300",
  },
];

interface EducationCardProps {
  entry: EducationEntry;
}

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

      {entry.projects && entry.projects.length > 0 && (
        <div className="mt-auto pt-5 border-t border-white/15">
          <h4 className="text-xs font-medium uppercase tracking-wider text-gray-400/80 mb-4 flex items-center">
            <Briefcase size={14} className="mr-2 opacity-80" />
            Relevant Projects Timeline:
          </h4>
          <div className="relative pl-5 space-y-6 border-l-2 border-gray-600/50">
            {entry.projects.map((project) => (
              <div key={project.id} className="relative">
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

const Education: FC = () => {
  const sectionTitleFrom = "from-green-400";
  const sectionTitleVia = "via-lime-400";
  const sectionTitleTo = "to-emerald-500";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 text-left">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r ${sectionTitleFrom} ${sectionTitleVia} ${sectionTitleTo} text-center`}
      >
        My Educational Journey
      </h2>
      <div className="w-full max-w-5xl grid grid-cols-1 gap-8 md:gap-12">
        {educationData.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Education;

// src/components/Projects.tsx
import React from "react";
import type { FC, ReactElement } from "react";
import { ExternalLink, Github, Brain, CalendarCheck, Route, Network } from "lucide-react";
import clsx from "clsx";

// --- TypeScript Interfaces ---

// CORRECTED: Define a more specific props type for our icons
interface StylableIconProps {
  className?: string;
  size?: number | string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  span: string;
  // CORRECTED: Use the more specific type for the icon
  defaultIcon: ReactElement<StylableIconProps>;
}

interface ProjectCardProps {
  project: Project;
}

// --- Projects Data ---
const projectsData: Project[] = [
  {
    id: 1,
    title: "FinVis AI",
    description:
      "Engineered a full-stack financial analysis tool with a Python Flask backend, XGBoost ML model, and React frontend. Delivers real-time financial insights, using FinBERT NLP and Gemini LLM for explainable AI, and D3.js for interactive visualisations.",
    tags: ["Python", "Flask", "XGBoost", "React", "NLP", "Gemini LLM", "D3.js", "Explainable AI"],
    liveUrl: "#",
    repoUrl: "#",
    span: "md:col-span-1 lg:col-span-2",
    defaultIcon: <Brain size={24} />,
  },
  {
    id: 2,
    title: "Scheduler",
    description:
      "Developed a Python productivity app for 120+ academics, integrating timetabling, homework management, and transportation planning. Implemented a genetic algorithm with 98% scheduling accuracy.",
    tags: ["Python", "Genetic Algorithms", "Productivity", "CRUD"],
    liveUrl: "#",
    repoUrl: "#",
    span: "md:col-span-1",
    defaultIcon: <CalendarCheck size={24} />,
  },
  {
    id: 3,
    title: "UAV TSP",
    description:
      "Java-based backend optimiser for UAV route planning using the HyFlex hyper-heuristic framework for dynamic TSP. Implemented metaheuristic operators like PMX, Adjacent Swap, and Davis Hill Climbing.",
    tags: ["Java", "HyFlex", "Metaheuristics", "TSP", "Optimization", "UAV"],
    liveUrl: null,
    repoUrl: "#",
    span: "md:col-span-1",
    defaultIcon: <Route size={24} />,
  },
  {
    id: 4,
    title: "TCP/IP Dijkstra's",
    description:
      "Lightweight TCP/IP client-server system in ANSI C implementing Dijkstra's Algorithm for shortest-path routing (avg. 0.05s for 100 nodes). Designed dynamic, memory-optimised architectures.",
    tags: ["ANSI C", "TCP/IP", "Dijkstra's Algorithm", "Networking", "Systems Programming"],
    liveUrl: null,
    repoUrl: "#",
    span: "md:col-span-2 lg:col-span-4",
    defaultIcon: <Network size={24} />,
  },
];

// Consistent style for all project cards
const projectCardStyle = {
  bg: "bg-emerald-800/70",
  text: "text-lime-300",
  icon: "text-lime-400",
  linkText: "text-lime-400",
  linkHoverBg: "hover:bg-black/30",
  subtleBorder: "border-white/10",
  hoverBorder: "hover:border-lime-500/60",
  hoverShadow: "hover:shadow-lime-600/20",
};

// --- Project Card Component ---
const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const currentCardStyle = projectCardStyle;

  const cardClassName = clsx(
    "group",
    "relative",
    "rounded-xl",
    "shadow-xl",
    "overflow-hidden",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "transform",
    "hover:-translate-y-1",
    "hover:scale-[1.015]",
    "p-6",
    "flex",
    "flex-col",
    "justify-between",
    "h-full",
    "border",
    project.span,
    currentCardStyle.bg,
    currentCardStyle.subtleBorder,
    currentCardStyle.hoverBorder,
    currentCardStyle.hoverShadow
  );

  return (
    <div className={cardClassName}>
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-[0.15] transition-opacity duration-300 -z-10"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <div>
        <div className="flex items-center mb-3">
          {/* This line should now be error-free */}
          {React.cloneElement(project.defaultIcon, { className: currentCardStyle.icon, size: 22 })}
          <h3 className={clsx("ml-3 text-xl lg:text-2xl font-bold", currentCardStyle.text)}>
            {project.title}
          </h3>
        </div>
        <p className="text-gray-300/90 text-sm mb-4 leading-relaxed min-h-[60px] lg:min-h-[80px]">
          {project.description}
        </p>
        <div className="mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-black/40 backdrop-blur-sm text-gray-200 text-xs px-3 py-1 rounded-full mr-1.5 mb-1.5 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "flex items-center space-x-3 mt-auto pt-4 border-t",
          currentCardStyle.subtleBorder
        )}
      >
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg",
              currentCardStyle.linkText,
              currentCardStyle.linkHoverBg
            )}
            title="View Code Repository"
          >
            <Github size={16} className="mr-1.5" /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg",
              currentCardStyle.linkText,
              currentCardStyle.linkHoverBg
            )}
            title="View Live Demo"
          >
            <ExternalLink size={16} className="mr-1.5" /> Live
          </a>
        )}
      </div>
    </div>
  );
};

// --- Main Projects Component ---
const Projects: FC = () => {
  const sectionTitleFrom = "from-green-400";
  const sectionTitleVia = "via-lime-400";
  const sectionTitleTo = "to-emerald-500";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 text-left">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r ${sectionTitleFrom} ${sectionTitleVia} ${sectionTitleTo} text-center`}
      >
        My Personal Projects
      </h2>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(420px,_auto)]">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

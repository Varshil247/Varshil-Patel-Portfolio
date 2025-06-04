import React from "react";
import type { FC, ReactElement } from "react";
import { ExternalLink, Github, Brain, CalendarCheck, Route, Network } from "lucide-react";

// ! ----------------------------------------------------------------------------------------------

interface StylableIconProps {
  className?: string;
  size?: number | string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  span: string;
  defaultIcon: ReactElement<StylableIconProps>;
}

interface ProjectCardProps {
  project: Project;
}

// ! ----------------------------------------------------------------------------------------------

const projectsData: Project[] = [
  {
    id: 1,
    title: "FinVis AI",
    description:
      "Engineered a full-stack financial analysis tool with a Python Flask backend, XGBoost ML model, and React frontend. Delivers real-time financial insights, using FinBERT NLP and Gemini LLM for explainable AI, and D3.js for interactive visualisations.",
    tags: ["Python", "Flask", "XGBoost", "React", "NLP", "Gemini LLM", "D3.js", "Explainable AI"],
    liveUrl: "#", // Replace with actual URL
    repoUrl: "#", // Replace with actual URL
    span: "md:col-span-1 lg:col-span-1", // Example: make this one wider on lg
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
    span: "md:col-span-1 lg:col-span-1", // Example: make this one wider on lg
    defaultIcon: <Network size={24} />,
  },
];

// ! ----------------------------------------------------------------------------------------------

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={`grid grid-flow-col grid-rows-5 md:grid-rows-7 gap-3 p-6 border border-dark rounded-lg bg-light transition-all duration-300 ease-in-out hover:border-special hover:scale-105 ${project.span}`}
    >
      <div className="row-span-1 md:row-span-1 gap-3">
        <div className="flex flex-row gap-3 items-center">
          {React.cloneElement(project.defaultIcon, { className: "text-special", size: 24 })}
          <h3 className="text-lg font-semibold text-dark">{project.title}</h3>
        </div>
      </div>

      <div className="row-span-2 md:row-span-3">
        <p className="text-sm leading-relaxed text-dark">{project.description}</p>
      </div>

      <div className="row-span-1 md:row-span-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <div key={tag} className="text-xs px-3 py-1 rounded-full bg-regular text-dark">
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="row-span-1 md:row-span-1 flex flex-col gap-3">
        <div className="border-t border-regular" />
        <div className="flex flex-row items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-2 text-sm py-2 px-3.5 border border-special rounded-lg text-special transition-all duration-300 ease-in-out hover:bg-special hover:text-light"
            >
              <Github size={16} />
              <p>Code</p>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-2 text-sm py-2 px-3.5 border border-special rounded-lg text-special transition-all duration-300 ease-in-out hover:bg-special hover:text-light"
            >
              <ExternalLink size={16} />
              <p>Live</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ! ----------------------------------------------------------------------------------------------

const Projects: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full h-full p-6">
      <h2 className="italic text-3xl font-bebas font-extrabold text-special">Personal Projects</h2>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

// ! ----------------------------------------------------------------------------------------------

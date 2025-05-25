import React from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Code,
  Zap,
  Brain,
  CalendarCheck,
  Route,
  Network,
} from "lucide-react"; // Added more icons

// --- Project Data from CV ---
const projectsData = [
  {
    id: 1,
    title: "FinVis Al - ML Financial Analysis Tool",
    description:
      "Engineered a full-stack financial analysis tool with Python Flask backend, XGBoost ML model, and React frontend. Delivers real-time financial insights, using FinBERT NLP and Gemini LLM for explainable AI, and D3.js for interactive visualisations.",
    // imageUrl: "https://placehold.co/800x600/059669/e2e8f0?text=FinVis+AI", // Optional: Add specific image
    tags: ["Python", "Flask", "XGBoost", "React", "NLP", "Gemini LLM", "D3.js", "Explainable AI"],
    liveUrl: "#", // Replace with your live URL if available
    repoUrl: "#", // Replace with your repo URL
    span: "md:col-span-2", // This project will take up 2 columns on medium screens
    defaultIcon: <Brain size={24} />,
  },
  {
    id: 2,
    title: "Scheduler - Genetic Algorithm Productivity Manager",
    description:
      "Developed a Python productivity app for 120+ academics, integrating timetabling, homework management, and transportation planning. Implemented a genetic algorithm with 98% scheduling accuracy.",
    // imageUrl: "https://placehold.co/600x400/047857/e2e8f0?text=Scheduler+GA",
    tags: ["Python", "Genetic Algorithms", "Productivity", "CRUD"],
    liveUrl: "#",
    repoUrl: "#",
    span: "md:col-span-1",
    defaultIcon: <CalendarCheck size={24} />,
  },
  {
    id: 3,
    title: "Hyper-Heuristic Optimisation of UAV TSP",
    description:
      "Java-based backend optimiser for UAV route planning using HyFlex hyper-heuristic framework for dynamic TSP. Implemented metaheuristic operators like PMX, Adjacent Swap, and Davis Hill Climbing.",
    // imageUrl: "https://placehold.co/600x400/065f46/e2e8f0?text=UAV+TSP",
    tags: ["Java", "HyFlex", "Metaheuristics", "TSP", "Optimization", "UAV"],
    liveUrl: null, // No live URL mentioned
    repoUrl: "#",
    span: "md:col-span-1",
    defaultIcon: <Route size={24} />,
  },
  {
    id: 4,
    title: "TCP/IP Dijkstra's Algorithm",
    description:
      "Lightweight TCP/IP client-server system in ANSI C implementing Dijkstra's Algorithm for shortest-path routing (avg. 0.05s for 100 nodes). Designed dynamic, memory-optimised architectures.",
    // imageUrl: "https://placehold.co/800x600/027767/e2e8f0?text=TCP/IP+Dijkstra",
    tags: ["ANSI C", "TCP/IP", "Dijkstra's Algorithm", "Networking", "Systems Programming"],
    liveUrl: null,
    repoUrl: "#",
    span: "md:col-span-2",
    defaultIcon: <Network size={24} />,
  },
];

// --- Project Card Sub-component ---
const ProjectCard = ({ project, cardIndex }) => {
  // Hardcoded Green Theme Styles for Cards
  const cardStyles = [
    {
      bg: "bg-emerald-800/70",
      text: "text-lime-300",
      icon: "text-lime-400",
      linkText: "text-lime-400",
      linkHoverBg: "hover:bg-black/30",
      subtleBorder: "border-white/10",
      hoverBorder: "hover:border-lime-500/60",
      hoverShadow: "hover:shadow-lime-600/20",
    },
    {
      bg: "bg-green-800/70",
      text: "text-lime-200",
      icon: "text-lime-300",
      linkText: "text-lime-300",
      linkHoverBg: "hover:bg-black/40",
      subtleBorder: "border-white/10",
      hoverBorder: "hover:border-lime-400/60",
      hoverShadow: "hover:shadow-lime-500/20",
    },
  ];
  const currentCardStyle = cardStyles[cardIndex % cardStyles.length];

  return (
    <div
      className={`group relative rounded-xl shadow-xl overflow-hidden 
                  transition-all duration-300 ease-in-out 
                  transform hover:-translate-y-1 hover:scale-[1.015] 
                  ${project.span || ""} 
                  ${currentCardStyle.bg} 
                  p-6 flex flex-col justify-between h-full  // Added h-full, removed min-h-*
                  border border-transparent ${currentCardStyle.hoverBorder} ${
        currentCardStyle.hoverShadow
      }`}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-[0.15] transition-opacity duration-300 -z-10"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <div>
        <div className="flex items-center mb-3">
          {React.cloneElement(project.defaultIcon, { className: currentCardStyle.icon })}
          <h3 className={`ml-3 text-2xl font-bold ${currentCardStyle.text}`}>{project.title}</h3>
        </div>
        <p className="text-gray-300/90 text-sm mb-4 leading-relaxed min-h-[60px]">
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
        className={`flex items-center space-x-3 mt-auto pt-4 ${
          currentCardStyle.subtleBorder
            ? `border-t ${currentCardStyle.subtleBorder}`
            : "border-t border-transparent"
        }`}
      >
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg ${currentCardStyle.linkText} ${currentCardStyle.linkHoverBg}`}
            title="View Code Repository"
          >
            {" "}
            <Github size={16} className="mr-2" /> Code{" "}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg ${currentCardStyle.linkText} ${currentCardStyle.linkHoverBg}`}
            title="View Live Demo"
          >
            {" "}
            <ExternalLink size={16} className="mr-2" /> Live{" "}
          </a>
        )}
      </div>
    </div>
  );
};

// --- Main Projects Component ---
const Projects = () => {
  // Hardcoded Green Theme Section Title Colors
  const sectionTitleFrom = "from-green-400";
  const sectionTitleVia = "via-lime-400";
  const sectionTitleTo = "to-emerald-500";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 gap-6 md:gap-8 text-left">
      <h2
        className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${sectionTitleFrom} ${sectionTitleVia} ${sectionTitleTo} animate-gradient-x mb-10 md:mb-12 text-center`}
      >
        My Creative Works
      </h2>
      {/* Grid container width increased and auto-rows height increased */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(400px,_auto)]">
        {projectsData.map(
          (
            project,
            index // Pass index to ProjectCard
          ) => (
            <ProjectCard key={project.id} project={project} cardIndex={index} />
          )
        )}
      </div>
    </div>
  );
};
export default Projects;

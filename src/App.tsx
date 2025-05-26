import React, { useState, useEffect, useRef, type ReactNode } from "react";
import Home from "./components/Sections/Home";
import Projects from "./components/Sections/Projects";
// import Education from "./components/Sections/Education";
import Experience from "./components/Sections/Experience";

// ! ----------------------------------------------------------------------------------------------

// --- App Level Type Definitions ---
interface NavLink {
  id: string;
  label: string;
  content: ReactNode;
}

interface SectionTransform {
  rotateX: number;
  rotateY: number;
  scale: number;
}

// --- NavLinks Data (Updated as per user's snippet) ---
const navLinks: NavLink[] = [
  { id: "Home", label: "🏘️ Home", content: <Home /> }, // Changed from "About"
  { id: "Experience", label: "💼 Experience", content: <Experience /> },
  { id: "Projects", label: "⚒️ Projects", content: <Projects /> },
  // { id: "Education", label: "🎓 Education", content: <Education /> }, // Commented out
];

// --- App Component ---
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(navLinks[0].id);
  const [sectionTransforms, setSectionTransforms] = useState<SectionTransform[]>(
    navLinks.map(() => ({ rotateX: 0, rotateY: 0, scale: 1 }))
  );

  const mainRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<(React.RefObject<HTMLElement> | null)[]>(
    navLinks.map(() => React.createRef<HTMLElement>())
  );

  useEffect(() => {
    if (!mainRef.current) return;
    const mainElement = mainRef.current;
    mainElement.style.perspective = "1000px";

    const observerOptions: IntersectionObserverInit = {
      root: mainElement,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const intersectionCallback: IntersectionObserverCallback = (entries) => {
      let mostCenteredEntry: IntersectionObserverEntry | null = null;
      let maxIntersectionRatio = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostCenteredEntry = entry;
        }
      });
      if (mostCenteredEntry) {
        const activeId = mostCenteredEntry.target.id;
        setActiveSection(activeId);
        setSectionTransforms(() =>
          navLinks.map((link) => {
            if (link.id === activeId) return { rotateX: 0, rotateY: 0, scale: 1 };
            const activeIndex = navLinks.findIndex((n) => n.id === activeId);
            const currentIndex = navLinks.findIndex((n) => n.id === link.id);
            const isAbove = currentIndex < activeIndex;
            const maxRotateX = 3; // Updated as per user's snippet
            return { rotateX: isAbove ? -maxRotateX : maxRotateX, rotateY: 0, scale: 0.85 };
          })
        );
      }
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    const currentSectionRefs = sectionRefs.current;
    currentSectionRefs.forEach((ref) => ref?.current && observer.observe(ref.current));
    return () => {
      currentSectionRefs.forEach((ref) => ref?.current && observer.unobserve(ref.current));
      if (mainElement) {
        mainElement.style.perspective = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 font-sans overflow-hidden">
      <aside className="sticky top-0 left-0 md:h-screen w-full md:w-auto p-4 md:p-9 z-20 bg-slate-900/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none shadow-md md:shadow-none">
        <nav className="h-full w-full flex md:flex-col items-center justify-center">
          <ul className="flex flex-row md:flex-col justify-center gap-2 md:gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={`block font-semibold md:font-extrabold text-xs sm:text-sm md:text-lg p-2 md:p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-400
                    ${
                      activeSection === link.id
                        ? "text-white bg-gradient-to-r from-green-500 to-lime-500 shadow-lg"
                        : "text-gray-300 hover:text-lime-300"
                    }`}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    // Preserved smooth scroll logic
                    e.preventDefault();
                    const targetElement = document.getElementById(link.id);
                    if (targetElement && mainRef.current) {
                      const targetOffsetTopRelativeToMain =
                        targetElement.offsetTop - mainRef.current.offsetTop;
                      mainRef.current.scrollTo({
                        top: targetOffsetTopRelativeToMain,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        ref={mainRef}
        className="flex-1 flex flex-col items-center w-full h-full overflow-y-auto scroll-smooth scroll-snap-type-y-mandatory px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20 gap-8" // Updated padding
        style={{ transformStyle: "preserve-3d" }}
      >
        {navLinks.map((link, index) => {
          const transform = sectionTransforms[index];
          return (
            <section
              key={link.id}
              ref={sectionRefs.current[index]}
              // Updated section className as per user's snippet for this modification pass
              className="w-full min-h-full p-3 scroll-snap-align-start border border-lime-500/30 rounded-xl bg-black/30 shadow-2xl flex items-center justify-center"
              id={link.id}
              style={{
                transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
                transition: "transform 3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                transformOrigin: "center center",
              }}
            >
              {link.content}
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default App;

// ! ----------------------------------------------------------------------------------------------

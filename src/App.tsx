import React, { useState, useEffect, useRef } from "react";
import Home from "./components/Sections/Home";
import Projects from "./components/Sections/Projects";
import Education from "./components/Sections/Education";
import Experience from "./components/Sections/Experience";

const navLinks = [
  { id: "About", label: "🏘️ About Me", content: <Home /> },
  { id: "Experience", label: "💼 Experience", content: <Experience /> },
  { id: "Projects", label: "⚒️ Projects", content: <Projects /> },
  { id: "Education", label: "🎓 Education", content: <Education /> },
];

// ! --------------------------------------------------------------------------------------------

const App = () => {
  const [activeSection, setActiveSection] = useState(navLinks[0].id);
  const [sectionTransforms, setSectionTransforms] = useState(
    navLinks.map(() => ({ rotateX: 0, rotateY: 0, scale: 1 }))
  );

  const mainRef = useRef(null);
  const sectionRefs = useRef(navLinks.map(() => React.createRef()));

  // ! --------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!mainRef.current) return;

    const mainElement = mainRef.current;
    mainElement.style.perspective = "1000px";

    const observerOptions = {
      root: mainElement,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const intersectionCallback = (entries) => {
      let mostCenteredEntry = null;
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

        setSectionTransforms((prevTransforms) => {
          return navLinks.map((link) => {
            if (link.id === activeId) {
              return { rotateX: 0, rotateY: 0, scale: 1 };
            } else {
              const activeIndex = navLinks.findIndex((navLink) => navLink.id === activeId);
              const currentIndex = navLinks.findIndex((navLink) => navLink.id === link.id);
              const isAbove = currentIndex < activeIndex;
              const maxRotateX = 5;
              const minScale = 0.85;

              return {
                rotateX: isAbove ? -maxRotateX : maxRotateX,
                rotateY: 0,
                scale: minScale,
              };
            }
          });
        });
      }
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    const currentSectionRefs = sectionRefs.current;

    currentSectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      currentSectionRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
      if (mainElement) {
        mainElement.style.perspective = "";
      }
    };
  }, []);

  // ! --------------------------------------------------------------------------------------------

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
        className="flex-1 flex flex-col items-center w-full h-full overflow-y-auto scroll-smooth scroll-snap-type-y-mandatory py-20 pr-10 pl-0 gap-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {navLinks.map((link, index) => {
          const transform = sectionTransforms[index];
          return (
            <section
              key={link.id}
              ref={sectionRefs.current[index]}
              className="w-full min-h-[100%] p-3 scroll-snap-align-start border border-lime-500/30 rounded-xl bg-black/30 shadow-2xl flex items-center justify-center"
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

// ! --------------------------------------------------------------------------------------------

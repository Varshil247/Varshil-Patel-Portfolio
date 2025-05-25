import React, { useState, useEffect, useRef, useCallback } from "react";
import Home from "./components/Sections/Home";
import Projects from "./components/Sections/Projects";
// import Education from "./components/Sections/Education";
import Experience from "./components/Sections/Expereince";

const navLinks = [
  { id: "Home", label: "Home", content: <Home /> },
  { id: "Experience", label: "Experience", content: <Experience /> },
  { id: "Projects", label: "Projects", content: <Projects /> },
  // { id: "Educaton", label: "Education", content: <Education /> },
];

// ! --------------------------------------------------------------------------------------------

const App = () => {
  const [activeSection, setActiveSection] = useState(navLinks[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  const navListRef = useRef(null);
  const mainRef = useRef(null);
  const navItemRefs = useRef(navLinks.map(() => React.createRef()));
  const sectionRefs = useRef(navLinks.map(() => React.createRef()));

  // ! --------------------------------------------------------------------------------------------

  const updateIndicator = useCallback(() => {
    const activeIndex = navLinks.findIndex((link) => link.id === activeSection);
    if (activeIndex !== -1 && navItemRefs.current[activeIndex]?.current && navListRef.current) {
      const activeNavItem = navItemRefs.current[activeIndex].current;
      const topOffset = activeNavItem.offsetTop;

      setIndicatorStyle({
        top: topOffset,
        height: activeNavItem.offsetHeight,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
  }, [activeSection, updateIndicator]);

  // ! --------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!mainRef.current) return;

    const observerOptions = {
      root: mainRef.current,
      rootMargin: "0px 0px -45% 0px",
      threshold: 0.1,
    };

    const intersectionCallback = (entries) => {
      const intersectingEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (intersectingEntries.length > 0) {
        setActiveSection(intersectingEntries[0].target.id);
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
    };
  }, []);

  // ! --------------------------------------------------------------------------------------------

  const handleNavLinkClick = (sectionId, event) => {
    event.preventDefault();
    const targetSection = sectionRefs.current.find((ref) => ref.current?.id === sectionId)?.current;

    if (targetSection && mainRef.current) {
      mainRef.current.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // ! --------------------------------------------------------------------------------------------

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-emerald-900 to-green-900">
      <aside className="sticky h-screen w-auto p-5 z-20 flex-shrink-0">
        <nav className="h-full w-full flex">
          <ul ref={navListRef} className="relative flex flex-col justify-center items-center gap-3">
            <div
              className="absolute left-0 w-full h-full rounded-md bg-gradient-to-r from-green-600 to-lime-600 shadow-lg transition-all duration-300 ease-in-out pointer-events-none -z-10"
              style={{
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
                filter: "blur(2px)",
              }}
            />

            {navLinks.map((link, index) => (
              <li key={link.id} ref={navItemRefs.current[index]}>
                <a
                  className={`block font-extrabold text-2xl p-3 rounded-md transition-all duration-300 ease-in-out transform
                    ${
                      activeSection === link.id ? "text-white" : "text-gray-400 hover:text-lime-600"
                    }`}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavLinkClick(link.id, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main ref={mainRef} className="flex flex-col w-full min-h-[100vh] overflow-y-auto scroll-smooth">
        {navLinks.map((link, index) => (
          <section
            key={link.id}
            ref={sectionRefs.current[index]}
            className="w-full min-h-screen p-5 snap-start"
            id={link.id}
          >
            {link.content}
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;

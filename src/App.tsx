import React, { useState, useEffect, useRef, type JSX } from "react";
import Home from "./components/Sections/Home";
import Projects from "./components/Sections/Projects";
import Education from "./components/Sections/Education";
import Experience from "./components/Sections/Experience";
import { Signature, Briefcase, Presentation, GraduationCap } from "lucide-react";
import ThemeToggleAnimated from "./components/UI/ThemeSelector";

// ! ----------------------------------------------------------------------------------------------

export interface NavLink {
  id: string;
  icon: JSX.Element;
  label: string;
  content: JSX.Element;
}

interface SectionTransform {
  rotateX: number;
  rotateY: number;
  scale: number;
}

// ! ----------------------------------------------------------------------------------------------

const navLinks: NavLink[] = [
  {
    id: "About",
    icon: <Signature size={24} strokeWidth={1.5} />,
    label: "About",
    content: <Home />,
  },
  {
    id: "Experience",
    icon: <Briefcase size={24} strokeWidth={1.5} />,
    label: "Experience",
    content: <Experience />,
  },
  {
    id: "Projects",
    icon: <Presentation size={24} strokeWidth={1.5} />,
    label: "Projects",
    content: <Projects />,
  },
  {
    id: "Education",
    icon: <GraduationCap size={24} strokeWidth={1.5} />,
    label: "Education",
    content: <Education />,
  },
];

// ! ----------------------------------------------------------------------------------------------

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(navLinks[0].id);
  const [sectionTransforms, setSectionTransforms] = useState<SectionTransform[]>(
    navLinks.map(() => ({ rotateX: 0, rotateY: 0, scale: 1 }))
  );

  const mainRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // ! ----------------------------------------------------------------------------------------------

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setCurrentTheme(selectedTheme);
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    let initialThemeToApply: "light" | "dark";

    if (savedTheme) {
      initialThemeToApply = savedTheme;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialThemeToApply = prefersDark ? "dark" : "light";
    }

    handleThemeChange(initialThemeToApply);
    if (initialThemeToApply === "light" && !document.documentElement.classList.contains("light")) {
      document.documentElement.classList.add("light");
    } else if (
      initialThemeToApply === "dark" &&
      !document.documentElement.classList.contains("dark")
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ! ----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!mainRef.current) return;
    const mainElement = mainRef.current;
    mainElement.style.perspective = "1000px";

    const observerOptions: IntersectionObserverInit = {
      root: mainElement,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let activeId: string | null = null;

      entries.forEach((entry) => {
        const id = (entry.target as Element).id;
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio && id) {
          maxRatio = entry.intersectionRatio;
          activeId = id;
        }
      });

      if (activeId) {
        const index = navLinks.findIndex((link) => link.id === activeId);
        if (index !== -1) {
          setActiveSection(activeId);

          setSectionTransforms(() =>
            navLinks.map((_, i) => {
              if (i === index) return { rotateX: 0, rotateY: 0, scale: 1 };
              const isAbove = i < index;
              const maxRotateX = 3;
              return {
                rotateX: isAbove ? -maxRotateX : maxRotateX,
                rotateY: 0,
                scale: 0.85,
              };
            })
          );
        }
      }
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    const currentSectionRefs = sectionRefs.current;

    currentSectionRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentSectionRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (mainElement) {
        mainElement.style.perspective = "";
      }
    };
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    const targetSection = sectionRefs.current[index];
    if (targetSection && mainRef.current) {
      const sectionTop = targetSection.offsetTop - mainRef.current.offsetTop;
      mainRef.current.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
      setActiveSection(navLinks[index].id);
    }
  };

  // ! ----------------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col w-screen h-screen p-6 gap-6 bg-dark md:flex-row">
      <aside className="sticky top-0 left-0 w-full p-3 z-50 bg-light rounded-md shadow-lg md:w-auto md:h-full">
        <nav className="flex flex-row items-center justify-between w-full md:flex-col md:h-full">
          <ul className="flex flex-row justify-center gap-3 md:flex-col">
            {navLinks.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollToSection(e, index)}
                  className={`flex flex-row items-end gap-3 p-2 font-light rounded-md transition-all duration-700 ease-in-out transform hover:scale-105
                  ${
                    activeSection === link.id
                      ? "text-light bg-special"
                      : "text-dark hover:text-light hover:bg-regular"
                  }`}
                >
                  <div>{link.icon}</div>
                  <div className="hidden md:contents">{link.label}</div>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-row items-center justify-center gap-3 md:flex-col md:w-full">
            {/* <div className="flex p-1 border border-dark rounded-lg md:w-full shadow-sm">
              <button
                title="Contact Me"
                aria-label="Contact Me"
                className="flex flex-1 items-center justify-center gap-2 p-1.5 w-full rounded-md text-regular hover:bg-special hover:text-light transition-colors duration-200 ease-in-out"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <p className="text-xs font-light hidden md:contents">Contact me</p>
              </button>
            </div> */}
            <ThemeToggleAnimated theme={currentTheme} handleThemeChange={handleThemeChange} />
          </div>
        </nav>
      </aside>

      <main
        ref={mainRef}
        className="flex flex-col gap-9 w-full h-full rounded-md overflow-y-auto scroll-smooth scroll-snap-type-y-mandatory"
      >
        {navLinks.map((link, index) => {
          const transform = sectionTransforms[index] || { rotateX: 0, rotateY: 0, scale: 1 };
          return (
            <section
              key={link.id}
              ref={(element) => {
                sectionRefs.current[index] = element;
              }}
              className="flex flex-col items-center justify-center w-full h-fit rounded-md bg-light shadow-lg scroll-snap-align-start"
              id={link.id}
              style={{
                transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
                transition: "transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
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

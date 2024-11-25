import React, { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";

import { personalData } from "../personalData";

const textcolor = personalData?.TextColor?? "indigo";
const bgcolor = personalData?.BackgroundColor?? "indigo";

import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

const Section = ({ name, component: Component }) => {
  const [ref, inView] = useInView({
    threshold: 0.3, // Adjust this value to change when a section is considered in view
  });

  return (
    <div ref={ref} id={name.toLowerCase()} className="min-h-screen">
      <Component />
    </div>
  );
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "Experience", component: Experience },
    { name: "Skills", component: Skills },
    { name: "Projects", component: Projects },
    { name: "Contact", component: Contact },
  ];

  useEffect(() => {
    const observers = sections.map(({ name }) => {
      const element = document.getElementById(name.toLowerCase());
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(name.toLowerCase());
          }
        },
        { threshold: 0.3 } // Adjust this value to change when a section is considered in view
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-10 backdrop-blur-[2px] text-white">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold"></div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <ul className={`md:flex ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 md:top-auto bg-gray-900 md:bg-transparent`}>
            {sections.map(({ name }) => (
              <li key={name} className="md:ml-6">
                <Link
                  to={name.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`block py-2 px-4 cursor-pointer transition-colors duration-300 hover:text-${textcolor}-500 ${activeSection === name.toLowerCase() ? `text-${textcolor}-500` : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        {sections.map((section) => (
          <Section key={section.name} {...section} />
        ))}
      </main>
    </div>
  );
}

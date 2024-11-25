import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import { personalData } from "../personalData";

const textcolor = personalData?.TextColor?? "indigo";
const bgcolor = personalData?.BackgroundColor?? "indigo";

function Projects() {
  const projects = personalData?.ProjectsData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const controls = useAnimation();

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleProjects = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  const shouldAutoScroll = projects.length > (windowWidth >= 1024 ? 3 : 1);

  const extendedProjects = [...projects, ...projects.slice(0, visibleProjects - 1)];

  useEffect(() => {
    if (shouldAutoScroll) {
      const autoScroll = setInterval(() => {
        if (!isDragging) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        }
      }, 3000);

      return () => clearInterval(autoScroll);
    }
  }, [isDragging, projects.length, shouldAutoScroll]);

  useEffect(() => {
    controls.start({ x: `-${currentIndex * (100 / visibleProjects)}%` });
  }, [currentIndex, controls, visibleProjects]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX || e.touches[0].clientX;
    const diff = dragStart - currentPosition;
    setDragOffset(diff);

    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + direction;
        if (newIndex < 0) newIndex = projects.length - 1;
        if (newIndex >= projects.length) newIndex = 0;
        return newIndex;
      });
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      name="projects"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url('https://res.cloudinary.com/navcloudin/image/upload/v1732435362/BG-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-7xl px-4 py-12">
        <h2 className={`text-4xl font-bold mb-12 text-center text-indigo-400`}>Projects</h2>
        <div
          ref={carouselRef}
          className="relative overflow-hidden"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <motion.div className="flex" animate={controls} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ x: dragOffset }}>
            {extendedProjects.map((project, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 p-4 ${visibleProjects === 3 ? "w-1/3" : visibleProjects === 2 ? "w-1/2" : "w-full"}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full">
                  <img src={project.image} alt={project.name} className="w-full h-64 aspect-auto object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.name}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex space-x-4">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`text-indigo-500 hover:text-indigo-400 transition-colors flex items-center`}>
                        <FaGithub className="mr-2" />
                        GitHub
                      </a>
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={`text-indigo-500 hover:text-indigo-400 transition-colors flex items-center`}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {shouldAutoScroll && (
          <div className="flex justify-center mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${index === currentIndex ? `bg-indigo-500` : "bg-gray-400"}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;

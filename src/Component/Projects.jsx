import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { SiBlockchaindotcom, SiUnrealengine } from "react-icons/si";
import { projects } from "../data";

gsap.registerPlugin(ScrollTrigger);

// Project categories
const CATEGORIES = {
  ALL: "all",
  WEB: "web",
  BLOCKCHAIN: "blockchain",
  GAME: "game",
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.ALL);
  const [hoveredProject, setHoveredProject] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const projectRefs = useRef([]);

  // Filter projects based on category
  const filteredProjects =
    activeCategory === CATEGORIES.ALL
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Initial animations
  useGSAP(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Filters animation
    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Projects stagger animation
    gsap.fromTo(
      projectRefs.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Category change animation
  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;

    const tl = gsap.timeline();

    // Fade out current projects
    tl.to(projectRefs.current, {
      opacity: 0,
      y: -30,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    })
      .call(() => setActiveCategory(category))
      .to(projectRefs.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case CATEGORIES.WEB:
        return <BiWorld size={20} />;
      case CATEGORIES.BLOCKCHAIN:
        return <SiBlockchaindotcom size={20} />;
      case CATEGORIES.GAME:
        return <SiUnrealengine size={20} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-40 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto">
        <p className="text-blue-400 uppercase tracking-widest text-sm mb-4 font-semibold">
          My Work
        </p>
        <div ref={titleRef}>
          <AnimatedTitle
            title="Featured Projects"
            containerClass="text-center uppercase"
          />
        </div>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-3 md:mx-auto">
          A showcase of my web applications, blockchain projects, and game
          development work
        </p>
      </div>

      {/* Category Filters */}
      <div
        ref={filtersRef}
        className="relative z-10 flex flex-wrap justify-center gap-4 mb-16"
      >
        {Object.values(CATEGORIES).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category !== CATEGORIES.ALL && getCategoryIcon(category)}
            <span className="capitalize">{category}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 ${
              project.featured ? "md:col-span-2 lg:row-span-2" : ""
            }`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project Image */}
            <div className="relative overflow-hidden aspect-video bg-gray-900">
              {project.comingSoon && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm z-10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white bg-black/50 px-6 py-3 rounded-full border-2 border-white/30">
                    Coming Soon
                  </span>
                </div>
              )}
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext fill='%239CA3AF' font-family='Arial' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" +
                    project.title +
                    "%3C/text%3E%3C/svg%3E";
                }}
              />

              {/* Overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.category === CATEGORIES.WEB
                      ? "bg-blue-500/20 text-blue-400"
                      : project.category === CATEGORIES.BLOCKCHAIN
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-pink-500/20 text-pink-400"
                  }`}
                >
                  {getCategoryIcon(project.category)}
                  <span>{project.type}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No projects found in this category
          </p>
        </div>
      )}
    </section>
  );
};

export default Projects;

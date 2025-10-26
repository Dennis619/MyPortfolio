import React, { useState, useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { SiBlockchaindotcom, SiUnrealengine } from "react-icons/si";

const AnimatedTitle = ({ title, containerClass }) => (
  <h2 className={containerClass}>{title}</h2>
);

// Project categories
const CATEGORIES = {
  ALL: "all",
  WEB: "web",
  BLOCKCHAIN: "blockchain",
  GAME: "game",
};

const projects = [
  {
    id: 1,
    title: "JobsCorner.org",
    category: CATEGORIES.WEB,
    type: "Job Application Platform",
    description:
      "A comprehensive job application platform connecting job seekers with employers. Features include job listings, events listings, career tips and advanced search filters.",
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    image: "/projects/jobscorner.png",
    liveUrl: "https://jobscorner.org",
    githubUrl: "",
    featured: true,
    comingSoon: false,
  },
  {
    id: 2,
    title: "JS Collection",
    category: CATEGORIES.WEB,
    type: "E-Commerce Platform",
    description:
      "Modern e-commerce website for selling bags, table mats, and kitchen gloves etc. Built with WhatsApp integration, inventory management, and responsive design.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    image: "/projects/jscollection.png",
    liveUrl: "https://jscollection.co.ke",
    githubUrl: "",
    featured: false,
    comingSoon: false,
  },
  {
    id: 3,
    title: "IGA Accounting Firm",
    category: CATEGORIES.WEB,
    type: "Corporate Website",
    description:
      "Professional website for an accounting firm featuring service showcases, client testimonials, blog section, and contact forms with modern UI/UX design.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    image: "/projects/iga.png",
    liveUrl: "https://iga.co.ke",
    githubUrl: "",
    featured: false,
    comingSoon: false,
  },
  {
    id: 4,
    title: "DeFi Dashboard",
    category: CATEGORIES.BLOCKCHAIN,
    type: "Blockchain Application",
    description:
      "Decentralized finance dashboard for tracking crypto assets, staking rewards, and portfolio management. Built on Ethereum with smart contracts.",
    technologies: ["React", "Solidity", "Web3.js", "Ethers"],
    image: "/projects/defi-dashboard.jpg",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true,
  },
  {
    id: 5,
    title: "NFT Marketplace",
    category: CATEGORIES.BLOCKCHAIN,
    type: "Web3 Platform",
    description:
      "Decentralized NFT marketplace for buying, selling, and minting digital assets. Features include auction system, royalty distribution, and wallet integration.",
    technologies: ["React", "Motoko", "Internet Computer", "Web3"],
    image: "/projects/nft-marketplace.jpg",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true,
  },
  {
    id: 6,
    title: "Epic Adventure",
    category: CATEGORIES.GAME,
    type: "3D Action Game",
    description:
      "Immersive 3D action-adventure game with stunning environments, character progression, and engaging gameplay mechanics built in Unreal Engine 5.",
    technologies: ["Unreal Engine 5", "C++", "Blender"],
    image: "/projects/epic-adventure.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.ALL);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projectRefs = useRef([]);

  // Filter projects based on category
  const filteredProjects =
    activeCategory === CATEGORIES.ALL
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case CATEGORIES.WEB:
        return <BiWorld className="w-4 h-4 sm:w-5 sm:h-5" />;
      case CATEGORIES.BLOCKCHAIN:
        return <SiBlockchaindotcom className="w-4 h-4 sm:w-5 sm:h-5" />;
      case CATEGORIES.GAME:
        return <SiUnrealengine className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 md:top-40 right-4 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 md:bottom-40 left-4 md:left-20 w-56 h-56 md:w-80 md:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12 md:mb-16 text-center max-w-4xl mx-auto px-4">
        <p className="text-blue-400 uppercase tracking-widest text-xs sm:text-sm mb-3 md:mb-4 font-semibold">
          My Work
        </p>
        <AnimatedTitle
          title="Featured Projects"
          containerClass="text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        />
        <p className="mt-4 md:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
          A showcase of my web applications, blockchain projects, and game
          development work
        </p>
      </div>

      {/* Category Filters */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 md:mb-16 px-4">
        {Object.values(CATEGORIES).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
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
      <div className="projects-grid relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 ${
              project.featured ? "md:col-span-2 lg:row-span-2" : ""
            }`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project Image */}
            <div className="relative overflow-hidden aspect-video bg-gray-900">
              {project.comingSoon && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm z-10 flex items-center justify-center">
                  <span className="text-base sm:text-lg md:text-2xl font-bold text-white bg-black/50 px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-white/30">
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
                    encodeURIComponent(project.title) +
                    "%3C/text%3E%3C/svg%3E";
                }}
              />

              {/* Overlay on hover - Desktop only */}
              <div
                className={`hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${
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
            <div className="p-4 sm:p-5 md:p-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    project.category === CATEGORIES.WEB
                      ? "bg-blue-500/20 text-blue-400"
                      : project.category === CATEGORIES.BLOCKCHAIN
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-pink-500/20 text-pink-400"
                  }`}
                >
                  {getCategoryIcon(project.category)}
                  <span className="text-xs sm:text-sm">{project.type}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 md:mb-0">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="md:hidden flex gap-2 mt-4 pt-4 border-t border-gray-700">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <FaExternalLinkAlt size={14} />
                    <span>View Live</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 md:py-20">
          <p className="text-gray-500 text-base md:text-lg">
            No projects found in this category
          </p>
        </div>
      )}
    </section>
  );
};

export default Projects;

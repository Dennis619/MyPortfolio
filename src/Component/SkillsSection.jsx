import React, { useState } from "react";

const AnimatedTitle = ({ title, containerClass }) => (
  <h2 className={containerClass}>{title}</h2>
);

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Skills", color: "from-blue-500 to-purple-600" },
    { id: "frontend", label: "Frontend", color: "from-blue-500 to-cyan-500" },
    { id: "backend", label: "Backend", color: "from-green-500 to-emerald-600" },
    { id: "game", label: "Game Dev", color: "from-purple-500 to-pink-600" },
    {
      id: "blockchain",
      label: "Blockchain",
      color: "from-orange-500 to-red-600",
    },
    { id: "tools", label: "Tools & More", color: "from-gray-500 to-slate-600" },
  ];

  const skillsData = {
    frontend: [
      { name: "JavaScript (ES6+)", level: 95, icon: "⚡" },
      { name: "React.js", level: 92, icon: "⚛️" },
      { name: "Tailwind CSS", level: 90, icon: "💨" },
    ],
    backend: [
      { name: "Node.js & Express", level: 90, icon: "🟢" },
      { name: "PostgreSQL & MongoDB", level: 90, icon: "🐘" },
      { name: "RESTful API Design", level: 93, icon: "🔌" },
      { name: "Authentication & Security", level: 87, icon: "🔐" },
    ],
    game: [
      { name: "C++ (Unreal Engine)", level: 85, icon: "⚙️" },
      { name: "Unreal Engine 5", level: 88, icon: "🎮" },
      { name: "Blender", level: 82, icon: "🎭" },
    ],
    blockchain: [
      { name: "Solidity (Smart Contracts)", level: 78, icon: "⛓️" },
      { name: "Web3.js / Ethers.js", level: 80, icon: "🌐" },
    ],
    tools: [
      { name: "Git & GitHub", level: 95, icon: "📦" },
      { name: "ERPNext Customization", level: 85, icon: "📋" },
    ],
  };

  // Get filtered skills
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return Object.entries(skillsData).flatMap(([category, skills]) =>
        skills.map((skill) => ({ ...skill, category }))
      );
    }
    return skillsData[activeCategory].map((skill) => ({
      ...skill,
      category: activeCategory,
    }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section
      id="skills"
      className="min-h-screen w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 md:top-20 left-4 md:left-10 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-56 h-56 md:w-80 md:h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 md:mb-16 max-w-4xl px-4">
        <p className="text-blue-400 uppercase tracking-widest text-xs sm:text-sm mb-3 md:mb-4 font-semibold">
          Technical Expertise
        </p>
        <AnimatedTitle
          title="My Skills"
          containerClass="text-center uppercase text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        />
        <p className="mt-4 md:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency levels
          across different domains
        </p>
      </div>

      {/* Category Filters */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 px-4 max-w-5xl">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`group relative px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 overflow-hidden ${
              activeCategory === category.id
                ? "text-white scale-105"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                category.color
              } transition-opacity duration-300 ${
                activeCategory === category.id
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-50"
              }`}
            ></div>

            {/* Border */}
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? "border-transparent"
                  : "border-gray-700 group-hover:border-gray-600"
              }`}
            ></div>

            {/* Text */}
            <span className="relative z-10">{category.label}</span>

            {/* Glow effect */}
            {activeCategory === category.id && (
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} blur-xl opacity-50 -z-10`}
              ></div>
            )}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 px-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.category}-${skill.name}`}
            className="group animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-5 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">
                    {skill.icon}
                  </span>
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg truncate">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-blue-400 font-bold text-lg sm:text-xl flex-shrink-0 ml-2">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2.5 sm:h-3 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>

              {/* Skill level indicator */}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="relative z-10 mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl w-full px-4">
        {[
          {
            label: "Total Skills",
            value: Object.values(skillsData).flat().length,
            icon: "🎯",
          },
          {
            label: "Avg Proficiency",
            value: `${Math.round(
              Object.values(skillsData)
                .flat()
                .reduce((sum, s) => sum + s.level, 0) /
                Object.values(skillsData).flat().length
            )}%`,
            icon: "📊",
          },
          {
            label: "Categories",
            value: Object.keys(skillsData).length,
            icon: "📁",
          },
          {
            label: "Expert Level",
            value: Object.values(skillsData)
              .flat()
              .filter((s) => s.level >= 90).length,
            icon: "⭐",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;

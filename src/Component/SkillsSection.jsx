import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import { ScrollTrigger } from "gsap/all";
import { skillsData } from "../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const categoryRefs = useRef([]);
  const skillRefs = useRef([]);
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

  // Background color change animation
  useGSAP(() => {
    const section = sectionRef.current;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom top",
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: "#0f172a",
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to("body", {
          backgroundColor: "#000000",
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
    });
  }, []);

  // Initial entrance animations
  useGSAP(
    () => {
      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Categories animation
      gsap.fromTo(
        categoryRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        skillRefs.current,
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef } // ✅ Scoped animations for auto-cleanup
  );

  // Category change animation
  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;

    const tl = gsap.timeline();

    tl.to(skillRefs.current, {
      opacity: 0,
      x: -30,
      stagger: 0.02,
      duration: 0.3,
      ease: "power2.in",
    })
      .call(() => setActiveCategory(categoryId))
      .fromTo(
        skillRefs.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
        }
      );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen w-screen py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 max-w-4xl">
        <p
          ref={subtitleRef}
          className="text-blue-400 uppercase tracking-widest text-sm mb-4 font-semibold"
        >
          Technical Expertise
        </p>
        <div ref={titleRef}>
          <AnimatedTitle
            title="My Skills"
            containerClass="text-center uppercase !text-white"
          />
        </div>
        <p className="mt-6 text-gray-400 text-lg mx-3 md:mx-auto">
          A comprehensive overview of my technical skills and proficiency levels
          across different domains
        </p>
      </div>

      {/* Category Filters */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category, index) => (
          <button
            key={category.id}
            ref={(el) => (categoryRefs.current[index] = el)}
            onClick={() => handleCategoryChange(category.id)}
            className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
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
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.category}-${skill.name}`}
            ref={(el) => (skillRefs.current[index] = el)}
            className="group"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-white font-semibold text-lg">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-blue-400 font-bold text-xl">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
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
      <div className="relative z-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
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
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;

import React, { useState, useRef } from "react";
import { GoArrowRight } from "react-icons/go";
import { BsArrowLeft } from "react-icons/bs";

const AnimatedTitle = ({ title, containerClass }) => (
  <h2 className={containerClass}>{title}</h2>
);

const Services = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const cardsRef = useRef([]);

  const handleDiscoverButtonClick = (index) => {
    setClickedIndex((prev) => (prev === index ? null : index));
  };

  const services = [
    {
      title: "Full Stack Web Development",
      description:
        "Designing and building scalable, high-performance web applications using modern technologies like React, Node.js, Express, and PostgreSQL. I create responsive, optimized, and maintainable solutions for businesses and startups.",
    },
    {
      title: "UI/UX Design",
      description:
        "Crafting user-centered interfaces that balance aesthetics with usability. From wireframes to interactive prototypes, I deliver digital experiences that are visually engaging and easy to navigate.",
    },
    {
      title: "Game Development",
      description:
        "Developing immersive games using Unreal Engine 5 and C++. I integrate 3D assets, animations, AI systems, and gameplay mechanics to bring stories and interactive worlds to life.",
    },
    {
      title: "Blockchain & Web3 Integration",
      description:
        "Building decentralized apps (DApps) and smart contract systems using Solidity and Motoko. I specialize in integrating blockchain features such as tokenization, voting systems, and group wallets into modern applications.",
    },
    {
      title: "ERPNext Development",
      description:
        "Customizing and implementing ERPNext solutions to automate workflows, manage business operations, and integrate modules like accounting, HR, projects, and CRM for enhanced productivity.",
    },
    {
      title: "API Design & Integration",
      description:
        "Creating secure and efficient RESTful and GraphQL APIs for seamless communication between front-end and back-end systems, ensuring smooth data exchange and scalability.",
    },
    {
      title: "SEO & Performance Optimization",
      description:
        "Enhancing website visibility, accessibility, and speed through technical SEO strategies and performance tuning to achieve higher engagement and better user retention.",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen w-full flex items-center flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-4 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12 md:mb-16 text-center w-full max-w-4xl px-4">
        <p className="text-blue-400 uppercase tracking-widest text-xs sm:text-sm mb-3 md:mb-4 font-semibold">
          What I Offer
        </p>
        <AnimatedTitle
          title="Services"
          containerClass="text-center uppercase text-3xl sm:text-4xl md:text-5xl font-bold"
        />
        <p className="mt-4 md:mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
          Comprehensive solutions tailored to bring your vision to life with
          cutting-edge technology and creative expertise
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`service-card group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
              clickedIndex === index
                ? "border-blue-500 shadow-2xl shadow-blue-500/50 col-span-1 md:col-span-2 lg:col-span-3"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => handleDiscoverButtonClick(index)}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

            {/* Number badge */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
              <span className="text-blue-400 font-bold text-base md:text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Card content */}
            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Title section */}
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white pr-12 sm:pr-14 md:pr-16 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Brief description (always visible) */}
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 md:mb-4">
                {service.description.substring(0, 100)}...
              </p>

              {/* Discover button */}
              <div className="flex justify-end">
                <button
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                    clickedIndex === index
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDiscoverButtonClick(index);
                  }}
                >
                  {clickedIndex === index ? (
                    <>
                      <span>Close</span>
                      <BsArrowLeft size={18} className="md:w-5 md:h-5" />
                    </>
                  ) : (
                    <>
                      <span>Discover</span>
                      <GoArrowRight size={18} className="md:w-5 md:h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Expanded content */}
              {clickedIndex === index && (
                <div className="service-content mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-700 animate-fadeIn">
                  <div className="service-details">
                    {/* Full description */}
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-base md:text-lg font-semibold text-blue-400 mb-2 md:mb-3">
                        Overview
                      </h4>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Key features */}
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-base md:text-lg font-semibold text-blue-400 mb-2 md:mb-3">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                        {[
                          "High Performance",
                          "Scalable Architecture",
                          "Modern Technologies",
                          "Best Practices",
                        ].map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-300 text-sm md:text-base"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-12 md:mt-20 text-center text-gray-500 text-xs md:text-sm">
        <p>Scroll to explore more services</p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;

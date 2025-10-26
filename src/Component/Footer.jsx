import React, { useState } from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { homeData } from "../data";

const Footer = () => {
  const currentYear = () => new Date().getFullYear();
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    if (!target) return;

    const { left, top, width, height } = target.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 15;
    const tiltY = (relativeX - 0.5) * -15;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  const footerText = homeData[0]?.fName?.toUpperCase() || "PORTFOLIO";

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: homeData[0]?.facebook,
      color: "blue",
      name: "Facebook",
    },
    { icon: FaGithub, url: homeData[0]?.github, color: "gray", name: "GitHub" },
    {
      icon: FaInstagram,
      url: homeData[0]?.instagram,
      color: "pink",
      name: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      url: homeData[0]?.linkedIn,
      color: "blue",
      name: "LinkedIn",
    },
    { icon: FaXTwitter, url: homeData[0]?.x, color: "slate", name: "X" },
  ].filter((link) => link.url);

  return (
    <footer className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-12 sm:py-16 md:py-20 text-white">
      {/* Decorative animated elements - responsive sizes */}
      <div className="absolute top-6 sm:top-10 left-4 sm:left-10 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full mix-blend-overlay filter blur-2xl opacity-10 animate-float"></div>
      <div className="absolute top-10 sm:top-20 right-8 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-float-delayed"></div>
      <div className="absolute bottom-6 sm:bottom-10 left-1/4 w-22 h-22 sm:w-30 sm:h-30 md:w-36 md:h-36 bg-pink-400 rounded-full mix-blend-overlay filter blur-2xl opacity-10 animate-float-slow"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Footer name with 3D effect - responsive text */}
        <div
          className="flex justify-center gap-0.5 sm:gap-1 md:gap-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 sm:mb-8 cursor-pointer select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transformStyle,
            transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformStyle: "preserve-3d",
          }}
        >
          {footerText.split("").map((char, index) => (
            <span
              key={index}
              className="footer-letter inline-block animate-fadeInUp"
              style={{
                textShadow:
                  "0 5px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)",
                animationDelay: `${index * 50}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Divider line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 mb-6 sm:mb-8 animate-expandWidth"></div>

        {/* Social media icons - responsive sizing and spacing */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 px-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 animate-bounceIn"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={link.name}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Icon className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </a>
            );
          })}
        </div>

        {/* Copyright text - responsive sizing */}
        <div className="text-center animate-fadeIn px-4">
          <p className="text-xs sm:text-sm md:text-base font-light text-white/90 mb-1 sm:mb-2">
            &copy; {currentYear()} {homeData[0]?.fName || "Portfolio"}. All
            Rights Reserved
          </p>
          <p className="text-xs text-white/70">
            Crafted with passion and precision
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes expandWidth {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 0.3;
          }
        }

        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          60% {
            transform: scale(1.1) rotate(10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-expandWidth {
          animation: expandWidth 1.2s ease-out forwards;
        }

        .animate-bounceIn {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)
            forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out 0.8s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 4s ease-in-out infinite 0.3s;
        }

        .animate-float-slow {
          animation: float 5s ease-in-out infinite 0.6s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

import React, { useRef, useEffect } from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button";
import { homeData } from "../data";
import TitleAnimator from "./TitleAnimator";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const nameRef = useRef(null);
  const titleAnimatorRef = useRef(null);
  const socialLinksRef = useRef(null);
  const buttonRef = useRef(null);
  const imageContainerRef = useRef(null);
  const blobRef = useRef(null);
  const profileImageRef = useRef(null);

  const titles = [
    "Full Stack Developer",
    "Frontend Engineer (React.js)",
    "Backend Developer (Node.js / Express)",
    "UI/UX Designer",
    "Game Developer (Unreal Engine 5)",
    "Blockchain Enthusiast",
    "Software Tester",
    "Technical Problem Solver",
  ];

  // Initial page load animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set([headingRef.current, nameRef.current], {
      opacity: 0,
      y: 50,
    });
    gsap.set(titleAnimatorRef.current, {
      opacity: 0,
      y: 30,
    });
    gsap.set(socialLinksRef.current, {
      opacity: 0,
      y: 20,
    });
    gsap.set(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
    });
    gsap.set(blobRef.current, {
      scale: 0,
      rotation: -180,
    });
    gsap.set(profileImageRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    // Animate elements in sequence
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.4"
      )
      .to(
        titleAnimatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .to(
        socialLinksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        blobRef.current,
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=0.8"
      )
      .to(
        profileImageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.6"
      );

    // Continuous floating animation for blob
    gsap.to(blobRef.current, {
      y: "-=20",
      rotation: "+=5",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Subtle parallax on profile image
    gsap.to(profileImageRef.current, {
      y: "-=15",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  // Scroll-based animations
  useGSAP(() => {
    gsap.set("#HeroSection", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#HeroSection", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#HeroSection",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Fade out content on scroll
    gsap.to(".hero-content", {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: "#HeroSection",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Scale and fade image on scroll
    gsap.to(imageContainerRef.current, {
      scale: 1.2,
      opacity: 0.3,
      scrollTrigger: {
        trigger: "#HeroSection",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  const imageSrc = homeData[0].imageName
    ? `/${homeData[0].imageName}`
    : "/default-image.png";

  const resumeDoc = homeData[0].docName ? `/${homeData[0].docName}` : null;

  const handleResumeDownload = () => {
    if (!resumeDoc) {
      alert(
        "Resume not available. Please check that docName is set in homeData."
      );
      return;
    }

    const newWindow = window.open(resumeDoc, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      const link = document.createElement("a");
      link.href = resumeDoc;
      link.download = homeData[0].docName || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative z-10 h-dvh w-screen overflow-hidden"
    >
      <div
        id="HeroSection"
        className="relative grid grid-cols-1 md:grid-cols-2 h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 animate-pulse pointer-events-none"></div>

        {/* Content Section */}
        <div className="hero-content relative z-20 flex flex-col justify-center items-start px-8 md:px-16 lg:px-20 pt-20 md:pt-0">
          {/* Greeting */}
          <h2
            ref={headingRef}
            className="font-general text-lg md:text-xl tracking-wider mb-4 text-blue-400"
          >
            Hi, I'm
          </h2>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-maleha text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {homeData[0].fName}
            </span>
            <br />
            <span className="text-white">{homeData[0].lName}</span>
          </h1>

          {/* Animated Titles */}
          <div
            ref={titleAnimatorRef}
            className="relative overflow-hidden h-16 md:h-20 mb-8"
          >
            <TitleAnimator titles={titles} />
          </div>

          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>

          {/* Social Links */}
          <div ref={socialLinksRef} className="flex gap-4 md:gap-5 mb-10">
            {homeData[0].facebook && (
              <a
                href={homeData[0].facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white hover:text-blue-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                <FaFacebookF size={32} className="relative z-10" />
              </a>
            )}
            {homeData[0].github && (
              <a
                href={homeData[0].github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white hover:text-purple-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                <FaGithub size={32} className="relative z-10" />
              </a>
            )}
            {homeData[0].instagram && (
              <a
                href={homeData[0].instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white hover:text-pink-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-pink-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                <FaInstagram size={32} className="relative z-10" />
              </a>
            )}
            {homeData[0].linkedIn && (
              <a
                href={homeData[0].linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white hover:text-blue-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                <FaLinkedinIn size={32} className="relative z-10" />
              </a>
            )}
            {homeData[0].x && (
              <a
                href={homeData[0].x}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white hover:text-gray-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gray-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                <FaXTwitter size={32} className="relative z-10" />
              </a>
            )}
          </div>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <Button
              id="download-resume"
              title="Download Resume"
              containerClass="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-center gap-2 px-8 py-4 rounded-full shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300"
              onClick={handleResumeDownload}
            />
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imageContainerRef}
          className="relative w-full h-full flex justify-center items-center"
        >
          {/* Animated blob background */}
          <img
            ref={blobRef}
            className="absolute w-[90%] md:w-[85%] lg:w-[75%] object-contain z-0 opacity-80"
            src="/blob.png"
            alt="Background blob"
          />

          {/* Glowing effect behind image */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-96 h-96 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Profile Image */}
          <div className="absolute inset-0 z-10 flex justify-center items-center w-full h-full">
            <img
              ref={profileImageRef}
              src={imageSrc}
              alt="Profile"
              className="w-3/4 md:w-[85%] lg:w-[70%] object-contain mask-fade-bottom drop-shadow-2xl"
            />
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh)
              translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// AnimatedTitle Component
const AnimatedTitle = ({ title, containerClass }) => {
  return (
    <div className={containerClass}>
      <h1>{title}</h1>
    </div>
  );
};

const About = () => {
  const aboutContentRef = useRef(null);
  const clipPathRef = useRef(null);
  const paragraphsRef = useRef([]);
  const highlightsRef = useRef([]);
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(
    () => {
      // ✅ Kill any existing ScrollTriggers before creating new ones
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clip path animation
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: isMobile ? "top top" : "center center",
          end: isMobile ? "+=1200 top" : "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });

      // Content animation
      const contentAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: isMobile ? "top top" : "center center",
          end: isMobile ? "+=1200 top" : "+=800 center",
          scrub: 0.8,
        },
      });

      contentAnimation
        .to(aboutContentRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
        })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
          },
          "-=0.1"
        )
        .to(
          paragraphsRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.3,
          },
          "-=0.1"
        )
        .to(
          highlightsRef.current,
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.2,
          },
          "-=0.2"
        );

      // Image zoom animation
      gsap.to(".about-image img", {
        scale: 1.1,
        scrollTrigger: {
          trigger: "#clip",
          start: isMobile ? "top top" : "center center",
          end: isMobile ? "+=1200 top" : "+=800 center",
          scrub: 1,
        },
      });

      // ✅ Cleanup handled automatically by useGSAP
    },
    { dependencies: [isMobile] } // equivalent to useEffect deps
  );

  const highlights = [
    "Boosted application speed by 30% and reduced load times by 20%",
    "Increased UI satisfaction by 75% through intuitive interface design",
    "Built ERP systems that cut manual workloads by 25%",
    "Reduced bug reports by 40% through reusable, well-tested components",
    "Scaled backend APIs to handle 50% more user activity without downtime",
    "Improved defect detection by 30% during manual QA testing",
  ];

  return (
    <div
      id="about"
      className="min-h-screen w-full bg-white text-black overflow-hidden"
    >
      {/* Header Section */}
      <div className="relative mb-8 mt-24 md:mt-36 flex flex-col items-center px-4 text-center">
        <h2 className="font-sans text-xs md:text-sm uppercase tracking-wider">
          Welcome to my Portfolio
        </h2>

        <AnimatedTitle
          title="About Me"
          containerClass="mt-5 !text-black text-center uppercase text-3xl md:text-5xl font-bold"
        />

        <div className="about-subtext mt-2 text-gray-600 text-sm md:text-base">
          <p>Scroll to learn more about me</p>
        </div>
      </div>

      {/* Main Section */}
      <div
        className="relative flex justify-center items-center w-full min-h-screen"
        id="clip"
      >
        {/* Background Image */}
        <div
          className="mask-clip-path about-image border-2 border-black overflow-hidden rounded-2xl w-[90%] sm:w-[85%] md:w-[70%] max-w-5xl aspect-[4/3] md:aspect-video"
          ref={clipPathRef}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/about-bg.webp`}
            alt="Background"
            className="absolute left-0 top-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div
          ref={aboutContentRef}
          className="absolute z-20 text-left bg-white/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg w-[90%] sm:w-[85%] md:w-[80%] max-w-4xl mx-4 opacity-0 scale-90 transform max-h-[85vh] overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3b82f6 #e5e7eb",
          }}
        >
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-10 text-center md:text-left opacity-0 translate-y-8"
          >
            About Me
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
            <p
              ref={(el) => (paragraphsRef.current[0] = el)}
              className="opacity-0 translate-y-4"
            >
              My journey into tech began as a{" "}
              <span className="font-semibold">3D artist</span>, creating
              environments, vehicles, and characters with a dream to build my
              own game one day. That passion led me to pursue a degree in{" "}
              <span className="font-semibold">Applied Computer Technology</span>
              , where I transitioned into full-stack development and discovered
              the power of turning creative ideas into scalable, real-world
              applications.
            </p>

            <p
              ref={(el) => (paragraphsRef.current[1] = el)}
              className="opacity-0 translate-y-4"
            >
              Over the years, I've mastered modern web development using{" "}
              <span className="font-semibold">
                React, Node.js, MongoDB, and PostgreSQL
              </span>
              , while refining my 3D and game dev skills with{" "}
              <span className="font-semibold">
                Blender, Unreal Engine, and C++
              </span>
              . I've also explored{" "}
              <span className="font-semibold">blockchain technologies</span>,
              developing{" "}
              <span className="font-semibold">
                smart contracts, decentralized apps (dApps), and Web3
                integrations
              </span>{" "}
              using Solidity, IPFS, and the Polygon network.
            </p>

            <p
              ref={(el) => (paragraphsRef.current[2] = el)}
              className="opacity-0 translate-y-4"
            >
              Today, I work as a{" "}
              <span className="font-semibold">
                Full Stack Developer, Game Developer, and Blockchain Enthusiast
              </span>
              , blending artistic vision with engineering precision. I've built
              ERP systems, mobile games, and blockchain-based platforms—always
              focused on delivering clean, efficient, and user-centered
              solutions.
            </p>
          </div>

          {/* Highlights */}
          <div
            ref={(el) => (paragraphsRef.current[3] = el)}
            className="mt-8 md:mt-12 opacity-0 translate-y-4"
          >
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6">
              Key Highlights
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  ref={(el) => (highlightsRef.current[index] = el)}
                  className="flex items-start gap-3 opacity-0 -translate-x-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2"></div>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extra space for smooth scrolling */}
      <div className="h-20 md:h-32"></div>
    </div>
  );
};

export default About;

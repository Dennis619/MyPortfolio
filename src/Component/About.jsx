import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutContentRef = useRef(null);
  const clipPathRef = useRef(null);
  const paragraphsRef = useRef([]);
  const highlightsRef = useRef([]);
  const headingRef = useRef(null);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    const contentAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
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

    gsap.to(".about-image img", {
      scale: 1.1,
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 1,
      },
    });
  }, []);

  const highlights = [
    "Boosted application speed by 30% and reduced load times by 20%",
    "Increased UI satisfaction by 75% through intuitive interface design",
    "Built ERP systems that cut manual workloads by 25%",
    "Reduced bug reports by 40% through reusable, well-tested components",
    "Scaled backend APIs to handle 50% more user activity without downtime",
    "Improved defect detection by 30% during manual QA testing",
  ];

  return (
    <div id="about" className="min-h-screen w-screen bg-white-100 text-black">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to my Portfolio
        </h2>

        <AnimatedTitle
          title="About Me"
          containerClass="mt-5 !text-black text-center uppercase"
        />

        <div className="about-subtext">
          <p>Scroll to learn more about me</p>
        </div>
      </div>

      <div
        className="h-dvh w-screen flex justify-center items-center"
        id="clip"
      >
        <div
          className="mask-clip-path about-image border-2 border-black overflow-hidden"
          ref={clipPathRef}
        >
          <img
            src="img/about-bg.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>

        <div
          ref={aboutContentRef}
          className="about-me-content absolute z-20 px-6 md:px-16 py-20 lg:px-24 opacity-0 scale-90 transform max-w-6xl"
        >
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-zentry text-5xl md:text-6xl lg:text-7xl mb-8 opacity-0 translate-y-8"
          >
            About Me
          </h2>

          {/* Introduction Paragraph */}
          <div className="space-y-3 text-base md:text-lg leading-relaxed">
            <p
              ref={(el) => (paragraphsRef.current[0] = el)}
              className="opacity-0 translate-y-4"
            >
              My journey into tech began as a{" "}
              <span className="font-semibold text-blue-600">3D artist</span>,
              creating environments, vehicles, and characters with a dream to
              build my own game one day. That passion led me to pursue a degree
              in{" "}
              <span className="font-semibold">Applied Computer Technology</span>
              , where I transitioned into full-stack development and discovered
              the power of turning creative ideas into scalable, real-world
              applications.
            </p>

            <p
              ref={(el) => (paragraphsRef.current[1] = el)}
              className="opacity-0 translate-y-4"
            >
              Over the years, I've mastered building modern web applications
              using{" "}
              <span className="font-semibold text-blue-600">
                React, Node.js, MongoDb, and PostgreSQL
              </span>
              , while refining my 3D and game development skills with{" "}
              <span className="font-semibold text-blue-600">
                Blender, Unreal Engine, and C++
              </span>
              . More recently, I’ve expanded into{" "}
              <span className="font-semibold text-blue-600">
                blockchain technologies
              </span>
              , developing{" "}
              <span className="font-semibold">
                smart contracts, decentralized apps (dApps), and Web3
                integrations
              </span>{" "}
              using Solidity, IPFS, and the Polygon network. This mix of visual
              design, coding, and blockchain innovation allows me to craft
              secure, performant, and immersive digital experiences.
            </p>

            <p
              ref={(el) => (paragraphsRef.current[2] = el)}
              className="opacity-0 translate-y-4"
            >
              Today, I work as a{" "}
              <span className="font-semibold text-blue-600">
                Full Stack Developer, Game Developer, and Blockchain Enthusiast
              </span>
              , blending artistic vision with engineering precision. I’ve
              contributed to projects ranging from ERP systems and enterprise
              platforms to mobile games, blockchain-based communities, and
              interactive websites—always focused on delivering clean,
              efficient, and user-centered solutions.
            </p>
          </div>

          {/* Key Highlights Section */}
          <div
            ref={(el) => (paragraphsRef.current[3] = el)}
            className="mt-10 opacity-0 translate-y-4"
          >
            <h3 className="font-zentry text-2xl md:text-3xl mb-6 text-blue-600">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  ref={(el) => (highlightsRef.current[index] = el)}
                  className="flex items-start gap-3 opacity-0 -translate-x-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-sm md:text-base leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

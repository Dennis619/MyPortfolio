import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { homeData } from "../data";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = () => new Date().getFullYear();
  const footerRef = useRef(null);
  const socialLinksRef = useRef(null);
  const footerWordRef = useRef(null);
  const copyrightRef = useRef(null);
  const dividerRef = useRef(null);
  const decorElementsRef = useRef([]);

  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) => {
    if (!footerWordRef.current) return;

    const { left, top, width, height } =
      footerWordRef.current.getBoundingClientRect();

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer name letters
      const letters = footerRef.current.querySelectorAll(".footer-letter");
      gsap.fromTo(
        letters,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate divider line
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate social icons with bounce effect
      const socialIcons = socialLinksRef.current.querySelectorAll("a");
      gsap.fromTo(
        socialIcons,
        {
          y: 50,
          opacity: 0,
          scale: 0,
          rotation: -180,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialLinksRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate copyright text
      gsap.fromTo(
        copyrightRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate decorative elements
      decorElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            {
              scale: 0,
              opacity: 0,
              rotation: 0,
            },
            {
              scale: 1,
              opacity: 0.1,
              rotation: 360,
              duration: 2,
              delay: index * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );

          // Continuous floating animation
          gsap.to(el, {
            y: -20,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });

      // Subtle background gradient animation
      gsap.to(footerRef.current, {
        backgroundPosition: "200% 50%",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

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
    <footer
      ref={footerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 text-white"
      style={{ backgroundSize: "200% 200%" }}
    >
      {/* Decorative animated elements */}
      <div
        ref={(el) => (decorElementsRef.current[0] = el)}
        className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-2xl"
      ></div>
      <div
        ref={(el) => (decorElementsRef.current[1] = el)}
        className="absolute top-20 right-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl"
      ></div>
      <div
        ref={(el) => (decorElementsRef.current[2] = el)}
        className="absolute bottom-10 left-1/4 w-36 h-36 bg-pink-400 rounded-full mix-blend-overlay filter blur-2xl"
      ></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        {/* Footer name with 3D effect */}
        <div
          ref={footerWordRef}
          className="flex justify-center gap-1 md:gap-2 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 cursor-pointer"
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
              className="footer-letter inline-block opacity-0"
              style={{
                textShadow:
                  "0 10px 30px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.2)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 mb-8"
        ></div>

        {/* Social media icons */}
        <div ref={socialLinksRef} className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label={link.name}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Icon
                  size={24}
                  className="relative z-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                />
              </a>
            );
          })}
        </div>

        {/* Copyright text */}
        <div ref={copyrightRef} className="text-center opacity-0">
          <p className="text-sm md:text-base font-light text-white/90 mb-2">
            &copy; {currentYear()} {homeData[0]?.fName || "Portfolio"}. All
            Rights Reserved
          </p>
          <p className="text-xs text-white/70">
            Crafted with passion and precision
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;

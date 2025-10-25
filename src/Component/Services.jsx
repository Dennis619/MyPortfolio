import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { GoArrowRight } from "react-icons/go";
import { BsArrowLeft } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { services } from "../data";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const handleDiscoverButtonClick = (index) => {
    setClickedIndex((prev) => (prev === index ? null : index));
  };

  // Initial cards animation on scroll
  useGSAP(() => {
    // Clip path animation for section
    // gsap.set("#services", {
    //   clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
    //   borderRadius: "0 0 40% 10%",
    // });

    // gsap.from("#services", {
    //   clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    //   borderRadius: "0 0 0 0",
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     trigger: "#services",
    //     start: "center center",
    //     end: "bottom center",
    //     scrub: true,
    //   },
    // });

    // Stagger animation for cards
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

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
          trigger: "#services",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Expand/collapse animation
  useEffect(() => {
    if (clickedIndex !== null) {
      const card = cardsRef.current[clickedIndex];
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // Collapse other cards
      cardsRef.current.forEach((otherCard, i) => {
        if (i !== clickedIndex && otherCard) {
          gsap.to(otherCard, {
            opacity: 0.4,
            scale: 0.95,
            duration: 0.3,
          });
        }
      });

      // Expand selected card
      tl.to(card, {
        scale: 1.02,
        duration: 0.4,
      })
        .to(
          card.querySelector(".service-content"),
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          card.querySelectorAll(".service-details > *"),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.3"
        );
    } else {
      // Reset all cards
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".service-content"), {
            height: 0,
            opacity: 0,
            duration: 0.3,
          });
        }
      });
    }
  }, [clickedIndex]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen w-screen flex items-center flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-16 text-center max-w-4xl">
        <p
          ref={subtitleRef}
          className="text-blue-400 uppercase tracking-widest text-sm mb-4 font-semibold"
        >
          What I Offer
        </p>
        <div ref={titleRef}>
          <AnimatedTitle
            title="Services"
            containerClass="text-center uppercase"
          />
        </div>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Comprehensive solutions tailored to bring your vision to life with
          cutting-edge technology and creative expertise
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`service-card group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 overflow-hidden transition-all duration-500 cursor-pointer ${
              clickedIndex === index
                ? "border-blue-500 shadow-2xl shadow-blue-500/50 md:col-span-2 lg:col-span-3"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => handleDiscoverButtonClick(index)}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

            {/* Number badge */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
              <span className="text-blue-400 font-bold text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Card content */}
            <div className="relative p-6">
              {/* Title section */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white pr-16 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Brief description (always visible) */}
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {service.description.substring(0, 100)}...
              </p>

              {/* Discover button */}
              <div className="flex justify-end">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
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
                      <BsArrowLeft size={20} />
                    </>
                  ) : (
                    <>
                      <span>Discover</span>
                      <GoArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Expanded content */}
              <div
                className="service-content overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="service-details pt-6 mt-6 border-t border-gray-700">
                  {/* Full description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">
                      Overview
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "High Performance",
                        "Scalable Architecture",
                        "Modern Technologies",
                        "Best Practices",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {/* <div className="flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                      Get Started
                    </button>
                    <button className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                      Learn More
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>Scroll to explore more services</p>
      </div>
    </section>
  );
};

export default Services;

import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef([]);
  const logoRef = useRef(null);
  const audioButtonRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const { y: currentScrollY } = useWindowScroll();

  const navContent = [
    { title: "Home", link: "/", id: "home" },
    { title: "About", link: "about", id: "about" },
    { title: "Services", link: "services", id: "services" },
    { title: "Projects", link: "projects", id: "projects" },
    { title: "Skills", link: "skills", id: "skills" },
    { title: "Contact", link: "contact", id: "contact" },
  ];

  // Initial page load animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
      .fromTo(
        navItemsRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        audioButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );
  }, []);

  // Scroll behavior with smooth animation
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -120,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [isNavVisible]);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navContent.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio toggle with smooth animation
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);

    gsap.to(audioButtonRef.current, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Mobile menu animation
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);

    if (!mobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          clipPath: "circle(0% at 100% 0%)",
          opacity: 0,
        },
        {
          clipPath: "circle(150% at 100% 0%)",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-nav-item"),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.2,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  };

  // Smooth scroll to section
  const handleNavClick = (e, link, id) => {
    e.preventDefault();

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }

    setMobileMenuOpen(false);
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
    >
      <div
        className={`absolute inset-x-0 transition-all duration-500 ${
          currentScrollY > 50
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              ref={logoRef}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
              </div>
              <h1 className="font-zentry text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <a href="/">Portfolio</a>
              </h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
              {navContent.map((item, index) => (
                <a
                  key={index}
                  ref={(el) => (navItemsRef.current[index] = el)}
                  href={item.title === "Home" ? item.link : `#${item.link}`}
                  onClick={(e) => handleNavClick(e, item.link, item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10 animate-pulse"></span>
                  )}
                  <span className="relative z-10">{item.title}</span>
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Audio Toggle */}
              <button
                ref={audioButtonRef}
                onClick={toggleAudioIndicator}
                className="relative flex items-center gap-1 px-3 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                title={isAudioPlaying ? "Pause Music" : "Play Music"}
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`w-0.5 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-150 ${
                      isIndicatorActive ? "animate-pulse" : ""
                    }`}
                    style={{
                      height: isIndicatorActive ? `${8 + bar * 2}px` : "8px",
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden relative w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <HiX className="text-2xl text-white" />
                ) : (
                  <HiOutlineMenu className="text-2xl text-white" />
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-40 md:hidden"
          style={{ clipPath: "circle(0% at 100% 0%)" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
            {navContent.map((item, index) => (
              <a
                key={index}
                href={item.title === "Home" ? item.link : `#${item.link}`}
                onClick={(e) => handleNavClick(e, item.link, item.id)}
                className="mobile-nav-item text-3xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 transform hover:scale-110"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

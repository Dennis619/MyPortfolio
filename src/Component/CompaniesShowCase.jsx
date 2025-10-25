import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import api from "./api";
import { useState } from "react";
import FetchImage from "./FetchImage";

const CompaniesShowCase = () => {
  const [logos, setLogos] = useState([]);
  const fetchCompaniesData = async () => {
    const results = await api.get("/companies-section-data");
    const data = results.data.data;

    const formattedCompanies = data.map((c) => ({
      name: c.name,
      logo: c.logo,
    }));

    setLogos(formattedCompanies);
  };
  useEffect(() => {
    fetchCompaniesData();
  }, []);

  /*
  const logos = [
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
    { src: "/img/about.webp", name: "trisum" },
  ];
  */
  const containerRef = useRef(null);
  const tl = useRef(null);

  // Duplicate the array so that the second copy seamlessly
  // follows the first, creating a continuous marquee effect.
  const doubledLogos = [...logos, ...logos];

  useEffect(() => {
    if (!containerRef.current || !logos.length) return;

    // Kill any existing timeline (hot‑reload/dev mode safety)
    tl.current && tl.current.kill();

    // Translate the container by 50% of its width so that the
    // second set of logos takes over exactly where the first ends.
    tl.current = gsap.to(containerRef.current, {
      x: "-50%", // move half the width (because we doubled logos)
      ease: "linear", // constant speed
      duration: 30, // adjust for faster/slower marquee
      repeat: -1, // infinite
    });

    return () => tl.current && tl.current.kill();
  }, [logos]);

  // Pause/resume helpers – invoked by logo hover events
  const pause = () => tl.current?.pause();
  const play = () => tl.current?.resume();

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-center pb-10 pt-10">
        <p className="md:text-[10px text-start font-general uppercase text-black">
          Some of the companies I have worked with:
        </p>
      </div>
      {/* The inner flex box is wider than the viewport because
          of the duplicated logos, enabling the seamless scroll */}
      <div ref={containerRef} className="flex w-max">
        {doubledLogos.map((logo, i) => (
          <div
            key={i}
            className="flex flex-col items-center mx-6 group"
            onMouseEnter={pause}
            onMouseLeave={play}
          >
            <FetchImage
              imageName={logo.logo}
              containerClass="h-16 select-none cursor-pointer rounded-md"
              route="company_logos"
            />
            <span className="text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity mt-2">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesShowCase;

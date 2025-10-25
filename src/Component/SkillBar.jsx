import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SkillBar = ({ name, level, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    // Animate width from 0% to level%
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1 + index * 1, // stagger timing
        ease: "power3.out",
      }
    );
  }, [level, index]);

  return (
    <div className="my-4 w-full max-w-md">
      <div className="flex justify-between mb-1 font-semibold">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="bg-gray-300 rounded-full h-6 overflow-hidden">
        <div
          ref={barRef}
          className="bg-yellow-300 h-full rounded-full"
          style={{ width: 0 }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;

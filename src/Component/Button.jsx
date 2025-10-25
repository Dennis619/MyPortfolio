import React, { useEffect, useState } from "react";

let hoverSound = null;

const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
  onClick,
  disabled,
}) => {
  const [roundBtn, setRoundBtn] = useState(true);

  // Unlock audio once user interacts with the page
  useEffect(() => {
    const unlockAudio = () => {
      hoverSound = new Audio("/audio/hover-button.mp3");
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    return () => window.removeEventListener("click", unlockAudio);
  }, []);

  const handleMouseEnter = () => {
    if (hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {}); // Avoid errors if blocked
    }
    setRoundBtn(false);
  };

  const handleMouseLeave = () => {
    setRoundBtn(true);
  };

  return (
    <button
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`font-zentry group relative z-10 w-fit cursor-pointer overflow-hidden px-5 py-2 md:px-7 md:py-3 mt-4 ${containerClass} transform hover:scale-110 transition-all duration-300 ease-in-out ${containerClass} ${
        roundBtn ? "rounded-lg" : "rounded-full"
      }`}
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      <div className="flex justify-center items-center gap-3">
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general font-extrabold text-xl">
          <div>{title}</div>
        </span>
        {rightIcon}
      </div>
    </button>
  );
};

export default Button;

import React, { useState, useEffect } from "react";

const TitleAnimator = ({ titles }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[index];
    const speed = deleting ? 50 : 120;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));

      if (!deleting && subIndex === currentTitle.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, titles]);

  return (
    <h1 className="text-2xl md:text-4xl font-circular-web text-blue-300 capitalize inline-block">
      {titles[index].substring(0, subIndex)}
      <span className="cursor">|</span>
    </h1>
  );
};

export default TitleAnimator;

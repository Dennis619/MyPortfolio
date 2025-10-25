import React, { useEffect, useRef, useState } from "react";
import getServerName from "./ServerName";

function FetchImage({ imageName, containerClass, route }) {
  const [imageUrl, setImageUrl] = useState("");
  const reqRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    reqRef.current = controller;

    (async () => {
      await loadImage(imageName, controller.signal);
    })();

    return () => controller.abort();
  }, [imageName]);

  async function loadImage(name, signal) {
    if (!name) return;

    try {
      const encoded = encodeURIComponent(name);
      const res = await fetch(
        `${getServerName()}/uploads/${route}/${encoded}`,
        {
          signal,
        }
      );
      if (!res.ok) throw new Error("404");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Image fetch error:", err);
      }
    }
  }

  return imageUrl ? (
    <img className={containerClass} src={imageUrl} alt="Profile" />
  ) : (
    <div className="w-full h-full bg-gray-100 animate-pulse" />
  );
}

export default FetchImage;

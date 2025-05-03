import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 100;
      setIsVisible(scrolled >= threshold);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-[var(--button-background-color)] text-[var(--button-text-color)] p-2 rounded-full shadow-md hover:bg-[var(--button-background-color-hover)] transform hover:scale-[1.1] will-change-transform transition-transform duration-200 transition-all z-50 flex items-center justify-center"
        style={{ width: "35px", height: "35px" }}
        aria-label="Subir"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    )
  );
};

export default ScrollToTopButton;

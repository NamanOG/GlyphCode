import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export function useTextScramble(text: string, isActive: boolean = true) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // If reduced motion is enabled or not active, just show text immediately
    if (!isActive || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    let currentText = "";
    let iteration = 0;


    // We stagger by revealing characters over time.
    // Max iterations: text.length * multiple, to give a smooth hacker effect.
    // We update every 30ms.
    const maxIterations = text.length * 2;

    const intervalId = window.setInterval(() => {
      currentText = text
        .split("")
        .map((letter, index) => {
          if (index < iteration / 2) {
            return letter;
          }
          if (letter === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(currentText);

      if (iteration >= maxIterations) {
        clearInterval(intervalId);
        setDisplayText(text);
      }

      iteration += 1;
    }, 30);

    return () => clearInterval(intervalId);
  }, [text, isActive]);

  return displayText;
}

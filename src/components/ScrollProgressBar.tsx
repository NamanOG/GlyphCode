import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setWidth(Math.min(100, Math.max(0, progress)));
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9999] bg-[#00D4FF] opacity-60 pointer-events-none"
        style={{ width: `${width}%` }}
      />
    </>
  );
}

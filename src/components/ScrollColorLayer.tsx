import { useEffect, useRef } from "react";

function lerpColor(a: number[], b: number[], amount: number) { 
  const ar = a[0], ag = a[1], ab = a[2], aa = a[3];
  const br = b[0], bg = b[1], bb = b[2], ba = b[3];
  return [
    ar + amount * (br - ar),
    ag + amount * (bg - ag),
    ab + amount * (bb - ab),
    aa + amount * (ba - aa)
  ];
}

export default function ScrollColorLayer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    // RGBA colors
    const colors = {
      hero: [0, 212, 255, 0.07],    // Cold cyan/blue
      work: [0, 0, 0, 0],           // Neutral dark
      cap: [123, 97, 255, 0.06],    // Warm purple/violet
      footer: [255, 77, 0, 0.04]    // Warm amber glow
    };

    const updateColor = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      let currentColor = colors.hero;
      
      if (scrollY < vh) {
        // Hero to Work (0 - 100vh)
        const amt = scrollY / vh;
        currentColor = lerpColor(colors.hero, colors.work, amt);
      } else if (scrollY < vh * 2) {
        // Work to Cap (100 - 200vh)
        const amt = (scrollY - vh) / vh;
        currentColor = lerpColor(colors.work, colors.cap, amt);
      } else if (scrollY < vh * 3) {
        // Cap to Footer (200 - 300vh)
        const amt = (scrollY - vh * 2) / vh;
        currentColor = lerpColor(colors.cap, colors.footer, amt);
      } else {
        currentColor = colors.footer;
      }
      
      const [r, g, b, a] = currentColor;
      ref.current.style.background = `radial-gradient(circle at 50% 50%, rgba(${r}, ${g}, ${b}, ${a}), transparent 70%)`;
      
      animationFrameId = requestAnimationFrame(updateColor);
    };

    animationFrameId = requestAnimationFrame(updateColor);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[1] pointer-events-none transition-colors duration-0"
    />
  );
}

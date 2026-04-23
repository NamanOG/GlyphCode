import { useEffect, useRef } from "react";

function lerpColor(a: number[], b: number[], amount: number) {
  return [
    a[0] + amount * (b[0] - a[0]),
    a[1] + amount * (b[1] - a[1]),
    a[2] + amount * (b[2] - a[2]),
    a[3] + amount * (b[3] - a[3]),
  ];
}

export default function ScrollColorLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const currentColor = useRef([0, 20, 40, 0.18]);

  useEffect(() => {
    let animationFrameId: number;

    // RGBA waypoints
    const colors = {
      start: [0, 20, 40, 0.18], // deep ocean blue  — 0% scroll
      mid1: [5, 5, 15, 0.18], // near black       — 30% scroll
      mid2: [30, 0, 50, 0.18], // deep purple      — 60% scroll
      end: [40, 15, 0, 0.18], // warm amber dark  — 100% scroll
    };

    const updateColor = () => {
      if (!ref.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      let target: number[];
      if (progress < 0.3) {
        target = lerpColor(colors.start, colors.mid1, progress / 0.3);
      } else if (progress < 0.6) {
        target = lerpColor(colors.mid1, colors.mid2, (progress - 0.3) / 0.3);
      } else {
        target = lerpColor(colors.mid2, colors.end, (progress - 0.6) / 0.4);
      }

      // Smooth lerp toward target
      currentColor.current = lerpColor(currentColor.current, target, 0.05);

      const [r, g, b, a] = currentColor.current;
      ref.current.style.background = `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(${r}, ${g}, ${b}, ${a}), transparent 70%)`;

      animationFrameId = requestAnimationFrame(updateColor);
    };

    animationFrameId = requestAnimationFrame(updateColor);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
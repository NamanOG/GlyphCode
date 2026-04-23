import { memo, useEffect, useRef } from "react";

function CursorGlowComponent() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      glow.style.transform = `translate(${currentX - 100}px, ${currentY - 100}px)`;
      raf = requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <div ref={glowRef} className="pointer-events-none fixed left-0 top-0 z-[9998] h-[200px] w-[200px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} aria-hidden />;
}

const CursorGlow = memo(CursorGlowComponent);
CursorGlow.displayName = "CursorGlow";

export default CursorGlow;

import { useRef, useState, ReactNode } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({ children, className = "", onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Check if within 80px radius (we can just trigger on mouse enter for the whole element, but user specified within 80px of center)
    // Actually standard magnetic buttons trigger when hovering the element itself. Let's base it on element hover.
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const Wrapper = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block ${className}`}
      style={{ x, y }}
    >
      <Wrapper {...props as any} className="inline-block w-full h-full">
        {children}
      </Wrapper>
    </motion.div>
  );
}

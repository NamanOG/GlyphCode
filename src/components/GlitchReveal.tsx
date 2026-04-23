import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function GlitchReveal({ children, inView = true }: { children: ReactNode; inView?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, skewX: 0 },
        visible: {
          opacity: [0, 0.3, 0, 0.8, 1],
          skewX: [2, -1, 1, 0, 0],
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

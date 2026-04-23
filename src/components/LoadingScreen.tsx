import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [showLoading, setShowLoading] = useState(true);
  const text = "GLYPHCODE.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      setTimeout(onComplete, 500); // give time for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080808]"
        >
          <div className="flex text-[20px] text-[#FAFAFA] tracking-[0.2em] font-courier">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="mt-4 h-[2px] w-[200px] overflow-hidden bg-[#252c35]">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              className="h-full w-full bg-[#00D4FF]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

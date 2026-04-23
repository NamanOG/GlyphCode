import { useEffect, useRef } from "react";

const processSteps = [
  { num: "01", title: "DISCOVER", desc: "Understanding goals and constraints." },
  { num: "02", title: "DEFINE", desc: "Architecting the technical foundation." },
  { num: "03", title: "DESIGN", desc: "Crafting the visual language." },
  { num: "04", title: "BUILD", desc: "Engineering the platform." },
  { num: "05", title: "SHIP", desc: "Deploying to production." },
];

export default function ProcessStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (containerRef.current) {
        scrollPos += 0.5;
        // Reset scroll when reaching the end of original content (simple infinite loop approach if duplicated)
        // Since we are not duplicating here, we will just let it scroll slowly. If it reaches the end, it stops.
        if (scrollPos < containerRef.current.scrollWidth - containerRef.current.clientWidth) {
          containerRef.current.scrollLeft = scrollPos;
          animationFrameId = requestAnimationFrame(scroll);
        }
      }
    };
    
    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full py-10 bg-[#080808] border-y border-[#252c35]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-10 mb-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#00D4FF] font-courier">
          PROCESS
        </p>
      </div>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-[1px] bg-[#1A1A1A] w-full no-scrollbar"
      >
        {processSteps.map((step) => (
          <div key={step.num} className="min-w-[300px] h-[200px] bg-[#0F0F0F] p-8 flex flex-col justify-between shrink-0">
            <div className="text-[48px] leading-none text-[#1A1A1A] uppercase select-none font-cabinet font-[800]">
              {step.num} {step.title}
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#FAFAFA] tracking-wide">{step.title}</h4>
              <p className="mt-1 text-[12px] text-[#555]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

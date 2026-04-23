import { memo } from "react";

const items = [
  "FULL-STACK EXECUTION",
  "MOTION SYSTEMS",
  "REACT & TYPESCRIPT",
  "WEBGL SHADERS",
  "SUPABASE",
  "HIGH FIDELITY UI",
  "PRODUCT ENGINEERING",
  "FRAMER MOTION",
  "PERFORMANCE",
  "INTERACTION DESIGN",
];

function MarqueeComponent() {
  const renderRow = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={`${key}-${item}`} className="inline-flex items-center">
          <span className="text-[12px] uppercase tracking-[0.18em] text-[#3A3A3A]">{item}</span>
          <span className="mx-6 text-[14px] text-[#00D4FF]">+</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="border-y border-[#252c35] py-[18px]">
      <div className="group overflow-hidden">
        <div className="flex w-max marquee-track group-hover:[animation-play-state:paused]">
          {renderRow("one")}
          {renderRow("two")}
          {renderRow("three")}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }

        .marquee-track {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

const Marquee = memo(MarqueeComponent);
Marquee.displayName = "Marquee";

export default Marquee;

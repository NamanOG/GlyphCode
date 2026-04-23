import { motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import ShaderDivider from "@/components/ShaderDivider";
import { ShaderCanvas } from "@/components/shaders/ShaderCanvas";
import { auroraShader } from "@/components/shaders/auroraShader";
import { eventHorizonShader } from "@/components/shaders/eventHorizonShader";
import { noiseGrainShader } from "@/components/shaders/noiseGrainShader";
import MagneticButton from "@/components/MagneticButton";
import { useTextScramble } from "@/hooks/useTextScramble";
import ScrollColorLayer from "@/components/ScrollColorLayer";
import HeroParticles from "@/components/HeroParticles";
import ProcessStrip from "@/components/ProcessStrip";
import GlitchReveal from "@/components/GlitchReveal";
import workCompute from "@/assets/work-compute.jpg";
import workEden from "@/assets/work-eden.png";
import workRaipur from "@/assets/work-raipur.png";

const ease = [0.16, 1, 0.3, 1] as const;

const revealVariant = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

const heroChild = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

const projects: Project[] = [
  {
    badge: "RL",
    href: "https://raipur.life",
    name: "Raipur.life",
    role: "City Discovery Platform",
    year: "2026",
    image: workRaipur,
    bgGradient: "linear-gradient(135deg, #0d1f35 0%, #1a4a6b 40%, #0a2540 100%)",
  },
  {
    badge: "CC",
    href: "https://computecompile.com",
    name: "Compute Compile",
    role: "B2B IT Web Presence",
    year: "2024",
    image: workCompute,
    bgGradient: "linear-gradient(135deg, #1a0d00 0%, #3d1f00 40%, #1a0d00 100%)",
  },
  {
    badge: "EN",
    href: "https://eden-nori.vercel.app",
    name: "Eden Nori",
    role: "Premium UI Engineering",
    year: "2025",
    image: workEden,
    bgGradient: "linear-gradient(135deg, #0d0d1a 0%, #1a1a3d 40%, #0d0d1a 100%)",
  },
  {
    badge: "GL",
    href: "https://glyphcode.dev",
    name: "GlyphLab",
    role: "Design Systems Sprint",
    year: "2026",
    image: workCompute,
    bgGradient: "linear-gradient(135deg, #001a1a 0%, #003d3d 40%, #001a1a 100%)",
  },
];

const capabilityRows = [
  { number: "01", title: "Frontend Engineering", description: "Typed systems with scalable component architecture." },
  { number: "02", title: "Motion Direction", description: "Purposeful interaction and reveal choreography." },
  { number: "03", title: "Web Platforms", description: "Reliable full-stack builds with clean data flows." },
  { number: "04", title: "Product Design", description: "Editorial UI with engineering precision." },
];

const tags = ["FRAMER MOTION", "REACT + TS", "SUPABASE", "HIGH FIDELITY UI", "WEBGL"];

type Project = {
  badge: string;
  href: string;
  image: string;
  name: string;
  role: string;
  year: string;
  bgGradient?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const rotateX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const liftX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const liftY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const scale = useSpring(1, { stiffness: 220, damping: 30, mass: 0.7 });

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    liftX.set(0);
    liftY.set(0);
    scale.set(1);
    setOrigin({ x: 50, y: 50 });
  };

  const updatePointer = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    const normalizedX = x / 100 - 0.5;
    const normalizedY = y / 100 - 0.5;

    setOrigin({ x, y });
    rotateX.set(-normalizedY * 14);
    rotateY.set(normalizedX * 18);
    liftX.set(normalizedX * 8);
    liftY.set(-6 - (1 - y / 100) * 8);
    scale.set(1.015 + (1 - y / 100) * 0.01);

    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.a
      ref={ref}
      href={project.href}
      rel="noreferrer"
      target="_blank"
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}
      onPointerLeave={reset}
      style={
        reduceMotion
          ? undefined
          : {
            rotateX,
            rotateY,
            x: liftX,
            y: liftY,
            scale,
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }
      }
      className="group relative block overflow-hidden border border-[#252c35] bg-[#111318] shadow-[0_18px_52px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:border-[#31404e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D4FF]/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(0,212,255,0.1),transparent_28%),radial-gradient(circle_at_100%_0%,rgba(0,212,255,0.06),transparent_18%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_24%,rgba(255,255,255,0.01))]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle 200px at var(--mx, 50%) var(--my, 50%), rgba(0,212,255,0.06), transparent)",
        }}
      />

      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line */}
        <div className="absolute inset-0" style={{ background: project.bgGradient }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
          <span className="text-[60px] font-[800] text-white tracking-widest leading-none text-center font-satoshi">
            {project.name.toUpperCase()}
          </span>
        </div>
        <div className="absolute left-4 top-4 z-[2] rounded-[4px] border border-[#2f3944] bg-[rgba(8,10,12,0.58)] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c6d2da] font-courier">
          {project.badge}
        </div>
        <img
          src={project.image}
          alt={project.name}
          className="relative z-[1] h-full w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.08] transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.12]"
        />
        <ShaderCanvas
          fragmentShader={noiseGrainShader}
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-[0.15]"
        />
        <div className="absolute inset-0 z-[3] pointer-events-none bg-[linear-gradient(to_bottom,rgba(10,12,14,0.06),transparent_32%,rgba(10,12,14,0.14))]" />
      </div>

      <div className="relative z-[2] flex items-center justify-between border-t border-[#252c35] px-6 py-5">
        <div>
          <h3 className="text-[18px] font-semibold text-[#f5f7f8]">{project.name}</h3>
          <p className="mt-1 text-[13px] text-[#9aa3ae]">{project.role}</p>
        </div>
        <span className="text-[13px] text-[#9aa3ae] font-courier">
          {project.year}
        </span>
      </div>
    </motion.a>
  );
}

function HeroSection() {
  const textGlyph = useTextScramble("GLYPH");
  const textCode = useTextScramble("CODE");
  const textDot = useTextScramble(".");

  return (
    <section id="top" className="relative h-[100dvh] w-full overflow-hidden">
      {/* eslint-disable-next-line */}
      <div className="absolute inset-0 h-full w-full pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(0, 212, 255, 0.12) 0%, rgba(0, 50, 80, 0.08) 40%, transparent 70%)" }} />
      <HeroParticles />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px]">

        <div className="flex w-full md:w-[55%] flex-col justify-center px-4 sm:px-10 h-full">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={heroChild}
              className="text-[11px] uppercase tracking-[0.2em] text-[#00D4FF] font-courier"
            >
              PRODUCT ENGINEERING STUDIO
            </motion.p>

            <motion.h1
              variants={heroChild}
              className="mt-5 flex items-end text-[clamp(80px,11vw,148px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-[#FAFAFA] font-cabinet"
            >
              <span className="hero-headline">
                {textGlyph}<br />{textCode}
              </span>
              <span className="text-[#00D4FF] block">{textDot}</span>
            </motion.h1>

            <motion.p variants={heroChild} className="mt-7 max-w-[520px] text-[18px] leading-[1.6] text-[#b7c0ca]">
              We build digital products, websites, and full-stack systems with the detail of a studio and the discipline of an engineering team.
            </motion.p>

            <motion.div variants={heroChild} className="mt-9 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] border border-[#252c35] bg-[#111318] px-[14px] py-[5px] text-[11px] tracking-[0.1em] text-[#9aa3ae] font-courier"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={heroChild} className="mt-12 flex flex-wrap gap-4 relative z-20">
              <MagneticButton>
                <a
                  href="#contact"
                  className="rounded-[4px] bg-[#FAFAFA] px-8 py-3.5 text-[13px] font-bold text-[#080808]"
                >
                  INITIATE PROJECT ↗
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#work"
                  className="rounded-[4px] border border-[#2A2A2A] bg-transparent px-8 py-3.5 text-[13px] text-[#FAFAFA]"
                >
                  VIEW WORK →
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* eslint-disable-next-line */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-[45%]" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%)" }}>
          <ShaderCanvas fragmentShader={eventHorizonShader} className="absolute inset-0 h-full w-full" opacity={0.9} />
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="section-work py-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-10">
        <GlitchReveal inView={inView}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#00D4FF] font-courier">
            SELECTED WORK
          </p>
        </GlitchReveal>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-12 grid grid-cols-1 gap-px bg-[#252c35] md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={`${project.name}-${project.year}`} variants={revealVariant} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const bentoRef = useRef<HTMLDivElement | null>(null);
  const rowsInView = useInView(rowsRef, { once: true, margin: "-80px" });
  const bentoInView = useInView(bentoRef, { once: true, margin: "-80px" });

  return (
    <section id="capabilities" className="section-capabilities relative py-[120px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]">
        <ShaderCanvas fragmentShader={auroraShader} className="h-full w-full" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-10">
        <GlitchReveal inView={rowsInView}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#00D4FF] font-courier">
            CAPABILITIES
          </p>
        </GlitchReveal>

        <motion.div
          id="process"
          ref={rowsRef}
          initial="hidden"
          animate={rowsInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-10"
        >
          {capabilityRows.map((row) => (
            <motion.div
              key={row.number}
              variants={revealVariant}
              className="group relative flex items-center border-b border-[#252c35] py-6 transition-all duration-300 ease-in-out hover:px-3 before:absolute before:left-[-16px] before:top-1/2 before:h-[6px] before:w-[6px] before:-translate-y-1/2 before:rounded-full before:bg-[#00D4FF] before:opacity-0 before:transition-opacity before:duration-300 hover:translate-x-2 hover:before:opacity-100 hover:bg-[linear-gradient(90deg,rgba(0,212,255,0.03)_0%,transparent_60%)]"
            >
              <span className="min-w-[48px] text-[12px] text-[#3c444d] font-courier">
                {row.number}
              </span>
              <h3 className="text-[22px] font-semibold text-[#FAFAFA]">{row.title}</h3>
              <p className="ml-auto max-w-[300px] text-right text-[13px] text-[#9aa3ae]">{row.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          id="about"
          ref={bentoRef}
          initial="hidden"
          animate={bentoInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-12 grid grid-cols-1 gap-px bg-[#252c35] md:grid-cols-[2fr_1fr_1fr]"
        >
          <motion.article variants={revealVariant} className="relative bg-[#111318] p-12 md:col-span-2">
            <span className="absolute right-8 top-6 text-[92px] font-bold leading-none text-[#222a33]">01</span>
            <p className="text-[11px] tracking-[0.2em] text-[#00D4FF] font-courier">
              CORE STACK
            </p>
            <h4 className="mt-3 text-[20px] font-bold text-[#FAFAFA]">REACT + TYPESCRIPT</h4>
          </motion.article>

          <motion.article variants={revealVariant} className="bg-[#111318] p-8">
            <p className="text-[11px] tracking-[0.2em] text-[#00D4FF] font-courier">
              MOTION
            </p>
            <h4 className="mt-3 text-[20px] font-bold text-[#FAFAFA]">FRAMER MOTION</h4>
          </motion.article>

          {/* eslint-disable-next-line */}
          <motion.article variants={revealVariant} className="relative overflow-hidden p-8" style={{ background: "#020208" }}>
            <ShaderCanvas fragmentShader={auroraShader} className="absolute inset-0 z-[1] h-full w-full" opacity={0.7} />
            <div className="relative z-[2]">
              <p className="text-[11px] tracking-[0.2em] text-[#00D4FF] font-courier">
                SURFACE
              </p>
              <h4 className="mt-3 text-[20px] font-bold text-[#FAFAFA]">WEBGL / SHADERS</h4>
            </div>
          </motion.article>

          <motion.article variants={revealVariant} className="bg-[#111318] p-8">
            <p className="text-[11px] tracking-[0.2em] text-[#00D4FF] font-courier">
              BACKEND
            </p>
            <h4 className="mt-3 text-[20px] font-bold text-[#FAFAFA]">SUPABASE</h4>
          </motion.article>

          <motion.article variants={revealVariant} className="bg-[#111318] p-8 md:col-span-2">
            <p className="text-[11px] tracking-[0.2em] text-[#00D4FF] font-courier">
              CRAFT
            </p>
            <h4 className="mt-3 text-[20px] font-bold text-[#FAFAFA]">HIGH FIDELITY UI</h4>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer id="contact" className="mx-auto w-full max-w-[1200px] border-t border-[#252c35] p-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[12px] text-[#6f7883] font-courier">
          © 2025 GLYPHCODE.
        </p>

        <a
          href="#top"
          className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#FAFAFA] font-courier"
        >
          GLYPHCODE.
        </a>

        <div className="flex gap-5">
          <a
            href="https://github.com/NamanOG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] uppercase tracking-[0.1em] text-[#6f7883] transition-colors duration-150 ease-in hover:text-[#FAFAFA]"
          >
            GITHUB
          </a>
          <a
            href="https://x.com/namanbagdiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] uppercase tracking-[0.1em] text-[#6f7883] transition-colors duration-150 ease-in hover:text-[#FAFAFA]"
          >
            TWITTER/X
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] uppercase tracking-[0.1em] text-[#6f7883] transition-colors duration-150 ease-in hover:text-[#FAFAFA]"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0d10] text-[#FAFAFA]">
      <ScrollColorLayer />
      <Navbar />
      <HeroSection />
      <ShaderDivider />
      <Marquee />
      <ShaderDivider />
      <WorkSection />
      <ProcessStrip />
      <CapabilitiesSection />
      <ShaderDivider />
      <FooterSection />
    </main>
  );
}

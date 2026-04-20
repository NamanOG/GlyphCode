import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type Variants,
} from "framer-motion";
import logo from "@/assets/glyphcode-logo.png";
import heroBlueprint from "@/assets/hero-blueprint.jpg";
import workCompute from "@/assets/work-compute.jpg";
import workEden from "@/assets/work-eden.jpg";
import workRaipur from "@/assets/work-raipur.jpg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.95, ease: easeOut },
  },
};

const clipLeft: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", x: -16 },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    x: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

type Project = {
  category: string;
  description: string;
  href: string;
  image: string;
  index: string;
  name: string;
  stack: string;
  year: string;
};

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const projects: Project[] = [
  {
    name: "Raipur.life",
    category: "City Discovery / Full-Stack",
    description:
      "A local discovery platform for restaurants, events, places, and city life in one product.",
    image: workRaipur,
    href: "https://raipur.life",
    index: "01",
    stack: "Next.js / Supabase / Maps",
    year: "2026",
  },
  {
    name: "Compute Compile",
    category: "B2B IT / Business Website",
    description: "Digital presence and sales platform for an established IT services company.",
    image: workCompute,
    href: "https://computecompile.com",
    index: "02",
    stack: "Next.js / CMS / SEO",
    year: "2024",
  },
  {
    name: "Eden Nori",
    category: "Premium Frontend / UI Engineering",
    description: "A design-led frontend execution project showcasing high-end web aesthetics.",
    image: workEden,
    href: "https://eden-nori.vercel.app",
    index: "03",
    stack: "React / Motion / Interface",
    year: "2025",
  },
];

const capabilities = [
  {
    id: "SYS.01",
    title: "Frontend Systems",
    description:
      "Component architecture, interaction design, and motion-led UI for serious products.",
  },
  {
    id: "SYS.02",
    title: "Full-Stack Development",
    description:
      "End-to-end product engineering across modern web stacks and robust backend APIs.",
  },
  {
    id: "SYS.03",
    title: "Brand Websites",
    description:
      "Custom digital presence work for companies that need craft, clarity, and speed.",
  },
  {
    id: "SYS.04",
    title: "Rapid Prototyping",
    description:
      "Focused sprints that move from rough idea to usable product without template debt.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    text: "Goals, audience, constraints, and risk mapped into a usable brief.",
  },
  {
    number: "02",
    title: "Design",
    text: "Typography, layout, interaction model, and system rules shaped early.",
  },
  {
    number: "03",
    title: "Build",
    text: "Production implementation in typed, maintainable React and backend code.",
  },
  {
    number: "04",
    title: "Refine",
    text: "Motion, accessibility, speed, edge cases, and responsive polish tightened.",
  },
  {
    number: "05",
    title: "Ship",
    text: "Deployment, QA, handoff, and iteration without abandoning the product.",
  },
];

const marqueeTop = [
  "NEXT.JS",
  "TYPESCRIPT",
  "SUPABASE",
  "FRAMER MOTION",
  "TAILWIND CSS",
  "REACT",
  "REST APIs",
  "FULL-STACK",
];

const marqueeBottom = [
  "COMPONENT ARCHITECTURE",
  "MOTION-LED UI",
  "DESIGN SYSTEMS",
  "RAPID PROTOTYPING",
  "BRAND WEBSITES",
  "END-TO-END ENGINEERING",
];

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return <img src={logo} alt="GlyphCode" className={`${className} object-contain`} />;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-8 w-8 cursor-pointer select-none items-center justify-center border border-border bg-panel focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
      aria-label="Toggle structural theme"
    >
      <motion.div
        className="grid grid-cols-2 gap-[2px]"
        animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.9 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <motion.div
          animate={{ backgroundColor: isDark ? "hsl(var(--foreground))" : "transparent" }}
          className="h-2 w-2 border border-foreground"
        />
        <motion.div
          animate={{ backgroundColor: isDark ? "transparent" : "hsl(var(--foreground))" }}
          className="h-2 w-2 border border-foreground"
        />
        <motion.div
          animate={{ backgroundColor: isDark ? "transparent" : "hsl(var(--cyan))" }}
          className="h-2 w-2 border border-cyan"
        />
        <motion.div
          animate={{ backgroundColor: isDark ? "hsl(var(--foreground))" : "transparent" }}
          className="h-2 w-2 border border-foreground"
        />
      </motion.div>
    </button>
  );
}

function Reveal({
  amount = 0.3,
  children,
  className,
  delay,
  variants = fadeUp,
}: {
  amount?: number;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : inView ? "show" : "hidden"}
      variants={reduceMotion ? undefined : variants}
      transition={reduceMotion ? undefined : { duration: 0.9, ease: easeOut, delay: delay ?? 0 }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({
  amount = 0.2,
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: {
  amount?: number;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : inView ? "show" : "hidden"}
      variants={reduceMotion ? undefined : variants}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

function ClipHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      animate={
        reduceMotion
          ? undefined
          : inView
            ? { clipPath: "inset(0% 0 0 0)", y: 0 }
            : { clipPath: "inset(100% 0 0 0)", y: 20 }
      }
      className={className}
      initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)", y: 20 }}
      transition={{ duration: 0.9, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`grid grid-cols-[1fr_auto] items-center border-b border-border px-5 py-4 transition-[background-color,backdrop-filter] duration-500 md:grid-cols-[1fr_auto_1fr] md:px-9 ${
          scrolled ? "bg-background/90 shadow-sm backdrop-blur-md" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <a
          href="#"
          className="flex cursor-pointer select-none items-center gap-3"
          aria-label="GlyphCode home"
        >
          <LogoMark className="h-7 w-7" />
          <span className="mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-foreground">
            GlyphCode<span className="text-cyan">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              className="mono cursor-pointer select-none text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-cyan focus-visible:outline-none"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <ThemeToggle />
          <a
            className="group hidden cursor-pointer select-none items-center gap-2 border border-border bg-panel px-4 py-2 mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-cyan hover:text-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan md:flex after:content-['_↗'] after:text-cyan"
            href="#contact"
          >
            Initiate Project
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden border-b border-border pt-[4.8rem]"
    >
      <div
        className="absolute inset-0 technical-field z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 grid min-h-[calc(100svh-4.8rem)] grid-cols-12 gap-x-6 px-5 pb-0 md:px-9">
        <motion.div
          animate="show"
          className="col-span-12 flex flex-col justify-center pb-12 pt-6 md:col-span-7 lg:pb-16"
          initial={reduceMotion ? false : "hidden"}
          variants={
            reduceMotion
              ? undefined
              : { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
          }
        >
          <motion.p
            className="mono text-[0.72rem] uppercase tracking-[0.24em] text-cyan"
            variants={heroItem}
          >
            Digital studio / Full-stack execution / Global Base
          </motion.p>

          <motion.h1
            className="display mt-8 max-w-[10ch] text-[clamp(4.5rem,14vw,14rem)] uppercase leading-[0.8] tracking-[0.02em] text-foreground"
            variants={heroItem}
          >
            Glyph
            <br />
            Code
            <span className="text-cyan text-[clamp(2.5rem,8vw,10rem)] leading-[0] align-baseline">
              .
            </span>
          </motion.h1>

          <motion.div
            className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-8"
            variants={heroItem}
          >
            <p className="text-xl leading-snug text-muted-foreground md:text-2xl">
              We build digital products, websites, and full-stack systems with the detail of a studio
              and the discipline of an engineering team.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                className="group flex cursor-pointer select-none items-center gap-2 border border-border bg-panel px-6 py-4 mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-cyan hover:bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
                href="#contact"
              >
                Initiate Project
                <span className="text-cyan transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                className="group flex cursor-pointer select-none items-center gap-2 px-6 py-4 mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                href="#work"
              >
                View Dossier
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          animate="show"
          className="col-span-12 flex flex-col justify-end border-t border-border bg-background/50 backdrop-blur-sm md:col-span-5 md:border-l md:border-t-0"
          initial={reduceMotion ? false : "hidden"}
          variants={
            reduceMotion
              ? undefined
              : { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }
          }
        >
          <div className="flex h-full flex-col justify-between p-6 md:p-8">
            <motion.div
              className="mono mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground md:mt-0"
              variants={heroItem}
            >
              <span>Pipeline</span>
              <span className="h-px flex-1 bg-border" />
              <span>EST.2024</span>
            </motion.div>

            <div className="mt-8 md:mt-auto">
              <motion.div
                className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-panel md:aspect-auto md:min-h-[320px]"
                variants={heroItem}
              >
                <motion.img
                  alt="GlyphCode architectural interface blueprint"
                  className="h-full w-full object-cover mix-blend-luminosity opacity-80 transition-opacity duration-700 hover:opacity-100 hover:mix-blend-normal"
                  src={heroBlueprint}
                  style={{ scale: reduceMotion ? 1 : imageScale, y: reduceMotion ? 0 : yShift }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-sm">
                  <div className="mono flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                    <span>FIG.01</span>
                    <span className="border border-cyan/30 px-2 py-0.5 text-cyan">Systems</span>
                  </div>
                  <p className="mt-4 text-sm leading-tight text-foreground">
                    No templates. No generated sameness. Just sharp code and intentional interface work.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.aside>
      </div>

      <Marquee />
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const reduceMotion = useReducedMotion();
  const content = (
    <div className="mono flex shrink-0 items-center gap-0 text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
      {items.map((item) => (
        <span className="inline-flex items-center" key={item}>
          {item}
          <span className="mx-8 text-cyan">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden py-3">
      <div className={`flex w-max ${reduceMotion ? "" : reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {content}
        {content}
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative z-10 border-t border-border bg-background">
      <MarqueeRow items={marqueeTop} />
      <div className="border-t border-border" />
      <MarqueeRow items={marqueeBottom} reverse />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  index,
  subtitle,
  title,
}: {
  eyebrow: string;
  index: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-8 border-b border-border pb-10">
      <Reveal className="col-span-12 pt-2 md:col-span-4 lg:col-span-3" variants={clipLeft}>
        <div className="mono flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-cyan">
          <span className="block h-[2px] w-4 bg-cyan" /> {index}
        </div>
        <div className="mono mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          {eyebrow}
        </div>
      </Reveal>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <ClipHeading>
          <h2 className="display max-w-4xl text-[clamp(2.8rem,6.5vw,7rem)] uppercase leading-[0.88] text-foreground">
            {title}
          </h2>
        </ClipHeading>
        {subtitle ? (
          <Reveal variants={fadeUp}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  cardClassName,
  style,
}: {
  project: Project;
  cardClassName?: string;
  style?: MotionStyle;
}) {
  return (
    <motion.a
      className={`group block border border-border bg-background transition-colors duration-500 hover:border-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan ${cardClassName ?? ""}`}
      href={project.href}
      rel="noreferrer"
      target="_blank"
      variants={fadeUp}
      whileHover={{ scale: 1.01, transition: { duration: 0.3, ease: "easeOut" } }}
      style={style}
    >
      <div className="relative overflow-hidden bg-panel aspect-[16/9]">
        <img
          alt={project.name}
          className="h-full w-full object-cover mix-blend-luminosity opacity-80 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          src={project.image}
        />
        <div className="absolute inset-4 border border-foreground/10 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[0.96] group-hover:border-cyan/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      <div className="relative z-10 flex flex-col justify-between border-t border-border bg-background p-6 transition-colors duration-500 md:p-8">
        <div>
          <div className="mono flex items-center justify-between overflow-hidden text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="truncate pr-4">{project.category}</span>
            <span className="shrink-0 text-cyan transition-transform duration-500 group-hover:-translate-y-1">
              /{project.index}
            </span>
          </div>
          <h3 className="display mt-8 text-[clamp(2rem,4vw,4.5rem)] uppercase leading-[0.9] text-foreground transition-colors duration-500 group-hover:text-cyan">
            {project.name}
          </h3>
        </div>
        <div className="mt-10">
          <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
            <div className="mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <div className="mb-1 text-foreground/80">{project.stack}</div>
              <div>{project.year}</div>
            </div>
            <span className="display text-3xl leading-none text-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cyan">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function SelectedWork() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const card1Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "0%"]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 0.95, 0.9]);
  const card1Opacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.6]);

  const card2Y = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const card2Scale = useTransform(scrollYProgress, [0.33, 0.66], [1, 0.95]);
  const card2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0.6]);

  const card3Y = useTransform(scrollYProgress, [0.45, 0.75], ["100%", "0%"]);
  const card3Scale = useTransform(scrollYProgress, [0.66, 1], [1, 1]);

  return (
    <section className="section-shell pt-16 md:pt-24 lg:pt-28" id="work">
      <SectionHeader
        eyebrow="Selected Work"
        index="INDEX 24_26"
        subtitle="A tight sample of shipped products and brand systems. The structure is intentionally precise because the work is un-templated."
        title="Shipped work, framed as modules."
      />

      <Stagger className="mt-12 h-[300vh]" stagger={0.12}>
        <div ref={stackRef} className="relative h-full">
          <div className="sticky top-[calc(4.8rem+2rem)]">
            <ProjectCard
              project={projects[0]}
              cardClassName="origin-top will-change-transform"
              style={{ y: card1Y, scale: card1Scale, opacity: card1Opacity, transformOrigin: "top center", zIndex: 10 }}
            />
          </div>

          <div className="sticky top-[calc(4.8rem+2rem)]">
            <ProjectCard
              project={projects[1]}
              cardClassName="origin-top will-change-transform"
              style={{ y: card2Y, scale: card2Scale, opacity: card2Opacity, transformOrigin: "top center", zIndex: 20 }}
            />
          </div>

          <div className="sticky top-[calc(4.8rem+2rem)]">
            <ProjectCard
              project={projects[2]}
              cardClassName="origin-top will-change-transform"
              style={{ y: card3Y, scale: card3Scale, transformOrigin: "top center", zIndex: 30 }}
            />
          </div>
        </div>
      </Stagger>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section-shell pt-16 md:pt-24 lg:pt-28" id="capabilities">
      <SectionHeader
        eyebrow="Capabilities"
        index="SYSTEMS"
        subtitle="Organized rows. Each service is treated as an engineering system with a visible purpose."
        title="What we engineer."
      />

      <div className="mt-12 border-t border-border">
        {capabilities.map((capability, i) => (
          <Reveal key={capability.id} variants={clipLeft} delay={i * 0.1}>
            <div className="group relative grid min-h-[80px] grid-cols-12 gap-6 border-b border-border px-2 py-10 transition-all duration-500 ease-out hover:bg-panel md:min-h-[120px] md:py-12">
              <span className="absolute inset-y-0 left-0 origin-bottom scale-y-0 bg-cyan transition-transform duration-500 ease-out group-hover:scale-y-100 w-[3px]" />
              <div className="col-span-12 flex min-h-[80px] flex-col justify-between pl-4 md:col-span-3 md:min-h-[120px]">
                <span className="mono text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-500 group-hover:text-cyan">
                  {capability.id}
                </span>
              </div>
              <div className="col-span-12 grid min-h-[80px] gap-5 pl-4 md:col-span-9 md:min-h-[120px] md:grid-cols-[1fr_1.2fr] md:pl-0">
                <div className="flex flex-col justify-between">
                  <h3 className="display text-3xl uppercase leading-[1] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-5xl">
                    {capability.title}
                  </h3>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="max-w-xl border-l border-transparent leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:border-border md:pl-6">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section-shell pt-16 md:pt-24 lg:pt-28" id="process">
      <SectionHeader
        eyebrow="Process"
        index="SEQUENCE"
        subtitle="A direct delivery rhythm: fewer ceremonies, stronger decisions, and intense polish prior to launch."
        title="Brief to deployment."
      />

      <div className="mt-14 grid grid-cols-1 border border-border bg-panel md:grid-cols-5">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            className={`group relative flex min-h-[22rem] flex-col justify-end overflow-hidden p-6 transition-colors duration-500 hover:bg-background md:p-8 ${
              index !== processSteps.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: easeOut, delay: index * 0.15 }}
          >
            <div className="display pointer-events-none absolute -right-2 -top-4 select-none text-[clamp(8rem,14vw,12rem)] leading-none text-foreground/5 transition-colors duration-700 group-hover:text-cyan/10">
              {step.number}
            </div>
            <div className="relative z-10">
              <h3 className="display flex items-center gap-3 text-2xl uppercase tracking-tight text-foreground">
                <span className="inline-block h-1 w-1 rounded-full bg-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="border-y border-border bg-panel pt-16 md:pt-24 lg:pt-28" id="about">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-5 pb-16 md:px-9 md:pb-24 lg:pb-28">
        <Reveal className="col-span-12 md:col-span-3" variants={clipLeft}>
          <div className="mono text-[0.7rem] uppercase tracking-[0.24em] text-cyan">PHILOSOPHY</div>
          <div className="mt-6 h-px w-16 bg-foreground/20" />
        </Reveal>
        <Reveal className="col-span-12 md:col-span-9" variants={fadeUp}>
          <p className="display max-w-5xl text-[clamp(2.5rem,6vw,7rem)] uppercase leading-[0.9] text-foreground">
            Craft is the product. The code, the rhythm, the interface, the system.
          </p>
          <div className="mt-12 max-w-2xl border-l border-cyan pl-6 text-xl leading-relaxed text-muted-foreground">
            <p>
              GlyphCode builds things that feel completely intended, not generated. Every technical
              decision has to pull its weight in the architecture.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const contacts = [
    { href: "mailto:hi@glyphcode.dev", label: "Email", value: "hi@glyphcode.dev" },
    { href: "https://github.com/NamanOG", label: "GitHub", value: "@NamanOG" },
    { href: "https://namanbagdiya.tech", label: "Portfolio", value: "namanbagdiya.tech" },
  ];

  return (
    <section className="section-shell pt-16 md:pt-24 lg:pt-28" id="contact">
      <SectionHeader eyebrow="Contact" index="INITIATE" title="Establish connection." />

      <div className="mt-12 grid grid-cols-12 gap-10">
        <Reveal className="col-span-12 flex flex-col justify-center md:col-span-7" variants={fadeUp}>
          <p className="max-w-2xl text-2xl leading-relaxed text-muted-foreground md:text-3xl">
            Have a product, brand, or system in mind? Draft the brief. We initiate response sequences
            within <span className="border-b border-cyan text-foreground">24 hours</span>.
          </p>
          <div className="mt-10">
            <a
              className="group inline-flex cursor-pointer select-none items-center gap-4 bg-foreground px-8 py-5 mono text-[0.78rem] font-bold uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-cyan hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="mailto:hi@glyphcode.dev"
            >
              Transmit Signal
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </div>
        </Reveal>

        <Stagger
          className="col-span-12 mt-8 border-t border-border md:col-span-5 md:mt-0 md:border-l md:border-t-0 md:pl-10"
          stagger={0.1}
        >
          {contacts.map((contact) => (
            <motion.a
              className="group flex cursor-pointer select-none flex-col justify-center gap-2 border-b border-border py-8 transition-colors duration-300 hover:border-cyan"
              href={contact.href}
              key={contact.label}
              rel="noreferrer"
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              variants={clipLeft}
            >
              <div className="mono flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-cyan">
                <span>{contact.label}</span>
                <span className="display text-2xl leading-none opacity-60 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-cyan">
                  →
                </span>
              </div>
              <span className="display block text-xl text-foreground transition-colors duration-300 md:text-2xl">
                {contact.value}
              </span>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-9 lg:py-16">
        <div>
          <a
            className="inline-flex cursor-pointer select-none items-center gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            href="#"
          >
            <LogoMark className="h-8 w-8" />
            <span className="display text-3xl uppercase leading-none tracking-tight">
              GlyphCode<span className="text-cyan">.</span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Precision digital studio. Engineering products, architectures, and interfaces without
            templates.
          </p>
        </div>
        <div className="mono flex flex-wrap gap-x-8 gap-y-4 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
          <a className="cursor-pointer select-none transition-colors hover:text-foreground focus-visible:outline-none" href="#work">
            Work
          </a>
          <a className="cursor-pointer select-none transition-colors hover:text-foreground focus-visible:outline-none" href="#capabilities">
            Capabilities
          </a>
          <a className="cursor-pointer select-none transition-colors hover:text-foreground focus-visible:outline-none" href="#contact">
            Contact
          </a>
          <span className="text-foreground/40">©2026 GLYPHCODE.DEV</span>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border px-5 py-6 md:px-9">
        <div className="display select-none text-[clamp(3rem,18vw,14rem)] uppercase leading-[0.8] text-foreground/10">
          GLYPHCODE
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <SelectedWork />
      <Capabilities />
      <Process />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Github, Linkedin, Instagram } from "lucide-react";
import TextType from "./TextType";
import MagneticButton from "./MagneticButton";

const ROLES = [
  "Web Developer",
  "Cloud & DevOps Engineer",
  "Software Engineer",
  "Full Stack Developer",
];

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Subtle parallax (desktop only, reduced-motion safe via the global rule)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Soft accent glow */}
      <div className="hero-gradient-line" aria-hidden />

      <motion.div
        className="container-x relative z-10 pt-28 md:pt-32 pb-16 md:pb-20"
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div variants={item} className="mb-7 md:mb-9">
            <span className="eyebrow inline-flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block w-6 h-px bg-white/30"
              />
              Software Engineer · Full Stack · Cloud
            </span>
          </motion.div>

          {/* Headline — single consistent typographic treatment for the full name */}
          <motion.h1
            variants={item}
            className="display-hero text-balance anim-text-glow"
          >
            <span className="text-[color:var(--text-secondary)]">
              Hi, I&rsquo;m
            </span>
            <br />
            <span className="font-display text-[color:var(--text-primary)]">
              Nevil Biju
            </span>
            <span className="text-[color:var(--text-primary)]">.</span>
          </motion.h1>

          {/* Rotating role, secondary */}
          <motion.div
            variants={item}
            className="mt-6 md:mt-7 flex items-center gap-3 text-[color:var(--text-secondary)]"
          >
            <span
              aria-hidden
              className="hidden sm:inline-block w-8 h-px bg-white/20"
            />
            <TextType
              text={ROLES}
              typingSpeed={70}
              pauseDuration={1500}
              showCursor
              cursorCharacter="|"
              className="text-[clamp(1rem,1vw+0.9rem,1.35rem)] font-mono tracking-tight"
              textColors={["#a1a1aa", "#d4d4d8", "#f5f5f7"]}
              startOnVisible={false}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-8 md:mt-10 body-lg text-pretty max-w-2xl"
          >
            I build reliable software, polished interfaces and cloud-powered
            systems &mdash; with a focus on performance, accessibility, and
            craft.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 md:mt-12 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#projects"
              className="btn btn-primary"
              aria-label="View selected work"
            >
              View Work
              <span className="btn-icon-arrow" aria-hidden>
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="btn btn-ghost"
              aria-label="Contact Nevil Biju"
            >
              Get in touch
            </MagneticButton>

            <div className="ml-1 flex items-center gap-2 pl-3 md:pl-4 md:ml-3 md:border-l md:border-[color:var(--border-subtle)]">
              <a
                href="https://github.com/JOSU10xD"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nevil-biju"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/josu10_03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="eyebrow">Scroll</span>
        <span className="anim-scroll-indicator" aria-hidden>
          <ArrowDown className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}

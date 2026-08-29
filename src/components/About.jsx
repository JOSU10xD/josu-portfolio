// src/components/About.jsx
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaDownload,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import resumePdf from "@/assets/NevilBijuResume.pdf";

const HIGHLIGHTS = [
  {
    label: "Full Stack",
    body: "Production web apps with React, Node.js, TypeScript and modern tooling.",
  },
  {
    label: "Cloud & DevOps",
    body: "AWS, Docker and CI/CD pipelines for reliable, automated delivery.",
  },
  {
    label: "Desktop / Electron",
    body: "Cross-platform desktop experiences and native browser UIs.",
  },
  {
    label: "Mobile",
    body: "Cross-platform apps with React Native & Expo, maps and offline UX.",
  },
  {
    label: "System Design",
    body: "Architecting clean APIs, scalable services and resilient systems.",
  },
];

const FACTS = [
  { icon: <FaMapMarkerAlt />, label: "Based in", value: "Kerala, India" },
  {
    icon: <FaGraduationCap />,
    label: "Studying",
    value: "B.Tech IT",
    sub: "Viswajyothi College of Engineering",
  },
  {
    icon: <FaBriefcase />,
    label: "Focus",
    value: "Full Stack & Cloud",
    sub: "DevOps / Web · Cloud · Mobile",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function About() {
  const [downloading, setDownloading] = useState(false);

  const onDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "NevilBijuResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => setDownloading(false), 800);
  };

  return (
    <section
      id="about"
      className="section section-divider"
      aria-label="About"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — editorial heading */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  Building software
                  <br />
                  that earns its{" "}
                  <span className="text-[color:var(--text-primary)]">place</span>.
                </>
              }
              description="I'm a software engineer focused on full-stack development and cloud systems — designing interfaces, APIs and infrastructure that work well in production, not just in demos."
            />

            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="btn btn-primary"
                aria-label="View selected projects"
              >
                View Projects
                <span className="btn-icon-arrow" aria-hidden>
                  →
                </span>
              </a>
              <motion.button
                type="button"
                onClick={onDownload}
                className="btn btn-ghost"
                whileTap={{ scale: 0.97 }}
                aria-label="Download resume"
                disabled={downloading}
              >
                <FaDownload className="h-3.5 w-3.5" />
                {downloading ? "Downloading…" : "Download CV"}
              </motion.button>
            </Reveal>
          </div>

          {/* Right — facts + capability highlights */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <Reveal>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                {FACTS.map((f, i) => (
                  <li
                    key={i}
                    className="surface surface-hover p-6 md:p-7 rounded-2xl flex flex-col gap-3 min-h-[148px]"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-default)] bg-white/[0.05] text-[color:var(--text-secondary)]">
                      {f.icon}
                    </span>
                    <span className="eyebrow">{f.label}</span>
                    <div>
                      <span className="block text-[color:var(--text-primary)] text-[1.05rem] font-semibold leading-snug tracking-tight">
                        {f.value}
                      </span>
                      {f.sub && (
                        <span className="block text-[color:var(--text-tertiary)] text-[0.9rem] leading-snug mt-1">
                          {f.sub}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="surface-strong rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <p className="eyebrow">What I do</p>
                  <span className="hidden sm:inline-block text-[0.78rem] font-mono text-[color:var(--text-faint)] tracking-wider">
                    {HIGHLIGHTS.length.toString().padStart(2, "0")} / focus
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {HIGHLIGHTS.map((h, i) => (
                    <motion.li
                      key={h.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                      className="border-l border-[color:var(--border-default)] pl-4 md:pl-5"
                    >
                      <h3 className="font-display text-[1.05rem] font-semibold tracking-tight text-[color:var(--text-primary)] mb-1.5">
                        {h.label}
                      </h3>
                      <p className="text-[0.98rem] leading-[1.65] text-[color:var(--text-secondary)]">
                        {h.body}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

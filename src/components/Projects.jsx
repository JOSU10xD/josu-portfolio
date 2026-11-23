import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Optimized WebP & SVG Project Assets
import qb1 from "@/assets/projects/01-queuebond-grid-projects.webp";
import qb2 from "@/assets/projects/02-queuebond-capital-exposure.webp";
import qb3 from "@/assets/projects/03-queuebond-evidence.webp";
import queuebondLogo from "@/assets/projects/queuebond-logo.webp";

import gcl1 from "@/assets/projects/04-gameconfiglab-discover.webp";
import gcl2 from "@/assets/projects/05-gameconfiglab-hardware.webp";
import gcl3 from "@/assets/projects/06-gameconfiglab-minecraft.webp";
import gclLogo from "@/assets/projects/gcl-logo.svg";

import mmc1 from "@/assets/projects/07-mapmycampus-navigation.webp";
import mmc2 from "@/assets/projects/08-mapmycampus-floors.webp";
import mapmycampusLogo from "@/assets/projects/mapmycampus-logo.webp";

import crowdclueImg from "@/assets/projects/crowdclue-preview.webp";

import gridImg from "@/assets/projects/grid.webp";
import grid1 from "@/assets/projects/grid1.webp";
import grid2 from "@/assets/projects/grid2.webp";
import grid3 from "@/assets/projects/grid3.webp";
import grid4 from "@/assets/projects/grid4.webp";
import grid5 from "@/assets/projects/grid5.webp";
import gridLogo from "@/assets/projects/gridlogo.webp";

import py2cImg from "@/assets/projects/py2c-preview.webp";

import jenkinsImg from "@/assets/projects/jenkins.webp";

import cine1 from "@/assets/projects/cine1.webp";
import cine2 from "@/assets/projects/cine2.webp";
import cine3 from "@/assets/projects/cine3.webp";
import cine4 from "@/assets/projects/cine4.webp";
import cineshelfLogo from "@/assets/projects/cineshelflogo.webp";

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    name: "QueueBond OS",
    description:
      "Early-stage B2B SaaS platform for renewable-energy and battery-storage grid-interconnection obligations, financial exposure calculations, audit-ready evidence lineage, and scenario modeling.",
    tech: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Supabase", "Vitest"],
    image: qb1,
    images: [qb1, qb2, qb3],
    logo: queuebondLogo,
    link: "https://github.com/JOSU10xD/QueueBond",
    live: "https://queuebond.online",
    featured: true,
    category: "SaaS / Full Stack",
  },
  {
    name: "GameConfigLab",
    description:
      "A configuration and hardware-compatibility relationship platform connecting games, hardware specs, and community evidence into a deterministic, verifiable graph with Cloudflare Workers.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Cloudflare Workers", "Vitest"],
    image: gcl1,
    images: [gcl1, gcl2, gcl3],
    logo: gclLogo,
    link: "https://github.com/JOSU10xD/GameConfigLab",
    live: "https://gameconfiglab.online",
    featured: true,
    category: "Web / Distributed",
  },
  {
    name: "MapMyCampus",
    description:
      "Offline indoor campus navigation application built with Flutter, featuring A* pathfinding, multi-floor SVG mapping (ground, 1st, 2nd floors), and local JSON graph routing.",
    tech: ["Flutter", "Dart", "A* Pathfinding", "SVG", "Vector Math"],
    image: mmc1,
    images: [mmc1, mmc2],
    logo: mapmycampusLogo,
    link: "https://github.com/JOSU10xD/MapMyCampus",
    featured: true,
    category: "Mobile / Algorithms",
  },
  {
    name: "CrowdClue",
    description:
      "Crowdsourced investigative clue and moderation platform featuring automated face/skin blurring image-sanitizing pipelines, JWT authentication, and Docker/Kubernetes container orchestration.",
    tech: ["Python", "Flask", "PostgreSQL", "Docker", "Kubernetes", "JWT"],
    image: crowdclueImg,
    images: [crowdclueImg],
    logo: crowdclueImg,
    link: "https://github.com/JOSU10xD/crowdclue",
    featured: false,
    category: "Backend & Cloud",
  },
  {
    name: "GRID Browser",
    description:
      "Chromium-based desktop browser built with Electron and Node.js. Features custom multi-process tab session management, bookmarking architecture, and native navigation controls.",
    tech: ["Electron", "Node.js", "Chromium", "JavaScript"],
    image: gridImg,
    images: [grid1, grid2, grid3, grid4, grid5, gridImg],
    logo: gridLogo,
    link: "https://github.com/JOSU10xD/GRID-Browser",
    featured: false,
    category: "Desktop Engineering",
  },
  {
    name: "Py2C Transpiler",
    description:
      "Python-to-C source-to-source compiler built with a recursive-descent grammar parser, typed AST generator for expressions and control flow, and native C code emitter.",
    tech: ["Python", "C", "Compiler Design", "Grammar & AST"],
    image: py2cImg,
    images: [py2cImg],
    logo: py2cImg,
    link: "https://github.com/JOSU10xD/Transpiler-py-cc",
    featured: false,
    category: "Systems & Compilers",
  },
  {
    name: "Automated CI/CD Pipeline",
    description:
      "Multi-stage automated delivery pipeline with declarative Jenkinsfile, Maven unit/integration testing, SonarQube static analysis quality gates, Nexus artifact management, and Terraform AWS provisioning.",
    tech: ["Jenkins", "Docker", "AWS", "Terraform", "SonarQube"],
    image: jenkinsImg,
    images: [jenkinsImg],
    logo: jenkinsImg,
    link: "https://github.com/JOSU10xD/Jenkins-CICD-project",
    featured: false,
    category: "DevOps & Cloud",
  },
  {
    name: "CineShelf",
    description:
      "Mobile entertainment and media-tracking application with offline caching, search indexing, and collection categorization built on a modular React Native Context architecture.",
    tech: ["React Native", "Expo", "TypeScript", "Expo Router"],
    image: cine1,
    images: [cine1, cine2, cine3, cine4],
    logo: cineshelfLogo,
    link: "https://github.com/JOSU10xD/CineShelf",
    featured: false,
    category: "Mobile",
  },
];

const featured = projects.filter((p) => p.featured);
const secondary = projects.filter((p) => !p.featured);

export default function Projects() {
  const [lightbox, setLightbox] = useState(null); // { images, index, name, link, live }
  const [hovered, setHovered] = useState(null);

  const openLightbox = (project) => {
    setLightbox({
      images: project.images?.length ? project.images : [project.image],
      index: 0,
      name: project.name,
      link: project.link,
      live: project.live,
    });
  };
  const closeLightbox = () => setLightbox(null);
  const next = () =>
    setLightbox((s) =>
      s ? { ...s, index: (s.index + 1) % s.images.length } : s
    );
  const prev = () =>
    setLightbox((s) =>
      s
        ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length }
        : s
    );

  return (
    <section
      id="projects"
      className="section section-divider"
      aria-label="Projects"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Things I&rsquo;ve{" "}
                  <span className="font-serif italic font-normal">built</span>.
                </>
              }
              description="A curated selection of software systems spanning B2B SaaS, distributed web platforms, graph pathfinding, compilers, and cloud infrastructure."
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3 items-start lg:items-end">
            <span className="eyebrow">
              {projects.length} projects · 2022 - present
            </span>
            <a
              href="https://github.com/JOSU10xD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.92rem] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              See all on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Featured projects */}
        <div className="mt-14 md:mt-20 flex flex-col gap-8 md:gap-12">
          {featured.map((p, i) => (
            <FeaturedProject
              key={p.name}
              project={p}
              index={i + 1}
              flip={i % 2 === 1}
              onOpen={() => openLightbox(p)}
              isHovered={hovered === p.name}
              setHovered={setHovered}
            />
          ))}
        </div>

        {/* Secondary projects */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <h3 className="font-display text-[clamp(1.25rem,1.4vw+0.7rem,1.625rem)] font-semibold tracking-tight">
                More Engineering Projects
              </h3>
              <span className="eyebrow">/ {secondary.length} projects</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {secondary.map((p, i) => (
              <SecondaryProject
                key={p.name}
                project={p}
                index={featured.length + i + 1}
                onOpen={() => openLightbox(p)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            data={lightbox}
            onClose={closeLightbox}
            onNext={next}
            onPrev={prev}
            setIndex={(i) => setLightbox((s) => (s ? { ...s, index: i } : s))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function FeaturedProject({ project, index, flip, onOpen, isHovered, setHovered }) {
  return (
    <Reveal>
      <article
        className={`project-card project-card-featured ${flip ? "flip" : ""}`}
        onMouseEnter={() => setHovered(project.name)}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="project-image-wrap"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        >
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="project-image"
            loading="lazy"
            decoding="async"
          />
          <div className="project-image-overlay" aria-hidden />
          {project.images?.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur px-2.5 py-1.5 text-[0.7rem] font-medium text-white/90 hover:bg-black/80 transition-colors"
              aria-label="Open image gallery"
            >
              <Maximize2 className="h-3 w-3" />
              {project.images.length} screens
            </button>
          )}
        </div>

        <div className="project-body">
          <div className="project-meta">
            <span className="project-num">
              {String(index).padStart(2, "0")} / Featured
            </span>
            <span className="chip">{project.category}</span>
          </div>

          <h3 className="project-title">{project.name}</h3>
          <p className="project-desc">{project.description}</p>

          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="project-footer">
            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <Github className="h-3.5 w-3.5" />
                  Repository
                  <ArrowUpRight className="arrow h-3.5 w-3.5" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link text-white/90"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Website
                  <ArrowUpRight className="arrow h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onOpen}
              className="text-[0.82rem] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function SecondaryProject({ project, index, onOpen }) {
  return (
    <Reveal>
      <article className="project-card h-full flex flex-col justify-between">
        <div>
          <div
            className="project-image-wrap"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
          >
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="project-image"
              loading="lazy"
              decoding="async"
            />
            <div className="project-image-overlay" aria-hidden />
            {project.images?.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 backdrop-blur px-2 py-1 text-[0.65rem] font-medium text-white/90 hover:bg-black/80 transition-colors"
                aria-label="Open image gallery"
              >
                <Maximize2 className="h-2.5 w-2.5" />
                {project.images.length}
              </button>
            )}
          </div>

          <div className="project-body">
            <div className="project-meta">
              <span className="project-num">
                {String(index).padStart(2, "0")}
              </span>
              <span className="chip">{project.category}</span>
            </div>

            <h3 className="project-title">{project.name}</h3>
            <p className="project-desc">{project.description}</p>

            <div className="project-tags">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-body pt-0">
          <div className="project-footer">
            <div className="flex items-center gap-2.5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                  <ArrowUpRight className="arrow h-3.5 w-3.5" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link text-white/90"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                  <ArrowUpRight className="arrow h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onOpen}
              className="text-[0.82rem] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Lightbox({ data, onClose, onNext, onPrev, setIndex }) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const minSwipeDistance = 45;

  const handleTouchStart = (e) => {
    touchEndX.current = null;
    if (e.targetTouches && e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches[0]) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    const endX =
      touchEndX.current ??
      (e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientX
        : null);
    if (touchStartX.current === null || endX === null) return;
    const distance = touchStartX.current - endX;
    if (distance > minSwipeDistance) {
      onNext();
    } else if (distance < -minSwipeDistance) {
      onPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name} image preview`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      {data.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <motion.div
        key={data.index}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center"
      >
        <img
          src={data.images[data.index]}
          alt={`${data.name} preview ${data.index + 1}`}
          className="max-h-[78vh] w-auto max-w-full rounded-xl border border-white/10 shadow-2xl"
          loading="eager"
          decoding="async"
        />
        <div className="mt-5 flex items-center justify-between w-full max-w-3xl">
          <p className="text-[color:var(--text-secondary)] text-[0.85rem]">
            <span className="text-[color:var(--text-primary)] font-medium">
              {data.name}
            </span>{" "}
            {data.images.length > 1 &&
              `· ${data.index + 1} of ${data.images.length}`}
          </p>
          {data.images.length > 1 && (
            <div className="flex items-center gap-1.5">
              {data.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === data.index
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[0.82rem]">
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1"
            >
              GitHub repository →
            </a>
          )}
          {data.live && (
            <a
              href={data.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-primary)] hover:underline transition-colors inline-flex items-center gap-1 font-medium"
            >
              Visit live site →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

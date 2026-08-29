import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

import gridLogo from "@/assets/projects/gridlogo (3).png";
import grid1 from "@/assets/projects/grid1.png";
import grid2 from "@/assets/projects/grid2.png";
import grid3 from "@/assets/projects/grid3.png";
import grid4 from "@/assets/projects/grid4.png";
import grid5 from "@/assets/projects/grid5.png";
import gridImg from "@/assets/projects/grid.png";

import jenkinsImg from "@/assets/projects/jenkins.png";

import browseruiImg from "@/assets/projects/browserui.png";
import browseruiLogo from "@/assets/projects/browseruilogo.png";

import cineshelfLogo from "@/assets/projects/cineshelflogo.jpeg";
import cine1 from "@/assets/projects/cine1.png";
import cine2 from "@/assets/projects/cine2.png";
import cine3 from "@/assets/projects/cine3.png";
import cine4 from "@/assets/projects/cine4.png";

import expenseImg from "@/assets/projects/expense.png";

import mapmycampusImg from "@/assets/projects/mapmycampus.png";
import mapmycampusLogo from "@/assets/projects/MapMyCampusLogo (1) - Copy.jpg";

import collectivevoiceLogo from "@/assets/projects/collectivevoicelogo.png";
import cv1 from "@/assets/projects/cv1.png";
import cv2 from "@/assets/projects/cv2.png";
import cv3 from "@/assets/projects/cv3.png";
import cv4 from "@/assets/projects/cv4.png";
import cv5 from "@/assets/projects/cv5.png";

import moreathomeLogo from "@/assets/projects/moreathomelogo).png";
import mah1 from "@/assets/projects/mah1.png";
import mah2 from "@/assets/projects/mah2.png";
import mah3 from "@/assets/projects/mah3.png";
import mah4 from "@/assets/projects/mah4.png";

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    name: "GRID Browser",
    description:
      "A Chromium-based browser built with Electron & Node.js. Custom tab management, bookmarks and WebView2-class capabilities wrapped in a focused UI.",
    tech: ["Electron", "Node.js", "JavaScript"],
    image: gridImg,
    images: [grid1, grid2, grid3, grid4, grid5, gridImg],
    logo: gridLogo,
    link: "https://github.com/JOSU10xD/GRID-Browser",
    featured: true,
    category: "Desktop",
  },
  {
    name: "CineShelf",
    description:
      "A mobile media-tracking application for organising movies, TV shows and entertainment collections, built on a scalable React Native Context architecture.",
    tech: ["React Native", "Expo", "TypeScript", "Expo Router"],
    image: cine1,
    images: [cine1, cine2, cine3, cine4],
    logo: cineshelfLogo,
    link: "https://github.com/JOSU10xD/CineShelf",
    featured: true,
    category: "Mobile",
  },
  {
    name: "Jenkins CI/CD Pipeline",
    description:
      "Reference pipeline demonstrating GitHub → Jenkins → Docker → AWS deployment with automated tests and quality gates.",
    tech: ["Jenkins", "Docker", "AWS"],
    image: jenkinsImg,
    images: [jenkinsImg],
    logo: jenkinsImg,
    link: "https://github.com/JOSU10xD/Jenkins-CICD-project",
    featured: false,
    category: "DevOps",
  },
  {
    name: "BrowserUI-Chromium",
    description:
      "A WinUI 3 / C# native browser UI integrating WebView2 with custom clipboard and history features.",
    tech: ["C#", "WinUI 3", "WebView2"],
    image: browseruiImg,
    images: [browseruiImg],
    logo: browseruiLogo,
    link: "https://github.com/JOSU10xD/BrowserUI-Chromium",
    featured: false,
    category: "Desktop",
  },
  {
    name: "MapMyCampus",
    description:
      "A campus navigation and location-discovery mobile app using geolocation, route planning and map integration.",
    tech: ["React Native", "Expo", "TypeScript", "Geolocation"],
    image: mapmycampusImg,
    images: [mapmycampusImg],
    logo: mapmycampusLogo,
    link: "https://github.com/JOSU10xD/MapMyCampus",
    featured: false,
    category: "Mobile",
  },
  {
    name: "Collective Voice",
    description:
      "A community-driven engagement and discussion platform for content sharing, interactive polls and decision-making.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    image: cv1,
    images: [cv1, cv2, cv3, cv4, cv5],
    logo: collectivevoiceLogo,
    link: "https://github.com/JOSU10xD/collective-voice",
    featured: false,
    category: "Mobile",
  },
  {
    name: "MoreAtHome",
    description:
      "A custom educational mobile app presenting modular learning content and visual learning progress tracks for a client engagement.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    image: mah1,
    images: [mah1, mah2, mah3, mah4],
    logo: moreathomeLogo,
    link: "https://github.com/JOSU10xD/more-learn-light",
    featured: false,
    category: "Mobile",
  },
  {
    name: "Expense Tracker",
    description:
      "A React-based expense tracker with authentication, a persistent store and charts for spending insights.",
    tech: ["React", "Firebase", "Chart.js"],
    image: expenseImg,
    images: [expenseImg],
    logo: expenseImg,
    link: "https://github.com/JOSU10xD/expense-tracker",
    featured: false,
    category: "Web",
  },
];

const featured = projects.filter((p) => p.featured);
const secondary = projects.filter((p) => !p.featured);

export default function Projects() {
  const [lightbox, setLightbox] = useState(null); // { images, index, name, link }
  const [hovered, setHovered] = useState(null);

  const openLightbox = (project) => {
    setLightbox({
      images: project.images?.length ? project.images : [project.image],
      index: 0,
      name: project.name,
      link: project.link,
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
              description="A small selection of projects spanning full-stack web, desktop and mobile. Each one taught me something about shipping reliable software."
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3 items-start lg:items-end">
            <span className="eyebrow">
              {projects.length} projects · 2022 — present
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
                More work
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
      <motion.article
        className={`project-card project-card-featured ${flip ? "flip" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        onMouseEnter={() => setHovered(project.name)}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="project-image-wrap" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}>
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="project-image"
            loading="lazy"
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
              {project.images.length} images
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
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Github className="h-3.5 w-3.5" />
              View Repository
              <ArrowUpRight className="arrow h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={onOpen}
              className="text-[0.82rem] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function SecondaryProject({ project, index, onOpen }) {
  return (
    <Reveal>
      <motion.article
        className="project-card h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="project-image-wrap" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}>
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="project-image"
            loading="lazy"
          />
          <div className="project-image-overlay" aria-hidden />
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

          <div className="project-footer">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Github className="h-3.5 w-3.5" />
              View
              <ArrowUpRight className="arrow h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Lightbox({ data, onClose, onNext, onPrev, setIndex }) {
  // Body scroll lock + keyboard navigation
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
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name} image preview`}
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
        transition={{ duration: 0.25, ease: EASE }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center"
      >
        <img
          src={data.images[data.index]}
          alt={`${data.name} image ${data.index + 1}`}
          className="max-h-[78vh] w-auto max-w-full rounded-xl border border-white/10 shadow-2xl"
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
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-[0.8rem] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
        >
          Open repository →
        </a>
      </motion.div>
    </motion.div>
  );
}

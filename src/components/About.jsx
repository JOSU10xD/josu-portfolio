// src/components/About.jsx
import React from "react";
import MagicBentoLight from "./MagicBentoLight";
import TechStack from "./TechStack";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-16 px-4 flex items-center"
      aria-label="About section"
    >
      {/* local styles to keep translucent panel readable and larger text */}
      <style>{`
        .about-panel {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 2.5rem;
          backdrop-filter: blur(10px) saturate(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.45);
          color: rgba(255,255,255,0.95);
        }

        .about-title {
          font-size: clamp(2rem, 3.6vw, 2.6rem);
          line-height: 1.02;
          text-shadow: 0 10px 28px rgba(0,0,0,0.45);
        }

        .about-list li {
          font-size: 1.08rem;
        }

        .about-body {
          font-size: 1.06rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.95);
          text-shadow: 0 6px 16px rgba(0,0,0,0.35);
        }

        .bento-wrap {
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 14px;
          padding: 1rem;
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        }

        .about-header-small {
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.16em;
          font-size: 0.86rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-panel, .bento-wrap { transition: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column: translucent panel with larger text */}
        <div className="about-panel">
          <p className="about-header-small mb-3">ABOUT ME</p>

          <h1 className="about-title font-extrabold mb-6">
            Hi, I'm <span className="text-neutral-100">Nevil Biju</span>
          </h1>

          <ul className="space-y-3 text-neutral-200 mb-6 about-list">
            <li>📍 Kerala, India</li>
            <li>🎓 Final year B.Tech (IT) — Viswajyothi College of Engineering</li>
            <li>💼 Full Stack & Cloud/DevOps</li>
            <li>🧩 Web apps, Electron apps, CI/CD, Cloud deployments</li>
          </ul>

          <p className="about-body max-w-prose mb-6">
            I build fast, modern web applications and developer tools. I enjoy bridging the gap between
            UI/UX, platform automation, and resilient cloud-native systems. I work with React, Node, Electron,
            Docker, Jenkins and AWS — and I’m open to collaborations.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="#projects" className="px-6 py-3 bg-white text-black rounded-lg font-medium shadow-sm">View Projects</a>
            <a href="#contact" className="px-6 py-3 border border-white/10 rounded-lg text-white/90">Get in Touch</a>
          </div>
        </div>

        {/* Right column: translucent bento + tech stack */}
        <div className="space-y-6">
          <div className="bento-wrap flex items-center justify-center p-6">
            <MagicBentoLight
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              spotlightRadius={360}
              particleCount={6}
              enableTilt={true}
              glowColor={"245,245,250"} /* softer milky white */
              clickEffect={true}
              enableMagnetism={true}
              disableAnimations={false}
            />
          </div>

          {/* Tech stack box — readable, large text, icons on left */}
          <div className="about-panel">
            <p className="about-header-small mb-3">TECH STACK</p>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "rgba(255,255,255,0.96)" }}>Primary technologies</h3>

            <TechStack />
          </div>
        </div>
      </div>
    </section>
  );
}
// src/components/About.jsx
import React from "react";
import MagicBentoLight from "./MagicBentoLight";
import TechStack from "./TechStack";
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaPuzzlePiece, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import resumePdf from "@/assets/NevilBijuResume.pdf";

export default function About() {



  return (
    <section
      id="about"
      className="min-h-screen py-16 px-4 flex items-center"
      aria-label="About section"
    >
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

        /* Glowing button animation */
        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(220, 220, 255, 0.7), 0 0 20px rgba(220, 220, 255, 0.5); }
          50% { box-shadow: 0 0 15px rgba(220, 220, 255, 0.8), 0 0 30px rgba(220, 220, 255, 0.6); }
          100% { box-shadow: 0 0 10px rgba(220, 220, 255, 0.7), 0 0 20px rgba(220, 220, 255, 0.5); }
        }

        /* Glowing text animation */
        @keyframes text-glow {
          0% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.8); }
          100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.5); }
        }

        .glow-button {
          animation: glow 2s infinite;
        }

        .glow-text {
          animation: text-glow 2s infinite;
          color: white !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-panel, .bento-wrap, .glow-button, .glow-text { 
            transition: none !important; 
            animation: none !important;
          }
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
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-silver-300 text-lg" />
              <span>Kerala, India</span>
            </li>
            <li className="flex items-center gap-3">
              <FaGraduationCap className="text-silver-300 text-lg" />
              <span>Final year B.Tech (IT) — Viswajyothi College of Engineering</span>
            </li>
            <li className="flex items-center gap-3">
              <FaBriefcase className="text-silver-300 text-lg" />
              <span>Full Stack & Cloud/DevOps</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPuzzlePiece className="text-silver-300 text-lg" />
              <span>Web apps, Electron apps, CI/CD, Cloud deployments</span>
            </li>
          </ul>

          <p className="about-body max-w-prose mb-6">
            I build fast, modern web applications and developer tools. I enjoy bridging the gap between
            UI/UX, platform automation, and resilient cloud-native systems. I work with React, Node, Electron,
            Docker, Jenkins and AWS — and I'm open to collaborations.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a href="#projects" className="px-6 py-3 bg-white text-black rounded-lg font-medium shadow-sm hover:bg-white/90 transition-colors">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/10 rounded-lg text-white/90 hover:bg-white/5 transition-colors">
              Get in Touch
            </a>
            
            {/* Download CV Button */}
              <motion.button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = resumePdf;
                  link.download = "NevilBijuResume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="glow-button px-6 py-3 bg-gradient-to-r from-silver-500 to-silver-700 rounded-lg relative overflow-hidden group flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(220, 220, 255, 0.9), 0 0 40px rgba(220, 220, 255, 0.7)"
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0 0 10px rgba(220, 220, 255, 0.6), 0 0 20px rgba(220, 220, 255, 0.4)"
                }}
              >
                <FaDownload className="glow-text" />
                <span className="glow-text font-medium">Download CV</span>
              </motion.button>
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
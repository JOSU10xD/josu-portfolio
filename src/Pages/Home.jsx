// src/Pages/Home.jsx
import React from "react";
import Beams from "../components/Beams";
import TextType from "../components/TextType";
import TimelineDemo from "../components/ui/timeline-demo";
import { Navbar } from "../components/Navbar";
import Projects from "../components/Projects";
import About from "../components/About";

export const Home = () => {
  return (
    <div className="relative">
      {/* background beams */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Beams
          beamWidth={1.8}
          beamHeight={40}
          beamNumber={10}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* styles scoped to this file */}
      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        /* container for hero content */
        .hero-content {
          position: relative;
          z-index: 1;
        }

        /* Title: balanced shadow + outer glow */
        .hero-title {
          text-shadow:
            0 3px 6px rgba(0, 0, 0, 0.6),   /* dark shadow for light backgrounds */
            0 -1px 1px rgba(0, 0, 0, 0.4),
            0 0 8px rgba(255, 255, 255, 0.4); /* light glow for dark backgrounds */
          line-height: 1.02;
        }

        /* typed line: subtle outline + inner glow */
        .hero-type {
          position: relative;
          display: inline-block;
          padding: 0.25rem 0.5rem;
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 6px rgba(255, 255, 255, 0.35);
        }

        /* subtext paragraph shadow to increase legibility */
        .hero-desc {
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 4px rgba(255, 255, 255, 0.25);
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <Navbar />

        <section
          id="home"
          className="hero-section min-h-screen flex flex-col items-center justify-center p-8 text-white"
        >
          <div className="hero-content w-full max-w-5xl text-center">
            <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-white">
              Hi, I'm <span className="text-neutral-200">Nevil Biju</span>
            </h1>

            <div className="mt-4 hero-type">
              <TextType
                text={[
                  "Web Developer",
                  "Cloud & DevOps Engineer",
                  "Software Engineer",
                  "Full Stack Developer",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-xl sm:text-2xl md:text-3xl text-neutral-200"
                textColors={["#9aa1a8", "#bfc7cf", "#dfe6ea", "#eaeef0"]}
                startOnVisible={true}
              />
            </div>

            <p className="mt-8 hero-desc text-neutral-200 max-w-2xl mx-auto text-lg">
              I build polished, responsive web apps and tooling — focusing on
              reliable systems, delightful UI and pragmatic engineering.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-white/90 text-black rounded-md font-medium shadow-sm hover:scale-[1.02] transition-transform"
              >
                View Work
              </a>
              <a
                href="#about"
                className="px-6 py-3 border border-white/10 text-white rounded-md hover:bg-white/5 transition-colors"
              >
                About
              </a>
            </div>
          </div>
        </section>

        {/* About (component below) */}
        <About />

        {/* unchanged timeline */}
        <section id="timeline" className="min-h-screen p-8 bg-transparent">
          <TimelineDemo />
        </section>

        <section id="projects" className="min-h-screen p-8 bg-transparent">
          <Projects />
        </section>
      </div>
    </div>
  );
};

export default Home;

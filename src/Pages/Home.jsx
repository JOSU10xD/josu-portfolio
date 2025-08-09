import React, { useEffect, useState } from "react";
import Beams from "../components/Beams";
import TextType from "../components/TextType";
import TimelineDemo from "../components/ui/timeline-demo";
import { Navbar } from "../components/Navbar";
import Projects from "../components/Projects";
import About from "../components/About";

export const Home = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#000";
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden"; // lock scroll during load

    const markReady = () => {
      requestAnimationFrame(() => {
        const prefersReduced =
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
          setReady(true);
          document.documentElement.style.overflowY = ""; // unlock scroll
          return;
        }
        setTimeout(() => {
          setReady(true);
          document.documentElement.style.overflowY = ""; // unlock scroll
        }, 160);
      });
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      const fallback = setTimeout(markReady, 1200);
      return () => {
        window.removeEventListener("load", markReady);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <div className="relative">
      <style>{`
        html, body { overflow-x: hidden; }
        .hero-section { position: relative; overflow: hidden; }
        .hero-content { position: relative; z-index: 1; }
        .hero-title {
          text-shadow:
            0 3px 6px rgba(0,0,0,0.6),
            0 -1px 1px rgba(0,0,0,0.4),
            0 0 8px rgba(255,255,255,0.14);
          line-height: 1.02;
        }
        .hero-type {
          position: relative;
          display: inline-block;
          padding: 0.25rem 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.45), 0 0 6px rgba(255,255,255,0.18);
        }
        .hero-desc { text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
        @media (prefers-reduced-motion: reduce) {
          .site-fade { transition: none !important; }
        }
      `}</style>

      {/* fade overlay */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[900] pointer-events-none bg-black transition-opacity duration-700 ease-out ${
          ready ? "opacity-0 invisible" : "opacity-100"
        }`}
      />

      {/* beams */}
      <div
        className="absolute inset-0 z-0"
        style={{
          visibility: ready ? "visible" : "hidden",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
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

      {/* main content with explicit relative positioning for framer-motion */}
      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 site-fade transform transition-all duration-700 ease-out ${
          ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{ color: "#fff" }}
      >
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
              I build polished, responsive web apps and tooling — focusing on reliable systems,
              delightful UI and pragmatic engineering.
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

        <About />

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

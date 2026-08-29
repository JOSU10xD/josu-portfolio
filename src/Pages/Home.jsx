// src/Pages/Home.jsx
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

// Lazy-load the Three.js background to keep initial mobile bundle small.
const Beams = lazy(() => import("../components/Beams"));

export const Home = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Detect capability + viewport class before mounting the Beams
  // background. We DO NOT disable Beams on mobile — instead we use a
  // lighter configuration (lower DPR, fewer beams, fewer segments).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    })();
    setIsMobile(window.innerWidth < 900);
    setShouldRenderCanvas(!prefersReduced && hasWebGL);

    // Track viewport-class changes so a desktop user who resizes the
    // window to a narrow size picks up the lighter config (and vice-versa)
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pause the heavy Beams render loop when the page is hidden
  // (tab in background) or when the user has scrolled so far that
  // the (fixed) canvas would be wasted work. We unpause on focus.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Scroll to the targeted section on hash changes
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    const targetId = hash.replace(/^#\/?/, "");
    if (!targetId) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative min-h-screen">
      <Cursor />

      {/* Three.js background / CSS fallback */}
      {shouldRenderCanvas ? (
        <div
          className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
          aria-hidden="true"
        >
          <Suspense fallback={<div className="css-bg-fallback" />}>
            {isMobile ? (
              <Beams
                beamWidth={1.6}
                beamHeight={18}
                beamNumber={4}
                lightColor="#b6b1a8"
                speed={0.7}
                noiseIntensity={0.6}
                scale={0.18}
                rotation={24}
                dpr={[1, 1.25]}
                heightSegments={48}
                paused={!isVisible}
              />
            ) : (
              <Beams
                beamWidth={1.4}
                beamHeight={22}
                beamNumber={7}
                lightColor="#b6b1a8"
                speed={1.5}
                noiseIntensity={0.7}
                scale={0.18}
                rotation={24}
                dpr={[1, 1.5]}
                heightSegments={100}
                paused={!isVisible}
              />
            )}
          </Suspense>
        </div>
      ) : (
        <div className="css-bg-fallback" aria-hidden="true" />
      )}
      {/* dark overlay above beams to make content surfaces dominant */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(8,8,10,0.45) 0%, rgba(8,8,10,0.65) 60%, rgba(8,8,10,0.78) 100%)",
        }}
      />
      <div className="grain-layer" aria-hidden="true" />

      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

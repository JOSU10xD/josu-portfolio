// src/components/MagicBentoLight.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 6;
const DEFAULT_SPOTLIGHT_RADIUS = 360;
const DEFAULT_GLOW_COLOR = "245, 245, 250"; // milky/silver white
const MOBILE_BREAKPOINT = 768;

const cardData = [
  { color: "rgba(255,255,255,0.03)", title: "Full Stack", description: "React · Node · TypeScript", label: "DEV" },
  { color: "rgba(255,255,255,0.03)", title: "Cloud / DevOps", description: "AWS · Docker · CI/CD", label: "CLOUD" },
  { color: "rgba(255,255,255,0.03)", title: "UI / UX", description: "Polished interfaces & accessibility", label: "DESIGN" },
  { color: "rgba(255,255,255,0.03)", title: "Desktop Apps", description: "Electron / WinUI / Native", label: "DESKTOP" },
  { color: "rgba(255,255,255,0.03)", title: "Automation", description: "Automations & pipelines", label: "AUTOMATE" },
  { color: "rgba(255,255,255,0.03)", title: "Tools & Infra", description: "Developer tools & infra", label: "TOOLS" },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "bento-particle";
  el.style.cssText = `
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(${color}, 0.9);
    box-shadow: 0 0 10px rgba(${color}, 0.22);
    pointer-events: none;
    z-index: 6;
    left: ${x}px;
    top: ${y}px;
    transform-origin: center;
    opacity: 0.9;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.85,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", `${glow}`);
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power1.in",
        onComplete: () => p.parentNode?.removeChild(p),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, idx) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, {
          opacity: 0.22,
          duration: 2 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, idx * 120);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current || disableAnimations) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(element, { rotateX: 2.5, rotateY: 2.5, duration: 0.36, ease: "power2.out", transformPerspective: 1000 });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.36, ease: "power2.out" });
      if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.36, ease: "power2.out" });
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        gsap.to(element, { rotateX, rotateY, duration: 0.12, ease: "power2.out", transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.28, ease: "power2.out" });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.14) 0%, rgba(${glowColor}, 0.06) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 999;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement("div");
    spotlight.className = "about-global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: ${spotlightRadius * 2}px;
      height: ${spotlightRadius * 2}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.22) 0%,
        rgba(${glowColor}, 0.14) 12%,
        rgba(${glowColor}, 0.08) 30%,
        rgba(${glowColor}, 0.04) 55%,
        transparent 70%
      );
      z-index: 40;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 160ms linear;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".about-bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.28, ease: "power2.out" });
        gridRef.current.querySelectorAll(".card").forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      gridRef.current.querySelectorAll(".card").forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.08, ease: "power2.out" });
      const targetOpacity = minDistance <= proximity ? 0.92 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.92 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: 0.12, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll(".card").forEach((card) => card.style.setProperty("--glow-intensity", "0"));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="about-bento-section" style={{ padding: 0 }}>
    <div ref={gridRef} className="bento-grid" style={{ maxWidth: 920, margin: "0 auto" }}>
      {children}
    </div>

    <style>{`
      .about-bento-section { --glow-radius: 220px; --glow-color: rgba(${DEFAULT_GLOW_COLOR}, 0.18); }
      .bento-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
      @media (min-width: 980px) { .bento-grid { grid-template-columns: repeat(3, 1fr); } }
      .card {
        position: relative;
        padding: 18px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
        color: rgba(255,255,255,0.94);
        min-height: 140px;
        overflow: hidden;
        box-shadow: 0 8px 26px rgba(0,0,0,0.35);
        transition: transform .18s ease, box-shadow .18s ease;
      }
      .card--border-glow::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%),
          rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity,0) * 0.45)) 0%,
          rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity,0) * 0.22)) 25%,
          transparent 60%);
        mix-blend-mode: screen;
        transition: opacity .18s ease, background 220ms ease;
        z-index: 0;
      }
      .card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.45); }
      .card__title { font-weight: 700; font-size: 1.05rem; margin: 0 0 6px 0; z-index: 3; position: relative; color: rgba(255,255,255,0.96); }
      .card__label { font-size: 0.86rem; z-index: 3; opacity: 0.9; position: relative; color: rgba(255,255,255,0.85); }
      .card__description { font-size: 0.92rem; color: rgba(255,255,255,0.85); margin: 0; z-index: 3; position: relative; }
      .bento-particle { pointer-events: none; border-radius: 50%; }
    `}</style>
  </div>
);

const MagicBentoLight = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldDisableAnimations = disableAnimations || isMobile || prefersReduced;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `card card--border-glow`;
          const cardStyle = {
            backgroundColor: card.color,
            borderColor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.96)",
            "--glow-x": "50%",
            "--glow-y": "50%",
            "--glow-intensity": "0",
            "--glow-radius": `${spotlightRadius}px`,
          };

          return (
            <ParticleCard
              key={index}
              className={baseClassName}
              style={cardStyle}
              disableAnimations={shouldDisableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              <div style={{ zIndex: 2 }}>
                <div className="card__header flex justify-between items-center">
                  <span className="card__label">{card.label}</span>
                </div>
                <div className="card__content mt-3">
                  <h3 className="card__title">{card.title}</h3>
                  <p className="card__description">{card.description}</p>
                </div>
              </div>
            </ParticleCard>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBentoLight;

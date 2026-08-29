import { useEffect, useRef, useState } from "react";

/**
 * Cursor — purely decorative. Renders a soft dot + ring around the
 * native system pointer for visual flair.
 *
 *  - NEVER hides or replaces the native browser cursor.
 *  - The dot/ring divs have pointer-events:none and high z-index,
 *    so they sit on top of content visually but never intercept clicks.
 *  - Completely disabled on touch screens and prefers-reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!supportsHover || prefersReduced) return;

    setActive(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let mx = -100;
    let my = -100;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const isInteractive = (el) =>
      !!(
        el &&
        el.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
        )
      );

    const onOver = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.add("is-hover");
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.remove("is-hover");
    };

    const tick = () => {
      // dot follows tightly, ring trails with easing
      dotX += (mx - dotX) * 0.85;
      dotY += (my - dotY) * 0.85;
      ringX += (mx - ringX) * 0.18;
      ringY += (my - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX - 2.5}px, ${dotY - 2.5}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!active) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}


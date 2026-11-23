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
    let raf = 0;
    let animating = false;

    const tick = () => {
      // dot follows tightly, ring trails with easing
      dotX += (mx - dotX) * 0.85;
      dotY += (my - dotY) * 0.85;
      ringX += (mx - ringX) * 0.18;
      ringY += (my - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX - 2.5}px, ${dotY - 2.5}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Idle check: stop animation loop when cursor settles to save CPU/battery
      const dx = Math.abs(mx - ringX);
      const dy = Math.abs(my - ringY);
      if (dx < 0.15 && dy < 0.15) {
        dot.style.transform = `translate3d(${mx - 2.5}px, ${my - 2.5}px, 0)`;
        ring.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        animating = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!animating) {
        animating = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      startLoop();
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

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
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


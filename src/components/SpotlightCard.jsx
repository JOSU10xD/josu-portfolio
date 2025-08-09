import React, { useRef, useEffect, useCallback } from "react";
import "./SpotlightCard.css";

/**
 * Lightweight spotlight + tilt wrapper.
 * - sets CSS vars on the wrapper ref for position, rotate, radius, opacity.
 * - smoothing on leave via RAF.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(220,220,220,0.24)", // silver white
  initialRadius = 40, // % - default radius for radial gradient
  hoverRadius = 65, // % - radius when hovering
  initialOpacity = 0,
  hoverOpacity = 0.72,
  transitionMs = 320,
}) {
  const wrapRef = useRef(null);
  const rafRef = useRef(null);

  // utility easing
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // write initial css variables
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty("--spot-color", spotlightColor);
    wrap.style.setProperty("--spot-opacity", initialOpacity);
    wrap.style.setProperty("--spot-radius", `${initialRadius}%`);
    // defaults
    wrap.style.setProperty("--pointer-x", "50%");
    wrap.style.setProperty("--pointer-y", "50%");
    wrap.style.setProperty("--rotate-x", "0deg");
    wrap.style.setProperty("--rotate-y", "0deg");
    wrap.style.setProperty("--pointer-from-center", "0");
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spotlightColor, initialRadius, initialOpacity]);

  // update variables from pointer
  const handlePointerMove = useCallback((e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width || 1;
    const h = rect.height || 1;

    // percent positions
    const px = (x / w) * 100;
    const py = (y / h) * 100;

    // center offsets - used for rotation
    const cx = px - 50;
    const cy = py - 50;

    // pointer-from-center magnitude 0..1
    const dist = Math.hypot(cx, cy) / 50;
    const pointerFromCenter = Math.min(Math.max(dist, 0), 1);

    // rotate amounts (subtle)
    const rotateX = `${-(cx / 6).toFixed(2)}deg`;
    const rotateY = `${(cy / 6).toFixed(2)}deg`;

    wrap.style.setProperty("--pointer-x", `${px}%`);
    wrap.style.setProperty("--pointer-y", `${py}%`);
    wrap.style.setProperty("--rotate-x", rotateX);
    wrap.style.setProperty("--rotate-y", rotateY);
    wrap.style.setProperty("--pointer-from-center", `${pointerFromCenter}`);
  }, []);

  // on enter: make halo visible & larger
  const handleEnter = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.transition = `--spot-opacity ${transitionMs}ms ease, --spot-radius ${transitionMs}ms ease`;
    wrap.style.setProperty("--spot-opacity", hoverOpacity);
    wrap.style.setProperty("--spot-radius", `${hoverRadius}%`);
  }, [hoverOpacity, hoverRadius, transitionMs]);

  // on leave: smooth animate variables back to center & remove halo
  const handleLeave = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // animate pointer + rotate back to center over ~300ms with RAF
    const start = performance.now();
    const duration = 360;

    // snapshot start values
    const startPx = parseFloat(wrap.style.getPropertyValue("--pointer-x")) || 50;
    const startPy = parseFloat(wrap.style.getPropertyValue("--pointer-y")) || 50;
    const startRotateX = parseFloat(wrap.style.getPropertyValue("--rotate-x")) || 0;
    const startRotateY = parseFloat(wrap.style.getPropertyValue("--rotate-y")) || 0;

    const tick = (t) => {
      const now = performance.now();
      const dt = Math.min((now - start) / duration, 1);
      const eased = ease(dt);

      const curPx = startPx + (50 - startPx) * eased;
      const curPy = startPy + (50 - startPy) * eased;
      const curRx = startRotateX + (0 - startRotateX) * eased;
      const curRy = startRotateY + (0 - startRotateY) * eased;
      const centerDist = Math.hypot(curPx - 50, curPy - 50) / 50;

      wrap.style.setProperty("--pointer-x", `${curPx}%`);
      wrap.style.setProperty("--pointer-y", `${curPy}%`);
      wrap.style.setProperty("--rotate-x", `${curRx}deg`);
      wrap.style.setProperty("--rotate-y", `${curRy}deg`);
      wrap.style.setProperty("--pointer-from-center", `${centerDist}`);

      if (dt < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // finally remove halo and set radius back
        wrap.style.setProperty("--spot-opacity", `${initialOpacity}`);
        wrap.style.setProperty("--spot-radius", `${initialRadius}%`);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [initialOpacity, initialRadius]);

  // keyboard focus: also show halo
  const handleFocus = useCallback((e) => {
    handleEnter();
    // position to center-ish
    const wrap = wrapRef.current;
    if (wrap) {
      wrap.style.setProperty("--pointer-x", `50%`);
      wrap.style.setProperty("--pointer-y", `35%`);
      wrap.style.setProperty("--pointer-from-center", `0.45`);
    }
  }, [handleEnter]);

  return (
    <div
      ref={wrapRef}
      className={`spotlight-wrapper ${className}`}
      onMouseMove={handlePointerMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleLeave}
      tabIndex={0}
      aria-hidden={false}
    >
      <div
        className="spotlight-overlay"
        style={{ background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--spot-color) var(--spot-radius), transparent 100%)`, opacity: "var(--spot-opacity)" }}
        aria-hidden
      />
      <div className="spotlight-glow" aria-hidden />
      <div className="spotlight-inner">{children}</div>
    </div>
  );
}

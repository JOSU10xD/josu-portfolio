import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

/**
 * MagneticButton — desktop-only subtle magnetic pull toward the cursor.
 * On touch / coarse pointer devices, behaves like a normal inline-flex.
 * Renders as <a> when `href` is provided, else <button>.
 *
 * The magnetic effect is applied to an outer wrapper rather than the
 * button itself so that the button's own transform (used for the arrow
 * slide on hover) is not overridden. This keeps the arrow visible and
 * contained within the button's safe area at all times.
 */
export default function MagneticButton({
  as = "button",
  href,
  className = "",
  children,
  strength = 0.14,
  ...rest
}) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupported(mq.matches);
    const handler = (e) => setSupported(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const onMove = (e) => {
    if (!supported) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap the pull so the button never moves more than 6px — enough to
    // feel alive, small enough that the right-edge arrow stays visible
    // and never collides with the viewport or a neighbouring element.
    const dx = Math.max(-6, Math.min(6, x * strength));
    const dy = Math.max(-6, Math.min(6, y * strength));
    el.style.setProperty("--mx", `${dx}px`);
    el.style.setProperty("--my", `${dy}px`);
  };
  const onLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.setProperty("--mx", "0px");
    innerRef.current.style.setProperty("--my", "0px");
  };

  const Component = href ? "a" : as;
  const linkProps = href ? { href } : { type: "button" };

  return (
    <span
      ref={wrapperRef}
      className="magnetic-wrap inline-flex"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Component
        ref={innerRef}
        className={cn("magnetic", className)}
        style={{
          // Compose magnetic offset with the button's own hover lift
          // (translateY(-1px)) so neither transform cancels the other.
          // The .magnetic class below adds `transform: translate(var(--mx,0), var(--my,0))`
          // which stacks safely on top of any hover translateY.
          "--mx": "0px",
          "--my": "0px",
        }}
        {...linkProps}
        {...rest}
      >
        {children}
      </Component>
    </span>
  );
}


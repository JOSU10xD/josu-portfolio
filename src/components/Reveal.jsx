import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fades + slides children into view on scroll.
 * Stagger supported via `index` and `stagger` props.
 * Honors prefers-reduced-motion via the global CSS rules.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  style,
  children,
  delay = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...(style || {}), transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

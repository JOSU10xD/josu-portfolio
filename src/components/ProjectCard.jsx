import React, { useRef, useState, useCallback, useEffect } from "react";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { name = "Project", description = "", tech = [], imageUrl = "", link = "#" } = project || {};

  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  // spotlight state (for inline style)
  const [spot, setSpot] = useState({ x: 0, y: 0, opacity: 0 });

  // move handler -> update spotlight and tilt
  const onPointerMove = useCallback((e) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const rect = card.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const percentX = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
    const percentY = Math.min(Math.max((offsetY / rect.height) * 100, 0), 100);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    // rotation mapping - tweak multipliers for more/less tilt
    const rotateX = round((centerY * -1) / 3.8, 3); // smaller divisor -> stronger tilt
    const rotateY = round(centerX / 4.6, 3);

    // Set transform on the card
    card.style.transform = `translate3d(0,0,0.01px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // set custom properties (used by CSS glow/shine if needed)
    wrap.style.setProperty("--pointer-x", `${offsetX}px`);
    wrap.style.setProperty("--pointer-y", `${offsetY}px`);
    wrap.style.setProperty("--pointer-percent-x", `${percentX}%`);
    wrap.style.setProperty("--pointer-percent-y", `${percentY}%`);
    wrap.style.setProperty("--pointer-from-center", `${Math.hypot(centerX, centerY) / 50}`);

    setSpot({ x: offsetX, y: offsetY, opacity: 0.9 });
  }, []);

  const onPointerEnter = useCallback((e) => {
    setSpot((s) => ({ ...s, opacity: 0.95 }));
    // remove transition so movement is snappy
    if (cardRef.current) cardRef.current.style.transition = "transform 120ms cubic-bezier(.2,.9,.3,1)";
  }, []);

  const onPointerLeave = useCallback(() => {
    // reset transform smoothly
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 600ms cubic-bezier(.2,.9,.3,1)";
      cardRef.current.style.transform = `translate3d(0,0,0.01px) rotateX(0deg) rotateY(0deg)`;
    }
    // fade out spotlight
    setSpot((s) => ({ ...s, opacity: 0 }));
    // reset vars
    if (wrapRef.current) {
      wrapRef.current.style.removeProperty("--pointer-x");
      wrapRef.current.style.removeProperty("--pointer-y");
      wrapRef.current.style.removeProperty("--pointer-percent-x");
      wrapRef.current.style.removeProperty("--pointer-percent-y");
      wrapRef.current.style.removeProperty("--pointer-from-center");
    }
  }, []);

  // helper rounding
  function round(v, p = 3) {
    return parseFloat(v.toFixed(p));
  }

  // open repo
  const handleRepoClick = useCallback(() => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  }, [link]);

  // Ensure card reset on unmount
  useEffect(() => {
    return () => {
      if (cardRef.current) {
        cardRef.current.style.transform = "";
        cardRef.current.style.transition = "";
      }
    };
  }, []);

  // spotlight inline style
  const spotlightStyle = {
    opacity: spot.opacity,
    background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(230,230,230,0.55), rgba(220,220,220,0.18) 30%, rgba(200,200,200,0.055) 60%, transparent 70%)`,
    // the radius & color adjusted to be bigger and silver-white
    transition: "opacity 280ms ease, background-position 140ms",
  };

  return (
    <div
      ref={wrapRef}
      className="project-card-wrapper"
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      // keyboard focus shows the spotlight as well (accessibility)
      onFocus={(e) => onPointerEnter(e)}
      onBlur={onPointerLeave}
    >
      <article ref={cardRef} className="project-card" tabIndex={0}>
        {/* spotlight overlay (above background glow but below content) */}
        <div className="project-spotlight" style={spotlightStyle} aria-hidden />

        {/* background glow (soft) */}
        <div className="project-glow" aria-hidden />

        {/* image area - large square-ish image at top */}
        <div className="project-image-wrap">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${name} screenshot`}
              className="project-image"
              onError={(e) => (e.currentTarget.style.display = "none")}
              loading="lazy"
            />
          ) : (
            <div className="project-image project-image--placeholder">No image</div>
          )}
        </div>

        {/* content */}
        <div className="project-body">
          <h3 className="project-title">{name}</h3>
          <p className="project-desc">{description}</p>

          <div className="project-tags">
            {tech.map((t, i) => (
              <span key={i} className="project-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="project-cta-wrap">
            <button className="project-cta" onClick={handleRepoClick} aria-label={`Open ${name}`}>
              View Repo
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

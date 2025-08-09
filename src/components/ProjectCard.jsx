import React, { useRef, useState, useCallback, useEffect } from "react";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { name = "Project", description = "", tech = [], imageUrl = "", link = "#" } = project || {};

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, opacity: 0 });

  const round = (v, p = 3) => parseFloat(v.toFixed(p));

  // Pointer handlers: tilt + spotlight
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

    // gentle tilt
    const rotateX = round((centerY * -1) / 3.8, 3);
    const rotateY = round(centerX / 4.6, 3);

    card.style.transform = `translate3d(0,0,0.01px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    wrap.style.setProperty("--pointer-x", `${offsetX}px`);
    wrap.style.setProperty("--pointer-y", `${offsetY}px`);
    wrap.style.setProperty("--pointer-percent-x", `${percentX}%`);
    wrap.style.setProperty("--pointer-percent-y", `${percentY}%`);
    wrap.style.setProperty("--pointer-from-center", `${Math.hypot(centerX, centerY) / 50}`);

    setSpot({ x: offsetX, y: offsetY, opacity: 0.92 });
  }, []);

  const onPointerEnter = useCallback(() => {
    setSpot((s) => ({ ...s, opacity: 0.95 }));
    if (cardRef.current) cardRef.current.style.transition = "transform 120ms cubic-bezier(.2,.9,.3,1)";
  }, []);

  const onPointerLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 600ms cubic-bezier(.2,.9,.3,1)";
      cardRef.current.style.transform = `translate3d(0,0,0.01px) rotateX(0deg) rotateY(0deg)`;
    }
    setSpot((s) => ({ ...s, opacity: 0 }));
    if (wrapRef.current) {
      wrapRef.current.style.removeProperty("--pointer-x");
      wrapRef.current.style.removeProperty("--pointer-y");
      wrapRef.current.style.removeProperty("--pointer-percent-x");
      wrapRef.current.style.removeProperty("--pointer-percent-y");
      wrapRef.current.style.removeProperty("--pointer-from-center");
    }
  }, []);

  const handleRepoClick = useCallback(() => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  }, [link]);

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
    transition: "opacity 280ms ease, background-position 140ms",
  };

  return (
    <div
      ref={wrapRef}
      className="project-card-wrapper"
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onPointerEnter}
      onBlur={onPointerLeave}
    >
      <article ref={cardRef} className="project-card" tabIndex={0}>

        {/* spotlight overlay */}
        <div className="project-spotlight" style={spotlightStyle} aria-hidden />

        {/* background glow */}
        <div className="project-glow" aria-hidden />

        {/* image area */}
        <div className="project-image-wrap">
          {imageUrl ? (
            // use the imported image module (works with Vite)
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


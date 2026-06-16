import React, { useRef, useState, useCallback, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { name = "Project", description = "", tech = [], logoUrl = "", imageUrl = "", link = "#" } = project || {};

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const slideIntervalRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const [spot, setSpot] = useState({ x: 0, y: 0, opacity: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const round = (v, p = 3) => parseFloat(v.toFixed(p));

  const handleRepoClick = useCallback(() => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  }, [link]);

  // Pointer handlers: tilt + spotlight + hover preview trigger
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

    // Clear any previous timeout/interval
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);

    // Start 0.5-second hover timer to show project screenshots
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
      if (Array.isArray(imageUrl) && imageUrl.length > 0) {
        slideIntervalRef.current = setInterval(() => {
          setCurrentSlideIndex((prev) => (prev + 1) % imageUrl.length);
        }, 1500); // cycle slides every 1.5s
      }
    }, 500);
  }, [imageUrl]);

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

    // Clear hover timer & slide cycling
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    setShowPreview(false);
    setCurrentSlideIndex(0);
  }, []);

  // Determine active display image for card
  let activeImage = logoUrl || (Array.isArray(imageUrl) ? imageUrl[0] : imageUrl);
  if (showPreview) {
    activeImage = Array.isArray(imageUrl) ? imageUrl[currentSlideIndex] : (imageUrl || logoUrl);
  }

  // Spotlight inline style
  const spotlightStyle = {
    opacity: spot.opacity,
    background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(230,230,230,0.55), rgba(220,220,220,0.18) 30%, rgba(200,200,200,0.055) 60%, transparent 70%)`,
    transition: "opacity 280ms ease, background-position 140ms",
  };

  // Convert imageUrl to helper array for navigation
  const imagesArray = Array.isArray(imageUrl) ? imageUrl : [imageUrl].filter(Boolean);

  const handlePrevSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setModalImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  }, [imagesArray.length]);

  const handleNextSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setModalImageIndex((prev) => (prev + 1) % imagesArray.length);
  }, [imagesArray.length]);

  // Open modal lightbox at the active hovered slide
  const openModal = useCallback((e) => {
    e.stopPropagation();
    setModalImageIndex(currentSlideIndex);
    setIsModalOpen(true);
  }, [currentSlideIndex]);

  // Prevent scroll when lightbox modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Handle keyboard arrow keys inside modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      } else if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handlePrevSlide, handleNextSlide]);

  // Handle mousewheel scroll navigation inside modal
  const handleWheel = useCallback((e) => {
    if (!isModalOpen || imagesArray.length <= 1) return;
    const now = Date.now();
    if (now - lastScrollTime.current < 300) return; // 300ms throttle

    const threshold = 10; // more responsive threshold
    if (e.deltaY > threshold || e.deltaX > threshold) {
      handleNextSlide();
      lastScrollTime.current = now;
    } else if (e.deltaY < -threshold || e.deltaX < -threshold) {
      handlePrevSlide();
      lastScrollTime.current = now;
    }
  }, [isModalOpen, imagesArray.length, handleNextSlide, handlePrevSlide]);

  // Handle swipe scroll/gesture navigation inside modal for touch devices
  const handleTouchStart = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (!e.changedTouches || !e.changedTouches[0]) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > 40) { // 40px swipe threshold
        if (diffX > 0) {
          handlePrevSlide();
        } else {
          handleNextSlide();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }, [handlePrevSlide, handleNextSlide]);

  useEffect(() => {
    return () => {
      if (cardRef.current) {
        cardRef.current.style.transform = "";
        cardRef.current.style.transition = "";
      }
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, []);

  const activeModalImage = imagesArray[modalImageIndex];

  return (
    <>
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
          <div 
            className="project-image-wrap cursor-pointer group"
            onClick={handleRepoClick}
            title="Click to view repository"
          >
            {activeImage ? (
              <img
                src={activeImage}
                alt={`${name} preview`}
                className="project-image transition-all duration-500 ease-out group-hover:scale-[1.03]"
                onError={(e) => (e.currentTarget.style.display = "none")}
                loading="lazy"
              />
            ) : (
              <div className="project-image project-image--placeholder">No image</div>
            )}
            
            {/* Quick View Button */}
            {activeImage && (
              <button
                onClick={openModal}
                className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-neutral-900 text-white rounded-lg border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                title="View close-up"
              >
                <Maximize2 className="h-4.5 w-4.5" />
              </button>
            )}

            {/* Subtle indicator showing that the card changes on hover */}
            {!showPreview && logoUrl && imageUrl && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-[10px] text-gray-300 rounded border border-white/10 backdrop-blur-xs pointer-events-none transition-opacity duration-300">
                Hover to preview
              </div>
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

      {/* Lightbox / Zoom modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button on top */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none p-2 bg-neutral-900/80 rounded-full border border-white/10 cursor-pointer z-50 transition-colors"
            aria-label="Close preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow Button */}
          {imagesArray.length > 1 && (
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none p-3 bg-neutral-900/80 rounded-full border border-white/10 cursor-pointer z-50 transition-all hover:bg-neutral-800"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {imagesArray.length > 1 && (
            <button
              onClick={handleNextSlide}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none p-3 bg-neutral-900/80 rounded-full border border-white/10 cursor-pointer z-50 transition-all hover:bg-neutral-800"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Close-up image container */}
          <div 
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeModalImage ? (
              <img
                src={activeModalImage}
                alt={`${name} closeup`}
                className="max-w-full max-h-[78vh] object-contain rounded-lg border border-white/10 shadow-2xl cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                onClick={handleRepoClick}
                title="Click to view repository"
              />
            ) : (
              <div className="text-white text-lg">No preview available</div>
            )}

            {/* Dynamic dot indicators */}
            {imagesArray.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 z-50">
                {imagesArray.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      modalImageIndex === idx ? "bg-white w-6" : "bg-white/30 hover:bg-white/60 w-2"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            
            <p className="text-silver-300 mt-3 text-sm font-medium text-center">
              {name} 
              {imagesArray.length > 1 && ` — Image ${modalImageIndex + 1} of ${imagesArray.length}`} 
              {" (Click image to view repository)"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

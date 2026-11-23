import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];

const EXPERIENCE = [
  {
    period: "2022 - 2026",
    role: "Bachelor of Technology in Information Technology",
    org: "Viswajyothi College of Engineering & Technology",
    location: "Vazhakulam, Kerala, India",
    body:
      "Coursework spanning software engineering, distributed systems, cloud computing and modern web development. Capstone and side projects focused on full-stack systems, Electron tooling and mobile applications.",
  },
  {
    period: "2021 - 2022",
    role: "Higher Secondary Education",
    org: "St. Joseph's Higher Secondary School",
    location: "Paingottoor, Kerala, India",
    body:
      "Completed higher secondary studies with a focus on computer science and mathematics.",
  },
  {
    period: "2018 - 2021",
    role: "Secondary Education",
    org: "Sobhana Public School",
    location: "Kothamangalam, Kerala, India",
    body:
      "Foundations in mathematics, science and computer applications, and the first taste of writing code that solved real problems.",
  },
];

export default function Experience() {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [completed, setCompleted] = useState(new Set());
  const [nodeYs, setNodeYs] = useState([]); // Y position (px) of each node, in <ul>-local coords

  const lastActiveRef = useRef(-1);
  const lastDoneRef = useRef(new Set());
  const cachedMetricsRef = useRef({ firstY: 0, lastY: 0, ys: [] });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const list = listRef.current;
    if (!list) return;

    // Measure positions of nodes relative to <ul> ONCE on mount and on resize.
    const measureLayout = () => {
      const years = itemRefs.current
        .map((el) => el?.querySelector(".timeline-year"))
        .filter(Boolean);
      if (years.length < 2) return;

      const listRect = list.getBoundingClientRect();
      const firstRect = years[0].getBoundingClientRect();
      const lastRect = years[years.length - 1].getBoundingClientRect();
      const firstY = firstRect.top - listRect.top + firstRect.height / 2;
      const lastY = lastRect.top - listRect.top + lastRect.height / 2;

      list.style.setProperty("--spine-top", `${firstY}px`);
      list.style.setProperty("--spine-bottom", `${listRect.height - lastY}px`);

      const ys = years.map((yearEl) => {
        const r = yearEl.getBoundingClientRect();
        return r.top - listRect.top + r.height / 2;
      });
      cachedMetricsRef.current = { firstY, lastY, ys };
      setNodeYs(ys);
    };

    let raf = 0;
    const updateScroll = () => {
      const { firstY, lastY, ys } = cachedMetricsRef.current;
      if (!ys.length) return;

      const listRect = list.getBoundingClientRect();
      const firstTop = listRect.top + firstY;
      const lastTop = listRect.top + lastY;

      const start = firstTop - window.innerHeight * 0.75;
      const end = lastTop - window.innerHeight * 0.5;
      const total = Math.max(1, end - start);
      const p = Math.min(1, Math.max(0, -start / total));

      // Drive line progress directly via CSS variable for 60fps rendering without React re-renders
      list.style.setProperty("--progress", `${(p * 100).toFixed(1)}%`);

      const viewportFocus = window.innerHeight * 0.55;
      let active = -1;
      const done = new Set();

      ys.forEach((y, i) => {
        const nodeViewportY = listRect.top + y;
        if (nodeViewportY < viewportFocus) {
          done.add(i);
        }
        if (nodeViewportY <= viewportFocus + 30 && nodeViewportY >= 0) {
          active = i;
        }
      });

      // Only trigger state updates when items actually change
      if (active !== lastActiveRef.current) {
        lastActiveRef.current = active;
        setActiveIndex(active);
      }

      if (done.size !== lastDoneRef.current.size) {
        lastDoneRef.current = done;
        setCompleted(done);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateScroll();
      });
    };

    // Initial measurement
    const timer = setTimeout(() => {
      measureLayout();
      updateScroll();
    }, 50);

    const onResize = () => {
      measureLayout();
      updateScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(timer);
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="experience"
      className="section section-divider"
      aria-label="Experience"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Experience"
              title={
                <>
                  Education &amp;
                  <br />
                  <span className="text-[color:var(--text-primary)]">
                    journey
                  </span>
                </>
              }
              description="A path shaped by curiosity, formal study, and a long streak of shipping real software outside the classroom."
            />
          </div>

          <div className="lg:col-span-7 relative">
            <ul
              ref={listRef}
              className="relative flex flex-col gap-12 md:gap-16"
            >
              {/* Vertical spine + neon progress line + nodes share <ul> coords */}
              <div
                className="timeline-spine"
                aria-hidden
              />
              {nodeYs.map((y, i) => {
                const isActive = i === activeIndex;
                const isComplete = completed.has(i);
                return (
                  <span
                    key={`node-${i}`}
                    className={`timeline-node ${isActive ? "is-active" : ""
                      } ${isComplete ? "is-complete" : ""}`}
                    aria-hidden
                    style={{ top: `${y}px` }}
                  />
                );
              })}

              {EXPERIENCE.map((item, i) => {
                const isActive = i === activeIndex;
                const isComplete = completed.has(i);
                return (
                  <Reveal key={item.period} delay={i * 60}>
                    <motion.li
                      ref={(el) => (itemRefs.current[i] = el)}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className={`timeline timeline-item ${isActive ? "is-active" : ""
                        } ${isComplete ? "is-complete" : ""}`}
                    >
                      <div className="timeline-year">{item.period}</div>
                      <article className="timeline-card">
                        <h3>{item.role}</h3>
                        <p>
                          <span className="timeline-org">{item.org}</span>
                          {" · "}
                          <span className="timeline-loc">{item.location}</span>
                        </p>
                        <p className="timeline-body">{item.body}</p>
                      </article>
                    </motion.li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

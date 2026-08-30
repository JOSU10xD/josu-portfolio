// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#projects" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  // Track scroll: scrolled-state + auto-hide on scroll down
  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 8);
        // Only auto-hide after a minimum scroll, and never at the very top
        if (y > 240 && y > lastYRef.current + 6 && !isMobileMenuOpen) {
          setHidden(true);
        } else if (y < lastYRef.current - 6 || y < 80) {
          setHidden(false);
        }
        lastYRef.current = y;
        tickingRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileMenuOpen]);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while drawer open + ESC to close
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isMobileMenuOpen]);

  const onLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "nav-root",
          isScrolled ? "is-scrolled" : "",
          hidden && !isMobileMenuOpen ? "is-hidden" : ""
        )}
      >
        <div className="container-x flex items-center justify-between gap-6 lg:gap-8 h-16 md:h-[72px]">
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-[color:var(--text-primary)] no-underline flex-shrink-0"
            aria-label="Nevil Biju — home"
          >
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--border-default)] bg-white/[0.04] text-[11px] font-semibold tracking-tight"
            >
              NB
            </span>
            <span className="font-display text-[0.95rem] font-semibold tracking-tight">
              Nevil Biju
            </span>
          </a>

          {/* Desktop nav — generous gap on lg, moderate on md */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn("nav-link", isActive ? "is-active" : "")}
                >
                  {item.name}
                  <span className="nav-link-underline" />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[color:var(--border-default)] bg-white/[0.02] hover:bg-white/[0.06] text-[0.82rem] font-medium text-[color:var(--text-primary)] transition-all flex-shrink-0"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-white/[0.02] text-[color:var(--text-primary)]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div className="absolute inset-0 bg-[#0a0a0b]/95 backdrop-blur-2xl" />
        <div className="relative h-full w-full flex flex-col justify-between pt-24 pb-10 px-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item, i) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "group flex items-center justify-between py-4 border-b border-[color:var(--border-subtle)] transition-all",
                    isActive ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)]",
                    isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${120 + i * 60}ms` : "0ms",
                    transitionDuration: "500ms",
                  }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-[color:var(--text-faint)]">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {item.name}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)] transition-colors" />
                </a>
              );
            })}
          </nav>

          <div
            className={cn(
              "flex flex-col gap-2 text-[color:var(--text-muted)] transition-opacity duration-500",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: isMobileMenuOpen ? "520ms" : "0ms" }}
          >
            <span className="eyebrow">Get in touch</span>
            <a
              href="mailto:nevilbiju.dev@gmail.com"
              className="font-mono text-[0.9rem] text-[color:var(--text-secondary)]"
            >
              nevilbiju.dev@gmail.com
            </a>
            <div className="flex items-center gap-4 pt-2 text-[color:var(--text-muted)]">
              <a
                href="https://github.com/JOSU10xD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--text-primary)] transition-colors"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nevil-biju"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--text-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/josu10_03"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--text-primary)] transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

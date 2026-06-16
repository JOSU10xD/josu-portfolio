// src/components/Navbar.jsx
import { cn } from "../lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
    {name: "Home", href:"#home"},
    {name: "About", href:"#about"},
    {name: "Projects", href:"#projects"},
    {name: "Contact", href:"#contact"}
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "timeline", "projects", "contact"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when the section occupies the center area
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-black/80 backdrop-blur-md border-b border-white/5 shadow-xs"
            : "py-5 bg-transparent border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-18 flex justify-between items-center relative z-50">
          <a href="#" className="text-2xl font-bold text-white z-50">
            <span className="text-glow">Josu</span>
            <span> Portfolio</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex ml-4 space-x-4 md:space-x-6">
              {navItems.map((item, key) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a 
                    href={item.href}
                    key={key}
                    className={cn(
                      "relative text-gray-300 hover:text-white transition-all duration-300 group px-2 py-1",
                      isActive ? "text-white font-medium" : "text-gray-400"
                    )}
                  >
                    {item.name}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300",
                        isActive 
                          ? "w-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]" 
                          : "w-0 group-hover:w-full group-hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]"
                      )} 
                    />
                  </a>
                );
              })}
          </div>

          {/* Hamburger Icon for Mobile - styled with z-50 to stay on top */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 focus:outline-none z-50 p-2 relative"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay inside nav container */}
        <div
          className={cn(
            "fixed inset-0 h-screen w-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navItems.map((item, key) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                href={item.href}
                key={key}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-2xl transition-all duration-300",
                  isActive 
                    ? "text-white font-bold tracking-wide scale-110" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
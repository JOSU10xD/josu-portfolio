import { cn } from "../lib/utils"
import { useEffect, useState } from "react"

const navItems = [
    {name: "Home", href:"#home"},
    {name: "About", href:"#about"},
    {name: "Skills", href:"#skills"},
    {name: "Contact", href:"#contact"}
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handlescroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      {/* container gives you responsive side-margins */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* left-aligned logo */}
        <a href="#" className="text-2xl font-bold text-white">
          <span className="text-glow">Josu</span>
          <span> Portfolio</span>
        </a>
      </div>
    </nav>
  );
};
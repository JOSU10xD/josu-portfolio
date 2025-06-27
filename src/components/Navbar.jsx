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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-18 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-white">
          <span className="text-glow">Josu</span>
          <span> Portfolio</span>
        </a>

        {/* Navigation Items - Right Aligned */}
        <div className="hidden md:flex ml-4 space-x-4 md:space-x-6">
            {navItems.map((item, key) => (
            <a 
              href={item.href}
              key={key}
              className="
                relative
                text-gray-300
                hover:text-white
                transition-all
                duration-300
                group
                px-2 py-1
              "
            >
              {item.name}
              {/* Glow effect on hover */}
              <span className="
                absolute -bottom-1 left-0 
                w-0 h-0.5 bg-white
                transition-all duration-300
                group-hover:w-full
                group-hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]
              " />
            </a>
            ))}
        </div>
      </div>
    </nav>
  );
};
import { cn } from "@lib"
import { useState } from "react"

const navItems = [
    {name: "Home", href:"#home"},
    {name: "About", href:"#about"},
    {name: "Skills", href:"#skills"},
    {name: "Contact", href:"#contact"}
]

export const Navbar= ()=>{
    const [isScrolled, setIsScrolled] = useState(false);
    return (<nav className={cn("fixed w-full z-40 transition-all duration-300")}></nav>
    )
}
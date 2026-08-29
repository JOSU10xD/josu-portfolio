import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-md">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-[color:var(--text-primary)] no-underline"
              aria-label="Nevil Biju — home"
            >
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--border-default)] bg-white/[0.04] text-[11px] font-semibold tracking-tight"
              >
                NB
              </span>
              <span className="font-display text-[1.02rem] font-semibold tracking-tight">
                Nevil Biju
              </span>
            </a>
            <p className="mt-4 text-[1.02rem] text-[color:var(--text-secondary)] font-medium">
              Full Stack Developer &amp; Cloud Engineer
            </p>
            <p className="mt-1 text-[0.92rem] text-[color:var(--text-tertiary)] leading-relaxed">
              Building reliable software, polished interfaces and cloud-powered
              systems.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Find me</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/JOSU10xD"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nevil-biju"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/josu10_03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-default)] hover:bg-white/[0.05] transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 hairline" />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[0.88rem] text-[color:var(--text-muted)]">
            © {year} Nevil Biju. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[0.88rem] text-[color:var(--text-muted)]">
            <a
              href="#home"
              className="hover:text-[color:var(--text-primary)] transition-colors"
            >
              Home
            </a>
            <a
              href="#projects"
              className="hover:text-[color:var(--text-primary)] transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-[color:var(--text-primary)] transition-colors"
            >
              Contact
            </a>
            <a
              href="https://github.com/JOSU10xD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[color:var(--text-primary)] transition-colors"
            >
              Source
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

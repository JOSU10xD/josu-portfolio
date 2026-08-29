import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiAmazonwebservices,
  SiDocker,
  SiJenkins,
  SiNginx,
  SiLinux,
  SiElectron,
  SiReact as SiReactNative,
  SiExpo,
  SiGit,
  SiGithubactions,
  SiFigma,
  SiPostman,
  SiFirebase,
  SiVite,
} from "react-icons/si";
import { HiCode, HiCube, HiCloud, HiDeviceMobile, HiCog } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1];

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <HiCode />,
    items: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss3 /> },
      { name: "Vite", icon: <SiVite /> },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <HiCube />,
    items: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Python", icon: <SiPython /> },
      { name: "REST APIs", icon: <SiPostman /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Firebase", icon: <SiFirebase /> },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: <HiCloud />,
    items: [
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Jenkins", icon: <SiJenkins /> },
      { name: "GitHub Actions", icon: <SiGithubactions /> },
      { name: "Nginx", icon: <SiNginx /> },
      { name: "Linux", icon: <SiLinux /> },
    ],
  },
  {
    id: "platforms",
    label: "Desktop & Mobile",
    icon: <HiDeviceMobile />,
    items: [
      { name: "Electron", icon: <SiElectron /> },
      { name: "React Native", icon: <SiReactNative /> },
      { name: "Expo", icon: <SiExpo /> },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <HiCog />,
    items: [
      { name: "Git", icon: <SiGit /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <SiFigma /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="section section-divider" aria-label="Tech stack">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Tech stack"
              title={
                <>
                  The tools I reach{" "}
                  <span className="font-serif italic font-normal">for</span>.
                </>
              }
              description="A pragmatic toolbox. I pick technologies based on the problem, the team, and the constraints — not the trend cycle."
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10 md:gap-12">
            {CATEGORIES.map((cat, ci) => (
              <Reveal key={cat.id} delay={ci * 60}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--border-subtle)] bg-white/[0.03] text-[color:var(--text-secondary)]">
                      {cat.icon}
                    </span>
                    <h3 className="font-display text-[0.95rem] font-semibold tracking-tight text-[color:var(--text-primary)]">
                      {cat.label}
                    </h3>
                    <span className="ml-auto eyebrow">
                      {cat.items.length} items
                    </span>
                  </div>

                  <motion.ul
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.04 } },
                    }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                  >
                    {cat.items.map((it) => (
                      <motion.li
                        key={it.name}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                        }}
                      >
                        <div className="tech-item">
                          <span className="tech-item-icon">{it.icon}</span>
                          <span className="tech-item-label">{it.name}</span>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/TechStack.jsx
import React from "react";
import * as SiIcons from "react-icons/si";

const TECHS = [
  { key: "react", label: "React", iconName: "SiReact" },
  { key: "node", label: "Node.js", iconName: "SiNodedotjs" },
  { key: "js", label: "JavaScript", iconName: "SiJavascript" },
  { key: "python", label: "Python", iconName: "SiPython" },
  { key: "csharp", label: "C#", iconName: "SiCsharp" },
  { key: "aws", label: "AWS", iconName: "SiAmazonaws" },
  { key: "jenkins", label: "Jenkins", iconName: "SiJenkins" },
  { key: "git", label: "Git", iconName: "SiGit" },
  { key: "mongo", label: "MongoDB", iconName: "SiMongodb" },
  { key: "mysql", label: "MySQL", iconName: "SiMysql" },
  { key: "tailwind", label: "TailwindCSS", iconName: "SiTailwindcss" },
  { key: "electron", label: "Electron", iconName: "SiElectron" },
];

const DefaultIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
    <path d="M7 12h10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 8h10" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7 16h10" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default function TechStack() {
  return (
    <>
      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 10px;
        }
        @media (min-width: 640px) {
          .tech-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }
        .tech-chip {
          display:flex;
          align-items:center;
          gap:10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.95);
          font-weight: 600;
          font-size: 0.98rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          transition: all 0.25s ease;
          cursor: default;
        }
        .tech-chip:hover {
          background: white;
          color: black;
          border-color: rgba(0,0,0,0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
        .tech-icon {
          width: 20px;
          height: 20px;
          opacity: 0.95;
          display:flex;
          align-items:center;
          justify-content:center;
          transition: color 0.25s ease;
        }
        .tech-chip:hover .tech-icon {
          color: black;
        }
      `}</style>

      <div className="tech-grid" role="list" aria-label="Tech stack">
        {TECHS.map((t) => {
          const IconComponent = SiIcons[t.iconName];
          return (
            <div key={t.key} className="tech-chip" role="listitem">
              <div className="tech-icon" aria-hidden>
                {IconComponent ? (
                  <IconComponent size={20} />
                ) : (
                  <DefaultIcon size={20} />
                )}
              </div>
              <div>{t.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

import React from "react";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    name: "GRID Browser",
    description: "Chromium-based browser built with Electron & Node.js. Custom tab management, bookmarks, and WebView2-like features.",
    tech: ["Electron", "Node.js", "JavaScript"],
    imageUrl: "/projects/grid.png",
    link: "https://github.com/JOSU10xD/GRID-Browser",
  },
  {
    name: "Jenkins CI/CD project",
    description: "Example pipeline demonstrating GitHub → Jenkins → Docker → AWS deployment with automated tests and quality gates.",
    tech: ["Jenkins", "Docker", "AWS"],
    imageUrl: "/projects/jenkins.png",
    link: "https://github.com/JOSU10xD/Jenkins-CICD-project",
  },
  {
    name: "BrowserUI-Chromium",
    description: "WinUI 3 / C# native browser UI integrating WebView2 and custom clipboard & history features.",
    tech: ["C#", "WinUI 3", "WebView2"],
    imageUrl: "/projects/browserui.png",
    link: "https://github.com/JOSU10xD/BrowserUI-Chromium",
  },
  {
    name: "Movie Watchlist",
    description: "Cross-platform Flutter app using Simkl API — search movies and keep a persistent watchlist.",
    tech: ["Flutter", "Dart", "Simkl API"],
    imageUrl: "/projects/movie.png",
    link: "https://github.com/JOSU10xD/movie-watchlist-app",
  },
  {
    name: "Expense Tracker",
    description: "React-based expense tracker with auth, persistent store and charts for spending insights.",
    tech: ["React", "Firebase", "Chart.js"],
    imageUrl: "/projects/expense.png",
    link: "https://github.com/JOSU10xD/expense-tracker",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-white mb-6">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <ProjectCard key={idx} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

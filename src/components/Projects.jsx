import React from "react";
import ProjectCard from "@/components/ProjectCard";

// Import images and logos from src/assets/projects
import gridLogo from "@/assets/projects/gridlogo (3).png";
import grid1 from "@/assets/projects/grid1.png";
import grid2 from "@/assets/projects/grid2.png";
import grid3 from "@/assets/projects/grid3.png";
import grid4 from "@/assets/projects/grid4.png";
import grid5 from "@/assets/projects/grid5.png";
import gridImg from "@/assets/projects/grid.png";

import jenkinsImg from "@/assets/projects/jenkins.png";

import browseruiImg from "@/assets/projects/browserui.png";
import browseruiLogo from "@/assets/projects/browseruilogo.png";

import cineshelfLogo from "@/assets/projects/cineshelflogo.jpeg";
import cine1 from "@/assets/projects/cine1.png";
import cine2 from "@/assets/projects/cine2.png";
import cine3 from "@/assets/projects/cine3.png";
import cine4 from "@/assets/projects/cine4.png";

import expenseImg from "@/assets/projects/expense.png";

import mapmycampusImg from "@/assets/projects/mapmycampus.png";
import mapmycampusLogo from "@/assets/projects/MapMyCampusLogo (1) - Copy.jpg";

import collectivevoiceLogo from "@/assets/projects/collectivevoicelogo.png";
import cv1 from "@/assets/projects/cv1.png";
import cv2 from "@/assets/projects/cv2.png";
import cv3 from "@/assets/projects/cv3.png";
import cv4 from "@/assets/projects/cv4.png";
import cv5 from "@/assets/projects/cv5.png";

import moreathomeLogo from "@/assets/projects/moreathomelogo).png";
import mah1 from "@/assets/projects/mah1.png";
import mah2 from "@/assets/projects/mah2.png";
import mah3 from "@/assets/projects/mah3.png";
import mah4 from "@/assets/projects/mah4.png";

const projects = [
  {
    name: "GRID Browser",
    description:
      "Chromium-based browser built with Electron & Node.js. Custom tab management, bookmarks, and WebView2-like features.",
    tech: ["Electron", "Node.js", "JavaScript"],
    logoUrl: gridLogo,
    imageUrl: [grid1, grid2, grid3, grid4, grid5, gridImg],
    link: "https://github.com/JOSU10xD/GRID-Browser",
  },
  {
    name: "Jenkins CI/CD project",
    description:
      "Example pipeline demonstrating GitHub → Jenkins → Docker → AWS deployment with automated tests and quality gates.",
    tech: ["Jenkins", "Docker", "AWS"],
    logoUrl: jenkinsImg,
    imageUrl: jenkinsImg,
    link: "https://github.com/JOSU10xD/Jenkins-CICD-project",
  },
  {
    name: "BrowserUI-Chromium",
    description:
      "WinUI 3 / C# native browser UI integrating WebView2 and custom clipboard & history features.",
    tech: ["C#", "WinUI 3", "WebView2"],
    logoUrl: browseruiLogo,
    imageUrl: browseruiImg,
    link: "https://github.com/JOSU10xD/BrowserUI-Chromium",
  },
  {
    name: "CineShelf",
    description:
      "Mobile media-tracking application built to organize and manage movie, TV show, and entertainment collections with scalable React Native Context architecture.",
    tech: ["React Native", "Expo", "TypeScript", "Expo Router"],
    logoUrl: cineshelfLogo,
    imageUrl: [cine1, cine2, cine3, cine4], // Array of project screenshots for hover slideshow
    link: "https://github.com/JOSU10xD/CineShelf",
  },
  {
    name: "MapMyCampus",
    description:
      "Campus navigation and location-discovery mobile application utilizing geolocation services, route planning, and map integration to guide users.",
    tech: ["React Native", "Expo", "TypeScript", "Geolocation"],
    logoUrl: mapmycampusLogo,
    imageUrl: mapmycampusImg,
    link: "https://github.com/JOSU10xD/MapMyCampus",
  },
  {
    name: "Collective Voice",
    description:
      "Community-driven engagement and discussion platform facilitating content sharing, interactive polls, and community decision-making.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    logoUrl: collectivevoiceLogo,
    imageUrl: [cv1, cv2, cv3, cv4, cv5],
    link: "https://github.com/JOSU10xD/collective-voice",
  },
  {
    name: "MoreAtHome",
    description:
      "Custom educational mobile application developed for client delivery, presenting modular educational content and visual learning progress tracks.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    logoUrl: moreathomeLogo,
    imageUrl: [mah1, mah2, mah3, mah4],
    link: "https://github.com/JOSU10xD/more-learn-light",
  },
  {
    name: "Expense Tracker",
    description:
      "React-based expense tracker with auth, persistent store and charts for spending insights.",
    tech: ["React", "Firebase", "Chart.js"],
    logoUrl: expenseImg,
    imageUrl: expenseImg,
    link: "https://github.com/JOSU10xD/expense-tracker",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-white mb-6">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <ProjectCard key={idx} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

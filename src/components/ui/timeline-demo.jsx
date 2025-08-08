import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2022-2026",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Bachelor of Technology in Information Technology</h3>
          <div className="flex flex-col">
            <span className="text-silver-300">Viswajyothi College of Eng. & Tech.</span>
            <span className="text-silver-300">Vazhakulam, Kerala, India</span>
          </div>
        </div>
      ),
    },
    {
      title: "2021-2022",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Higher Secondary Education</h3>
          <div className="flex flex-col">
            <span className="text-silver-300">St. Joseph's Higher Secondary School</span>
            <span className="text-silver-300">Paingottoor, Kerala, India</span>
          </div>
        </div>
      ),
    },
    {
      title: "Projects & Achievements",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Key Projects</h3>
          <ul className="list-disc pl-5 space-y-1 text-silver-300">
            <li>E-commerce platform with React & Node.js</li>
            <li>AI-powered study assistant application</li>
            <li>Blockchain-based certificate verification system</li>
          </ul>
        </div>
      ),
    },
  ];
  
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
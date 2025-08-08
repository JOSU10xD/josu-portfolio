import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2022-2026",
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Bachelor of Technology in Information Technology</h3>
          <div className="flex flex-col space-y-1">
            <span className="text-silver-300 text-lg">Viswajyothi College of Eng. & Tech.</span>
            <span className="text-silver-300 text-lg">Vazhakulam, Kerala, India</span>
          </div>
        </div>
      ),
    },
    {
      title: "2021-2022",
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Higher Secondary Education</h3>
          <div className="flex flex-col space-y-1">
            <span className="text-silver-300 text-lg">St. Joseph's Higher Secondary School</span>
            <span className="text-silver-300 text-lg">Paingottoor, Kerala, India</span>
          </div>
        </div>
      ),
    },
    {
      title: "Projects & Achievements",
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Key Projects</h3>
          <ul className="list-disc pl-5 space-y-2 text-silver-300 text-lg">
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
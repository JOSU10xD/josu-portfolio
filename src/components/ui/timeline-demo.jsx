import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          {/* …your JSX content from 2024… */}
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          {/* …your JSX content from Early 2023… */}
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          {/* …your JSX content from Changelog… */}
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

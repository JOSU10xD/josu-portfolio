import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2022-26",
      content: (
        <div>
          {"BTech. IT, Viswajyothi College of Eng. & Tech., Vazhakulam, Kerala, India"}
        </div>
      ),
    },
    {
      title: "2021-2022",
      content: (
        <div>
          {"XII at St. Joseph's HSS, Paingottoor, Kerala, India"}
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

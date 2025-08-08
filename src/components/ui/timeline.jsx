"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-silver-200 max-w-4xl">
          Professional Journey Timeline
        </h2>
        <p className="text-silver-400 text-sm md:text-base max-w-sm">
          My career progression and key milestones in technology and education
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">

        {/* Timeline Line (behind everything) */}
        <div
          style={{ height: `${height}px` }}
          className="absolute md:left-8 left-8 top-0 w-[2px] z-0"
        >
          <div className="w-full h-full bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent 
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]" />

          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-gray-300 via-gray-100 to-transparent rounded-full"
          />
        </div>

        {/* Timeline Entries */}
        {data.map((item, i) => (
          <div
            key={i}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 relative z-10"
          >
            <div className="sticky flex flex-col md:flex-row items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center z-20">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <div className="flex flex-col md:pl-20">
                <h3 className="hidden md:block text-xl md:text-3xl font-bold text-silver-100">
                  {item.title}
                </h3>
                <div className="hidden md:block relative pl-0 pr-4 w-full mt-4">
                  <div className="bg-neutral-800/40 backdrop-blur-sm p-5 rounded-xl border border-neutral-600/30 shadow-lg shadow-neutral-900/20 hover:shadow-neutral-700/30 transition-all">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden relative pl-16 pr-4 w-full">
              <h3 className="text-2xl mb-4 text-left font-bold text-silver-100">
                {item.title}
              </h3>
              <div className="bg-neutral-800/40 backdrop-blur-sm p-5 rounded-xl border border-neutral-600/30 shadow-lg shadow-neutral-900/20 hover:shadow-neutral-700/30 transition-all">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
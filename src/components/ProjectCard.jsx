import React from "react";

export default function ProjectCard({ project }) {
  const { name, description, tech = [], imageUrl, link } = project;

  return (
    <article className="bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-colors duration-200 flex flex-col">
      {/* square image */}
      <div className="aspect-square w-full bg-neutral-900">
        <img
          src={imageUrl}
          alt={`${name} screenshot`}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-neutral-100">{name}</h3>
        <p className="mt-2 text-sm text-neutral-300 line-clamp-3">{description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white/6 text-neutral-100"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
          >
            View Repo
          </a>
        </div>
      </div>
    </article>
  );
}

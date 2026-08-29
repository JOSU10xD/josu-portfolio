import Reveal from "./Reveal";

/**
 * SectionHeading — consistent eyebrow + title + optional description.
 * Editorial feel, large display heading, fluid sizing.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  serif = false,
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-6 h-px bg-white/30"
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      {title && (
        <Reveal delay={80}>
          <h2
            className={`display-section text-balance ${
              serif ? "font-serif italic font-normal" : "font-display"
            }`}
          >
            {title}
          </h2>
        </Reveal>
      )}
      {description && (
        <Reveal delay={160}>
          <p
            className={`body-lg text-pretty max-w-2xl ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * CopyEmail — clickable email with copy-to-clipboard + animated confirmation.
 * Preserves keyboard accessibility (Enter/Space), screen-reader label, and
 * the underlying mailto link.
 */
export default function CopyEmail({
  email = "nevilbiju.dev@gmail.com",
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // graceful fallback: open mailto if clipboard unavailable
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className={cn("group flex items-center gap-2", className)}>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 text-[0.95rem] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
        aria-label={`Email ${email}`}
      >
        <Mail className="h-4 w-4" aria-hidden />
        <span className="font-mono tracking-tight">{email}</span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="relative inline-flex items-center justify-center h-8 w-8 rounded-md border border-[color:var(--border-subtle)] bg-white/[0.02] hover:bg-white/[0.06] hover:border-[color:var(--border-default)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-all"
        aria-label="Copy email"
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied ? "opacity-0 -translate-y-1 scale-90" : "opacity-100 translate-y-0 scale-100"
          )}
        >
          <Copy className="h-3.5 w-3.5" />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-90"
          )}
        >
          <Check className="h-3.5 w-3.5 text-emerald-400/90" />
        </span>
      </button>
      <span
        aria-live="polite"
        className={cn(
          "pointer-events-none ml-1 inline-block font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-all duration-300",
          copied ? "opacity-100 text-emerald-400/90" : "opacity-0"
        )}
      >
        Copied
      </span>
    </div>
  );
}

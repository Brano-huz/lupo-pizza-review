import { useId, type ReactNode } from "react";

/**
 * FORNO – vlastné dekoratívne značky.
 * Žiadne prevzaté logá, ilustrácie ani fotografie. Všetko je nakreslené
 * čistým SVG / CSS a slúži výlučne ako dekorácia (skryté pred čítačkami).
 */

interface FornoSealProps {
  className?: string;
}

export function FornoSeal({ className = "" }: FornoSealProps) {
  // Každá inštancia potrebuje vlastné id pre SVG textPath.
  const ringId = `forno-seal-ring-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={`pointer-events-none animate-seal-rotate ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 140 140" className="h-full w-full" fill="none">
        <defs>
          <path
            id={ringId}
            d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
          />
        </defs>
        <circle cx="70" cy="70" r="66" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <circle cx="70" cy="70" r="57" stroke="currentColor" strokeWidth="0.7" opacity="0.8" />
        <circle cx="70" cy="70" r="38" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />

        <text
          fill="currentColor"
          fontFamily="var(--font-body)"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="2.1"
        >
          <textPath href={`#${ringId}`} textLength="326" lengthAdjust="spacing">
            FORNO · LUPO · CESTO · OHEŇ · FORNO · LUPO · CESTO · OHEŇ ·
          </textPath>
        </text>

        {/* Vlastný plameň – symbol tepla pece. */}
        <path
          d="M70 44 C73 54 80 57 78 68 C77 75 72 79 70 82 C68 79 63 75 62 68 C60 57 67 54 70 44 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M70 58 C72 63 74 65 73 70 C72 74 70 76 70 77 C70 76 68 74 67 70 C66 65 68 63 70 58 Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path d="M56 90 H84" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
      </svg>
    </div>
  );
}

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  const run = (
    <span className="marquee-item" aria-hidden="true">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-6">
          <span>{item}</span>
          <span className="marquee-dot" />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  );
}

interface ChapterGhostProps {
  children: ReactNode;
  light?: boolean;
  className?: string;
}

export function ChapterGhost({ children, light = false, className = "" }: ChapterGhostProps) {
  return (
    <span
      aria-hidden="true"
      className={`chapter-ghost ${light ? "chapter-ghost-light" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

export function HeatAura({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`ember-aura animate-ember-breathe pointer-events-none ${className}`}
    />
  );
}

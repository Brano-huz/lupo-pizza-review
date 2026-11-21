import type { SVGProps } from "react";

type EmblemProps = SVGProps<SVGSVGElement>;

/**
 * Line-art vlčia hlava v dvojitom kruhu s olivovými vetvičkami.
 * Výhradne stroke / currentColor, bez výplne, gradientov a emoji.
 */
export default function Emblem({ className = "", ...props }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="50" cy="50" r="46.5" />
      <circle cx="50" cy="50" r="40" />

      <g>
        <path d="M29.5 38.5 L26.5 20.5 L41.5 30.5" />
        <path d="M70.5 38.5 L73.5 20.5 L58.5 30.5" />
        <path d="M31.5 33.5 L30 25.5 L37.5 31.5" />
        <path d="M68.5 33.5 L70 25.5 L62.5 31.5" />

        <path d="M29.5 38.5 C25.5 48 28 59.5 37 67.5 L44 74 L50 80 L56 74 L63 67.5 C72 59.5 74.5 48 70.5 38.5 C65 31.5 58 29 50 29 C42 29 35 31.5 29.5 38.5 Z" />
        <path d="M37 47 L45 45.5" />
        <path d="M63 47 L55 45.5" />
        <path d="M39.5 50.5 L45.5 51.5" />
        <path d="M60.5 50.5 L54.5 51.5" />
        <path d="M32 53 L38 55.5 L33 59.5" />
        <path d="M68 53 L62 55.5 L67 59.5" />

        <path d="M45 58 C46 55.5 54 55.5 55 58 C55 63 52.5 66 50 66 C47.5 66 45 63 45 58 Z" />
        <path d="M46.5 58.5 C48.5 56.8 51.5 56.8 53.5 58.5 C52 61 48 61 46.5 58.5 Z" />
        <path d="M50 61 L50 65.5" />
        <path d="M50 65.5 C47.5 67.5 44.5 67 43 65" />
        <path d="M50 65.5 C52.5 67.5 55.5 67 57 65" />
      </g>

      <g>
        <path d="M16 78 C19 70 25 64 33 59" />
        <path d="M18 73 C13 72 11 67 13 63 C17 65 19 69 18 73 Z" />
        <path d="M22 67 C18 63 18 58 21 55 C24 59 25 64 22 67 Z" />
        <path d="M27 62 C24 57 25 52 29 50 C31 55 30 59 27 62 Z" />
      </g>
      <g transform="translate(100 0) scale(-1 1)">
        <path d="M16 78 C19 70 25 64 33 59" />
        <path d="M18 73 C13 72 11 67 13 63 C17 65 19 69 18 73 Z" />
        <path d="M22 67 C18 63 18 58 21 55 C24 59 25 64 22 67 Z" />
        <path d="M27 62 C24 57 25 52 29 50 C31 55 30 59 27 62 Z" />
      </g>
    </svg>
  );
}

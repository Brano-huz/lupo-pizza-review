import Link from "next/link";
import { CONTACT } from "../data/menu";
import Emblem from "./Emblem";

const HERO_ALT = "Čerstvá pizza s mozzarellou, paradajkami a bazalkou na drevenom stole";

const DESKTOP_OVERLAY =
  "linear-gradient(90deg, rgba(12,32,25,.94) 0%, rgba(12,32,25,.78) 42%, rgba(12,32,25,.26) 100%)";
const MOBILE_OVERLAY = "linear-gradient(180deg, rgba(12,32,25,.66), rgba(12,32,25,.90))";

function RotatingSeal() {
  return (
    <div className="pointer-events-none absolute bottom-8 right-6 hidden h-28 w-28 animate-seal-rotate text-gold/70 md:block lg:bottom-12 lg:right-12 lg:h-32 lg:w-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
        <defs>
          <path
            id="hero-seal-path"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="0.8" />
        <text
          fill="currentColor"
          fontFamily="var(--font-body)"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.6"
        >
          <textPath href="#hero-seal-path" textLength="274" lengthAdjust="spacing">
            LUPO · CUCINA D&apos;ORO · PIZZA · QUALITÀ ·
          </textPath>
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="var(--font-display)"
          fontSize="30"
          fontWeight="700"
        >
          L
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="focus-on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-forest-deep text-cream"
    >
      <img
        src="/images/hero-pizza.jpg"
        alt={HERO_ALT}
        width={1600}
        height={1067}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{ backgroundImage: DESKTOP_OVERLAY }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{ backgroundImage: MOBILE_OVERLAY }}
      />

      <div className="container relative z-10 py-28 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-5 md:gap-7">
            <Emblem className="h-[72px] w-[72px] flex-none text-gold" />
            <span className="hidden h-12 w-px bg-gold/40 sm:block" aria-hidden="true" />
            <div>
              <span
                className="block font-display font-bold leading-none tracking-[0.2em] text-cream"
                style={{ fontSize: "clamp(3.75rem, 8vw, 7.5rem)" }}
              >
                LUPO
              </span>
              <span className="gold-line mt-3" aria-hidden="true" />
            </div>
          </div>

          <p className="eyebrow eyebrow-gold mt-7 md:mt-9">PIZZERIA · POVAŽSKÁ BYSTRICA</p>

          <h1
            id="hero-title"
            className="mt-4 max-w-[18ch] font-display font-semibold leading-[0.98] tracking-[-0.02em] text-cream"
            style={{ fontSize: "clamp(2.75rem, 5.2vw, 5.25rem)" }}
          >
            Talianska pizza s <em className="font-medium italic text-gold">vlčou</em> dušou.
          </h1>

          <p className="lead lead-light mt-6 text-[0.95rem] md:text-lg">
            Ručne vypracované cesto, poctivé suroviny a pizza, ktorá sa oplatí zdieľať. Vitajte v LUPO.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <Link href="/menu" className="button-primary">
              Pozrieť menu <span aria-hidden="true">→</span>
            </Link>
            <a href={CONTACT.phoneHref} className="button-outline-gold">
              <span aria-hidden="true">☎</span> Zavolať a objednať
            </a>
          </div>

          <Link
            href="/menu"
            className="mt-8 inline-flex min-h-[44px] items-center border-b border-gold/40 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold"
          >
            13 pízz · 9 príloh
          </Link>
        </div>
      </div>

      <RotatingSeal />

      <a
        href="#favoriti"
        className="focus-on-dark absolute bottom-10 left-6 hidden items-center gap-4 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-gold lg:flex lg:left-12"
        aria-label="Posunúť na sekciu Najobľúbenejšie pizze"
      >
        <span className="flex h-10 w-px items-end overflow-hidden bg-cream/30">
          <span className="block h-full w-px origin-top bg-gold animate-cue-pulse" />
        </span>
        Scroll
      </a>
    </section>
  );
}

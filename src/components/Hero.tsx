import Link from "next/link";
import { CONTACT } from "../data/menu";
import Emblem from "./Emblem";
import { FornoSeal, HeatAura, Marquee } from "./FornoMarks";

const HERO_ALT = "Čerstvá pizza s mozzarellou, paradajkami a bazalkou na drevenom stole";

const DESKTOP_OVERLAY =
  "linear-gradient(90deg, rgba(22,16,13,.96) 0%, rgba(22,16,13,.82) 42%, rgba(22,16,13,.22) 100%)";
const MOBILE_OVERLAY = "linear-gradient(180deg, rgba(22,16,13,.70), rgba(22,16,13,.95))";

const MARQUEE_ITEMS = ["CESTO", "OHEŇ", "ČAS", "RUČNÁ PRÁCA", "LUPO"] as const;

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
        className="absolute inset-0 h-full w-full object-cover object-center hero-image-enter"
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

      <HeatAura className="absolute -right-24 -top-24 h-[520px] w-[520px] md:h-[760px] md:w-[760px]" />
      <div className="forno-rings pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Okrajový štítok – dekorácia, na mobiloch skrytá. */}
      <span className="edge-label absolute right-8 top-1/2 hidden -translate-y-1/2 text-flame/60 xl:block">
        PIZZERIA · POVAŽSKÁ BYSTRICA ·
      </span>

      <div className="container relative z-10 py-24 md:py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-5 md:gap-8">
            <Emblem className="h-[64px] w-[64px] flex-none text-flame md:h-[84px] md:w-[84px]" />
            <span className="hidden h-14 w-px bg-flame/40 sm:block" aria-hidden="true" />
            <div>
              <span
                className="hero-display block text-cream"
                style={{ fontSize: "clamp(4rem, 9vw, 9rem)" }}
              >
                LUPO
              </span>
              <div className="flame-rule mt-3 max-w-[220px]" aria-hidden="true" />
            </div>
          </div>

          <p className="chapter chapter-on-dark eyebrow-gold mt-8 hero-fade hero-delay-1 md:mt-10">
            00 / FORNO
          </p>

          <h1
            id="hero-title"
            className="hero-display mt-4 max-w-[16ch] text-cream hero-rise hero-delay-2"
            style={{ fontSize: "clamp(2.9rem, 6.2vw, 6.25rem)" }}
          >
            Talianska pizza s <em className="font-medium italic text-flame">vlčou</em> dušou.
          </h1>

          <p className="lead lead-light mt-6 text-[0.95rem] md:text-lg hero-rise hero-delay-3">
            Ručne vypracované cesto, poctivé suroviny a pizza, ktorá sa oplatí zdieľať. Vitajte v LUPO.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 hero-rise hero-delay-4">
            <Link href="/menu" className="button-primary">
              Pozrieť menu <span aria-hidden="true">→</span>
            </Link>
            <a href={CONTACT.phoneHref} className="button-outline-gold">
              <span aria-hidden="true">☎</span> Zavolať a objednať
            </a>
          </div>

          <Link
            href="/menu"
            className="mt-8 inline-flex min-h-[44px] items-center border-b border-flame/40 text-xs font-semibold uppercase tracking-[0.2em] text-flame transition-colors hover:border-flame hero-fade hero-delay-4"
          >
            13 pízz · 9 príloh
          </Link>
        </div>
      </div>

      <FornoSeal className="absolute bottom-10 right-6 hidden h-28 w-28 text-flame/70 md:block lg:bottom-14 lg:right-14 lg:h-40 lg:w-40" />

      <div className="absolute bottom-0 left-0 right-0 z-10 hidden border-t border-cream/10 bg-char-deep/60 py-3 text-flame/80 backdrop-blur-sm md:block">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <a
        href="#favoriti"
        className="focus-on-dark absolute bottom-24 left-6 hidden items-center gap-4 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-flame lg:flex lg:left-12"
        aria-label="Posunúť na sekciu Najobľúbenejšie pizze"
      >
        <span className="flex h-10 w-px items-end overflow-hidden bg-cream/30">
          <span className="block h-full w-px origin-top bg-flame animate-cue-pulse" />
        </span>
        Scroll
      </a>
    </section>
  );
}

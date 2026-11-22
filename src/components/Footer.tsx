import Link from "next/link";
import { CONTACT } from "../data/menu";
import Emblem from "./Emblem";
import { FornoSeal, Marquee } from "./FornoMarks";

const FOOTER_LINKS = [
  { label: "Domov", href: "/" },
  { label: "Naše menu", href: "/menu" },
  { label: "Najobľúbenejšie", href: "/#favoriti" },
  { label: "O nás", href: "/#o-nas" },
  { label: "Galéria", href: "/#galeria" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

const MARQUEE_ITEMS = ["LUPO", "FORNO", "PIZZA", "POVAŽSKÁ BYSTRICA"] as const;

export default function Footer() {
  return (
    <footer className="focus-on-dark relative overflow-hidden bg-char-deep text-cream">
      <div className="border-y border-cream/10 py-3 text-flame/70">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <div className="container relative py-16 md:py-20">
        <FornoSeal className="absolute -right-16 -top-10 h-48 w-48 text-flame/10" />

        <div className="relative z-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="flex items-center gap-4">
              <Emblem className="h-[56px] w-[56px] flex-none text-flame" />
              <span className="font-display text-[2rem] font-bold leading-none tracking-[0.2em]">
                LUPO
              </span>
            </div>
            <p className="mt-5 max-w-[24ch] font-display text-[1.6rem] italic leading-tight text-cream/70">
              Cesto, oheň, víno času.
            </p>
            <div className="flame-rule mt-6 max-w-[140px]" aria-hidden="true" />
          </div>

          <nav aria-label="Pätičková navigácia">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-flame">Objavujte</h2>
            <ul className="mt-5 space-y-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm text-cream/75 transition-colors hover:text-flame"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-flame">Kontakt</h2>
            <address className="mt-5 not-italic text-sm leading-relaxed text-cream/75">
              {CONTACT.name}
              <br />
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </address>
            <a
              href={CONTACT.phoneHref}
              className="mt-3 inline-flex min-h-[44px] items-center text-sm text-cream/75 transition-colors hover:text-flame tabular-nums"
            >
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.web}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center text-sm text-cream/75 transition-colors hover:text-flame"
            >
              pizzalupo.sk <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-flame">Vytlačte si</h2>
            <p className="mt-5 max-w-[28ch] text-sm leading-relaxed text-cream/70">
              Máte menu radi radšej na papieri? Vytlačte si prehľad pízz a príloh.
            </p>
            <button
              type="button"
              className="button-outline-gold mt-5"
              onClick={() => window.print()}
            >
              Tlačiť menu
            </button>
          </div>
        </div>

        <div
          className="relative z-10 mt-14 select-none text-center font-display text-[clamp(4.5rem,16vw,14rem)] font-bold leading-[0.72] tracking-[-0.06em] text-cream/[0.06]"
          aria-hidden="true"
        >
          FORNO
        </div>

        <div className="relative z-10 mt-10 flex flex-col gap-4 border-t border-cream/15 pt-7 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LUPO Pizza</p>
          <p>Považská Bystrica</p>
          <button
            type="button"
            className="inline-flex min-h-[44px] w-fit items-center gap-2 font-semibold text-cream/75 transition-colors hover:text-flame"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
          >
            <span aria-hidden="true">↑</span> Hore
          </button>
        </div>

        <p className="relative z-10 mt-4 text-[0.6875rem] text-cream/40">
          Nezávislý, neoficiálny návrh webovej prezentácie.
        </p>
      </div>
    </footer>
  );
}

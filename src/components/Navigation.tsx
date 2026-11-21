import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../data/menu";
import Emblem from "./Emblem";

const NAV_ITEMS = [
  { label: "Menu", href: "/menu" },
  { label: "Najobľúbenejšie", href: "/#favoriti" },
  { label: "O nás", href: "/#o-nas" },
  { label: "Galéria", href: "/#galeria" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 16.4v2.7a2 2 0 0 1-2.2 2A17.8 17.8 0 0 1 3 6.2 2 2 0 0 1 5 4h2.7a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L8.5 11a14 14 0 0 0 4.5 4.5l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export default function Navigation() {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Obsah pod drawerom odoberieme z interakcie aj z accessibility stromu.
    const backgrounds = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, header > .container"),
    );
    const previousInert = backgrounds.map((el) => el.hasAttribute("inert"));
    const previousAriaHidden = backgrounds.map((el) => el.getAttribute("aria-hidden"));
    backgrounds.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const container = drawerRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      backgrounds.forEach((el, i) => {
        if (!previousInert[i]) el.removeAttribute("inert");
        const previous = previousAriaHidden[i];
        if (previous === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", previous);
      });
      document.body.style.overflow = previousOverflow;
      hamburgerRef.current?.focus();
    };
  }, [menuOpen]);

  const transparent = isHome && !scrolled;

  const headerClasses = [
    "sticky top-0 z-50 h-[68px] border-b transition-[background-color,border-color,box-shadow,color] duration-300 md:h-[84px]",
    isHome ? "-mb-[68px] md:-mb-[84px]" : "",
    transparent
      ? "focus-on-dark border-transparent bg-transparent text-cream"
      : "border-line bg-cream/95 text-forest shadow-header backdrop-blur-md",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <a href="#main-content" className="skip-link">
        Preskočiť na obsah
      </a>

      <div className="container flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex min-h-[44px] items-center gap-3"
          aria-label="LUPO Pizza – domovská stránka"
        >
          <Emblem
            className={`h-[34px] w-[34px] flex-none transition-colors duration-300 ${
              transparent ? "text-gold" : "text-forest"
            }`}
          />
          <span className="font-display text-[1.55rem] font-bold leading-none tracking-[0.2em]">
            LUPO
          </span>
        </Link>

        <nav aria-label="Hlavná navigácia" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex min-h-[44px] items-center border-b border-transparent text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-200 hover:border-current ${
                transparent ? "text-cream/90 hover:text-gold" : "text-forest/85 hover:text-tomato-dark"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className={`hidden min-h-[44px] items-center gap-2 rounded-pill border px-4 text-[0.8125rem] font-bold transition-colors duration-200 sm:inline-flex ${
              transparent
                ? "border-gold/70 text-gold hover:bg-gold hover:text-forest-deep"
                : "border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-cream"
            }`}
          >
            <PhoneIcon className="h-4 w-4" />
            {CONTACT.phone}
          </a>

          <a
            href={CONTACT.phoneHref}
            aria-label={`Zavolať ${CONTACT.phone}`}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 sm:hidden ${
              transparent ? "border-gold/60 text-gold" : "border-forest/30 text-forest"
            }`}
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </a>

          <button
            ref={hamburgerRef}
            type="button"
            className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors duration-200 lg:hidden ${
              transparent ? "border-gold/60 text-gold" : "border-forest/30 text-forest"
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Zavrieť navigáciu" : "Otvoriť navigáciu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-3.5 bg-current" />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobilná navigácia"
        hidden={!menuOpen}
        className="focus-on-dark fixed inset-0 z-[90] overflow-y-auto bg-cream text-forest"
      >
        <div className="container flex min-h-full flex-col py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Emblem className="h-[34px] w-[34px] text-forest" />
              <span className="font-display text-[1.55rem] font-bold leading-none tracking-[0.2em]">
                LUPO
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/30 text-forest"
              aria-label="Zavrieť navigáciu"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobilná hlavná navigácia" className="mt-12 flex flex-col">
            <span className="eyebrow eyebrow-muted">Objavujte LUPO</span>
            <span className="linea-rossa mb-8" aria-hidden="true" />
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex min-h-[64px] items-center gap-5 border-b border-line py-3"
                onClick={() => setMenuOpen(false)}
              >
                <span className="font-display text-sm text-gold-deep tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[2rem] font-semibold leading-none transition-colors duration-200 group-hover:text-tomato-dark">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-12">
            <span className="eyebrow eyebrow-muted">Telefónna objednávka</span>
            <a
              href={CONTACT.phoneHref}
              className="button-primary mt-4 w-full sm:w-auto"
              onClick={() => setMenuOpen(false)}
            >
              <PhoneIcon className="h-4 w-4" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

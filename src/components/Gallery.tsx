import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const GALLERY = [
  {
    src: "/images/gallery-oven.jpg",
    alt: "Pizza sa pečie v horúcej peci",
  },
  {
    src: "/images/gallery-dough.jpg",
    alt: "Ručne vypracované cesto na pizzu posypané múkou",
  },
  {
    src: "/images/gallery-ingredients.jpg",
    alt: "Čerstvé paradajky, mozzarella a bazalka pripravené na prípravu pizze",
  },
  {
    src: "/images/gallery-interior.jpg",
    alt: "Interiér pizzerie s drevenými stolmi a teplým osvetlením",
  },
] as const;

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activeIndex !== null;

  const openLightbox = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pozadie spravíme neinteraktívnym aj pre čítačky obrazovky (dialog je v porte).
    const backgrounds = Array.from(document.querySelectorAll<HTMLElement>("header, main, footer"));
    const previousInert = backgrounds.map((el) => el.hasAttribute("inert"));
    const previousAriaHidden = backgrounds.map((el) => el.getAttribute("aria-hidden"));
    backgrounds.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? 0 : (current + 1) % GALLERY.length));
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? 0 : (current - 1 + GALLERY.length) % GALLERY.length,
        );
        return;
      }

      if (event.key !== "Tab") return;
      const container = dialogRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
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
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="bg-cream-2 py-20 md:py-28">
      <div className="container">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted">
              <span className="text-gold-deep tabular-nums">04 /</span> Z KUCHYNE
            </p>
            <span className="linea-rossa" aria-hidden="true" />
            <h2 id="galeria-title" className="section-title mt-5">
              Za krajom cesta
            </h2>
          </div>
          <p className="text-sm text-muted">Kliknite na fotku pre zväčšenie</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {GALLERY.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`group relative overflow-hidden rounded-card border border-line bg-cream-3 text-left shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover ${
                index === 0 ? "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2" : "aspect-[4/3]"
              }`}
              onClick={(event) => openLightbox(index, event)}
              aria-label={`Zväčšiť fotografiu: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={index === 0 ? 1200 : 640}
                height={index === 0 ? 675 : 480}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <span className="absolute bottom-3 right-3 inline-flex h-9 items-center rounded-full bg-forest-deep/80 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                Zväčšiť
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && typeof document !== "undefined"
        ? createPortal(
        <div
          className="focus-on-dark fixed inset-0 z-[100] flex flex-col bg-forest-deep/95 p-4 text-cream backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Galéria – zobrazenie fotografie"
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep"
              aria-label="Zavrieť galériu"
              onClick={() => setActiveIndex(null)}
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

          <div
            className="flex min-h-0 flex-1 items-center justify-center py-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveIndex(null);
            }}
          >
            <img
              src={GALLERY[activeIndex].src}
              alt={GALLERY[activeIndex].alt}
              width={1200}
              height={800}
              className="max-h-[76vh] max-w-full rounded-soft object-contain shadow-image"
            />
          </div>

          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
            <p className="max-w-[70%] text-xs leading-relaxed text-cream/70 md:text-sm">
              {GALLERY[activeIndex].alt}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep"
                aria-label="Predchádzajúca fotografia"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null ? 0 : (current - 1 + GALLERY.length) % GALLERY.length,
                  )
                }
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep"
                aria-label="Ďalšia fotografia"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null ? 0 : (current + 1) % GALLERY.length,
                  )
                }
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>,
          document.body,
        )
        : null}
    </section>
  );
}

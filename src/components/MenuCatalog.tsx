import { useEffect, useMemo, useRef, useState } from "react";
import { PIZZAS, PIZZA_CATEGORIES, PRILOHY, formatPrice } from "../data/menu";

type Filter = (typeof PIZZA_CATEGORIES)[number];

const CATEGORY_DOTS: Record<string, string> = {
  Klasické: "#8A4E12",
  Mäsové: "#D8451C",
  Pikantné: "#A8310F",
  Syrové: "#476A42",
};

interface MenuCatalogProps {
  id?: string;
}

export default function MenuCatalog({ id }: MenuCatalogProps) {
  const [active, setActive] = useState<Filter>("Všetky");
  const [paintActive, setPaintActive] = useState<Filter>("Všetky");
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const handleCategory = (category: Filter) => {
    setActive(category);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaintActive(category);
      setPhase("idle");
      return;
    }

    setPhase("out");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPaintActive(category);
      setPhase("in");
      frameRef.current = requestAnimationFrame(() => setPhase("idle"));
    }, 180);
  };

  const counts = useMemo(
    () =>
      PIZZA_CATEGORIES.map((category) => ({
        category,
        count:
          category === "Všetky"
            ? PIZZAS.length
            : PIZZAS.filter((pizza) => pizza.category === category).length,
      })),
    [],
  );

  const visiblePizzas = useMemo(
    () => (active === "Všetky" ? PIZZAS : PIZZAS.filter((pizza) => pizza.category === active)),
    [active],
  );

  return (
    <div id={id} className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="forno-rings absolute -right-40 top-24 h-[620px] w-[620px] opacity-60" />
      </div>
      <div className="filter-bar sticky top-[68px] z-30 -mx-2 border-y border-line bg-cream-2/95 px-2 py-3 backdrop-blur-md md:top-[84px] md:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filtrovať menu podľa kategórie"
            className="flex flex-wrap items-center gap-2"
          >
            {counts.map(({ category, count }) => (
              <button
                key={category}
                type="button"
                className="filter-pill"
                aria-pressed={active === category}
                onClick={() => handleCategory(category)}
              >
                {category}
                <span className="filter-count" aria-hidden="true">
                  {count}
                </span>
                <span className="sr-only">({count})</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-xs font-semibold text-muted tabular-nums sm:shrink-0">
            Zobrazených {visiblePizzas.length} pízz.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] lg:gap-16">
        <section aria-labelledby="menu-pizze-title" className="reveal">
          <div className="flex items-baseline justify-between gap-4">
            <h3 id="menu-pizze-title" className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.02em] text-ink">
              Pizze
            </h3>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted tabular-nums">
              {String(visiblePizzas.length).padStart(2, "0")} / {String(PIZZAS.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="mt-4 divide-y divide-line">
            {PIZZAS.map((pizza, index) => {
              return (
                <li
                  key={pizza.id}
                  hidden={!(paintActive === "Všetky" || pizza.category === paintActive)}
                  data-phase={phase}
                  className="menu-row filter-row grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-3 px-2 py-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-x-5 sm:px-3"
                >
                  <span className="menu-row-number pt-1 font-display text-2xl font-semibold text-ember-deep sm:text-3xl tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="font-body text-base font-bold leading-snug text-ink sm:text-lg">
                        {pizza.name}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-muted">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: CATEGORY_DOTS[pizza.category] ?? "#8A6D18" }}
                          aria-hidden="true"
                        />
                        {pizza.category}
                      </span>
                    </div>
                    <p className="mt-1 max-w-[60ch] text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
                      {pizza.description}
                    </p>
                    <p className="mt-1 text-xs text-muted tabular-nums">{pizza.grams} g</p>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <span
                      aria-hidden="true"
                      className="mt-2 hidden h-px w-8 border-b border-dotted border-cream-3 sm:block lg:w-14"
                    />
                    <span className="menu-row-price whitespace-nowrap font-display text-2xl font-semibold text-ember-deep sm:text-[1.75rem]">
                      {formatPrice(pizza.price)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="menu-prilohy-title" className="reveal reveal-delay-1">
          <h3 id="menu-prilohy-title" className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.02em] text-ink">
            Prílohy
          </h3>
          <p className="mt-1 text-sm text-muted">Niečo navyše k vašej pizzi.</p>

          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {PRILOHY.map((priloha, index) => (
              <li
                key={priloha.id}
                className={`priloha-card reveal reveal-delay-${(index % 2) + 1} flex min-h-[68px] items-center justify-between gap-3 rounded-soft border border-line bg-cream px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-card`}
              >
                <span className="text-sm font-semibold leading-snug text-ink">{priloha.name}</span>
                <span className="whitespace-nowrap font-display text-xl font-semibold text-ember-deep tabular-nums">
                  {formatPrice(priloha.price)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { FAVORITE_IDS, PIZZAS, formatPrice } from "../data/menu";
import { ChapterGhost } from "./FornoMarks";

const IMAGE_ALTS: Record<string, string> = {
  margherita: "Pizza Margherita s mozzarellou, paradajkovou omáčkou a bazalkou",
  diavola: "Pikantná pizza Diavola s feferónkami a salámou",
  "quattro-formaggi": "Pizza so štyrmi druhmi syra",
};

const favorites = FAVORITE_IDS.map((id) => PIZZAS.find((pizza) => pizza.id === id)).filter(
  (pizza): pizza is (typeof PIZZAS)[number] => Boolean(pizza),
);

export default function Favorites() {
  return (
    <section
      id="favoriti"
      aria-labelledby="favoriti-title"
      className="relative overflow-hidden bg-cream-2 py-20 md:py-28"
    >
      <ChapterGhost className="pointer-events-none absolute -right-6 -top-10 hidden lg:block">01</ChapterGhost>

      <div className="container relative z-10">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter">
              <span className="tabular-nums">01 /</span> FAVORITI
            </p>
            <span className="linea-rossa" aria-hidden="true" />
            <h2 id="favoriti-title" className="section-title mt-5">
              Najobľúbenejšie pizze
            </h2>
          </div>
          <Link href="/menu" className="text-link self-start md:self-auto">
            Všetky pizze <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {favorites.map((pizza, index) => (
            <article
              key={pizza.id}
              className={`card-editorial group reveal reveal-delay-${index + 1} flex flex-col pt-6`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-3">
                <img
                  src={pizza.image}
                  alt={IMAGE_ALTS[pizza.id] ?? pizza.name}
                  width={640}
                  height={480}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
                />
                <span className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-white/85 drop-shadow-[0_2px_10px_rgba(22,16,13,.6)] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-flame transition-all duration-500 group-hover:w-full" aria-hidden="true" />
              </div>

              <div className="flex flex-1 flex-col pb-2 pt-6">
                <h3 className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.02em] text-ink md:text-[2.75rem]">
                  {pizza.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                  {pizza.description}
                </p>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <span className="block font-display text-[1.9rem] font-semibold leading-none text-ember-deep tabular-nums">
                      {formatPrice(pizza.price)}
                    </span>
                    <span className="mt-1 block text-xs text-muted tabular-nums">{pizza.grams} g</span>
                  </div>
                  <Link href="/menu" className="text-link">
                    Do menu <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

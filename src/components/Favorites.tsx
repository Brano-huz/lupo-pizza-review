import Link from "next/link";
import { FAVORITE_IDS, PIZZAS, formatPrice } from "../data/menu";

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
      className="bg-cream-2 py-20 md:py-28"
    >
      <div className="container">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted">
              <span className="text-gold-deep tabular-nums">01 /</span> FAVORITI
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

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-7">
          {favorites.map((pizza, index) => (
            <article
              key={pizza.id}
              className={`card card-interactive group reveal reveal-delay-${index + 1} flex flex-col overflow-hidden`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-3">
                <img
                  src={pizza.image}
                  alt={IMAGE_ALTS[pizza.id] ?? pizza.name}
                  width={640}
                  height={480}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute left-4 top-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-tomato px-2 font-body text-xs font-bold text-white tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
                <h3 className="font-display text-[1.85rem] font-semibold leading-tight text-ink">
                  {pizza.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {pizza.description}
                </p>
                <div className="mt-auto border-t border-line pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-[1.6rem] font-semibold text-tomato-dark tabular-nums">
                      {formatPrice(pizza.price)}
                    </span>
                    <Link href="/menu" className="text-link">
                      Do menu <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                  <p className="mt-1 text-xs text-muted">{pizza.grams} g</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

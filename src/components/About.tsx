import Emblem from "./Emblem";

const VALUES = [
  {
    number: "01",
    title: "Ručné cesto",
    text: "Cesto pripravujeme ručne, s citom pre detail.",
  },
  {
    number: "02",
    title: "Poctivé suroviny",
    text: "Paradajky, mozzarella, bazalka. Jednoducho a dobre.",
  },
  {
    number: "03",
    title: "Oheň v peci",
    text: "Pizza vchádza do pece a vychádza pripravená na stôl.",
  },
] as const;

export default function About() {
  return (
    <section
      id="o-nas"
      aria-labelledby="o-nas-title"
      className="focus-on-dark relative overflow-hidden bg-forest py-20 text-cream md:py-28"
    >
      <Emblem className="pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] text-cream opacity-5 md:h-[620px] md:w-[620px]" />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal order-2 lg:order-1">
          <div className="relative mx-auto max-w-[460px] pb-12 pr-8 md:pb-16 md:pr-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-forest-deep shadow-image">
              <img
                src="/images/gallery-dough.jpg"
                alt="Ručne vypracované cesto na pizzu posypané múkou"
                width={720}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[150px] rotate-2 overflow-hidden rounded-card border-2 border-cream/90 bg-cream shadow-image md:w-[220px]">
              <img
                src="/images/gallery-oven.jpg"
                alt="Pizza sa pečie v horúcej peci"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow eyebrow-gold">
            <span className="tabular-nums">03 /</span> NÁŠ PRÍBEH
          </p>
          <span className="gold-line mt-4" aria-hidden="true" />
          <h2 id="o-nas-title" className="section-title section-title-light mt-5">
            Láska k cestu. Vlčia vytrvalosť.
          </h2>

          <div className="prose lead lead-light reveal mt-6">
            <p>
              LUPO nie je len názov. Je to pripomienka, že dobrá pizza vzniká trpezlivosťou – od prvého
              hnetenia cesta až po okamih, keď vyjde z pece.
            </p>
            <p>
              V kuchyni sa riadime jednoduchým pravidlom: menej vecí, ale každá z nich musí mať svoj
              dôvod. Preto pracujeme s čerstvými surovinami a nechávame chuti, aby hovorila sama.
            </p>
          </div>

          <span className="gold-line-long my-8" aria-hidden="true" />

          <ul className="space-y-5">
            {VALUES.map((value) => (
              <li key={value.number} className="flex gap-5 border-b border-cream/15 pb-5">
                <span className="font-display text-lg font-semibold text-gold tabular-nums">
                  {value.number}
                </span>
                <div>
                  <h3 className="font-body text-sm font-bold tracking-[0.02em] text-cream">
                    {value.title}
                  </h3>
                  <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-cream/70">
                    {value.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#galeria"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 border-b border-gold/50 text-sm font-bold text-gold transition-colors hover:border-gold"
          >
            Pozrieť galériu <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

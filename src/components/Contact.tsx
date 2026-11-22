import { CONTACT } from "../data/menu";
import { ChapterGhost, HeatAura } from "./FornoMarks";

export default function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <ChapterGhost className="pointer-events-none absolute -left-10 -bottom-16 hidden lg:block">05</ChapterGhost>
      <HeatAura className="absolute -left-40 bottom-0 h-[560px] w-[560px] opacity-25" />

      <div className="container relative z-10">
        <div className="reveal">
          <p className="chapter">
            <span className="tabular-nums">05 /</span> KONTAKT
          </p>
          <span className="linea-rossa" aria-hidden="true" />
          <h2 id="kontakt-title" className="section-title mt-5">
            Príďte na pizzu.
          </h2>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div className="reveal flex flex-col justify-center">
            <address className="not-italic text-base leading-relaxed text-ink">
              <span className="contact-line block font-display text-[2.5rem] font-semibold leading-none">
                {CONTACT.name}
              </span>
              <span className="contact-line mt-4 block text-muted">{CONTACT.address}</span>
              <span className="contact-line block text-muted">{CONTACT.city}</span>
            </address>

            <a
              href={CONTACT.phoneHref}
              className="contact-phone mt-8 inline-flex min-h-[44px] w-fit items-center font-display text-[2.25rem] font-semibold leading-none text-ember-deep transition-colors hover:text-ember tabular-nums md:text-[2.75rem]"
            >
              {CONTACT.phone}
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={CONTACT.phoneHref} className="button-primary">
                Zavolať a objednať
              </a>
              <a
                href={CONTACT.web}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                pizzalupo.sk <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="mt-10 max-w-[46ch] border-t border-line pt-6 text-sm leading-relaxed text-muted">
              Telefónna objednávka je najrýchlejší spôsob, ako si pochutiť na čerstvej pizzi z LUPO.
            </p>
          </div>

          <div className="reveal reveal-delay-1">
            <div className="aspect-[4/3] overflow-hidden border border-line bg-cream-3 warm-shadow">
              <iframe
                src={CONTACT.mapsEmbed}
                title={`Mapa – ${CONTACT.name}, ${CONTACT.address}, ${CONTACT.city}`}
                loading="lazy"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-4"
            >
              Otvoriť v Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

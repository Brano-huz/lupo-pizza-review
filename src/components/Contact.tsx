import { CONTACT } from "../data/menu";

export default function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-cream py-20 md:py-28">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow eyebrow-muted">
            <span className="text-gold-deep tabular-nums">05 /</span> KONTAKT
          </p>
          <span className="linea-rossa" aria-hidden="true" />
          <h2 id="kontakt-title" className="section-title mt-5">
            Príďte na pizzu.
          </h2>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div className="reveal flex flex-col justify-center">
            <address className="not-italic text-base leading-relaxed text-ink">
              <span className="contact-line block font-display text-2xl font-semibold">{CONTACT.name}</span>
              <span className="contact-line mt-3 block text-muted">{CONTACT.address}</span>
              <span className="contact-line block text-muted">{CONTACT.city}</span>
            </address>

            <a
              href={CONTACT.phoneHref}
              className="contact-phone mt-8 inline-flex min-h-[44px] w-fit items-center font-display text-[1.75rem] font-semibold text-tomato-dark transition-colors hover:text-tomato"
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
            <div className="aspect-[4/3] overflow-hidden rounded-card border border-line bg-cream-3 shadow-card">
              <iframe
                src={CONTACT.mapsEmbed}
                title="Mapa – LUPO Pizza, Hliníky 717/30, Považská Bystrica"
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

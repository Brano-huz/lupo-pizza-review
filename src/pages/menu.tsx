import Link from "next/link";
import Emblem from "../components/Emblem";
import Footer from "../components/Footer";
import MenuCatalog from "../components/MenuCatalog";
import Navigation from "../components/Navigation";
import Seo from "../components/Seo";
import { CONTACT } from "../data/menu";
import { siteUrl } from "../lib/siteUrl";

export default function MenuPage() {
  return (
    <>
      <Seo
        title="Menu – LUPO Pizza Považská Bystrica | Talianska pizza"
        description="Kompletné menu LUPO Pizza: 13 talianskych pízz a 9 príloh s presnými cenami a gramážami. Objednávka telefonicky v Považskej Bystrici."
        canonical={siteUrl("/menu")}
        image={siteUrl("/images/gallery-ingredients.jpg")}
      />
      <Navigation />

      <main id="main-content">
        <section
          aria-labelledby="menu-band-title"
          className="focus-on-dark relative overflow-hidden bg-forest-deep py-16 text-cream md:py-20"
        >
          <img
            src="/images/gallery-ingredients.jpg"
            alt="Čerstvé paradajky, mozzarella a bazalka pripravené na prípravu pizze"
            width={1600}
            height={1067}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(15,34,26,.86)" }}
          />

          <div className="container relative z-10">
            <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.16em]">
              <ol className="flex flex-wrap items-center gap-2 text-cream/70">
                <li>
                  <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-gold">
                    Domov
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-gold">
                  Menu
                </li>
              </ol>
            </nav>

            <div className="mt-8 flex items-center gap-5 md:mt-10 md:gap-7">
              <Emblem className="h-[48px] w-[48px] flex-none text-gold" />
              <span className="hidden h-12 w-px bg-gold/40 sm:block" aria-hidden="true" />
              <div>
                <h1 id="menu-band-title" className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-none text-cream">
                  Naše menu
                </h1>
                <span className="gold-line mt-4" aria-hidden="true" />
              </div>
            </div>
            <p className="lead lead-light mt-6">13 pízz. 9 príloh. Vyberte si.</p>
          </div>
        </section>

        <section aria-labelledby="catalog-title" className="bg-cream py-14 md:py-20">
          <div className="container">
            <h2 id="catalog-title" className="sr-only">
              Kompletná ponuka pízz a príloh
            </h2>
            <MenuCatalog />
          </div>
        </section>

        <section
          aria-labelledby="menu-cta-title"
          className="focus-on-dark bg-forest text-cream"
        >
          <div className="container flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-center md:py-16">
            <div>
              <p className="eyebrow eyebrow-gold">OBJEDNÁVKA</p>
              <h2 id="menu-cta-title" className="section-title section-title-light mt-3">
                Máte chuť?
              </h2>
              <p className="lead lead-light mt-3">Radi vám pomôžeme s objednávkou.</p>
            </div>
            <a href={CONTACT.phoneHref} className="button-primary shrink-0">
              {CONTACT.phone}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

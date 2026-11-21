import Link from "next/link";
import About from "../components/About";
import Contact from "../components/Contact";
import Favorites from "../components/Favorites";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import MenuCatalog from "../components/MenuCatalog";
import Navigation from "../components/Navigation";
import Seo from "../components/Seo";
import { CONTACT } from "../data/menu";
import { siteUrl } from "../lib/siteUrl";

const cityMatch = CONTACT.city.match(/^(\d{3}\s\d{2})\s(.+)$/);
const postalCode = cityMatch?.[1] ?? CONTACT.city;
const addressLocality = cityMatch?.[2] ?? CONTACT.city;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: CONTACT.name,
  telephone: CONTACT.phone,
  url: siteUrl("/"),
  servesCuisine: ["Pizza", "Italian"],
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address,
    postalCode,
    addressLocality,
    addressCountry: "SK",
  },
  image: siteUrl("/images/hero-pizza.jpg"),
  priceRange: "€€",
};

export default function Home() {
  return (
    <>
      <Seo
        title="LUPO Pizza Považská Bystrica – talianska pizza a menu"
        description="LUPO Pizza v Považskej Bystrici – talianska pizza s ručne vypracovaným cestom, poctivými surovinami a 13 receptúrami. Pozrite si menu a objednajte telefonicky."
        canonical={siteUrl("/")}
        image={siteUrl("/images/hero-pizza.jpg")}
        jsonLd={structuredData}
      />
      <Navigation />

      <main id="main-content">
        <Hero />
        <Favorites />

        <section aria-labelledby="home-menu-title" className="bg-cream py-20 md:py-28">
          <div className="container">
            <div className="reveal">
              <p className="eyebrow eyebrow-muted">
                <span className="text-gold-deep tabular-nums">02 /</span> MENU
              </p>
              <span className="linea-rossa" aria-hidden="true" />
              <h2 id="home-menu-title" className="section-title mt-5">
                Vyberte si svoju
              </h2>
              <p className="lead mt-4">Trinásť pízz a deväť príloh. Každá má svoj dôvod.</p>
            </div>

            <div className="mt-10">
              <MenuCatalog id="menu" />
            </div>

            <Link href="/menu" className="text-link mt-10">
              Otvoriť celé menu na samostatnej stránke <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <About />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export type PizzaCategory = "Klasické" | "Mäsové" | "Pikantné" | "Syrové";

export interface Pizza {
  id: string;
  name: string;
  grams: number;
  /** Price in EUR, stored as a decimal number to avoid floating point formatting issues. */
  price: number;
  category: PizzaCategory;
  description: string;
  image: string;
}

export interface Priloha {
  id: string;
  name: string;
  price: number;
}

export const PIZZA_CATEGORIES = ["Všetky", "Klasické", "Mäsové", "Pikantné", "Syrové"] as const;
export type PizzaFilter = (typeof PIZZA_CATEGORIES)[number];

/**
 * Presné ceny a gramáže podľa podkladov zadávateľa.
 * Popisy ingrediencií sú odvodené z názvov pízz a bežných talianskych receptúr
 * (podklady s presnými receptúrami neboli dodané).
 */
export const PIZZAS: Pizza[] = [
  {
    id: "marinara",
    name: "Marinara",
    grams: 380,
    price: 8.0,
    category: "Klasické",
    description: "Paradajky San Marzano, cesnak, oregano, čerstvá bazalka a panenský olivový olej. Klasika bez syra.",
    image: "/images/gallery-pizza-table.jpg",
  },
  {
    id: "margherita",
    name: "Margherita",
    grams: 480,
    price: 9.0,
    category: "Klasické",
    description: "Paradajková omáčka, fior di latte, čerstvá bazalka a olivový olej. Tri farby Neapola.",
    image: "/images/pizza-margherita.jpg",
  },
  {
    id: "napoletana",
    name: "Napoletana",
    grams: 490,
    price: 10.0,
    category: "Klasické",
    description: "Paradajková omáčka, fior di latte, sardely, cesnak, oregano a olivový olej.",
    image: "/images/hero-pizza.jpg",
  },
  {
    id: "prosciutto-cotto",
    name: "Prosciutto cotto",
    grams: 550,
    price: 11.5,
    category: "Mäsové",
    description: "Paradajková omáčka, fior di latte, šunka prosciutto cotto a čerstvá bazalka.",
    image: "/images/gallery-pizza-detail.jpg",
  },
  {
    id: "prosciutto-crudo",
    name: "Prosciutto crudo",
    grams: 660,
    price: 13.0,
    category: "Mäsové",
    description: "Paradajková omáčka, fior di latte, sušená šunka prosciutto crudo, rukola a parmezán.",
    image: "/images/pizza-prosciutto.jpg",
  },
  {
    id: "diavola",
    name: "Diavola",
    grams: 520,
    price: 11.5,
    category: "Pikantné",
    description: "Paradajková omáčka, fior di latte, pikantná saláma Spianata, čili a oregano.",
    image: "/images/pizza-diavola.jpg",
  },
  {
    id: "tonno-e-cipolla",
    name: "Tonno e Cipolla",
    grams: 510,
    price: 11.5,
    category: "Klasické",
    description: "Paradajková omáčka, fior di latte, tuniak, červená cibuľa a oregano.",
    image: "/images/gallery-pizza-table.jpg",
  },
  {
    id: "gustosa",
    name: "Gustosa",
    grams: 510,
    price: 12.0,
    category: "Mäsové",
    description: "Paradajková omáčka, fior di latte, mortadela IGP, pistácie, bazalkové pesto a stracciatella.",
    image: "/images/gallery-pizza-detail.jpg",
  },
  {
    id: "gorgonzola-e-pancetta",
    name: "Gorgonzola e Pancetta",
    grams: 560,
    price: 11.5,
    category: "Syrové",
    description: "Paradajková omáčka, fior di latte, gorgonzola, pancetta a oregano.",
    image: "/images/pizza-quattro-formaggi.jpg",
  },
  {
    id: "pancetta",
    name: "Pancetta",
    grams: 560,
    price: 11.5,
    category: "Mäsové",
    description: "Paradajková omáčka, fior di latte, pancetta, cibuľa a oregano.",
    image: "/images/pizza-diavola.jpg",
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    grams: 520,
    price: 11.5,
    category: "Syrové",
    description: "Fior di latte, gorgonzola, parmezán a fontina. Bez paradajkovej omáčky, s bazalkou a olivovým olejom.",
    image: "/images/pizza-quattro-formaggi.jpg",
  },
  {
    id: "boscaiola",
    name: "Boscaiola",
    grams: 520,
    price: 11.5,
    category: "Mäsové",
    description: "Paradajková omáčka, fior di latte, šampiňóny, pancetta, cibuľa a oregano.",
    image: "/images/hero-pizza.jpg",
  },
  {
    id: "napoli",
    name: "Napoli",
    grams: 520,
    price: 11.5,
    category: "Klasické",
    description: "Paradajková omáčka, fior di latte, sardely, kapary, cesnak, oregano a olivový olej.",
    image: "/images/pizza-margherita.jpg",
  },
];

export const PRILOHY: Priloha[] = [
  { id: "kukurica", name: "Kukurica", price: 1.5 },
  { id: "sampinony", name: "Šampiňóny", price: 1.5 },
  { id: "anananas", name: "Ananás", price: 1.5 },
  { id: "burrata", name: "Burrata", price: 3.5 },
  { id: "sunka", name: "Šunka", price: 3.5 },
  { id: "prosciutto-crudo", name: "Prosciutto crudo", price: 6.0 },
  { id: "pancetta", name: "Pancetta", price: 3.5 },
  { id: "salama-napoli", name: "Saláma Napoli", price: 3.5 },
  { id: "spianata", name: "Spianata pikantná saláma", price: 3.5 },
];

export const FAVORITE_IDS = ["margherita", "diavola", "quattro-formaggi"] as const;

export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

export interface ContactInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  phoneHref: string;
  web: string;
  mapsUrl: string;
  mapsEmbed: string;
}

export const CONTACT: ContactInfo = {
  name: "LUPO Pizza",
  address: "Hliníky 717/30",
  city: "017 01 Považská Bystrica",
  phone: "+421 949 226 177",
  phoneHref: "tel:+421949226177",
  web: "https://www.pizzalupo.sk/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hlin%C3%ADky+717%2F30%2C+017+01+Pova%C5%BEsk%C3%A1+Bystrica",
  mapsEmbed: "https://www.google.com/maps?q=Hlin%C3%ADky+717%2F30%2C+017+01+Pova%C5%BEsk%C3%A1+Bystrica&output=embed",
};

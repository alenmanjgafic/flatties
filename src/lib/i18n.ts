export type Locale = "en" | "de";

export const translations = {
  nav: {
    about: { en: "About", de: "Über Uns" },
    menu: { en: "Menu", de: "Menü" },
    findUs: { en: "Find Us", de: "Standort" },
    orderNow: { en: "Order Now", de: "Jetzt Bestellen" },
  },
  hero: {
    tagline: {
      en: "Premium Street Food — St. Gallen",
      de: "Premium Street Food — St. Gallen",
    },
    title1: { en: "Smashed", de: "Smashed" },
    title2: { en: "Burgers", de: "Burgers" },
    title3: { en: "Done Right.", de: "Done Right." },
    description: {
      en: "Bold flavours, fast service and the best burger experience in town. From lunch rush to late-night cravings.",
      de: "Bold Flavours, schneller Service und die beste Burger-Experience der Stadt. Von Lunch Rush bis Late-Night Cravings.",
    },
    ctaMenu: { en: "Check the Menu", de: "Zum Menü" },
    ctaLocation: { en: "Find Us", de: "Standort" },
  },
  about: {
    tagline: { en: "Our Story", de: "Unsere Story" },
    title1: { en: "More Than", de: "Mehr Als" },
    title2: { en: "Just A Burger.", de: "Nur Ein Burger." },
    p1: {
      en: "Flatties was born because we spotted a gap in the street food scene: plenty of burger stands, but almost none with a real brand experience.",
      de: "Flatties wurde geboren, weil wir eine Lücke in der Street Food Szene gesehen haben: Genug Burger-Stände, aber kaum einer mit einer echten Brand Experience.",
    },
    p2: {
      en: "We wanted to create something premium, bold and instantly recognisable — a concept that looks as good on Instagram as it tastes.",
      de: "Wir wollten etwas Premium, Bold und sofort Wiedererkennbares schaffen — ein Konzept, das auf Instagram genauso gut aussieht, wie es schmeckt.",
    },
    p3pre: {
      en: "Our smashed patties come from ",
      de: "Unsere Smashed Patties kommen von der ",
    },
    p3hinterhof: {
      en: " — 100% Swiss beef, fully traceable and without compromise. Paired with the legendary ",
      de: " — 100% Schweizer Rind, rückverfolgbar und ohne Kompromisse. Dazu die legendären ",
    },
    p3potatorolls: {
      en: " and fresh drinks by ",
      de: " und frische Drinks von ",
    },
    p3end: {
      en: ". No shortcuts, only the finest ingredients.",
      de: ". Keine Abkürzungen, nur die besten Zutaten.",
    },
  },
  menu: {
    tagline: { en: "What We Serve", de: "Unser Angebot" },
    title: { en: "The Menu", de: "Das Menü" },
    boxInfo: {
      en: "Box = Burger + Fries + Sauce of Choice",
      de: "Box = Burger + Fries + Sauce nach Wahl",
    },
    categories: {
      burgers: { en: "Burgers", de: "Burgers" },
      sides: { en: "Sides", de: "Sides" },
      extras: { en: "Extras", de: "Extras" },
      sauces: { en: "Dips & Sauces", de: "Dips & Saucen" },
      drinks: { en: "Drinks", de: "Drinks" },
      sweets: { en: "Sweets", de: "Sweets" },
    },
  },
  location: {
    tagline: { en: "Find Us", de: "Standort" },
    title1: { en: "Come", de: "Komm" },
    title2: { en: "Grab One.", de: "Hol Dir Einen." },
    address: { en: "Address", de: "Adresse" },
    country: { en: "Switzerland", de: "Schweiz" },
    hours: { en: "Opening Hours", de: "Öffnungszeiten" },
    contact: { en: "Contact", de: "Kontakt" },
  },
  footer: {
    rights: { en: "All rights reserved.", de: "Alle Rechte vorbehalten." },
  },
} as const;

export function t(
  obj: { en: string; de: string },
  locale: Locale
): string {
  return obj[locale];
}

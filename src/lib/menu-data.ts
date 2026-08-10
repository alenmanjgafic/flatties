import type { translations } from "@/lib/i18n";

export type T = { en: string; de: string };

export type MenuItem = {
  name: T;
  description: T;
  prices: { label: T; price: string }[];
  image?: string;
  popular?: boolean;
  spicy?: boolean;
};

export type MenuCategory = {
  id: string;
  titleKey: keyof typeof translations.menu.categories;
  items: MenuItem[];
};

const _ = (en: string, de: string): T => ({ en, de });
const same = (text: string): T => ({ en: text, de: text });
const chf = (price: string) => [{ label: same(""), price }];

// Menü-Inhalt 1:1 vom Uber-Eats-Store (Flatties Smashburger, St. Gallen)
export const menuData: MenuCategory[] = [
  {
    id: "menus",
    titleKey: "menus",
    items: [
      {
        name: same("Flatties Classic Menü"),
        description: _(
          "1x Smashburger (Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Flatties Sauce), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Smashburger (Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Flatties Sosse), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("16.90"),
        image: "/images/menu/menu-classic.jpg",
        popular: true,
      },
      {
        name: same("Flatties Spicy Menü"),
        description: _(
          "1x Smashburger (Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Fresh Jalapeños, Chili Mayo), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Smashburger (Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Frische Jalapenios, Chili Mayo), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("17.90"),
        image: "/images/menu/menu-spicy.jpg",
        spicy: true,
      },
      {
        name: same("Flatties Truffle Menü"),
        description: _(
          "1x Smashburger (Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Truffle Sauce), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Smashburger (Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Trüffel Sosse), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("18.90"),
        image: "/images/menu/menu-truffle.jpg",
      },
      {
        name: same("Flatties Signature Menü"),
        description: _(
          "1x Smashburger (Martin's Potato Bun, Beef Smash, Potato Rösti, Veal Bacon, Cheddar, Pickles, Crispy Onions, BBQ Mayo), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Smashburger (Martin's Potato Bun, Rinder Smash, Kartoffelrösti, Kalbs Bacon, Cheddar, Essiggurken, Röstzwiebel, BBQ Mayo), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("19.90"),
        image: "/images/menu/menu-signature.jpg",
        popular: true,
      },
      {
        name: same("Flatties Crispy Chicken Menü"),
        description: _(
          "1x Burger (Martin's Potato Bun, Crispy Chicken, Cheddar, Pickles, Coleslaw, Ranch Sauce, Pomegranate Sauce), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Burger (Martin's Potato Bun, Chrispy Chicken, Cheddar, Essiggurken, Coleslaw, Ranch Sosse, Granatapfel Sosse), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("17.90"),
        image: "/images/menu/menu-crispy-chicken.jpg",
      },
      {
        name: same("Flatties Vegi Crispy Menü"),
        description: _(
          "1x Burger (Martin's Potato Bun, Crispy Soy Patty, Cheddar, Pickles, Coleslaw, Ranch Sauce, Pomegranate Sauce), 1x Classic Fries incl. 1x Sauce, 1x Soft Drink",
          "1x Burger (Martin's Potato Bun, Chrispy Soja Patty, Cheddar, Essiggurken, Coleslaw, Ranch Sosse, Granatapfel Sosse), 1x Klassische Pommes inkl. 1x Sosse, 1x Softdrink"
        ),
        prices: chf("17.90"),
        image: "/images/menu/menu-vegi-crispy.jpg",
      },
    ],
  },
  {
    id: "burgers",
    titleKey: "burgers",
    items: [
      {
        name: same("Flatties Classic"),
        description: _(
          "Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Flatties Sauce",
          "Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Flatties Sosse"
        ),
        prices: chf("12.90"),
        image: "/images/menu/burger-classic.jpg",
        popular: true,
      },
      {
        name: same("Flatties Spicy"),
        description: _(
          "Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Fresh Jalapeños, Chili Mayo",
          "Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Frische Jalapenios, Chili Mayo"
        ),
        prices: chf("13.90"),
        image: "/images/menu/burger-spicy.jpg",
        popular: true,
        spicy: true,
      },
      {
        name: same("Flatties Truffle"),
        description: _(
          "Martin's Potato Bun, Beef Smash, Cheddar, Pickles, Crispy Onions, Truffle Sauce",
          "Martin's Potato Bun, Rinder Smash, Cheddar, Essiggurken, Röstzwiebel, Trüffel Sosse"
        ),
        prices: chf("14.90"),
        image: "/images/menu/burger-truffle.jpg",
      },
      {
        name: same("Flatties Signature"),
        description: _(
          "Martin's Potato Bun, Beef Smash, Potato Rösti, Veal Bacon, Cheddar, Pickles, Crispy Onions, BBQ Mayo",
          "Martin's Potato Bun, Rinder Smash, Kartoffelrösti, Kalbs Bacon, Cheddar, Essiggurken, Röstzwiebel, BBQ Mayo"
        ),
        prices: chf("15.90"),
        image: "/images/menu/burger-signature.jpg",
      },
      {
        name: same("Flatties Crispy Chicken"),
        description: _(
          "Martin's Potato Bun, Crispy Chicken, Cheddar, Pickles, Coleslaw, Ranch Sauce, Pomegranate Sauce",
          "Martin's Potato Bun, Chrispy Chicken, Cheddar, Essiggurken, Coleslaw, Ranch Sosse, Granatapfel Sosse"
        ),
        prices: chf("13.90"),
        image: "/images/menu/burger-crispy-chicken.jpg",
      },
      {
        name: same("Flatties Vegi Crispy"),
        description: _(
          "Martin's Potato Bun, Crispy Soy Patty, Cheddar, Pickles, Coleslaw, Ranch Sauce, Pomegranate Sauce",
          "Martin's Potato Bun, Chrispy Soja Patty, Cheddar, Essiggurken, Coleslaw, Ranch Sosse, Granatapfel Sosse"
        ),
        prices: chf("13.90"),
        image: "/images/menu/burger-vegi-crispy.jpg",
      },
    ],
  },
  {
    id: "sides",
    titleKey: "sides",
    items: [
      {
        name: _("Classic Fries", "Klassische Pommes"),
        description: same(""),
        prices: chf("7.90"),
        image: "/images/menu/side-fries.jpg",
      },
      {
        name: _("Sweet Potato Fries", "Süsskartoffel Pommes"),
        description: same(""),
        prices: chf("9.90"),
        image: "/images/menu/side-sweet-fries.jpg",
        popular: true,
      },
      {
        name: _("Chicken Tenders Bites 6 Pcs", "Chicken Tenders Bites 6 Stück"),
        description: same(""),
        prices: chf("9.90"),
        image: "/images/menu/side-tenders.jpg",
        popular: true,
      },
      {
        name: _("Spring Rolls Vegan 6 Pcs", "Frühlingsrollen Vegan 6 Stück"),
        description: same(""),
        prices: chf("6.90"),
        image: "/images/menu/side-spring-rolls.jpg",
      },
      {
        name: _("Crunchy Shrimps 5 Pcs", "Knusprige Crevetten 5 Stück"),
        description: same(""),
        prices: chf("7.90"),
        image: "/images/menu/side-shrimps.jpg",
      },
      {
        name: _("Salty Edamame", "Salzige Edamame"),
        description: same(""),
        prices: chf("6.90"),
        image: "/images/menu/side-edamame.jpg",
      },
      {
        name: _("Coleslaw Salad", "Coleslaw Salat"),
        description: same(""),
        prices: chf("4.90"),
        image: "/images/menu/side-coleslaw.jpg",
      },
    ],
  },
  {
    id: "sauces",
    titleKey: "sauces",
    items: [
      {
        name: same("Ketchup"),
        description: same(""),
        prices: chf("1.50"),
        image: "/images/menu/dip-ketchup.jpg",
      },
      {
        name: same("Mayo"),
        description: same(""),
        prices: chf("1.50"),
        image: "/images/menu/dip-mayo.jpg",
      },
      {
        name: same("Chili Mayo"),
        description: _(
          "Creamy mayo with a gentle chili kick — the sauce from our Spicy burger.",
          "Cremige Mayo mit angenehmem Chili-Kick — die Sosse aus unserem Spicy Burger."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-chili-mayo.jpg",
      },
      {
        name: _("Truffle Mayo", "Trüffel Mayo"),
        description: _(
          "Creamy mayo with a fine truffle note — aromatic, elegant and perfect for dipping.",
          "Cremige Mayo mit feiner Trüffelnote, aromatisch & edel und perfekt zum Dippen."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-truffle-mayo.jpg",
        popular: true,
      },
      {
        name: same("Flatties Dip"),
        description: _(
          "Our specially selected burger sauce — creamy, seasoned and the signature taste of Flatties.",
          "Unsere speziell ausgewählte Burgersosse, cremig & würzig und der Signature-Geschmack von Flatties."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-flatties.jpg",
      },
      {
        name: same("Snack Dip"),
        description: _(
          "Creamy premium dip with balanced seasoning, a fine smoky note and a hint of sweetness — perfect for burgers, fries, chicken and snacks.",
          "Cremiger Premium-Dip mit ausgewogener Würze, feiner Rauchnote und leichter Süsse. Perfekt für Burger, Fries, Chicken & Snacks."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-snack.jpg",
        popular: true,
      },
      {
        name: same("Chipotle South West"),
        description: _(
          "Smoky, seasoned sauce with fine chipotle heat and a bold Southwest character.",
          "Rauchig-würzige Sauce mit feiner Chipotle-Schärfe und kräftigem Southwest-Charakter."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-chipotle.jpg",
        popular: true,
      },
      {
        name: same("White Smoke BBQ"),
        description: _(
          "White, creamy-smoky BBQ sauce with a distinctive smoke aroma and savoury depth.",
          "Weisse & cremig-rauchige BBQ-Sauce mit markantem Smoke-Aroma und würziger Tiefe."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-white-smoke-bbq.jpg",
      },
      {
        name: same("Fire Cracker"),
        description: _(
          "Extremely hot sauce with an intense kick — not for the faint of heart.",
          "Extrem scharfe Sauce mit intensivem Kick — nichts für schwache Nerven."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-fire-cracker.jpg",
        spicy: true,
      },
      {
        name: same("Dirty Umami"),
        description: _(
          "Bold, intense sauce with deep umami flavour for extra savoury richness.",
          "Würzige & intensive Sauce mit tiefem Umami-Geschmack für extra herzhafte Aromatik."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-dirty-umami.jpg",
      },
      {
        name: _("Ranch Sauce", "Ranch Sosse"),
        description: _(
          "Creamy ranch sauce with a fine herb note — fresh, mild and versatile.",
          "Cremige Ranch-Sosse mit fein-würziger Kräuternote, frisch & mild und vielseitig."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-ranch.jpg",
        popular: true,
      },
      {
        name: _("BBQ Jamaica", "BBQ Jamaika"),
        description: _(
          "Fruity, seasoned BBQ sauce with a Jamaican-inspired taste and an exotic note.",
          "Fruchtig-würzige BBQ-Sauce mit jamaikanisch inspiriertem Geschmack und exotischer Note."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-bbq-jamaica.jpg",
      },
      {
        name: _("Sweet Sour", "Süss Sauer"),
        description: _(
          "Fruity sweet-and-sour sauce with balanced freshness — the perfect dipping classic.",
          "Fruchtig-süsssaure Sauce mit ausgewogener Frische & der perfekte Klassiker zum Dippen."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-sweet-sour.jpg",
      },
      {
        name: same("Smokey Chili Dip"),
        description: _(
          "Smoky seasoning, pleasant chili heat and a creamy texture merge into a dip that adds depth and character to every bite.",
          "Rauchige Würze, angenehme Chili-Schärfe und eine cremige Konsistenz verschmelzen zu einem Dip, der jedem Bissen mehr Tiefe und Charakter verleiht."
        ),
        prices: chf("1.50"),
        image: "/images/menu/dip-smokey-chili.jpg",
        spicy: true,
      },
      {
        name: same("Cocktail Sauce"),
        description: same(""),
        prices: chf("1.50"),
        image: "/images/menu/dip-cocktail.jpg",
      },
    ],
  },
  {
    id: "drinks",
    titleKey: "drinks",
    items: [
      {
        name: _("Grapos 0.3l Refill Cup", "Grapos 0.3l Nachfüll-Becher"),
        description: _(
          "Pay once, refill as much as you want — many flavours, ice-cold from the Swiss Grapos system.",
          "Einmal zahlen, refill so viel du willst — viele Flavours, eiskalt aus dem Schweizer Grapos-System."
        ),
        prices: chf("3.50"),
        image: "/images/menu/drink-grapos-cup.jpg",
        popular: true,
      },
      {
        name: same("Red Bull Original 0.25l"),
        description: same(""),
        prices: chf("3.90"),
        image: "/images/menu/drink-redbull.jpg",
      },
      {
        name: same("Red Bull Sugarfree 0.25l"),
        description: same(""),
        prices: chf("3.90"),
        image: "/images/menu/drink-redbull-sugarfree.jpg",
      },
      {
        name: _(
          "Red Bull The Peach Edition — White Peach",
          "Red Bull The Peach Edition — Weisser Pfirsich"
        ),
        description: _(
          "The Red Bull Peach Edition with the taste of white peach, a hint of citrus zest and delicate floral notes.",
          "Die Red Bull Peach Edition mit dem Geschmack von weissem Pfirsich, einem Hauch von Zitrusschale und zarten blumigen Noten."
        ),
        prices: chf("3.90"),
        image: "/images/menu/drink-redbull-peach.jpg",
      },
      {
        name: _(
          "Red Bull The Apricot Edition — Apricot Strawberry",
          "Red Bull The Apricot Edition — Aprikose Erdbeere"
        ),
        description: same(""),
        prices: chf("3.90"),
        image: "/images/menu/drink-redbull-apricot.jpg",
      },
      {
        name: same("The Organics by Red Bull — Viva Mate"),
        description: same(""),
        prices: chf("3.90"),
        image: "/images/menu/drink-redbull-organics-mate.jpg",
      },
    ],
  },
];

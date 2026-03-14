"use client";

import { useState } from "react";
import { useLocale } from "@/context/LanguageContext";
import { translations, t, type Locale } from "@/lib/i18n";

type T = { en: string; de: string };

type MenuItem = {
  name: T;
  description: T;
  prices: { label: T; price: string }[];
};

type MenuCategory = {
  id: string;
  titleKey: keyof typeof translations.menu.categories;
  items: MenuItem[];
};

// Helper to keep data concise
const _ = (en: string, de: string): T => ({ en, de });
const same = (text: string): T => ({ en: text, de: text });

const menuData: MenuCategory[] = [
  {
    id: "burgers",
    titleKey: "burgers",
    items: [
      {
        name: same("Flatties CLASSIC"),
        description: _("Bun, Beef Smash, Cheddar, Pickles, Caramelized Onions, Flatties Sauce", "Bun, Beef Smash, Cheddar, Gurken, Karamellisierte Zwiebeln, Flatties Sauce"),
        prices: [
          { label: same("Single"), price: "12.90" },
          { label: same("Double"), price: "16.90" },
          { label: same("Single Box"), price: "19.90" },
          { label: same("Double Box"), price: "22.90" },
        ],
      },
      {
        name: same("Flatties SPICY"),
        description: _("Bun, Beef Smash, Cheddar, Pickles, Caramelized Onions, Fresh Jalapeños, Chili Mayo", "Bun, Beef Smash, Cheddar, Gurken, Karamellisierte Zwiebeln, Frische Jalapeños, Chili Mayo"),
        prices: [
          { label: same("Single"), price: "13.90" },
          { label: same("Double"), price: "17.90" },
          { label: same("Single Box"), price: "20.90" },
          { label: same("Double Box"), price: "23.90" },
        ],
      },
      {
        name: same("Flatties PRIME"),
        description: _("Bun, Beef Smash, Cheddar, Pickles, Caramelized Onions, Beef Bacon Chips, BBQ Mayo", "Bun, Beef Smash, Cheddar, Gurken, Karamellisierte Zwiebeln, Beef Bacon Chips, BBQ Mayo"),
        prices: [
          { label: same("Single"), price: "14.90" },
          { label: same("Double"), price: "18.90" },
          { label: same("Single Box"), price: "21.90" },
          { label: same("Double Box"), price: "24.90" },
        ],
      },
      {
        name: same("Flatties CRISPY"),
        description: _("Bun, Crispy Chicken, Cheddar, Pickles, Coleslaw, Ranch Sauce", "Bun, Crispy Chicken, Cheddar, Gurken, Krautsalat, Ranch Sauce"),
        prices: [
          { label: same("Single"), price: "13.90" },
          { label: same("Single Box"), price: "20.90" },
        ],
      },
      {
        name: same("Flatties Vegi CRISPY"),
        description: _("Bun, Crispy Soy Patty, Cheddar, Pickles, Coleslaw, Ranch Sauce, Pomegranate Sauce", "Bun, Crispy Soja-Patty, Cheddar, Gurken, Krautsalat, Ranch Sauce, Granatapfel Sauce"),
        prices: [
          { label: same("Single"), price: "13.90" },
          { label: same("Single Box"), price: "20.90" },
        ],
      },
      {
        name: same("Flatties LIMITED"),
        description: _("Ask us about this month's special creation.", "Frag uns nach der Special Creation dieses Monats."),
        prices: [{ label: same(""), price: "TBA" }],
      },
    ],
  },
  {
    id: "sides",
    titleKey: "sides",
    items: [
      { name: same("Classic Fries"), description: _("1x Sauce of Choice", "1x Sauce nach Wahl"), prices: [{ label: same(""), price: "7.90" }] },
      { name: same("Sweet Fries"), description: _("1x Sauce of Choice", "1x Sauce nach Wahl"), prices: [{ label: same(""), price: "9.90" }] },
      {
        name: same("Chicken Tender Bites"),
        description: _("1x Sauce of Choice", "1x Sauce nach Wahl"),
        prices: [
          { label: _("5 Pcs", "5 Stk"), price: "9.90" },
          { label: _("10 Pcs", "10 Stk"), price: "14.90" },
        ],
      },
      {
        name: same("Shaked Wings Natural"),
        description: _("1x Sauce of Choice", "1x Sauce nach Wahl"),
        prices: [
          { label: _("5 Pcs", "5 Stk"), price: "8.90" },
          { label: _("10 Pcs", "10 Stk"), price: "13.90" },
        ],
      },
      {
        name: same("Shaked Wings Crispy"),
        description: _("1x Sauce of Choice", "1x Sauce nach Wahl"),
        prices: [
          { label: _("5 Pcs", "5 Stk"), price: "8.90" },
          { label: _("10 Pcs", "10 Stk"), price: "13.90" },
        ],
      },
      { name: same("Spring Rolls (Vegan)"), description: _("6 Pieces, 1x Sweet Sour Sauce", "6 Stück, 1x Süss-Sauer Sauce"), prices: [{ label: same(""), price: "6.90" }] },
      { name: same("Crunchy Shrimps"), description: _("5 Pieces, 1x Sweet Sour Sauce", "5 Stück, 1x Süss-Sauer Sauce"), prices: [{ label: same(""), price: "7.90" }] },
      { name: same("Salty Edamame"), description: same(""), prices: [{ label: same(""), price: "6.90" }] },
    ],
  },
  {
    id: "extras",
    titleKey: "extras",
    items: [
      { name: same("Beef Smash"), description: same(""), prices: [{ label: same(""), price: "3.90" }] },
      { name: _("Red Cabbage", "Rotkraut"), description: same(""), prices: [{ label: same(""), price: "2.50" }] },
      { name: _("Coleslaw", "Krautsalat"), description: same(""), prices: [{ label: same(""), price: "2.50" }] },
      { name: same("Jalapeños"), description: same(""), prices: [{ label: same(""), price: "1.00" }] },
      { name: same("Cheddar Cheese"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
    ],
  },
  {
    id: "sauces",
    titleKey: "sauces",
    items: [
      { name: same("Ketchup"), description: same(""), prices: [{ label: same(""), price: "1.00" }] },
      { name: same("Mayo"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: _("Hot Cheese Sauce", "Heisse Käsesauce"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Truffel Mayo", "Trüffel Mayo"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Chilli Mayo"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Cocktail Dip"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Flatties Dip"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Chipotle South West"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("White Smoke BBQ"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Fire Cracker"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Dirty Umami"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Ranch"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("Snack Dip"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: _("Roasted Sesame", "Gerösteter Sesam"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: _("Honey Mustard", "Honig Senf"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: same("BBQ Jamaica"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
      { name: _("Peanut Dip", "Erdnuss Dip"), description: same(""), prices: [{ label: same(""), price: "1.50" }] },
    ],
  },
  {
    id: "drinks",
    titleKey: "drinks",
    items: [
      { name: same("Grapos Cola"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: same("Grapos Cola Zero"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Orange Limo", "Grapos Orangen Limo"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Lemon Limo", "Grapos Zitronen Limo"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Sparkling Water", "Grapos Sprudelwasser"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Water", "Grapos Wasser"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Apple Spritzer", "Grapos Apfelschorle"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Icetea Peach", "Grapos Eistee Pfirsich"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: _("Grapos Icetea Lemon", "Grapos Eistee Zitrone"), description: same(""), prices: [{ label: same(""), price: "3.50" }] },
      { name: same("Red Bull Original"), description: same(""), prices: [{ label: same(""), price: "3.90" }] },
      { name: same("Red Bull Sugarfree"), description: same(""), prices: [{ label: same(""), price: "3.90" }] },
    ],
  },
  {
    id: "sweets",
    titleKey: "sweets",
    items: [
      { name: same("Sweet Shokupan Nutella Creme"), description: same(""), prices: [{ label: same(""), price: "4.90" }] },
      { name: same("Sweet Shokupan Pistachio Creme"), description: same(""), prices: [{ label: same(""), price: "5.90" }] },
    ],
  },
];

function getCategoryTitle(key: keyof typeof translations.menu.categories, locale: Locale) {
  return t(translations.menu.categories[key], locale);
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const { locale } = useLocale();

  const category = menuData.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="py-24 bg-asphalt">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-flame text-sm uppercase tracking-[0.3em] font-bold mb-4">
            {t(translations.menu.tagline, locale)}
          </p>
          <h2 className="text-cream text-4xl sm:text-6xl font-bold uppercase tracking-tight">
            {t(translations.menu.title, locale)}
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                activeCategory === cat.id
                  ? "bg-flame text-cream"
                  : "bg-cream/10 text-cream/60 hover:bg-cream/20 hover:text-cream"
              }`}
            >
              {getCategoryTitle(cat.titleKey, locale)}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="max-w-4xl mx-auto">
          {category.items.map((item, i) => {
            const name = t(item.name, locale);
            const desc = t(item.description, locale);
            return (
              <div
                key={i}
                className="border-b border-cream/10 py-6 last:border-b-0"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-cream font-bold text-lg uppercase tracking-wide">
                      {name}
                    </h3>
                    {desc && (
                      <p className="text-cream/50 text-sm mt-1">{desc}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 items-start shrink-0">
                    {item.prices.map((p, j) => {
                      const label = t(p.label, locale);
                      return (
                        <div key={j} className="text-right">
                          {label && (
                            <span className="text-cream/40 text-xs uppercase block">{label}</span>
                          )}
                          <span className="text-flame font-bold text-lg">
                            {p.price === "TBA" ? "TBA" : `CHF ${p.price}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Box info */}
        {activeCategory === "burgers" && (
          <p className="text-center text-cream/40 text-sm mt-8 max-w-lg mx-auto">
            {t(translations.menu.boxInfo, locale)}
          </p>
        )}
      </div>
    </section>
  );
}

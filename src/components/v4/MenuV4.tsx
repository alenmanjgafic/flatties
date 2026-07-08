"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import { menuData, type MenuItem } from "@/lib/menu-data";
import RevealV4 from "./RevealV4";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

function MenuCard({ item, locale }: { item: MenuItem; locale: "en" | "de" }) {
  return (
    <motion.li
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="bg-cream rounded-3xl border-[3px] border-asphalt overflow-hidden shadow-[6px_6px_0_0_var(--color-flame)] cursor-default flex flex-col"
    >
      {item.image && (
        <div className="relative aspect-[4/3] border-b-[3px] border-asphalt">
          <Image
            src={item.image}
            alt={t(item.name, locale)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="object-cover"
          />
          {(item.popular || item.spicy) && (
            <div className="absolute top-3 left-3 flex gap-2">
              {item.popular && (
                <span className="bg-cream border-2 border-asphalt text-asphalt rounded-full px-3 py-1 text-[11px] uppercase tracking-wider font-bold">
                  {t(translations.menu.popular, locale)}
                </span>
              )}
              {item.spicy && (
                <span className="bg-flame border-2 border-asphalt text-cream rounded-full px-3 py-1 text-[11px] uppercase tracking-wider font-bold">
                  {t(translations.menu.spicy, locale)}
                </span>
              )}
            </div>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display uppercase text-asphalt text-xl sm:text-2xl tracking-wide">
            {t(item.name, locale)}
          </h4>
          <span className="font-bubble text-flame text-lg shrink-0">
            {item.prices[0].price}
          </span>
        </div>
        {item.description.en && (
          <p className="text-asphalt/70 text-sm leading-relaxed mt-2">
            {t(item.description, locale)}
          </p>
        )}
      </div>
    </motion.li>
  );
}

export default function MenuV4() {
  const { locale } = useLocale();
  const [activeId, setActiveId] = useState(menuData[0].id);
  const activeCategory = menuData.find((c) => c.id === activeId) ?? menuData[0];

  return (
    <section id="menu" className="relative bg-asphalt py-24 sm:py-32 overflow-hidden">
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-72 v4-dots text-cream/40 opacity-20 pointer-events-none"
        style={{ maskImage: "linear-gradient(to top, black, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <RevealV4 className="text-center">
          <p className="font-bubble text-flame text-lg sm:text-xl mb-4 rotate-2 inline-block">
            {t(translations.menu.tagline, locale)}
          </p>
          <h2 className="font-display text-cream uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-12">
            {t(translations.menu.title, locale)}
          </h2>
        </RevealV4>

        {/* Category tabs */}
        <RevealV4 delay={0.1}>
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6"
            role="tablist"
            aria-label={t(translations.menu.title, locale)}
          >
            {menuData.map((cat) => {
              const active = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(cat.id)}
                  className={`relative rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm uppercase tracking-wider font-bold cursor-pointer transition-colors duration-200 border-[3px] border-cream/20 ${
                    active ? "text-cream border-transparent" : "text-cream/70 hover:text-cream hover:border-cream/50"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="v4-tab-pill"
                      className="absolute inset-0 bg-flame rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t(translations.menu.categories[cat.titleKey], locale)}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealV4>

        {/* Menü info */}
        <AnimatePresence>
          {activeId === "menus" && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-cream/60 text-sm uppercase tracking-widest font-bold overflow-hidden"
            >
              {t(translations.menu.boxInfo, locale)}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeId}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeCategory.items.map((item) => (
              <MenuCard key={item.name.en} item={item} locale={locale} />
            ))}
          </motion.ul>
        </AnimatePresence>

        <RevealV4 delay={0.1} className="text-center mt-12">
          <p className="text-cream/50 text-xs uppercase tracking-widest font-bold">
            {locale === "de" ? "Alle Preise in CHF" : "All prices in CHF"}
          </p>
        </RevealV4>
      </div>
    </section>
  );
}

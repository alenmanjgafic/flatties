"use client";

import Image from "next/image";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";

export default function Hero() {
  const { locale } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center bg-asphalt overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-burger.png"
          alt="Flatties Smashed Burger"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/60 to-asphalt/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          <p className="text-flame text-sm uppercase tracking-[0.3em] font-bold mb-4">
            {t(translations.hero.tagline, locale)}
          </p>
          <h1 className="text-cream text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] uppercase tracking-tight mb-6">
            {t(translations.hero.title1, locale)}
            <br />
            <span className="text-flame">{t(translations.hero.title2, locale)}</span>
            <br />
            {t(translations.hero.title3, locale)}
          </h1>
          <p className="text-cream/70 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed">
            {t(translations.hero.description, locale)}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="bg-flame text-cream px-8 py-4 text-sm uppercase tracking-wider font-bold hover:bg-flame-dark transition-colors inline-block"
            >
              {t(translations.hero.ctaMenu, locale)}
            </a>
            <a
              href="#location"
              className="border-2 border-cream/30 text-cream px-8 py-4 text-sm uppercase tracking-wider font-bold hover:border-flame hover:text-flame transition-colors inline-block"
            >
              {t(translations.hero.ctaLocation, locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-flame rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

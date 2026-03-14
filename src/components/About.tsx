"use client";

import Image from "next/image";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";

export default function About() {
  const { locale } = useLocale();

  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/chef.png"
              alt="Flatties Kitchen"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt/20 to-transparent" />
          </div>

          {/* Text */}
          <div>
            <p className="text-flame text-sm uppercase tracking-[0.3em] font-bold mb-4">
              {t(translations.about.tagline, locale)}
            </p>
            <h2 className="text-asphalt text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-8 leading-tight">
              {t(translations.about.title1, locale)}
              <br />
              <span className="text-flame">{t(translations.about.title2, locale)}</span>
            </h2>
            <div className="space-y-5 text-asphalt/70 text-base leading-relaxed">
              <p>{t(translations.about.p1, locale)}</p>
              <p>{t(translations.about.p2, locale)}</p>
              <p>
                {t(translations.about.p3pre, locale)}
                <a href="https://hinterhofmetzgerei.ch" target="_blank" rel="noopener noreferrer" className="text-asphalt font-semibold hover:text-flame transition-colors border-b border-asphalt/20 hover:border-flame">
                  Hinterhofmetzgerei
                </a>
                {t(translations.about.p3hinterhof, locale)}
                <a href="https://potatorolls.com" target="_blank" rel="noopener noreferrer" className="text-asphalt font-semibold hover:text-flame transition-colors border-b border-asphalt/20 hover:border-flame">
                  Martin&apos;s Potato Rolls
                </a>
                {t(translations.about.p3potatorolls, locale)}
                <a href="https://grapos.com" target="_blank" rel="noopener noreferrer" className="text-asphalt font-semibold hover:text-flame transition-colors border-b border-asphalt/20 hover:border-flame">
                  Grapos
                </a>
                {t(translations.about.p3end, locale)}
              </p>
            </div>

            {/* Brand values */}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Cheeky", "Confident", "Street-Smart", "Premium"].map((word) => (
                <span
                  key={word}
                  className="bg-asphalt text-cream px-4 py-2 text-xs uppercase tracking-widest font-bold"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

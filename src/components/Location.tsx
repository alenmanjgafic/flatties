"use client";

import Image from "next/image";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";

export default function Location() {
  const { locale } = useLocale();

  return (
    <section id="location" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <div>
            <p className="text-flame text-sm uppercase tracking-[0.3em] font-bold mb-4">
              {t(translations.location.tagline, locale)}
            </p>
            <h2 className="text-asphalt text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-8 leading-tight">
              {t(translations.location.title1, locale)}
              <br />
              <span className="text-flame">{t(translations.location.title2, locale)}</span>
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-asphalt font-bold text-sm uppercase tracking-widest mb-2">
                  {t(translations.location.address, locale)}
                </h3>
                <p className="text-asphalt/70 text-lg">
                  St. Gallen
                  <br />
                  {t(translations.location.country, locale)}
                </p>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-asphalt font-bold text-sm uppercase tracking-widest mb-2">
                  {t(translations.location.hours, locale)}
                </h3>
                <div className="text-asphalt/70 text-lg space-y-1">
                  <p>Mo — Do: 11:00 — 22:00</p>
                  <p>Fr — Sa: 11:00 — 02:00</p>
                  <p>So: 12:00 — 21:00</p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-asphalt font-bold text-sm uppercase tracking-widest mb-2">
                  {t(translations.location.contact, locale)}
                </h3>
                <div className="space-y-1">
                  <a
                    href="https://instagram.com/flatties.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-flame hover:text-flame-dark transition-colors text-lg font-bold block"
                  >
                    @flatties.ch
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/packaging.png"
              alt="Flatties Packaging"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

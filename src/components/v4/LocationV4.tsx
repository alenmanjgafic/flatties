"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import RevealV4 from "./RevealV4";

// Öffentlicher Key nur für die (kostenlose) Maps Embed API — der private
// Places-Key bleibt serverseitig. Ohne Key wird die Karte nicht gerendert.
const MAPS_EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
const PLACE_ID = "ChIJ950GJwAfm0cRTXpJ-uXdttg";

export default function LocationV4() {
  const { locale } = useLocale();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="location" className="relative bg-flame py-24 sm:py-32 overflow-hidden">
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 v4-dots text-flame-dark opacity-40 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Info */}
          <div>
            <RevealV4>
              <p className="font-bubble text-cream text-lg sm:text-xl mb-4 -rotate-2 inline-block">
                {t(translations.location.tagline, locale)}
              </p>
              <h2 className="font-display text-asphalt uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-5">
                {t(translations.location.title1, locale)}
                <br />
                <span className="text-cream">
                  {t(translations.location.title2, locale)}
                </span>
              </h2>
              <p className="font-bubble text-asphalt text-xl sm:text-2xl uppercase mb-10 v4-flicker inline-block">
                {t(translations.location.openDaily, locale)}
              </p>
            </RevealV4>

            <div className="space-y-4">
              {[
                {
                  title: t(translations.location.address, locale),
                  body: (
                    <p>
                      Marktgasse 2, 9000 St. Gallen,{" "}
                      {t(translations.location.country, locale)}
                    </p>
                  ),
                },
                {
                  title: t(translations.location.hours, locale),
                  body: (
                    <p className="font-bold">
                      {t(translations.location.daily, locale)}: 11:00 — 20:00
                    </p>
                  ),
                },
                {
                  title: t(translations.location.contact, locale),
                  body: (
                    <a
                      href="https://www.instagram.com/flatties.ch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-flame hover:text-flame-dark transition-colors duration-200 cursor-pointer"
                    >
                      @flatties.ch
                    </a>
                  ),
                },
              ].map((block, i) => (
                <RevealV4 key={block.title} delay={0.08 * i}>
                  <div className="bg-cream rounded-3xl border-[3px] border-asphalt px-6 py-5 shadow-[6px_6px_0_0_var(--color-asphalt)]">
                    <h3 className="text-flame font-bold text-xs uppercase tracking-widest mb-1.5">
                      {block.title}
                    </h3>
                    <div className="text-asphalt/85 text-base sm:text-lg">
                      {block.body}
                    </div>
                  </div>
                </RevealV4>
              ))}
            </div>
          </div>

          {/* Packaging image, arch frame */}
          <RevealV4 delay={0.15}>
            <div ref={imageRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <motion.div style={{ y: imageY }} className="relative">
                <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[2.5rem] overflow-hidden border-[5px] border-asphalt v4-sticker-shadow-asphalt">
                  <Image
                    src="/images/packaging.png"
                    alt="Flatties Packaging — Grab &amp; Go"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [-6, -2, -6] }}
                  transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
                  className="absolute -bottom-6 -left-3 sm:-left-8 bg-asphalt rounded-full px-6 py-3 border-[3px] border-cream"
                >
                  <span className="font-bubble text-cream text-sm sm:text-base uppercase">
                    Grab &amp; Go
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </RevealV4>
        </div>

        {/* Google Maps */}
        {MAPS_EMBED_KEY && (
          <RevealV4 delay={0.1}>
            <div className="mt-16 rounded-[2.5rem] overflow-hidden border-[5px] border-asphalt v4-sticker-shadow-asphalt bg-asphalt">
              <iframe
                title="Flatties Smashburger — Marktgasse 2, 9000 St. Gallen"
                src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_EMBED_KEY}&q=place_id:${PLACE_ID}&zoom=16&language=${locale}`}
                className="w-full h-[320px] sm:h-[420px] block"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealV4>
        )}
      </div>
    </section>
  );
}

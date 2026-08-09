"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import RotatingBadgeV4 from "./RotatingBadgeV4";

import WordmarkV4 from "./WordmarkV4";

export default function HeroV4() {
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-flame overflow-hidden pt-32 sm:pt-40 pb-20"
    >
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 v4-dots text-flame-dark opacity-40 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div style={{ y: headlineY }}>
          {/* Script tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 16 }}
            className="font-bubble text-cream text-lg sm:text-2xl mb-4 inline-block"
          >
            {t(translations.hero.tagline, locale)}
          </motion.p>

          {/* Original CI wordmark, letter by letter — the PNG acts as a mask
              so the artwork (incl. the tilted i) stays pixel-identical while
              each letter column animates in on its own. */}
          <h1 aria-label="Flatties" className="mx-auto w-full max-w-5xl">
            <WordmarkV4 sliceClassName="bg-asphalt" />
          </h1>

          {/* Subline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, type: "spring", stiffness: 90, damping: 16 }}
            className="font-display uppercase text-cream text-2xl sm:text-4xl lg:text-5xl mt-5 tracking-wide"
          >
            {t(translations.hero.subline, locale)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, type: "spring", stiffness: 90, damping: 16 }}
            className="text-cream/90 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
          >
            {t(translations.hero.description, locale)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, type: "spring", stiffness: 90, damping: 16 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-9"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-asphalt text-cream rounded-full px-9 py-4 text-sm uppercase tracking-wider font-bold cursor-pointer shadow-[0_6px_0_0_rgba(0,0,0,0.25)]"
            >
              {t(translations.hero.ctaMenu, locale)}
            </motion.a>
            <motion.a
              href="#location"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-[3px] border-asphalt text-asphalt rounded-full px-9 py-4 text-sm uppercase tracking-wider font-bold cursor-pointer hover:bg-asphalt hover:text-cream transition-colors duration-200"
            >
              {t(translations.hero.ctaLocation, locale)}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Poster image card with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 90, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 70, damping: 16 }}
          className="relative max-w-4xl mx-auto mt-16"
        >
          <motion.div style={{ y: imageY }} className="relative">
            <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border-[5px] border-asphalt bg-asphalt v4-sticker-shadow-asphalt">
              <Image
                src="/images/hero-burger.png"
                alt="Flatties Smashed Burger in der Box"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>

            {/* Rotating sticker badge */}
            <RotatingBadgeV4
              text="Flatties St. Gallen ·"
              className="absolute -top-12 -right-4 sm:-top-16 sm:-right-10 w-28 h-28 sm:w-40 sm:h-40 text-cream"
              ringClassName="fill-cream font-display"
              discClassName="bg-cream border-[3px] border-asphalt"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

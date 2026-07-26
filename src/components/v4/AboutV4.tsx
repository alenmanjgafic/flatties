"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import RevealV4 from "./RevealV4";
import RotatingBadgeV4 from "./RotatingBadgeV4";

// Illustrationen aus dem Flyer "Flatties A1 Infos"
const QUALITY_IMAGES = {
  origin: { src: "/images/quality/hinterhof-badge.png", className: "h-24 w-24 rounded-full object-contain" },
  beef: { src: "/images/quality/steak.png", className: "h-24 w-auto object-contain" },
  promise: { src: "/images/quality/cow.png", className: "h-24 w-auto object-contain" },
  buns: { src: "/images/quality/martins-bag.png", className: "h-24 w-auto object-contain" },
  sauces: { src: "/images/quality/splash-blue.png", className: "h-24 w-auto object-contain" },
  drinks: { src: "/images/quality/cup-blue.png", className: "h-16 w-auto object-contain" },
};

export default function AboutV4() {
  const { locale } = useLocale();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <RevealV4>
              <p className="font-bubble text-flame text-lg sm:text-xl mb-4 -rotate-2 inline-block">
                {t(translations.about.tagline, locale)}
              </p>
              <h2 className="font-display text-asphalt uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-8">
                {t(translations.about.title1, locale)}
                <br />
                <span className="text-flame">
                  {t(translations.about.title2, locale)}
                </span>
              </h2>
            </RevealV4>

            <RevealV4 delay={0.1}>
              <div className="space-y-5 text-asphalt/80 text-base sm:text-lg leading-relaxed max-w-xl">
                <p>{t(translations.about.p1, locale)}</p>
                <p>{t(translations.about.p2, locale)}</p>
                <p>{t(translations.about.p3full, locale)}</p>
              </div>
            </RevealV4>

          </div>

          {/* Image */}
          <RevealV4 delay={0.15}>
            <div ref={imageRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <motion.div style={{ y: imageY }} className="relative">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-[5px] border-asphalt v4-sticker-shadow-flame rotate-2">
                  <Image
                    src="/images/chef.png"
                    alt="Flatties Chef in der Küche"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <RotatingBadgeV4
                  text="Flatties St. Gallen · Flatties St. Gallen · "
                  className="absolute -bottom-10 -left-4 sm:-left-10 w-28 h-28 sm:w-36 sm:h-36 text-flame"
                  ringClassName="fill-flame font-display"
                  discClassName="bg-cream border-[3px] border-flame"
                />
              </motion.div>
            </div>
          </RevealV4>
        </div>

        {/* Qualitäts-Grid nach dem Flyer "Qualität, die man schmeckt" */}
        <div className="mt-24 sm:mt-32">
          <RevealV4 className="text-center">
            <p className="font-bubble text-flame text-lg sm:text-xl mb-4 rotate-1 inline-block">
              {t(translations.about.quality.tagline, locale)}
            </p>
            <h3 className="font-display text-asphalt uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.92] mb-12">
              {t(translations.about.quality.title, locale)}
            </h3>
          </RevealV4>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                img: QUALITY_IMAGES.origin,
                title: t(translations.about.quality.originTitle, locale),
                body: (
                  <p>{t(translations.about.quality.originText, locale)}</p>
                ),
              },
              {
                img: QUALITY_IMAGES.beef,
                title: t(translations.about.quality.beefTitle, locale),
                body: <p>{t(translations.about.quality.beefText, locale)}</p>,
              },
              {
                img: QUALITY_IMAGES.promise,
                title: t(translations.about.quality.promiseTitle, locale),
                body: (
                  <ul className="space-y-1.5">
                    {[
                      translations.about.quality.promise1,
                      translations.about.quality.promise2,
                      translations.about.quality.promise3,
                      translations.about.quality.promise4,
                    ].map((p) => (
                      <li key={p.en} className="flex items-center gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 shrink-0 fill-none stroke-flame"
                          strokeWidth="3"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M6 6l12 12M6 18L18 6" />
                        </svg>
                        <span className="font-bold">{t(p, locale)}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                img: QUALITY_IMAGES.buns,
                title: t(translations.about.quality.bunsTitle, locale),
                body: <p>{t(translations.about.quality.bunsText, locale)}</p>,
              },
              {
                img: QUALITY_IMAGES.sauces,
                title: t(translations.about.quality.saucesTitle, locale),
                body: (
                  <p>{t(translations.about.quality.saucesText, locale)}</p>
                ),
              },
              {
                img: QUALITY_IMAGES.drinks,
                title: t(translations.about.quality.drinksTitle, locale),
                body: (
                  <div>
                    <p>{t(translations.about.quality.drinksText, locale)}</p>
                    <Image
                      src="/images/quality/grapos-logo.png"
                      alt="Grapos Soft Drinks"
                      width={160}
                      height={78}
                      className="h-9 w-auto mt-4"
                    />
                  </div>
                ),
                accent: true,
              },
            ].map((card, i) => (
              <motion.li
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 110, damping: 16 },
                  },
                }}
                whileHover={{ y: -6 }}
                className={`rounded-3xl border-[3px] border-asphalt p-6 cursor-default ${
                  i % 2 === 0 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"
                } ${
                  card.accent
                    ? "bg-neon text-cream shadow-[6px_6px_0_0_var(--color-asphalt)]"
                    : "bg-cream text-asphalt shadow-[6px_6px_0_0_var(--color-flame)]"
                }`}
              >
                <span
                  className={`flex items-center h-24 mb-4 ${
                    card.accent
                      ? "justify-center w-24 rounded-full bg-cream border-[3px] border-asphalt"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <Image
                    src={card.img.src}
                    alt=""
                    width={240}
                    height={240}
                    className={card.img.className}
                  />
                </span>
                <h4 className="font-display uppercase text-xl sm:text-2xl tracking-wide mb-2">
                  {card.title}
                </h4>
                <div
                  className={`text-sm leading-relaxed ${
                    card.accent ? "text-cream/90" : "text-asphalt/75"
                  }`}
                >
                  {card.body}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

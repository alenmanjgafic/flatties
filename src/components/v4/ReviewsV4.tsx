"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import type { GoogleReviewsData } from "@/lib/google-reviews";
import RevealV4 from "./RevealV4";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex gap-1 ${className ?? ""}`}
      role="img"
      aria-label={`${rating} von 5 Sternen`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-5 h-5 ${i < Math.round(rating) ? "fill-flame" : "fill-asphalt/15"}`}
          aria-hidden="true"
        >
          <path d="M12 1l2.6 6.9L22 9.2l-5.4 4.8L18.2 22 12 18.1 5.8 22l1.6-8L2 9.2l7.4-1.3L12 1z" />
        </svg>
      ))}
    </div>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 110, damping: 16 },
  },
};

export default function ReviewsV4({ data }: { data: GoogleReviewsData }) {
  const { locale } = useLocale();

  return (
    <section id="reviews" className="relative bg-asphalt py-24 sm:py-32 overflow-hidden">
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 v4-dots text-cream/40 opacity-20 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <RevealV4 className="text-center">
          <p className="font-bubble text-flame text-lg sm:text-xl mb-4 -rotate-2 inline-block">
            {t(translations.reviews.tagline, locale)}
          </p>
          <h2 className="font-display text-cream uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-6">
            {t(translations.reviews.title, locale)}
          </h2>

          {/* Gesamtbewertung */}
          <a
            href={data.mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cream border-[3px] border-asphalt rounded-full px-6 py-3 v4-sticker-shadow-flame cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 mb-12"
          >
            <span className="font-bubble text-asphalt text-xl">
              {data.rating.toFixed(1)}
            </span>
            <Stars rating={data.rating} />
            <span className="text-asphalt/70 text-xs sm:text-sm uppercase tracking-wider font-bold">
              {data.count} {t(translations.reviews.onGoogle, locale)}
            </span>
          </a>
        </RevealV4>

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.reviews.map((review, i) => (
            <motion.li
              key={review.publishTime || i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`bg-cream rounded-3xl border-[3px] border-asphalt p-6 shadow-[6px_6px_0_0_var(--color-flame)] cursor-default flex flex-col ${
                i % 2 === 0 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
              }`}
            >
              <Stars rating={review.rating} className="mb-3" />
              <p className="text-asphalt/85 text-sm sm:text-base leading-relaxed flex-1">
                &laquo;{review.text}&raquo;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t-2 border-dotted border-asphalt/20">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-flame text-cream font-bubble text-lg flex items-center justify-center shrink-0"
                >
                  {review.author.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-asphalt text-sm truncate">
                    {review.author}
                  </p>
                  <p className="text-asphalt/50 text-xs uppercase tracking-wider font-bold">
                    {review.relativeTime}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <RevealV4 delay={0.1} className="text-center mt-12">
          <a
            href={data.mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-[3px] border-cream/40 text-cream rounded-full px-8 py-3.5 text-sm uppercase tracking-wider font-bold hover:border-flame hover:text-flame transition-colors duration-200 cursor-pointer"
          >
            {t(translations.reviews.cta, locale)}
          </a>
        </RevealV4>
      </div>
    </section>
  );
}

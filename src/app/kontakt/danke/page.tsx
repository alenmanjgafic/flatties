"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import NavbarV4 from "@/components/v4/NavbarV4";
import FooterV4 from "@/components/v4/FooterV4";

export default function DankePage() {
  const { locale } = useLocale();

  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-flame min-h-screen flex flex-col">
        <NavbarV4 />

        <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-32 pb-24 px-6">
          {/* Halftone texture */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-64 v4-dots text-flame-dark opacity-40 pointer-events-none"
            style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative w-full max-w-lg bg-cream rounded-[2.5rem] border-[4px] border-asphalt v4-sticker-shadow-asphalt p-9 sm:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
              className="inline-block"
            >
              <Image
                src="/images/mascot-head.png"
                alt=""
                width={96}
                height={96}
                className="h-20 w-auto mx-auto mb-4"
              />
            </motion.div>

            <p className="font-bubble text-flame text-base sm:text-lg -rotate-2 inline-block mb-2">
              {t(translations.contact.thanksTag, locale)}
            </p>
            <h1 className="font-display uppercase text-asphalt text-5xl sm:text-6xl tracking-wide mb-4">
              {t(translations.contact.thanksTitle, locale)}
            </h1>
            <p className="text-asphalt/75 text-base sm:text-lg leading-relaxed mb-8">
              {t(translations.contact.thanksText, locale)}
            </p>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-flame text-cream rounded-full px-9 py-4 text-sm uppercase tracking-wider font-bold cursor-pointer shadow-[5px_5px_0_0_var(--color-asphalt)] hover:bg-flame-dark transition-colors duration-200"
            >
              {t(translations.contact.backHome, locale)}
            </motion.a>
          </motion.div>
        </section>

        <FooterV4 />
      </main>
    </MotionConfig>
  );
}

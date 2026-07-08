"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import OrderModalV4 from "./OrderModalV4";

type NavbarV4Props = {
  /** Pfad-Präfix für die Anker-Links, z. B. "/v4" auf Unterseiten. */
  homePath?: string;
};

export default function NavbarV4({ homePath = "" }: NavbarV4Props) {
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { locale, setLocale } = useLocale();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160 && !open);
  });

  const links = [
    { href: `${homePath}#about`, label: t(translations.nav.about, locale) },
    { href: `${homePath}#menu`, label: t(translations.nav.menu, locale) },
    { href: `${homePath}#location`, label: t(translations.nav.findUs, locale) },
    { href: "/kontakt", label: t(translations.contact.navLabel, locale) },
  ];

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-flame origin-left z-[60]"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <motion.header
        className="fixed top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-50"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 34 }}
      >
        <nav className="max-w-6xl mx-auto bg-cream rounded-full border-[3px] border-asphalt px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_6px_0_0_rgba(33,33,33,0.9)]">
          <a href="#" className="flex items-center gap-2 cursor-pointer" aria-label="Flatties Home">
            <Image
              src="/images/mascot-head.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-auto"
              priority
            />
            <Image
              src="/images/logo-flame.png"
              alt="Flatties"
              width={140}
              height={32}
              className="h-6 sm:h-7 w-auto"
              priority
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-asphalt/80 hover:text-flame transition-colors duration-200 text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => setLocale(locale === "en" ? "de" : "en")}
              className="text-asphalt/70 hover:text-asphalt transition-colors duration-200 text-xs uppercase tracking-widest font-bold border-2 border-asphalt/25 hover:border-asphalt/60 rounded-full px-3 py-1.5 cursor-pointer"
              aria-label={locale === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
            >
              {locale === "en" ? "DE" : "EN"}
            </button>

            <motion.button
              onClick={() => setOrderOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-flame text-cream rounded-full px-6 py-2.5 text-xs uppercase tracking-wider font-bold hover:bg-flame-dark transition-colors duration-200 cursor-pointer"
            >
              {t(translations.nav.orderNow, locale)}
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-asphalt cursor-pointer p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-6xl mx-auto mt-2 bg-cream rounded-3xl border-[3px] border-asphalt px-6 py-4 shadow-[0_6px_0_0_rgba(33,33,33,0.9)]"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-asphalt/80 hover:text-flame transition-colors duration-200 text-sm uppercase tracking-widest font-bold cursor-pointer"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => setLocale(locale === "en" ? "de" : "en")}
                className="block py-3 text-asphalt/60 hover:text-asphalt transition-colors duration-200 text-sm uppercase tracking-widest font-bold cursor-pointer"
              >
                {locale === "en" ? "Deutsch" : "English"}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  setOrderOpen(true);
                }}
                className="block w-full mt-2 mb-1 bg-flame text-cream rounded-full px-5 py-3 text-sm uppercase tracking-wider font-bold text-center cursor-pointer"
              >
                {t(translations.nav.orderNow, locale)}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <OrderModalV4 open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}

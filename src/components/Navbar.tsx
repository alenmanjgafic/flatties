"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const links = [
    { href: "#about", label: t(translations.nav.about, locale) },
    { href: "#menu", label: t(translations.nav.menu, locale) },
    { href: "#location", label: t(translations.nav.findUs, locale) },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-asphalt/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
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
            width={160}
            height={37}
            className="h-8 w-auto"
            priority
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/80 hover:text-flame transition-colors text-sm uppercase tracking-widest font-medium"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === "en" ? "de" : "en")}
            className="text-cream/50 hover:text-cream transition-colors text-xs uppercase tracking-widest font-bold border border-cream/20 px-3 py-1.5 hover:border-cream/40"
          >
            {locale === "en" ? "DE" : "EN"}
          </button>

          <a
            href="#menu"
            className="bg-flame text-cream px-5 py-2 text-sm uppercase tracking-wider font-bold hover:bg-flame-dark transition-colors"
          >
            {t(translations.nav.orderNow, locale)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-asphalt border-t border-cream/10 px-6 pb-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-cream/80 hover:text-flame transition-colors text-sm uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <button
            onClick={() => setLocale(locale === "en" ? "de" : "en")}
            className="block py-3 text-cream/50 hover:text-cream transition-colors text-sm uppercase tracking-widest"
          >
            {locale === "en" ? "Deutsch" : "English"}
          </button>

          <a
            href="#menu"
            onClick={() => setOpen(false)}
            className="block mt-3 bg-flame text-cream px-5 py-3 text-sm uppercase tracking-wider font-bold text-center"
          >
            {t(translations.nav.orderNow, locale)}
          </a>
        </div>
      )}
    </nav>
  );
}

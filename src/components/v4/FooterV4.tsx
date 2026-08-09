"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import WordmarkV4 from "./WordmarkV4";

type FooterV4Props = {
  /** Pfad-Präfix für die Anker-Links, z. B. "/v4" auf Unterseiten. */
  homePath?: string;
};

export default function FooterV4({ homePath = "/" }: FooterV4Props) {
  const { locale } = useLocale();

  const links = [
    { href: `${homePath}#about`, label: t(translations.nav.about, locale) },
    { href: `${homePath}#menu`, label: t(translations.nav.menu, locale) },
    { href: `${homePath}#location`, label: t(translations.nav.findUs, locale) },
    { href: "/kontakt", label: t(translations.contact.navLabel, locale) },
  ];

  return (
    <footer className="bg-asphalt pt-20 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Giant CI wordmark, per-letter reveal, flame on hover */}
        <p aria-label="Flatties" className="group">
          {/* Deckkraft liegt auf dem Wrapper, nicht auf den Slices: Die
              Slices überlappen minimal (Seam-Fix) — halbtransparente Farbe
              würde sich dort doppelt stapeln und fleckig wirken. */}
          <WordmarkV4
            whileInView
            delay={0}
            className="mx-auto w-full max-w-4xl opacity-25 transition-opacity duration-500 group-hover:opacity-100"
            sliceClassName="bg-cream transition-colors duration-500 group-hover:bg-flame"
          />
        </p>

        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Mascot */}
          <a href="#" className="cursor-pointer" aria-label="Nach oben">
            <motion.span whileHover={{ rotate: -8, scale: 1.1 }} className="inline-block">
              <Image
                src="/images/mascot-head.png"
                alt=""
                width={64}
                height={64}
                className="h-14 w-auto"
              />
            </motion.span>
          </a>

          {/* Links */}
          <nav className="flex gap-8" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-flame transition-colors duration-200 text-sm uppercase tracking-widest font-bold cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/flatties.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-flame transition-colors duration-200 cursor-pointer"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@flatties.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-flame transition-colors duration-200 cursor-pointer"
              aria-label="TikTok"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z" />
              </svg>
            </a>
          </div>

          {/* Copyright + Rechtliches */}
          <div className="border-t border-cream/15 pt-6 w-full text-center space-y-3">
            <p className="text-cream/40 text-xs uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Flatties.{" "}
              {t(translations.footer.rights, locale)}
            </p>
            <p className="flex justify-center gap-6">
              <Link
                href="/impressum"
                className="text-cream/40 hover:text-flame transition-colors duration-200 text-xs uppercase tracking-widest cursor-pointer"
              >
                {t(translations.footer.imprint, locale)}
              </Link>
              <Link
                href="/datenschutz"
                className="text-cream/40 hover:text-flame transition-colors duration-200 text-xs uppercase tracking-widest cursor-pointer"
              >
                {t(translations.footer.privacy, locale)}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

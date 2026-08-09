"use client";

import Image from "next/image";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import { TIKTOK_PROFILE_URL, type TikTokPost } from "@/lib/tiktok-shared";
import RevealV4 from "./RevealV4";
import VelocityTickerV4 from "./VelocityTickerV4";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.6 6.9a4.8 4.8 0 0 1-3.5-1.6A4.8 4.8 0 0 1 14.9 2h-3.1v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6.2 6.2 0 0 0-.9-.1 6 6 0 1 0 6 6V9.9a7.8 7.8 0 0 0 4.7 1.5V8.3l-.1-1.4z" />
    </svg>
  );
}

/**
 * Endlos durchlaufende Karten-Reihe mit den kuratierten TikTok-Beiträgen.
 * Nur Vorschaubilder + Links — kein TikTok-Embed-Script, keine Cookies.
 */
export default function TikTokV4({ posts }: { posts: TikTokPost[] }) {
  const { locale } = useLocale();

  return (
    <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 v4-dots text-asphalt opacity-10 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <RevealV4>
          <p className="font-bubble text-flame text-lg sm:text-xl mb-4 -rotate-2 inline-block">
            {t(translations.social.tagline, locale)}
          </p>
          <h2 className="font-display text-asphalt uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">
            {t(translations.social.title, locale)}
          </h2>
        </RevealV4>
      </div>

      {/* Carousel: volle Breite, driftet endlos und reagiert aufs Scrollen */}
      <RevealV4 delay={0.15}>
        <div className="mt-14">
          <VelocityTickerV4 baseVelocity={0.85}>
            {posts.map((post, i) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-52 sm:w-60 aspect-[9/16] mx-3 sm:mx-4 my-4 rounded-3xl border-[3px] border-asphalt bg-asphalt overflow-hidden v4-sticker-shadow-flame hover:-translate-y-1.5 transition-transform duration-200 ${
                  i % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
                }`}
              >
                <Image
                  src={post.thumbnailUrl}
                  alt={post.title || "Flatties auf TikTok"}
                  fill
                  sizes="240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TikTok-Chip */}
                <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-cream border-2 border-asphalt flex items-center justify-center">
                  <TikTokIcon className="w-4.5 h-4.5 text-asphalt" />
                </span>
                {/* Titel über Verlauf am unteren Rand */}
                <span className="absolute inset-x-0 bottom-0 pt-14 pb-4 px-4 bg-gradient-to-t from-asphalt/90 to-transparent text-left">
                  <span className="block text-cream text-sm font-bold leading-snug whitespace-normal line-clamp-2">
                    {post.title}
                  </span>
                </span>
              </a>
            ))}
          </VelocityTickerV4>
        </div>
      </RevealV4>

      <RevealV4 delay={0.1} className="text-center mt-12">
        <div className="flex flex-wrap justify-center gap-4 px-6">
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-asphalt text-cream rounded-full px-8 py-3.5 text-sm uppercase tracking-wider font-bold v4-sticker-shadow-flame hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer"
          >
            <TikTokIcon className="w-4 h-4" />
            {t(translations.social.cta, locale)}
          </a>
          <a
            href="https://www.instagram.com/flatties.ch/?hl=de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-asphalt text-cream rounded-full px-8 py-3.5 text-sm uppercase tracking-wider font-bold v4-sticker-shadow-flame hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
            {t(translations.social.ctaInstagram, locale)}
          </a>
        </div>
      </RevealV4>
    </section>
  );
}

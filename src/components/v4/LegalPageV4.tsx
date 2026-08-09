import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import NavbarV4 from "./NavbarV4";
import FooterV4 from "./FooterV4";

/**
 * Gemeinsames Gerüst für Rechtsseiten (Impressum, Datenschutz):
 * Cream-Fläche, Poster-Headline, typografierte Textspalte. Die Inhalte
 * sind bewusst nur auf Deutsch — die deutsche Fassung ist massgeblich.
 */
export default function LegalPageV4({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-cream min-h-screen">
        <NavbarV4 />
        <section className="relative overflow-hidden pt-32 sm:pt-40 pb-24">
          {/* Halftone texture */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-64 v4-dots text-asphalt opacity-10 pointer-events-none"
            style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          />

          <div className="relative max-w-3xl mx-auto px-6">
            <h1 className="font-display text-asphalt uppercase text-5xl sm:text-6xl leading-[0.92] mb-10">
              {title}
            </h1>
            <div
              className="v4-legal text-asphalt/80 text-base leading-relaxed space-y-4
                [&_h2]:uppercase [&_h2]:text-asphalt [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:tracking-wide [&_h2]:mt-10 [&_h2]:mb-2
                [&_a]:text-flame [&_a]:font-bold [&_a:hover]:text-flame-dark [&_a]:transition-colors
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                [&_strong]:text-asphalt"
            >
              {children}
            </div>
          </div>
        </section>
        <FooterV4 />
      </main>
    </MotionConfig>
  );
}

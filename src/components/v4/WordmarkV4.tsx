"use client";

import { motion } from "framer-motion";

// Buchstaben-Spalten der Original-Wortmarke (logo-flame.png, 1456px breit),
// per Alpha-Analyse vermessen: [links%, rechts%] je Buchstabe F L A T T i E S.
// A/T und T/i kernen ineinander — dort existiert keine tintenfreie Lücke,
// die Schnittkante läuft zwangsläufig durch den Buchstaben.
const WORDMARK_SLICES: [number, number][] = [
  [0, 13.22],
  [13.22, 25.72],
  [25.72, 40.59],
  [40.59, 52.13],
  [52.13, 65.32],
  [65.32, 72.97],
  [72.97, 84.82],
  [84.82, 100],
];

// Benachbarte Slices überlappen minimal: Zwei exakt aneinanderstossende
// clip-path-Kanten lassen durch ihr Antialiasing eine helle Haarlinie
// stehen, wo die Kante durch Tinte läuft (sichtbar am ersten T). Mit
// Überlappung deckt jede Seite die Kante der anderen ab.
const SLICE_OVERLAP = 0.3;

type WordmarkV4Props = {
  /** Sizing/Positionierung des Wrappers. */
  className?: string;
  /** Farbe der Buchstaben als bg-Klasse(n), z. B. "bg-asphalt". */
  sliceClassName?: string;
  /** true: animiert beim Scrollen in den Viewport statt beim Mount. */
  whileInView?: boolean;
  delay?: number;
};

/**
 * Die originale CI-Wortmarke (inkl. schrägem i) als CSS-Maske,
 * in Buchstaben-Spalten geschnitten und einzeln animiert.
 * Einfärbbar über sliceClassName, da das PNG nur als Maske dient.
 */
const sliceVariants = {
  hidden: { y: "115%", rotate: 6, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 160, damping: 15 },
  },
};

export default function WordmarkV4({
  className,
  sliceClassName = "bg-asphalt",
  whileInView = false,
  delay = 0.25,
}: WordmarkV4Props) {
  // Der Viewport-Trigger muss auf dem sichtbaren Container liegen: Die Slices
  // selbst starten ausserhalb des overflow-hidden-Wrappers und würden von
  // whileInView nie als sichtbar erkannt.
  const trigger = whileInView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };

  return (
    <span aria-hidden="true" className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="relative block aspect-[1456/340]"
        initial="hidden"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
        }}
        {...trigger}
      >
        {WORDMARK_SLICES.map(([left, right], i) => (
          <motion.span
            key={i}
            variants={sliceVariants}
            className={`absolute inset-0 block ${sliceClassName}`}
            style={{
              WebkitMaskImage: "url(/images/logo-flame.png)",
              maskImage: "url(/images/logo-flame.png)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              clipPath: `inset(0 ${Math.max(0, 100 - right - SLICE_OVERLAP).toFixed(2)}% 0 ${Math.max(0, left - SLICE_OVERLAP).toFixed(2)}%)`,
              transformOrigin: `${((left + right) / 2).toFixed(2)}% 100%`,
            }}
          />
        ))}
      </motion.span>
    </span>
  );
}

"use client";

import { motion } from "framer-motion";

// Buchstaben-Spalten der Original-Wortmarke (logo-flame.png, 1456px breit),
// per Alpha-Analyse vermessen: [links%, rechts%] je Buchstabe F L A T T i E S
const WORDMARK_SLICES: [number, number][] = [
  [0, 13.26],
  [13.26, 25.76],
  [25.76, 40.59],
  [40.59, 52.13],
  [52.13, 65.32],
  [65.32, 73.01],
  [73.01, 84.89],
  [84.89, 100],
];

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
              clipPath: `inset(0 ${(100 - right).toFixed(2)}% 0 ${left.toFixed(2)}%)`,
              transformOrigin: `${((left + right) / 2).toFixed(2)}% 100%`,
            }}
          />
        ))}
      </motion.span>
    </span>
  );
}

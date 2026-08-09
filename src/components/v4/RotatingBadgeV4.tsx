"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type RotatingBadgeV4Props = {
  /** Eine Umlauf-Hälfte inkl. Trennzeichen, z. B. "Flatties St. Gallen ·" —
      wird intern zweimal auf gegenüberliegende Kreishälften gesetzt. */
  text: string;
  className?: string;
  /** Tailwind text color classes for ring text + center disc. */
  ringClassName?: string;
  discClassName?: string;
};

/**
 * Rotating circular text badge with the mascot head in the center —
 * the classic sticker treatment from the Flatties packaging.
 */
export default function RotatingBadgeV4({
  text,
  className,
  ringClassName = "fill-asphalt",
  discClassName = "bg-cream",
}: RotatingBadgeV4Props) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <div className="relative w-full h-full">
        <motion.svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          <defs>
            {/* Zwei identische Kreise mit gegenüberliegenden Startpunkten
                (links bzw. rechts): Jede Texthälfte sitzt mittig auf "ihrem"
                Pfad und kommt so nie in die Nähe eines Pfadendes — Glyphen
                hinter dem Pfadende werden laut SVG-Spec nicht gerendert, und
                WebKit misst die Laufweite minimal anders als Blink (in Safari
                fehlte dadurch der letzte Trennpunkt). */}
            <path
              id="v4-badge-circle"
              d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
            />
            <path
              id="v4-badge-circle-b"
              d="M 60,60 m 46,0 a 46,46 0 1,1 -92,0 a 46,46 0 1,1 92,0"
            />
          </defs>
          {/* letterSpacing mit etwas Reserve, damit beide Hälften auch in der
              breitesten Engine unter dem halben Umfang bleiben und sich an
              den Nähten nicht überlappen. */}
          {["#v4-badge-circle", "#v4-badge-circle-b"].map((href) => (
            <text
              key={href}
              className={`${ringClassName} font-bold uppercase`}
              fontSize="12.5"
              letterSpacing="1.7"
              textAnchor="middle"
            >
              <textPath href={href} startOffset="50%">
                {text}
              </textPath>
            </text>
          ))}
        </motion.svg>
        <div
          className={`absolute inset-[24%] rounded-full ${discClassName} flex items-center justify-center`}
        >
          <Image
            src="/images/mascot-head.png"
            alt=""
            width={64}
            height={64}
            className="w-[72%] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

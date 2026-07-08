"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type RotatingBadgeV4Props = {
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
            <path
              id="v4-badge-circle"
              d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
            />
          </defs>
          <text className={`${ringClassName} font-bold uppercase`} fontSize="12.5" letterSpacing="2.5">
            <textPath href="#v4-badge-circle">{text}</textPath>
          </text>
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

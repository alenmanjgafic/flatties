"use client";

import VelocityTickerV4 from "./VelocityTickerV4";

function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 sm:w-6 sm:h-6 mx-5 sm:mx-7 shrink-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M12 1l2.6 6.9L22 9.2l-5.4 4.8L18.2 22 12 18.1 5.8 22l1.6-8L2 9.2l7.4-1.3L12 1z" />
    </svg>
  );
}

type TickerBarV4Props = {
  items: string[];
  baseVelocity?: number;
  className?: string;
  starClassName?: string;
};

export default function TickerBarV4({
  items,
  baseVelocity = 2.5,
  className = "bg-asphalt text-cream",
  starClassName = "text-flame",
}: TickerBarV4Props) {
  return (
    <div className={`py-4 sm:py-5 border-y-[3px] border-asphalt ${className}`}>
      <VelocityTickerV4 baseVelocity={baseVelocity}>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="font-display uppercase tracking-wide text-xl sm:text-3xl">
              {item}
            </span>
            <Star className={starClassName} />
          </span>
        ))}
      </VelocityTickerV4>
    </div>
  );
}

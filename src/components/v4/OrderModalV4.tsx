"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { ORDER_PLATFORMS, type OrderPlatformId } from "@/lib/order-links";

function trackClick(platform: OrderPlatformId) {
  // Fire-and-forget: darf das Öffnen des Bestell-Links nie blockieren
  fetch("/api/order-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ platform }),
    keepalive: true,
  }).catch(() => {});
}

type OrderModalV4Props = {
  open: boolean;
  onClose: () => void;
};

export default function OrderModalV4({ open, onClose }: OrderModalV4Props) {
  const { locale } = useLocale();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-asphalt/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={locale === "de" ? "Jetzt bestellen" : "Order now"}
            initial={{ opacity: 0, y: 40, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-md bg-cream rounded-[2rem] border-[4px] border-asphalt v4-sticker-shadow-asphalt p-7 sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={locale === "de" ? "Schliessen" : "Close"}
              className="absolute top-4 right-4 text-asphalt/60 hover:text-flame transition-colors duration-200 cursor-pointer p-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/mascot-head.png"
                alt=""
                width={72}
                height={72}
                className="h-16 w-auto mb-3"
              />
              <h2 className="font-display uppercase text-asphalt text-3xl sm:text-4xl tracking-wide">
                {locale === "de" ? "Jetzt Bestellen" : "Order Now"}
              </h2>
              <p className="font-bubble text-flame text-base mt-1 mb-7 -rotate-1">
                {locale === "de"
                  ? "Wähle deine Plattform"
                  : "Pick your platform"}
              </p>

              <div className="w-full space-y-3">
                {ORDER_PLATFORMS.map((p, i) => (
                  <motion.a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(p.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-between w-full rounded-full px-7 py-4 border-[3px] border-asphalt font-bold uppercase tracking-wider text-sm cursor-pointer transition-colors duration-200 ${
                      i === 0
                        ? "bg-flame text-cream hover:bg-flame-dark shadow-[5px_5px_0_0_var(--color-asphalt)]"
                        : "bg-cream text-asphalt hover:bg-asphalt hover:text-cream shadow-[5px_5px_0_0_var(--color-flame)]"
                    }`}
                  >
                    <span>{p.name}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <p className="text-asphalt/50 text-xs uppercase tracking-widest font-bold mt-6">
                {locale === "de"
                  ? "Lieferung & Abholung — St. Gallen"
                  : "Delivery & pickup — St. Gallen"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

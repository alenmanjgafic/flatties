"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LanguageContext";
import { translations, t } from "@/lib/i18n";
import RevealV4 from "./RevealV4";

const INQUIRY_TYPES = [
  { id: "kooperation", labelKey: "typeKoop" },
  { id: "influencer", labelKey: "typeInfluencer" },
  { id: "sonstiges", labelKey: "typeOther" },
] as const;

const inputClasses =
  "w-full bg-cream border-[3px] border-asphalt rounded-2xl px-5 py-3.5 text-asphalt placeholder:text-asphalt/40 focus:outline-none focus:border-flame transition-colors duration-200";

export default function ContactV4() {
  const { locale } = useLocale();
  const router = useRouter();
  const [type, setType] = useState<string>(INQUIRY_TYPES[0].id);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSending(true);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          type,
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/kontakt/danke");
    } catch {
      setError(true);
      setSending(false);
    }
  }

  return (
    <section className="relative bg-flame overflow-hidden pt-32 sm:pt-40 pb-24">
      {/* Halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 v4-dots text-flame-dark opacity-40 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        <RevealV4 className="text-center">
          <p className="font-bubble text-cream text-lg sm:text-xl mb-4 -rotate-2 inline-block">
            {t(translations.contact.tagline, locale)}
          </p>
          <h1 className="font-display text-asphalt uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">
            {t(translations.contact.title1, locale)}{" "}
            <span className="text-cream">
              {t(translations.contact.title2, locale)}
            </span>
          </h1>
          <p className="text-cream/90 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            {t(translations.contact.intro, locale)}
          </p>
        </RevealV4>

        <RevealV4 delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="relative mt-12 bg-cream rounded-[2.5rem] border-[4px] border-asphalt v4-sticker-shadow-asphalt p-7 sm:p-10 space-y-6"
          >
            {/* Anfrage-Typ */}
            <fieldset>
              <legend className="text-asphalt font-bold text-xs uppercase tracking-widest mb-3">
                {t(translations.contact.type, locale)}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {INQUIRY_TYPES.map((it) => {
                  const active = type === it.id;
                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => setType(it.id)}
                      aria-pressed={active}
                      className={`rounded-full px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider font-bold cursor-pointer border-[3px] transition-colors duration-200 ${
                        active
                          ? "bg-flame text-cream border-asphalt"
                          : "bg-cream text-asphalt/70 border-asphalt/25 hover:border-asphalt hover:text-asphalt"
                      }`}
                    >
                      {t(translations.contact[it.labelKey], locale)}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-asphalt font-bold text-xs uppercase tracking-widest mb-2"
                >
                  {t(translations.contact.name, locale)}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={200}
                  autoComplete="name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-asphalt font-bold text-xs uppercase tracking-widest mb-2"
                >
                  {t(translations.contact.email, locale)}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={320}
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-asphalt font-bold text-xs uppercase tracking-widest mb-2"
              >
                {t(translations.contact.message, locale)}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={5}
                maxLength={4000}
                rows={6}
                className={`${inputClasses} resize-y`}
              />
            </div>

            {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus */}
            <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {error && (
              <p role="alert" className="text-flame font-bold text-sm">
                {t(translations.contact.error, locale)}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { scale: 1.03 }}
              whileTap={sending ? undefined : { scale: 0.97 }}
              className="w-full bg-asphalt text-cream rounded-full px-9 py-4 text-sm uppercase tracking-wider font-bold cursor-pointer shadow-[5px_5px_0_0_var(--color-flame)] disabled:opacity-60 disabled:cursor-wait transition-opacity duration-200"
            >
              {sending
                ? t(translations.contact.sending, locale)
                : t(translations.contact.submit, locale)}
            </motion.button>
          </form>
        </RevealV4>
      </div>
    </section>
  );
}

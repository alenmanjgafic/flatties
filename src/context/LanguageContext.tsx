"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("flatties-lang") as Locale | null;
    if (stored && (stored === "en" || stored === "de")) {
      setLocale(stored);
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) {
      setLocale("de");
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("flatties-lang", newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  return useContext(LanguageContext);
}

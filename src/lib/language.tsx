"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "am";

type LanguageContextValue = {
  lang: Language;
  toggle: () => void;
  isAmharic: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggle: () => {},
  isAmharic: false,
});

const STORAGE_KEY = "blacnova_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "am" || stored === "en") setLang(stored);
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Language = prev === "en" ? "am" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggle, isAmharic: lang === "am" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Return `amharic` text if language is "am" and the value is non-empty, otherwise fall back to `english`. */
export function t(english: string, amharic?: string | null, lang?: Language): string {
  if (lang === "am" && amharic) return amharic;
  return english;
}

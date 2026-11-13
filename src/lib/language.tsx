"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { uiCopy, type UiCopy } from "./ui-copy";

export type Language = "en" | "am";

type LanguageContextValue = {
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  toggle: () => {},
});

const STORAGE_KEY = "blacnova_lang";
const CHANGE_EVENT = "blacnova-lang-change";

function getStoredLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "am" || stored === "en") return stored;
  } catch {
    // Ignore private-mode / blocked storage.
  }
  return "en";
}

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CHANGE_EVENT, handler);
  };
}

/** Always English during SSR + each island's hydration pass. */
function getServerSnapshot(): Language {
  return "en";
}

function useLangStore(): Language {
  // Called in every consumer so late Suspense islands still hydrate with
  // getServerSnapshot ("en"), matching their server HTML — even if earlier
  // siblings already flipped to the localStorage language.
  return useSyncExternalStore(subscribe, getStoredLang, getServerSnapshot);
}

function setStoredLang(next: Language) {
  localStorage.setItem(STORAGE_KEY, next);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Sets <html lang> after mount; language itself is read per-component from the store. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLangStore();

  useEffect(() => {
    document.documentElement.lang = lang === "am" ? "am" : "en";
  }, [lang]);

  const toggle = useCallback(() => {
    setStoredLang(getStoredLang() === "en" ? "am" : "en");
  }, []);

  return (
    <LanguageContext.Provider value={{ toggle }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const { toggle } = useContext(LanguageContext);
  const lang = useLangStore();
  return {
    lang,
    toggle,
    isAmharic: lang === "am",
    ui: uiCopy[lang],
  };
}

/** Current-language UI dictionary (header, hero, sections, forms, etc.). */
export function useUi(): UiCopy {
  const lang = useLangStore();
  return uiCopy[lang];
}

/** Return `amharic` text if language is "am" and the value is non-empty, otherwise fall back to `english`. */
export function t(english: string, amharic?: string | null, lang?: Language): string {
  if (lang === "am" && amharic) return amharic;
  return english;
}

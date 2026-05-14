import type { Locale, LocalizedText } from "./types";

export const locales: Locale[] = ["en", "hi"];

export function t(value: LocalizedText, locale: Locale) {
  return value[locale] ?? value.en;
}

export function localeLabel(locale: Locale) {
  return locale === "hi" ? "हिन्दी" : "English";
}

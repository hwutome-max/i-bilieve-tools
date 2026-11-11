import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://www.ibelievetools.com").replace(/\/$/, "");

export function htmlLang(locale: string) {
  return locale === "zh" ? "zh-CN" : locale;
}

export function languageAlternates(path = "") {
  const suffix = path.startsWith("/") || path === "" ? path : `/${path}`;
  const languages: Record<string, string> = {
    "x-default": `${siteUrl}/en${suffix}`,
  };
  for (const locale of locales) {
    const hreflang = locale === "zh" ? "zh-CN" : locale;
    languages[hreflang] = `${siteUrl}/${locale}${suffix}`;
  }
  return languages;
}

export function pageAlternates(locale: Locale, path = "") {
  const suffix = path.startsWith("/") || path === "" ? path : `/${path}`;
  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages: languageAlternates(suffix),
  };
}

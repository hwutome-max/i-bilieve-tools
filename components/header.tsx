"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  it: "IT",
  zh: "中文",
  ar: "AR",
  ru: "RU",
};

export function Header() {
  const t = useTranslations("nav");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.toString();
  const href = query ? `${pathname}?${query}` : pathname;

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <i aria-hidden="true" />
        I Believe
      </Link>
      <details className="nav-toggle">
        <summary>{t("menu")}</summary>
        <nav className="site-nav" aria-label={t("menu")}>
          <Link href="/blades">{t("blades")}</Link>
          <Link href="/#markets">{t("markets")}</Link>
          <Link href="/#factory">{t("factory")}</Link>
          <Link href="/inquiry">{t("inquiry")}</Link>
        </nav>
        <nav className="languages" aria-label={t("language")}>
          {locales.map((locale) => (
            <Link key={locale} href={href} locale={locale} hrefLang={locale === "zh" ? "zh-CN" : locale} aria-current={locale === currentLocale ? "true" : undefined}>
              {labels[locale]}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}

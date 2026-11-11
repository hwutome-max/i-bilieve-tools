import type { ReactNode } from "react";
import { Suspense } from "react";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";
import { fontClass } from "@/lib/fonts";
import { htmlLang, siteUrl } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={htmlLang(locale)} dir={locale === "ar" ? "rtl" : "ltr"} className={fontClass(locale)}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a className="skip" href="#content">Skip</a>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <div id="content">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL(siteUrl),
};

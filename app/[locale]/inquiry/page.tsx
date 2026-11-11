import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { routing, type Locale } from "@/i18n/routing";
import { firstQueryValue, getProduct } from "@/lib/catalog";
import { pageAlternates } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("inquiryTitle"),
    description: t("inquiryDescription"),
    alternates: pageAlternates(locale as Locale, "/inquiry"),
  };
}

export default async function InquiryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const query = await searchParams;
  const product = getProduct(firstQueryValue(query.product) ?? "");
  const t = await getTranslations("inquiry");

  return (
    <main className="inquiry-page">
      <div className="inquiry-layout">
        <header>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="lead">{t("lead")}</p>
        </header>
        <InquiryForm
          productId={product?.id}
          productTitle={product?.title}
          material={product?.material ?? firstQueryValue(query.material)}
          diameter={product?.diameters[0] ? String(product.diameters[0]) : firstQueryValue(query.diameter)}
        />
      </div>
    </main>
  );
}

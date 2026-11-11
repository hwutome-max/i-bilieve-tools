import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProduct, normalizeTable, products } from "@/lib/catalog";
import { pageAlternates, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const product = getProduct(id);
  if (!hasLocale(routing.locales, locale) || !product) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${product.title} | ${t("siteName")}`,
    description: t("productDescription", { title: product.title }),
    alternates: pageAlternates(locale as Locale, `/blades/${product.id}`),
  };
}

export default async function SpecPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const product = getProduct(id);
  if (!product) notFound();
  const t = await getTranslations();
  const table = normalizeTable(product.table);
  const showNote = table.rows.some((row) => row.note);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    image: `${siteUrl}${product.imageSrc}`,
    sku: product.model,
    brand: { "@type": "Brand", name: "I Believe Tools" },
    manufacturer: { "@type": "Organization", name: "Danyang I Believe Machinery Tools Co., Ltd." },
    category: product.kind === "blade" ? "Diamond saw blade" : product.title,
  };

  return (
    <main className="spec-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p><Link className="text-link" href="/blades">{t("spec.back")}</Link></p>
      <div className="spec-layout">
        <figure className="spec-visual">
          <img src={product.imageSrc} alt={product.title} />
        </figure>
        <div className="spec-copy">
          <p className="eyebrow">{product.material ? t(`materials.${product.material}`) : t(`catalog.${product.kind === "cup" ? "cups" : "cores"}`)} · {t(`process.${product.process}`)}</p>
          <h1>{product.title}</h1>
          {product.summary ? <p>{product.summary}</p> : null}
          <dl className="meta-list">
            {product.model ? (
              <div>
                <dt>{t("spec.model")}</dt>
                <dd>{product.model}</dd>
              </div>
            ) : null}
            {product.applications ? (
              <div>
                <dt>{t("spec.application")}</dt>
                <dd>{product.applications}</dd>
              </div>
            ) : null}
            {product.machinery ? (
              <div>
                <dt>{t("spec.machinery")}</dt>
                <dd>{product.machinery}</dd>
              </div>
            ) : null}
            {product.diameters.length ? (
              <div>
                <dt>{t("spec.related")}</dt>
                <dd>{product.diameters.join(" · ")} mm</dd>
              </div>
            ) : null}
          </dl>
          <div className="spec-table-wrap">
            <table className="spec-table">
              {table.caption ? <caption>{table.caption}</caption> : null}
              <thead>
                <tr>
                  {table.headers.map((header, headerIndex) => <th key={`${header}-${headerIndex}`} scope="col">{header}</th>)}
                  {showNote ? <th scope="col">{t("spec.note")}</th> : null}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={`${product.id}-${index}`}>
                    {row.cells.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}
                    {showNote ? <td>{row.note}</td> : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="actions">
            <Link className="button button--solid" href={`/inquiry?product=${product.id}`}>{t("spec.inquire")}</Link>
            <a className="button" href={product.sourceUrl}>{t("spec.source")}</a>
          </div>
        </div>
      </div>
    </main>
  );
}

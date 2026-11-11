import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { allDiameters, filterProducts, firstQueryValue, kinds, materials, processes } from "@/lib/catalog";
import { pageAlternates } from "@/lib/site";

type Search = Record<string, string | string[] | undefined>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("catalogTitle"),
    description: t("catalogDescription"),
    alternates: pageAlternates(locale as Locale, "/blades"),
  };
}

export default async function BladesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Search>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const raw = await searchParams;
  const query = {
    kind: firstQueryValue(raw.kind),
    material: firstQueryValue(raw.material),
    process: firstQueryValue(raw.process),
    d: firstQueryValue(raw.d),
    q: firstQueryValue(raw.q),
  };
  const t = await getTranslations();
  const results = filterProducts(query);
  const activeKind = kinds.includes(query.kind as (typeof kinds)[number]) || query.kind === "all" ? query.kind : "blade";

  return (
    <main className="catalog-page">
      <header className="catalog-head">
        <p className="eyebrow">{t("catalog.eyebrow")}</p>
        <h1>{t("catalog.title")}</h1>
        <p>{t("catalog.intro")}</p>
      </header>
      <div className="catalog-layout">
        <form className="filters" action={`/${locale}/blades`} method="get" key={[query.kind, query.material, query.process, query.d, query.q].join("|")}>
          <div className="kind-switch">
            <Link href="/blades?kind=blade" aria-current={activeKind === "blade" ? "page" : undefined}>{t("catalog.blades")}</Link>
            <Link href="/blades?kind=cup" aria-current={activeKind === "cup" ? "page" : undefined}>{t("catalog.cups")}</Link>
            <Link href="/blades?kind=core" aria-current={activeKind === "core" ? "page" : undefined}>{t("catalog.cores")}</Link>
            <Link href="/blades?kind=all" aria-current={activeKind === "all" ? "page" : undefined}>{t("catalog.all")}</Link>
          </div>
          <input type="hidden" name="kind" value={activeKind} />
          {activeKind === "blade" || activeKind === "all" ? (
            <label>
              {t("catalog.material")}
              <select name="material" defaultValue={query.material ?? ""}>
                <option value="">{t("catalog.any")}</option>
                {materials.map((material) => (
                  <option key={material} value={material}>{t(`materials.${material}`)}</option>
                ))}
              </select>
            </label>
          ) : null}
          <label>
            {t("catalog.process")}
            <select name="process" defaultValue={query.process ?? ""}>
              <option value="">{t("catalog.any")}</option>
              {processes.map((process) => (
                <option key={process} value={process}>{t(`process.${process}`)}</option>
              ))}
            </select>
          </label>
          <label>
            {t("catalog.diameter")}
            <select name="d" defaultValue={query.d ?? ""}>
              <option value="">{t("catalog.any")}</option>
              {allDiameters().map((size) => (
                <option key={size} value={size}>{size} mm</option>
              ))}
            </select>
          </label>
          <label>
            {t("catalog.search")}
            <input name="q" defaultValue={query.q ?? ""} placeholder={t("catalog.searchPlaceholder")} />
          </label>
          <button className="button button--solid" type="submit">{t("catalog.apply")}</button>
        </form>
        <div>
          <p className="result-count"><strong>{results.length}</strong> {t("catalog.productsWord")}</p>
          {results.length === 0 ? <p>{t("catalog.empty")}</p> : null}
          <ul className="blade-list">
            {results.map((product) => (
              <li key={product.id}>
                <Link className="blade-row" href={`/blades/${product.id}`}>
                  <img src={product.imageSrc} alt="" />
                  <span>
                    <h2>{product.title}</h2>
                    <p>
                      {[product.material ? t(`materials.${product.material}`) : null, t(`process.${product.process}`), product.model].filter(Boolean).join(" · ")}
                    </p>
                  </span>
                  <small>
                    {product.diameters.length
                      ? product.diameters.length === 1
                        ? `${product.diameters[0]} mm`
                        : `${product.diameters[0]}–${product.diameters.at(-1)} mm`
                      : t("catalog.open")}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

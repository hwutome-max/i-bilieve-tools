import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageAlternates, siteUrl } from "@/lib/site";

const materialKeys = ["tile", "stone", "general", "concrete", "asphalt", "tuck"] as const;
const processKeys = ["sintered", "laser", "brazed"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: pageAlternates(locale as Locale),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Danyang I Believe Machinery Tools Co., Ltd.",
    alternateName: "I Believe Tools",
    url: siteUrl,
    email: "jessica@ibelievetools.com",
    telephone: ["+86-15862924461", "+86-18952977678"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Danyang Economic Development Zone",
      addressRegion: "Jiangsu Province",
      addressCountry: "CN",
    },
    foundingDate: "2014",
    description: t("meta.homeDescription"),
    areaServed: ["Europe", "India", "Central Asia", "Middle East"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: t("faq.q1"), acceptedAnswer: { "@type": "Answer", text: t("faq.a1") } },
      { "@type": "Question", name: t("faq.q2"), acceptedAnswer: { "@type": "Answer", text: t("faq.a2") } },
      { "@type": "Question", name: t("faq.q3"), acceptedAnswer: { "@type": "Answer", text: t("faq.a3") } },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section className="hero">
        <div>
          <p className="kicker">{t("hero.kicker")}</p>
          <h1>
            {t("hero.title")} <em>{t("hero.titleEmphasis")}</em>
          </h1>
          <div className="kerf" aria-hidden="true" />
          <p className="lead">{t("hero.lead")}</p>
          <div className="actions">
            <Link className="button button--solid" href="/inquiry">{t("hero.inquiry")}</Link>
            <Link className="button" href="/blades">{t("hero.catalog")}</Link>
            <a className="button" href="/brochure.pdf">{t("hero.pdf")}</a>
          </div>
        </div>
        <figure className="hero-figure">
          <img src="/assets/hero-cutting-clean.png" alt="" />
          <figcaption>Diamond saw blade</figcaption>
        </figure>
      </section>

      <section className="section section--dark" id="markets">
        <div className="section-head">
          <p className="eyebrow">{t("markets.eyebrow")}</p>
          <h2>{t("markets.title")}</h2>
        </div>
        <ol className="market-list">
          {(["europe", "india", "centralAsia", "middleEast"] as const).map((key, index) => (
            <li key={key}>
              <b>0{index + 1}</b>
              <h3>{t(`markets.${key}Name`)}</h3>
              <p>{t(`markets.${key}Body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="materials">
        <div className="cut-layout">
          <div className="section-head">
            <p className="eyebrow">{t("materials.eyebrow")}</p>
            <h2>{t("materials.title")}</h2>
            <p>{t("materials.intro")}</p>
          </div>
          <ol className="cut-index">
            {materialKeys.map((key, index) => (
              <li key={key}>
                <Link href={`/blades?kind=blade&material=${key}`}>
                  <span>0{index + 1}</span>
                  <span>
                    <strong>{t(`materials.${key}`)}</strong>
                    <small>{t(`materials.${key}Body`)}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-head">
          <p className="eyebrow">{t("process.eyebrow")}</p>
          <h2>{t("process.title")}</h2>
        </div>
        <div className="process-row">
          {processKeys.map((key) => (
            <Link key={key} href={`/blades?kind=blade&process=${key}`}>
              <h3>{t(`process.${key}`)}</h3>
              <p>{t(`process.${key}Body`)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">{t("companion.eyebrow")}</p>
          <h2>{t("companion.title")}</h2>
        </div>
        <div className="companion-row">
          <Link href="/blades?kind=cup">
            <h3>{t("companion.cup")}</h3>
            <p>{t("companion.cupBody")}</p>
          </Link>
          <Link href="/blades?kind=core">
            <h3>{t("companion.core")}</h3>
            <p>{t("companion.coreBody")}</p>
          </Link>
        </div>
      </section>

      <section className="section" id="factory">
        <div className="factory">
          <div>
            <p className="eyebrow">{t("factory.eyebrow")}</p>
            <h2>{t("factory.title")}</h2>
            <p>{t("factory.body")}</p>
            <div className="stats">
              {(["founded", "area", "capacity", "certs"] as const).map((key) => (
                <div key={key}>
                  <span>{t(`factory.${key}`)}</span>
                  <strong>{t(`factory.${key}Value`)}</strong>
                </div>
              ))}
            </div>
          </div>
          <img src="/assets/catalog/image-002.jpg" alt="" />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-head">
          <h2>{t("faq.title")}</h2>
        </div>
        <div className="faq">
          {([
            [t("faq.q1"), t("faq.a1")],
            [t("faq.q2"), t("faq.a2")],
            [t("faq.q3"), t("faq.a3")],
          ] as const).map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

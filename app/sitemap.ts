import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { products } from "@/lib/catalog";
import { languageAlternates, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/blades", "/inquiry", ...products.map((product) => `/blades/${product.id}`)];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

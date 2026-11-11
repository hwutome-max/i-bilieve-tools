import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const locales = ["en", "de", "it", "zh", "ar", "ru"] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      ...locales.map((lang) => ({
        source: "/index.html",
        has: [{ type: "query" as const, key: "lang", value: lang }],
        destination: `/${lang}`,
        permanent: false,
      })),
      { source: "/index.html", destination: "/en", permanent: false },
      { source: "/de.html", destination: "/de", permanent: true },
      { source: "/it.html", destination: "/it", permanent: true },
      { source: "/ar.html", destination: "/ar", permanent: true },
      { source: "/ru.html", destination: "/ru", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

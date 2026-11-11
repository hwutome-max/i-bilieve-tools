import { Amiri, Barlow, Barlow_Condensed, Fraunces, Golos_Text, IBM_Plex_Sans_Arabic, Noto_Sans_SC, Noto_Serif_SC, Source_Serif_4 } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-barlow",
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

export const notoSerifSc = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-sc",
});

export const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-sc",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
  variable: "--font-source-serif",
});

export const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-golos",
});

export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-amiri",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-plex-arabic",
});

const latin = `${fraunces.variable} ${barlow.variable} ${barlowCondensed.variable}`;

export function fontClass(locale: string) {
  if (locale === "zh") return `${notoSerifSc.variable} ${notoSansSc.variable} ${barlowCondensed.variable}`;
  if (locale === "ru") return `${sourceSerif.variable} ${golosText.variable} ${barlowCondensed.variable}`;
  if (locale === "ar") return `${amiri.variable} ${plexArabic.variable} ${barlowCondensed.variable}`;
  return latin;
}

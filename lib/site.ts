export const siteUrl = "https://korngportfolio.vercel.app";

/** Bump when page content changes materially; keeps sitemap.xml statically cacheable. */
export const contentUpdatedAt = "2026-10-09";

export const site = {
  url: siteUrl,
  name: "Sophy Mengkorng Portfolio",
  shortName: "KORNG",
  author: "Sophy MengKorng",
  jobTitle: "Frontend Developer",
  title: "Sophy Mengkorng | Creative Frontend Developer",
  description:
    "Explore the portfolio of Sophy MengKorng, a creative frontend developer and MIS student based in Phnom Penh, Cambodia. Discover my projects, skills, and experience.",
  locale: "en_US",
  city: "Phnom Penh",
  country: "Cambodia",
  socials: ["https://www.facebook.com/sophymengkorng168"],
  keywords: [
    "Sophy Mengkorng",
    "sophymengkorng",
    "Sophy mengkorng",
    "sophymengkorngportfolio",
    "sophymengkorng.com",
    "portfoliosophymengkorng",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

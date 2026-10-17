export const siteUrl = "https://korngportfolio.vercel.app";

/** Bump when page content changes materially; keeps sitemap.xml statically cacheable. */
export const contentUpdatedAt = "2026-10-17";

export const site = {
  url: siteUrl,
  name: "Sophy Mengkorng Portfolio",
  shortName: "KORNG",
  author: "Sophy MengKorng",
  jobTitle: "Frontend Developer and MIS Student",
  email: "sophymengkorng@gmail.com",
  title: "Sophy Mengkorng | Frontend Developer & MIS Student",
  description:
    "Explore the portfolio of Sophy MengKorng, A creative frontend developer and MIS student based in Phnom Penh, Cambodia. Discover my projects, Skills, And experience.",
  locale: "en_US",
  city: "Phnom Penh",
  country: "Cambodia",
  socials: [
    "https://github.com/sophymengkorng",
    "https://www.facebook.com/sophymengkorng168",
  ],
  keywords: [
    "Sophy Mengkorng",
    "sophymengkorng",
    "Sophy mengkorng",
    "sophymengkorngportfolio",
    "sophymengkorng.com",
    "portfoliosophymengkorng",
    "Frontend Developer Cambodia",
    "MIS Student Cambodia",
    "Next.js Developer Phnom Penh",
    "React Developer Cambodia",
    "Sophy Mengkorng projects",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

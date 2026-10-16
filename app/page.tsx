import PortfolioExperience from "@/components/PortfolioExperience";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile-page`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#person`,
          name: "Sophy Mengkorng",
          url: siteConfig.url,
          image: `${siteConfig.url}/profilev2.jpg`,
          jobTitle: "Frontend Developer",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Phnom Penh",
            addressCountry: "KH",
          },
          knowsAbout: ["Frontend Development", "Next.js", "React", "TypeScript", "Responsive UI", "UI Design"],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PortfolioExperience />
    </>
  );
}

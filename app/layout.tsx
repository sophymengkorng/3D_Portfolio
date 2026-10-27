import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins/latin.css";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: site.title,
    template: `%s | ${site.author}`,
  },

  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.author, url: siteUrl }],
  creator: site.author,
  publisher: site.author,
  category: "technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description:
      "Explore my frontend development projects, Technical skills, And creative web experiences.",
  },

  twitter: {
    card: "summary_large_image",
    title: site.title,
    description:
      "Explore the projects and skills of Sophy Mengkorng, A frontend developer based in Cambodia.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#09080c",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: site.author,
  url: siteUrl,
  image: `${siteUrl}/profile_v2.png`,
  jobTitle: site.jobTitle,
  email: site.email,
  description: site.description,
  sameAs: [...site.socials],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "KH",
  },
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "UI Design",
    "Responsive Web Design",
    "Angular",
    "Supabase",
    "REST API Integration",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SETEC Institute",
    url: "https://www.setecu.com/",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: site.name,
  url: siteUrl,
  inLanguage: "en",
  description: site.description,
  author: { "@id": `${siteUrl}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CursorEffect />
        {children}
        <script
          type="application/ld+json"
          // Static, build-time constants — no user input is interpolated here.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

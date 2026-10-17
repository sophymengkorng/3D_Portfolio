import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";
import { projects } from "@/lib/projects";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore frontend, Full-stack, And e-commerce projects created by Sophy Mengkorng.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    title: `Projects | ${site.author}`,
    description: "Real interfaces and systems built with Next.js, TypeScript, Angular, Supabase, JavaScript, And APIs.",
  },
};

export default function ProjectsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projects by ${site.author}`,
    url: absoluteUrl("/projects"),
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.shortTitle,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <ProjectsIndex />
    </>
  );
}

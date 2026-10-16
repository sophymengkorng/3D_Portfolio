import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { absoluteUrl, contentUpdatedAt } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = contentUpdatedAt;

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

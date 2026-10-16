import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09080c",
    theme_color: "#c000ff",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}

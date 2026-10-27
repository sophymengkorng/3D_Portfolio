import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/e-commerce-website",
        destination: "/projects/genz-pokemon-marketplace",
        permanent: true,
      },
      {
        source: "/projects/api-integration",
        destination: "/projects/student-classwork-automation",
        permanent: true,
      },
    ];
  },
  experimental: {
    agentUpgrade: "security",
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

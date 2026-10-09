export type Project = {
  number: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  technologies: string[];
  className: "commerce" | "portfolio" | "api";
  challenge: string;
  approach: string;
  outcome: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "e-commerce-website",
    type: "COMMERCE / FRONTEND",
    title: "E-commerce\nWebsite",
    description: "A responsive shopping experience built around clear product discovery, Intuitive browsing, And a frictionless interface.",
    technologies: ["Next.js", "Bootstrap", "Responsive UI"],
    className: "commerce",
    challenge: "Make a product-heavy shopping journey feel simple, Fast, And confident on every screen size.",
    approach: "The interface uses a clear visual hierarchy, Focused product cards, And a mobile-first layout that keeps the path from discovery to checkout easy to follow.",
    outcome: "A polished storefront concept with reusable components, Responsive behavior, And a focused purchase journey.",
    highlights: ["Mobile-first product discovery", "Reusable commerce components", "Clear calls to action"],
  },
  {
    number: "02",
    slug: "personal-portfolio",
    type: "IDENTITY / WEB",
    title: "Personal\nPortfolio",
    description: "A focused personal space for sharing development skills, Selected projects, And the thinking behind the work.",
    technologies: ["TypeScript", "CSS", "Motion"],
    className: "portfolio",
    challenge: "Create a memorable personal identity without letting expressive visuals distract from the work.",
    approach: "Bold typography, A focused purple palette, And restrained motion create a clear rhythm while keeping content accessible and responsive.",
    outcome: "A distinctive portfolio system that presents skills and projects with a consistent visual voice.",
    highlights: ["Expressive art direction", "Accessible motion", "Responsive content system"],
  },
  {
    number: "03",
    slug: "api-integration",
    type: "DATA / EXPERIENCE",
    title: "API\nIntegration",
    description: "A dynamic frontend that turns remote data into an organized, Useful, And easy-to-understand product experience.",
    technologies: ["REST API", "React", "Dynamic Data"],
    className: "api",
    challenge: "Turn changing remote data into an interface that stays understandable during loading, Success, And error states.",
    approach: "The experience separates data fetching from presentation, Provides clear feedback, And uses modular components for predictable rendering.",
    outcome: "A resilient frontend concept that makes dynamic information easy to scan and interact with.",
    highlights: ["Resilient UI states", "Modular data components", "Readable information hierarchy"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

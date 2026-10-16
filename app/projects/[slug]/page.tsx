import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const plainTitle = (title: string) => title.replace(/\n/g, " ");

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const title = plainTitle(project.title);
  const path = `/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    keywords: [...project.technologies, title, site.author, "case study"],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      siteName: site.name,
      locale: site.locale,
      title: `${title} — ${site.author}`,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.author}`,
      description: project.description,
    },
  };
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const title = plainTitle(project.title);
  const path = `/projects/${project.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      headline: title,
      description: project.description,
      url: absoluteUrl(path),
      inLanguage: "en",
      keywords: project.technologies.join(", "),
      author: { "@type": "Person", name: site.author, url: siteUrl },
      creator: { "@type": "Person", name: site.author, url: siteUrl },
      ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/#work") },
        { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <main className={`case-page case-page-${project.className}`}>
      <script
        type="application/ld+json"
        // Static project data from lib/projects.ts — no user input is interpolated here.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="case-header">
        <Link className="brand" href="/" aria-label="Back to portfolio">KORN<span>G</span></Link>
        <Link className="case-back" href="/#work">Back to work <span>↙</span></Link>
      </header>

      <section className="case-hero">
        <div className="case-hero-grid" aria-hidden="true" />
        <p className="eyebrow">{project.number} / Case study</p>
        <h1>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <div className="case-summary">
          <p>{project.description}</p>
          <div className="case-summary-actions">
            <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
            {project.liveUrl && <a className="case-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live website <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
        <span className="case-number" aria-hidden="true">{project.number}</span>
      </section>

      <section className="case-details">
        <article><p className="eyebrow">01 / Challenge</p><h2>THE PROBLEM</h2><p>{project.challenge}</p></article>
        <article><p className="eyebrow">02 / Approach</p><h2>THE DIRECTION</h2><p>{project.approach}</p></article>
        <article><p className="eyebrow">03 / Outcome</p><h2>THE RESULT</h2><p>{project.outcome}</p></article>
      </section>

      <section className="case-highlights">
        <p className="eyebrow">Project highlights</p>
        <div>{project.highlights.map((highlight, index) => <p key={highlight}><span>0{index + 1}</span>{highlight}</p>)}</div>
      </section>

      <nav className="case-next" aria-label="Project navigation">
        <p>Ready to explore more?</p>
        <Link href="/#work">View all projects <ArrowIcon /></Link>
      </nav>
    </main>
  );
}

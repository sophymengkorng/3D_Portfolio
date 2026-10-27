"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { projectCategories, projects } from "@/lib/projects";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>;
}

export default function ProjectsIndex() {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("All");
  const visibleProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="projects-page">
      <header className="case-header projects-header">
        <Link className="brand" href="/" aria-label="Back to portfolio">KORN<span>G</span></Link>
        <nav aria-label="Projects navigation"><Link href="/">Home</Link><Link href="/#about">About</Link><Link href="/#experience">Experience</Link><Link href="/#contact">Contact</Link><Link href="/#view-me">View Me</Link></nav>
        <Link className="nav-cta" href="/#contact">Let&apos;s talk <ArrowIcon /></Link>
      </header>

      <section className="projects-hero">
        <div className="case-hero-grid" aria-hidden="true" />
        <Link className="projects-back-home" href="/" aria-label="Return to the portfolio home page">
          <span aria-hidden="true">&#8592;</span> Back Home
        </Link>
        <p className="eyebrow">Selected development work</p>
        <h1>PROJECTS<span>WITH PURPOSE.</span></h1>
        <p>Real interfaces and systems built while learning, Solving practical problems, And refining my frontend development process.</p>
      </section>

      <section className="projects-library" aria-label="Project library">
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {projectCategories.map((category) => (
            <button
              type="button"
              className={activeCategory === category ? "is-active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <motion.article
              className="project-grid-card"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
              layout
              key={project.slug}
            >
              <Link className={`project-grid-image project-grid-image-${project.className}`} href={`/projects/${project.slug}`} aria-label={`Read the ${project.shortTitle} case study`}>
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 92vw, 46vw" />
                <span>{project.number}</span>
              </Link>
              <div className="project-grid-copy">
                <p className="eyebrow">{project.type}</p>
                <h2><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h2>
                <p>{project.description}</p>
                <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                <div className="project-grid-actions">
                  <Link href={`/projects/${project.slug}`}>View Details <ArrowIcon /></Link>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Project<span>↗</span></a>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Source Code <span>↗</span></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="projects-cta">
        <p className="eyebrow">Have a project or opportunity?</p>
        <h2>LET&apos;S BUILD SOMETHING USEFUL.</h2>
        <a href="mailto:sophymengkorng@gmail.com">Start a conversation <ArrowIcon /></a>
      </section>
    </main>
  );
}

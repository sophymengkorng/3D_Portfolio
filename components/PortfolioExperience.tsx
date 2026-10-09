"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: "01",
    type: "COMMERCE / FRONTEND",
    title: "E-commerce\nWebsite",
    description:
      "A responsive shopping experience built around clear product discovery, Intuitive browsing, And a frictionless interface.",
    technologies: ["Next.js", "Bootstrap", "Responsive UI"],
    className: "commerce",
  },
  {
    number: "02",
    type: "IDENTITY / WEB",
    title: "Personal\nPortfolio",
    description:
      "A focused personal space for sharing development skills, Selected projects, And the thinking behind the work.",
    technologies: ["TypeScript", "CSS", "Motion"],
    className: "portfolio",
  },
  {
    number: "03",
    type: "DATA / EXPERIENCE",
    title: "API\nIntegration",
    description:
      "A dynamic frontend that turns remote data into an organized, Useful, And easy-to-understand product experience.",
    technologies: ["REST API", "React", "Dynamic Data"],
    className: "api",
  },
];

const skills = ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "BOOTSTRAP", "GIT"];

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>;
}

function SparkIcon() {
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 1c0 12-7 19-19 19 12 0 19 7 19 19 0-12 7-19 19-19C27 20 20 13 20 1Z" /></svg>;
}

function ProjectArtwork({ variant }: { variant: string }) {
  if (variant === "commerce") {
    return (
      <div className="artwork commerce-art" aria-hidden="true">
        <div className="browser-bar"><i /><i /><i /></div>
        <div className="product-orbit orbit-one" /><div className="product-orbit orbit-two" />
        <div className="shoe-shape"><span /></div>
        <div className="art-copy"><small>NEW DROP</small><strong>01</strong></div>
      </div>
    );
  }
  if (variant === "portfolio") {
    return (
      <div className="artwork portfolio-art" aria-hidden="true">
        <div className="poster poster-back">CREATE</div>
        <div className="poster poster-front"><span>Korng</span><strong>PORTFOLIO</strong><small>DESIGN × CODE</small></div>
        <div className="cross-mark">+</div>
      </div>
    );
  }
  return (
    <div className="artwork api-art" aria-hidden="true">
      <div className="data-sphere" />
      <div className="data-card data-card-a"><span>API</span><strong>200</strong></div>
      <div className="data-card data-card-b"><span>DATA</span><b /><b /><b /></div>
      <div className="data-line line-a" /><div className="data-line line-b" />
    </div>
  );
}

export default function PortfolioExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(".scroll-progress", { scaleX: 0, transformOrigin: "left center" });
    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
    });

    if (reduceMotion) return;

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .from(".scene-rig", { scale: 0.65, rotationY: -35, opacity: 0, duration: 1.1 })
      .from(".hero-eyebrow, .hero-kicker", { y: 18, opacity: 0, stagger: 0.06, duration: 0.6 }, "-=0.8")
      .from(".hero h1", { y: 45, opacity: 0, duration: 0.8 }, "-=0.65")
      .from(".hero-bottom", { y: 18, opacity: 0, duration: 0.6 }, "-=0.35");

    gsap.to(".scene-rig", {
      rotationY: 80,
      rotationX: -10,
      z: -80,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
    });
    gsap.to(".scene-core", { rotationX: 360, rotationY: -360, duration: 32, repeat: -1, ease: "none" });
    gsap.to(".scene-ring-a", { rotationZ: 360, rotationY: 55, duration: 42, repeat: -1, ease: "none" });

    const sectionHeadings = gsap.utils.toArray<HTMLElement>(".section-heading");
    sectionHeadings.forEach((heading) => {
      gsap.fromTo(heading, { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    });

    gsap.fromTo(".portrait-stage", {
      rotationY: -16, rotationX: 7, y: 45, opacity: 0,
    }, {
      rotationY: 0, rotationX: 0, y: 0, opacity: 1,
      duration: 1.05, ease: "power3.out",
      scrollTrigger: { trigger: ".about-visual", start: "top 82%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".profile-image", { scale: 1.08, yPercent: 5 }, {
      scale: 1, yPercent: 0, duration: 1.15, ease: "power3.out",
      scrollTrigger: { trigger: ".about-visual", start: "top 82%", toggleActions: "play none none none" },
    });
    if (window.innerWidth > 767) {
      gsap.to(".portrait-float", {
        y: -10, rotationZ: 0.8, duration: 4.8,
        repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".portrait-halo", {
        scale: 1.07, rotationZ: -8, duration: 6.4,
        repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }
  }, { scope: root });

  return (
    <div className="site-shell" ref={root}>
      <div className="scroll-progress" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sophy Mengkorng home">KORN<span>G</span></a>
        <nav aria-label="Main navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Skills</a></nav>
        <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowIcon /></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="noise" />
          <div className="hero-3d" aria-hidden="true">
            <div className="scene-rig">
              <div className="scene-ring scene-ring-a" />
              <div className="scene-ring scene-ring-b" />
              <div className="scene-core">
                <span className="cube-face face-front">KORNG</span><span className="cube-face face-back">UI</span>
                <span className="cube-face face-right">01</span><span className="cube-face face-left">DEV</span>
                <span className="cube-face face-top">WEB</span><span className="cube-face face-bottom">2026</span>
              </div>
              <div className="scene-panel scene-panel-a"><small>BUILD / CREATE</small><strong>FRONTEND</strong><i /></div>
              <div className="scene-panel scene-panel-b"><span>03</span><b>IDEAS → INTERFACES</b></div>
              <div className="scene-particle particle-a" /><div className="scene-particle particle-b" /><div className="scene-particle particle-c" />
            </div>
          </div>
          <div className="hero-orb orb-left" /><div className="hero-orb orb-right" />
          <p className="eyebrow hero-eyebrow">Frontend developer · Phnom Penh</p>
          <div className="hero-heading" aria-label="Sophy Mengkorng, Creative Developer">
            <span className="hero-kicker">SOPHY MENGKORNG</span>
            <h1>CREATIVE<em>DEVELOPER</em></h1>
          </div>
          <div className="hero-bottom">
            <p>I turn ideas into thoughtful, Responsive interfaces—where clean code meets bold visual direction.</p>
            <a href="#work" className="round-link" aria-label="View selected work">
              <span className="round-link-index">03</span>
              <span className="round-link-label">VIEW<br />SELECTED<br />WORK</span>
              <span className="round-link-arrow"><ArrowIcon /></span>
              <span className="round-link-dot" />
            </a>
            <span className="availability"><i /> Available for opportunities</span>
          </div>
          <div className="vertical-note">PORTFOLIO · 2026</div><div className="hero-index">01 / 05</div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">
          {[0, 1].map((group) => <div className="marquee-group" key={group}><span>DESIGN</span><SparkIcon /><span>DEVELOP</span><SparkIcon /><span>CREATE</span><SparkIcon /><span>REPEAT</span><SparkIcon /></div>)}
        </div></div>

        <section className="about section-wrap" id="about">
          <div className="section-heading"><p className="eyebrow">01 / About me</p><h2>Building the web,<br /><span>One detail at a time.</span></h2></div>
          <div className="about-grid">
            <motion.div className="about-visual" {...reveal}>
              <div className="portrait-stage">
                <div className="portrait-tilt">
                  <div className="portrait-float">
                    <div className="portrait-shadow-card" />
                    <div className="portrait-frame">
                      <div className="portrait-halo" />
                      <Image
                        className="profile-image"
                        src="/profile.png"
                        alt="Portrait of Sophy Mengkorng"
                        fill
                        sizes="(max-width: 900px) 90vw, 38vw"
                      />
                      <div className="portrait-grid" />
                      <span className="portrait-label">MIS · STUDENT</span>
                      <span className="portrait-coordinate">11.5564° N</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-stamp" aria-hidden="true">
                <span className="stamp-icon">✦</span>
                <span className="stamp-copy">CREATIVE<br />BY NATURE</span>
              </div>
            </motion.div>
            <motion.div className="about-copy" {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
              <span className="big-number">02</span>
              <p className="lead-copy">I&apos;m a Management Information Systems student who enjoys the space where <strong>technology, Design, And people</strong> meet.</p>
              <p>My focus is frontend engineering and UI design—creating digital experiences that feel useful, Visually engaging, And considered at every screen size. I&apos;m always learning, Solving, And refining.</p>
              <div className="about-meta"><div><small>BASED IN</small><span>Phnom Penh, Cambodia</span></div><div><small>FOCUS</small><span>Frontend & UI Design</span></div></div>
            </motion.div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading work-heading"><p className="eyebrow">02 / Selected work</p><h2>Projects built with<br /><span>purpose & curiosity.</span></h2><p className="work-intro">A small selection of interfaces and experiments that shaped how I design and build.</p></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article className={`project-row ${index % 2 ? "project-reverse" : ""}`} key={project.number} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                <div className="project-art-wrap"><ProjectArtwork variant={project.className} /><span className="project-count">{project.number}</span></div>
                <div className="project-copy"><p className="eyebrow">{project.type}</p><h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><button type="button" className="case-link" aria-label={`${project.title.replace("\n", " ")} project details`}>Case study <ArrowIcon /></button></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="skills" id="skills"><div className="skills-inner section-wrap">
          <div className="section-heading"><p className="eyebrow">03 / Skills & tools</p><h2>The toolkit behind<br /><span>the interface.</span></h2></div>
          <motion.div className="skills-grid" {...reveal}>{skills.map((skill, index) => <div className="skill-cell" key={skill}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill}</strong><i>↗</i></div>)}</motion.div>
        </div></section>

        <section className="contact section-wrap" id="contact"><motion.div className="contact-card" {...reveal}>
          <div className="contact-topline"><p className="eyebrow">04 / Let&apos;s make something</p><span><i /> Available for opportunities</span></div>
          <div className="contact-star"><SparkIcon /></div>
          <h2>HAVE AN IDEA?<br /><span>LET&apos;S BUILD IT.</span></h2>
          <div className="contact-bottom"><p>I&apos;m open to internships, Collaborations, And meaningful frontend projects.</p><a className="contact-button" href="mailto:your-email@example.com">Start a conversation <ArrowIcon /></a></div>
          <div className="contact-orbit orbit-contact-one" /><div className="contact-orbit orbit-contact-two" />
        </motion.div></section>
      </main>

      <footer><a className="brand" href="#home" aria-label="Back to top">KORN<span>G</span></a><p>Designed & developed by Sophy Mengkorng</p><a className="footer-top" href="#home">Back to top <span>↑</span></a></footer>
    </div>
  );
}

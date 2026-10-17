"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ViewMeGallery from "@/components/ViewMeGallery";
import { projects, type Project } from "@/lib/projects";
import { achievements, careerInterests, contactLinks, coreStrengths, education, experience, languages, learningTopics, skillGroups } from "@/lib/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skills = skillGroups.flatMap((group) => group.items.map((skill) => ({ skill, group: group.label })));
const sectionIds = ["home", "about", "work", "skills", "experience", "contact", "view-me"];

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

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`artwork project-shot-art project-shot-${project.className}`}>
      <Image
        className="project-shot-image"
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 900px) 92vw, 58vw"
      />
      <div className="project-shot-chrome" aria-hidden="true"><i /><i /><i /><span>{project.category}</span></div>
      <div className="project-shot-overlay" aria-hidden="true"><small>LIVE PROJECT</small><strong>{project.number}</strong></div>
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

    const activateSection = (activeId: string) => {
      const activeIndex = sectionIds.indexOf(activeId);
      root.current?.querySelectorAll<HTMLElement>("[data-section-target]").forEach((item) => {
        const itemIndex = sectionIds.indexOf(item.dataset.sectionTarget ?? "");
        item.classList.toggle("is-active", itemIndex === activeIndex);
        item.classList.toggle("is-passed", itemIndex < activeIndex);
      });
    };

    sectionIds.forEach((id) => {
      const section = root.current?.querySelector<HTMLElement>(`#${id}`);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 48%",
        end: "bottom 48%",
        onEnter: () => activateSection(id),
        onEnterBack: () => activateSection(id),
      });
    });

    const anchorLinks = root.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? [];
    const removeUrlHash = () => {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    };
    const handleAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = root.current?.querySelector<HTMLElement>(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      removeUrlHash();
    };

    anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));

    if (window.location.hash) {
      window.requestAnimationFrame(removeUrlHash);
    }

    const removeAnchorListeners = () => {
      anchorLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
    };

    if (reduceMotion) return removeAnchorListeners;

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .from(".scene-rig", { scale: 0.65, rotationY: -35, opacity: 0, duration: 1.1 })
      .from(".hero-eyebrow, .hero-kicker", { y: 18, opacity: 0, stagger: 0.06, duration: 0.6 }, "-=0.8")
      .from(".hero h1", { y: 45, opacity: 0, duration: 0.8 }, "-=0.65")
      .from(".hero-bottom", { y: 18, opacity: 0, duration: 0.6 }, "-=0.35");

    const media = gsap.matchMedia();

    media.add("(min-width: 901px)", () => {
      gsap.to(".scene-rig", {
        rotationY: 68,
        rotationX: -8,
        z: -64,
        force3D: true,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.2 },
      });

      gsap.utils.toArray<HTMLElement>(".project-art-wrap").forEach((art, index) => {
        gsap.fromTo(art,
          { rotationX: 3, rotationY: index % 2 ? 5 : -5, y: 22 },
          {
            rotationX: -2,
            rotationY: index % 2 ? -3 : 3,
            y: -18,
            force3D: true,
            ease: "none",
            scrollTrigger: { trigger: art, start: "top bottom", end: "bottom top", scrub: 0.2 },
          },
        );

        const scanline = art.querySelector<HTMLElement>(".art-scanline");
        if (scanline) {
          const scanAnimation = gsap.fromTo(scanline,
            { y: -35, opacity: 0 },
            { y: () => art.offsetHeight + 35, opacity: 0.72, ease: "none", paused: true },
          );

          ScrollTrigger.create({
            trigger: art,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            animation: scanAnimation,
            scrub: 0.2,
            invalidateOnRefresh: true,
          });
        }
      });

      gsap.to(".scene-core-scroll", {
        rotationX: -70,
        rotationY: 210,
        force3D: true,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.2 },
      });

      const hero = root.current?.querySelector<HTMLElement>(".hero");
      const interaction = root.current?.querySelector<HTMLElement>(".scene-core-interaction");
      if (!hero || !interaction) return;

      const rotateX = gsap.quickTo(interaction, "rotationX", { duration: 0.55, ease: "power3.out" });
      const rotateY = gsap.quickTo(interaction, "rotationY", { duration: 0.55, ease: "power3.out" });

      const drag = {
        active: false,
        pointerId: -1,
        lastX: 0,
        lastY: 0,
        rotationX: 0,
        rotationY: 0,
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!drag.active || event.pointerId !== drag.pointerId) return;

        const deltaX = event.clientX - drag.lastX;
        const deltaY = event.clientY - drag.lastY;
        drag.lastX = event.clientX;
        drag.lastY = event.clientY;
        drag.rotationX = gsap.utils.clamp(-65, 65, drag.rotationX - deltaY * 0.38);
        drag.rotationY += deltaX * 0.48;
        rotateX(drag.rotationX);
        rotateY(drag.rotationY);
      };

      const handlePointerDown = (event: PointerEvent) => {
        if (event.button !== 0 || (event.target as HTMLElement).closest("a, button")) return;
        event.preventDefault();
        drag.active = true;
        drag.pointerId = event.pointerId;
        drag.lastX = event.clientX;
        drag.lastY = event.clientY;
        hero.classList.add("is-cube-dragging");
        hero.setPointerCapture(event.pointerId);
      };

      const handlePointerUp = (event: PointerEvent) => {
        if (!drag.active || event.pointerId !== drag.pointerId) return;
        drag.active = false;
        drag.pointerId = -1;
        hero.classList.remove("is-cube-dragging");
        if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
      };

      hero.addEventListener("pointerdown", handlePointerDown);
      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      hero.addEventListener("pointerup", handlePointerUp);
      hero.addEventListener("pointercancel", handlePointerUp);

      return () => {
        hero.removeEventListener("pointerdown", handlePointerDown);
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerup", handlePointerUp);
        hero.removeEventListener("pointercancel", handlePointerUp);
        hero.classList.remove("is-cube-dragging");
      };
    });

    media.add("(min-width: 901px) and (pointer: fine)", () => {
      const glow = root.current?.querySelector<HTMLElement>(".cursor-glow");
      const pointer = root.current?.querySelector<HTMLElement>(".cursor-pointer");
      const trail = root.current?.querySelector<HTMLCanvasElement>(".cursor-trail");
      const trailContext = trail?.getContext("2d");
      if (!glow || !pointer || !trail || !trailContext) return;

      const trailPoints: Array<{ x: number; y: number; life: number }> = [];
      let trailFrame = 0;
      let trailRatio = 1;

      const resizeTrail = () => {
        trailRatio = 1;
        trail.width = Math.round(window.innerWidth * trailRatio);
        trail.height = Math.round(window.innerHeight * trailRatio);
        trailContext.setTransform(trailRatio, 0, 0, trailRatio, 0, 0);
      };

      const drawTrail = () => {
        trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        trailPoints.forEach((point) => { point.life -= 0.12; });
        while (trailPoints.length && trailPoints[0].life <= 0) trailPoints.shift();

        if (trailPoints.length > 1) {
          const first = trailPoints[0];
          const last = trailPoints[trailPoints.length - 1];
          const gradient = trailContext.createLinearGradient(first.x, first.y, last.x, last.y);
          gradient.addColorStop(0, "rgba(192,0,255,0)");
          gradient.addColorStop(0.55, "rgba(220,67,255,.6)");
          gradient.addColorStop(1, "rgba(255,250,255,.95)");

          trailContext.beginPath();
          trailContext.moveTo(first.x, first.y);
          for (let index = 1; index < trailPoints.length - 1; index += 1) {
            const point = trailPoints[index];
            const next = trailPoints[index + 1];
            trailContext.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
          }
          trailContext.lineTo(last.x, last.y);
          trailContext.lineCap = "round";
          trailContext.lineJoin = "round";
          trailContext.strokeStyle = gradient;
          trailContext.lineWidth = 2;
          trailContext.stroke();

          trailContext.strokeStyle = "rgba(255,250,255,.5)";
          trailContext.lineWidth = 0.8;
          trailContext.stroke();
        }

        if (trailPoints.length) {
          trailFrame = window.requestAnimationFrame(drawTrail);
        } else {
          trailFrame = 0;
        }
      };

      const addTrailPoint = (x: number, y: number) => {
        const previous = trailPoints[trailPoints.length - 1];
        if (previous && Math.hypot(x - previous.x, y - previous.y) < 7) return;
        trailPoints.push({ x, y, life: 1 });
        if (trailPoints.length > 12) trailPoints.shift();
        if (!trailFrame) trailFrame = window.requestAnimationFrame(drawTrail);
      };

      const clearTrail = () => {
        trailPoints.length = 0;
        if (trailFrame) window.cancelAnimationFrame(trailFrame);
        trailFrame = 0;
        trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
      };

      resizeTrail();

      gsap.set([glow, pointer], { xPercent: -50, yPercent: -50 });
      const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.22, ease: "power2.out" });
      const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.22, ease: "power2.out" });
      const movePointerX = gsap.quickTo(pointer, "x", { duration: 0.055, ease: "power2.out" });
      const movePointerY = gsap.quickTo(pointer, "y", { duration: 0.055, ease: "power2.out" });
      const showGlow = gsap.quickSetter(glow, "opacity");
      const showPointer = gsap.quickSetter(pointer, "opacity");
      let pointerVisible = false;
      let lastPointerX = 0;
      let lastPointerY = 0;
      let lastScrollY = window.scrollY;
      let scrollEndTimer = 0;
      let pointerMoveFrame = 0;
      let scrollFrame = 0;

      const updateInteractiveState = () => {
        const elementBelowPointer = document.elementFromPoint(lastPointerX, lastPointerY);
        const isInteractive = Boolean(elementBelowPointer?.closest("a, button, .skill-cell, .project-art-wrap"));
        pointer.classList.toggle("is-interactive", isInteractive);
      };

      const handleWindowPointerMove = (event: PointerEvent) => {
        pointerVisible = true;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        if (pointerMoveFrame) return;

        pointerMoveFrame = window.requestAnimationFrame(() => {
          pointerMoveFrame = 0;
          moveGlowX(lastPointerX);
          moveGlowY(lastPointerY);
          movePointerX(lastPointerX);
          movePointerY(lastPointerY);
          addTrailPoint(lastPointerX, lastPointerY);
          pointer.classList.remove("is-scrolling", "scroll-up", "scroll-down");
          showGlow(0.48);
          showPointer(1);
        });
      };
      const hideCustomPointer = () => {
        pointerVisible = false;
        window.clearTimeout(scrollEndTimer);
        showGlow(0);
        showPointer(0);
        pointer.classList.remove("is-interactive", "is-pressed", "is-scrolling", "scroll-up", "scroll-down");
        clearTrail();
      };
      const handleWindowScroll = () => {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
          scrollFrame = 0;
        clearTrail();
        if (!pointerVisible) return;

        const isScrollingDown = window.scrollY >= lastScrollY;
        lastScrollY = window.scrollY;
        pointer.classList.add("is-scrolling");
        pointer.classList.toggle("scroll-down", isScrollingDown);
        pointer.classList.toggle("scroll-up", !isScrollingDown);
        showGlow(0.28);
        showPointer(1);

        window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
          pointer.classList.remove("is-scrolling", "scroll-up", "scroll-down");
          updateInteractiveState();
          if (pointerVisible) showGlow(0.48);
        }, 80);
        });
      };
      const handlePointerDown = () => pointer.classList.add("is-pressed");
      const handlePointerUp = () => pointer.classList.remove("is-pressed");

      window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
      window.addEventListener("scroll", handleWindowScroll, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      window.addEventListener("resize", resizeTrail, { passive: true });
      document.documentElement.addEventListener("mouseleave", hideCustomPointer);

      const hoverCleanups = gsap.utils.toArray<HTMLElement>("a, button, .skill-cell, .project-art-wrap").map((target) => {
        const playHoverPulse = () => pointer.classList.add("is-interactive");
        const resetHoverPulse = () => pointer.classList.remove("is-interactive", "is-pressed");

        target.addEventListener("pointerenter", playHoverPulse);
        target.addEventListener("pointerleave", resetHoverPulse);

        return () => {
          target.removeEventListener("pointerenter", playHoverPulse);
          target.removeEventListener("pointerleave", resetHoverPulse);
        };
      });

      const artworkCleanups = gsap.utils.toArray<HTMLElement>(".project-art-wrap").map((card) => {
        const artwork = card.querySelector<HTMLElement>(".artwork");
        if (!artwork) return () => undefined;

        const tiltX = gsap.quickTo(artwork, "rotationX", { duration: 0.55, ease: "power3.out" });
        const tiltY = gsap.quickTo(artwork, "rotationY", { duration: 0.55, ease: "power3.out" });

        const handleCardPointerMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          tiltX(y * -7);
          tiltY(x * 7);
        };
        const resetCardTilt = () => {
          tiltX(0);
          tiltY(0);
        };

        card.addEventListener("pointermove", handleCardPointerMove, { passive: true });
        card.addEventListener("pointerleave", resetCardTilt);

        return () => {
          card.removeEventListener("pointermove", handleCardPointerMove);
          card.removeEventListener("pointerleave", resetCardTilt);
        };
      });

      return () => {
        window.removeEventListener("pointermove", handleWindowPointerMove);
        window.removeEventListener("scroll", handleWindowScroll);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("resize", resizeTrail);
        document.documentElement.removeEventListener("mouseleave", hideCustomPointer);
        window.clearTimeout(scrollEndTimer);
        if (pointerMoveFrame) window.cancelAnimationFrame(pointerMoveFrame);
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        clearTrail();
        hoverCleanups.forEach((cleanup) => cleanup());
        artworkCleanups.forEach((cleanup) => cleanup());
      };
    });

    const coreSpin = gsap.to(".scene-core", { rotationX: 360, rotationY: -360, duration: 38, repeat: -1, ease: "none", force3D: true });
    const ringSpin = gsap.to(".scene-ring-a", { rotationZ: 360, rotationY: 55, duration: 48, repeat: -1, ease: "none", force3D: true });
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (self.isActive) {
          coreSpin.play();
          ringSpin.play();
        } else {
          coreSpin.pause();
          ringSpin.pause();
        }
      },
    });

    const sectionHeadings = gsap.utils.toArray<HTMLElement>(".section-heading");
    sectionHeadings.forEach((heading) => {
      const eyebrow = heading.querySelector(".eyebrow");
      const title = heading.querySelector("h2");
      const introCopy = heading.querySelector(".work-intro");
      const headingTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      if (eyebrow) headingTimeline.fromTo(eyebrow, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 });
      if (title) headingTimeline.fromTo(title,
        { y: 58, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9 },
        "-=0.22",
      );
      if (introCopy) headingTimeline.fromTo(introCopy,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        "-=0.38",
      );

      ScrollTrigger.create({
        trigger: heading,
        start: "top 86%",
        animation: headingTimeline,
        toggleActions: "play none none none",
        preventOverlaps: "section-headings",
        fastScrollEnd: true,
      });
    });

    const aboutCopy = root.current?.querySelector<HTMLElement>(".about-copy");
    if (aboutCopy) {
      gsap.timeline({
        scrollTrigger: { trigger: aboutCopy, start: "top 82%", toggleActions: "play none none none" },
        defaults: { ease: "power3.out" },
      })
        .fromTo(aboutCopy.querySelectorAll(":scope > .big-number, :scope > p"),
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1 },
        )
        .fromTo(aboutCopy.querySelectorAll(".about-meta > div"),
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          "-=0.32",
        );
    }

    gsap.utils.toArray<HTMLElement>(".project-row").forEach((project) => {
      const artwork = project.querySelector(".project-art-wrap");
      const copy = project.querySelectorAll(".project-copy > *");
      const direction = project.classList.contains("project-reverse") ? -1 : 1;

      gsap.timeline({
        scrollTrigger: { trigger: project, start: "top 80%", toggleActions: "play none none none" },
        defaults: { ease: "power3.out" },
      })
        .fromTo(artwork,
          { x: 34 * direction, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.9 },
        )
        .fromTo(copy,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.68, stagger: 0.08 },
          "-=0.58",
        );
    });

    const skillsTimeline = gsap.timeline({ paused: true });
    skillsTimeline.fromTo(".skill-cell",
      { y: 28, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.62,
        stagger: 0.07,
        ease: "power3.out",
        overwrite: true,
      },
    );
    ScrollTrigger.create({
      trigger: ".skills-grid",
      start: "top 88%",
      animation: skillsTimeline,
      toggleActions: "play none none none",
    });

    const contactCard = root.current?.querySelector<HTMLElement>(".contact-card");
    if (contactCard) {
      gsap.timeline({
        scrollTrigger: { trigger: contactCard, start: "top 80%", toggleActions: "play none none none" },
        defaults: { ease: "power3.out" },
      })
        .fromTo(contactCard, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(contactCard.querySelectorAll(".contact-topline, .contact-star, h2, .contact-bottom"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.09 },
          "-=0.55",
        );

      gsap.to(contactCard.querySelectorAll(".contact-orbit"), {
        scale: 1.12,
        xPercent: -4,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: contactCard, start: "top bottom", end: "bottom top", scrub: 0.25 },
      });
      gsap.to(contactCard.querySelector(".contact-star"), {
        rotation: 135,
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: contactCard, start: "top bottom", end: "bottom top", scrub: 0.25 },
      });
    }

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

    return () => {
      removeAnchorListeners();
      media.revert();
    };
  }, { scope: root });

  return (
    <div className="site-shell" ref={root}>
      <div className="scroll-progress" />
      <div className="cursor-glow" aria-hidden="true" />
      <canvas className="cursor-trail" aria-hidden="true" />
      <div className="cursor-pointer" aria-hidden="true"><span /><i /></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sophy Mengkorng home" data-section-target="home">KORN<span>G</span></a>
        <nav aria-label="Main navigation"><a href="#home" data-section-target="home">Home</a><a href="#about" data-section-target="about">About</a><Link href="/projects">Projects</Link><a href="#experience" data-section-target="experience">Experience</a><a href="#view-me" data-section-target="view-me">View Me</a></nav>
        <a className="nav-cta" href="#contact" data-section-target="contact">Let&apos;s talk <ArrowIcon /></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="noise" />
          <div className="hero-3d" aria-hidden="true">
            <div className="scene-rig">
              <div className="scene-ring scene-ring-a" />
              <div className="scene-ring scene-ring-b" />
              <div className="scene-core-scroll">
                <div className="scene-core-interaction">
                  <div className="scene-core">
                    <span className="cube-face face-front">KORNG</span><span className="cube-face face-back">UI</span>
                    <span className="cube-face face-right">01</span><span className="cube-face face-left">DEV</span>
                    <span className="cube-face face-top">WEB</span><span className="cube-face face-bottom">2026</span>
                  </div>
                </div>
              </div>
              <div className="scene-panel scene-panel-a"><small>BUILD / CREATE</small><strong>FRONTEND</strong><i /></div>
              <div className="scene-panel scene-panel-b"><span>03</span><b>IDEAS → INTERFACES</b></div>
              <div className="scene-particle particle-a" /><div className="scene-particle particle-b" /><div className="scene-particle particle-c" />
            </div>
          </div>
          <div className="hero-orb orb-left" /><div className="hero-orb orb-right" />
          <p className="eyebrow hero-eyebrow">Frontend developer · MIS student · Phnom Penh</p>
          <div className="hero-heading" aria-label="Sophy Mengkorng, Junior Developer">
            <span className="hero-kicker">SOPHY MENGKORNG</span>
            <h1>Junior<em>DEVELOPER</em></h1>
          </div>
          <div className="hero-bottom">
            <div className="hero-intro">
              <p>I build thoughtful, Responsive web experiences while studying Management Information Systems at SETEC Institute.</p>
              <div className="hero-actions">
                <a href="#work">View projects</a>
                <a href="#contact">Contact me</a>
              </div>
            </div>
            <a href="#work" className="round-link" aria-label="View selected work">
              <span className="round-link-index">02</span>
              <span className="round-link-label">VIEW<br />SELECTED<br />WORK</span>
              <span className="round-link-arrow"><ArrowIcon /></span>
              <span className="round-link-dot" />
            </a>
            <span className="availability"><i /> Available for opportunities</span>
          </div>
          <div className="vertical-note">PORTFOLIO · 2026</div><div className="hero-index">01 / 08</div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">
          {[0, 1, 2, 3].map((group) => <div className="marquee-group" key={group}><span>DESIGN</span><SparkIcon /><span>DEVELOP</span><SparkIcon /><span>CREATE</span><SparkIcon /><span>REPEAT</span><SparkIcon /></div>)}
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
                        src="/profile_v2.png"
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
            <div className="about-copy">
              <span className="big-number">02</span>
              <p className="lead-copy">I&apos;m a Management Information Systems student at <strong>SETEC Institute</strong> who enjoys turning ideas into useful digital products.</p>
              <p>My focus is frontend engineering and interface design. I&apos;m currently developing my knowledge through advanced web development, C# programming, Networking, Database server applications, And multimedia design while continuing to build with Next.js, Angular, Supabase, And APIs. My goal is to become a capable software and information-systems professional who creates practical real-world solutions.</p>
              <div className="about-meta"><div><small>BASED IN</small><span>Russey Keo, Phnom Penh</span></div><div><small>OPEN TO</small><span>Internships & collaborations</span></div></div>
            </div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading work-heading"><p className="eyebrow">02 / Selected work</p><h2>Projects built with<br /><span>purpose & curiosity.</span></h2><p className="work-intro">A small selection of interfaces and experiments that shaped how I design and build.</p></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-row project-${project.className} ${index % 2 ? "project-reverse" : ""}`} key={project.number}>
                <div className="project-art-wrap"><ProjectArtwork project={project} /><span className="art-scanline" aria-hidden="true" /><span className="project-count">{project.number}</span></div>
                <div className="project-copy"><p className="eyebrow">{project.type}</p><h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{project.description}</p><p className="project-role"><strong>ROLE</strong> {project.role}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><Link href={`/projects/${project.slug}`} className="case-link" aria-label={`View ${project.shortTitle} case study`}>Case study <ArrowIcon /></Link><a href={project.liveUrl} className="case-link case-link-live" target="_blank" rel="noopener noreferrer">Live Demo <span aria-hidden="true">↗</span></a><a href={project.sourceUrl} className="case-link case-link-live" target="_blank" rel="noopener noreferrer">Source Code <span aria-hidden="true">↗</span></a></div></div>
              </article>
            ))}
          </div>
          <div className="all-projects-link"><Link href="/projects">Explore all projects <ArrowIcon /></Link></div>
        </section>

        <section className="skills" id="skills"><div className="skills-inner section-wrap">
          <div className="section-heading"><p className="eyebrow">03 / Skills & tools</p><h2>The toolkit behind<br /><span>the interface.</span></h2></div>
          <div className="skills-grid">{skills.map(({ skill, group }, index) => <div className="skill-cell" key={skill}><span>{String(index + 1).padStart(2, "0")} / {group}</span><strong>{skill}</strong><i>↗</i></div>)}</div>
        </div></section>

        <section className="growth section-wrap" aria-labelledby="growth-title">
          <div className="section-heading"><p className="eyebrow">04 / Growth & direction</p><h2 id="growth-title">Learning with<br /><span>clear direction.</span></h2></div>
          <div className="growth-grid">
            <motion.article className="growth-card learning-card" {...reveal}>
              <div className="growth-card-heading"><span>01</span><p>CURRENTLY LEARNING</p></div>
              <h3>Building stronger technical foundations.</h3>
              <div className="learning-cloud">{learningTopics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            </motion.article>

            <motion.article className="growth-card language-card" {...reveal}>
              <div className="growth-card-heading"><span>02</span><p>LANGUAGES</p></div>
              <div className="language-list">{languages.map((language) => (
                <div className="language-item" key={language.name}>
                  <div><strong>{language.name}</strong><span>{language.level}</span></div>
                  <div className="language-track"><i style={{ width: `${language.progress}%` }} /></div>
                </div>
              ))}</div>
            </motion.article>

            <motion.article className="growth-card career-card" {...reveal}>
              <div className="growth-card-heading"><span>03</span><p>CAREER GOAL</p></div>
              <blockquote>To become a skilled software and information-systems professional who designs reliable technology solutions with meaningful real-world impact.</blockquote>
              <div className="career-interests">{careerInterests.map((interest) => <span key={interest}>{interest}</span>)}</div>
            </motion.article>

            <motion.article className="growth-card strengths-card" {...reveal}>
              <div className="growth-card-heading"><span>04</span><p>CORE STRENGTHS</p></div>
              <ul>{coreStrengths.map((strength) => <li key={strength}>{strength}<i>↗</i></li>)}</ul>
            </motion.article>
          </div>
        </section>

        <section className="journey section-wrap" id="experience">
          <div className="section-heading"><p className="eyebrow">05 / Experience & education</p><h2>Learning through<br /><span>work & study.</span></h2></div>
          <div className="journey-grid">
            <div className="journey-column">
              <p className="journey-label">EXPERIENCE</p>
              {experience.map((item) => <motion.article className="timeline-card" key={item.title} {...reveal}><span>{item.period}</span><h3>{item.title}</h3><h4>{item.organization}</h4><p>{item.description}</p><div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}
            </div>
            <div className="journey-column">
              <p className="journey-label">EDUCATION</p>
              {education.map((item) => (
                <motion.article className="timeline-card" key={item.title} {...reveal}>
                  <span>{item.period}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.organization}</h4>
                  {"level" in item && <p className="timeline-level">{item.level}</p>}
                  <p>{item.description}</p>
                  {"courses" in item && (
                    <div className="course-list">
                      <small>CURRENT COURSEWORK</small>
                      <div>{item.courses.map((course) => <span key={course}>{course}</span>)}</div>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="achievements section-wrap" aria-labelledby="achievements-title">
          <div className="section-heading"><p className="eyebrow">06 / Certifications & achievements</p><h2 id="achievements-title">Progress worth<br /><span>building on.</span></h2></div>
          <div className="achievement-grid">{achievements.map((item) => <motion.article className="achievement-card" key={item.number} {...reveal}><span>{item.number}</span><h3>{item.title}</h3><p>{item.detail}</p></motion.article>)}</div>
          <p className="achievement-note">Certificate verification links can be added when digital certificate URLs are available.</p>
        </section>

        <section className="contact section-wrap" id="contact"><div className="contact-card">
          <div className="contact-topline"><p className="eyebrow">07 / Let&apos;s make something</p><span><i /> Available for opportunities</span></div>
          <div className="contact-star"><SparkIcon /></div>
          <h2>HAVE AN IDEA?<br /><span>LET&apos;S BUILD IT.</span></h2>
          <div className="contact-bottom"><div><p>I&apos;m open to internships, Collaborations, And meaningful frontend projects. If you have an opportunity or idea, I&apos;d be happy to hear from you.</p><div className="contact-links">{contactLinks.map((link) => <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}><small>{link.label}</small><span>{link.value}</span></a>)}</div></div><a className="contact-button" href="mailto:sophymengkorng@gmail.com">Contact me <ArrowIcon /></a></div>
          <div className="contact-orbit orbit-contact-one" /><div className="contact-orbit orbit-contact-two" />
        </div></section>

        <section className="view-me section-wrap" id="view-me">
          <div className="view-me-heading">
            <div className="section-heading"><p className="eyebrow">08 / View me</p><h2>Moments beyond<br /><span>the screen.</span></h2></div>
            <div className="view-me-intro"><span>09 / FRAMES</span><p>A visual journal of campus life, Heritage, And the moments that shape who I am beyond development.</p><small>SELECT A FRAME TO EXPLORE</small></div>
          </div>
          <ViewMeGallery />
        </section>
      </main>

      <footer><a className="brand" href="#home" aria-label="Back to top">KORN<span>G</span></a><p>Designed & developed by Sophy Mengkorng</p><a className="footer-top" href="#home">Back to top <span>↑</span></a></footer>
    </div>
  );
}

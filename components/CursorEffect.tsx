"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const INTERACTIVE_SELECTOR = "a, button, .skill-cell, .project-art-wrap, .project-grid-card";

/**
 * Neon pointer, glow and trail. Mounted once in the root layout so every route
 * (home, projects index, case studies) shares the same cursor treatment.
 */
export default function CursorEffect() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const glow = root.current?.querySelector<HTMLElement>(".cursor-glow");
      const pointer = root.current?.querySelector<HTMLElement>(".cursor-pointer");
      const trail = root.current?.querySelector<HTMLCanvasElement>(".cursor-trail");
      const trailContext = trail?.getContext("2d");
      if (!glow || !pointer || !trail || !trailContext) return;

      const trailPoints: Array<{ x: number; y: number; life: number }> = [];
      let trailFrame = 0;

      const resizeTrail = () => {
        trail.width = Math.round(window.innerWidth);
        trail.height = Math.round(window.innerHeight);
        trailContext.setTransform(1, 0, 0, 1, 0, 0);
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

      // Hit-tested per frame instead of per-element listeners so filtered or
      // route-swapped content stays interactive without re-binding.
      const updateInteractiveState = () => {
        const elementBelowPointer = document.elementFromPoint(lastPointerX, lastPointerY);
        const isInteractive = Boolean(elementBelowPointer?.closest(INTERACTIVE_SELECTOR));
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
          updateInteractiveState();
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
      };
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <div ref={root} className="cursor-layer" aria-hidden="true">
      <div className="cursor-glow" />
      <canvas className="cursor-trail" />
      <div className="cursor-pointer"><span /><i /></div>
    </div>
  );
}

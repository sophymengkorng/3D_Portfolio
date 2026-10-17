"use client";

import { useEffect, useState, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const photos = [
  { src: "/view-me/photo-01.jpg", title: "Campus Days", meta: "SETEC Institute", alt: "Sophy Mengkorng standing outside SETEC Institute" },
  { src: "/view-me/photo-02.jpg", title: "Heritage", meta: "Angkor Wat", alt: "Sophy Mengkorng sitting near Angkor Wat" },
  { src: "/view-me/photo-03.jpg", title: "A Quiet Walk", meta: "Angkor Wat", alt: "Sophy Mengkorng walking along the Angkor Wat causeway" },
  { src: "/view-me/photo-04.jpg", title: "Among History", meta: "Angkor Wat", alt: "Sophy Mengkorng standing among historic Angkor stone structures" },
  { src: "/view-me/photo-05.jpg", title: "Still Frame", meta: "Portrait Study", alt: "Portrait of Sophy Mengkorng seated against a brick wall" },
  { src: "/view-me/photo-06.jpg", title: "Perspective", meta: "Portrait Study", alt: "Sophy Mengkorng standing in front of a brick wall" },
  { src: "/view-me/photo-07.jpg", title: "Open Sky", meta: "Outdoor Portrait", alt: "Low-angle outdoor portrait of Sophy Mengkorng" },
  { src: "/view-me/photo-08.jpg", title: "Looking Forward", meta: "Campus Portrait", alt: "Sophy Mengkorng looking ahead outside a campus building" },
  { src: "/view-me/photo-09.jpg", title: "Next Direction", meta: "Campus Portrait", alt: "Sophy Mengkorng pointing toward the sky outside a campus building" },
] as const;

export default function ViewMeGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrevious = () => setActiveIndex((current) => current === null ? 0 : (current + photos.length - 1) % photos.length);
  const showNext = () => setActiveIndex((current) => current === null ? 0 : (current + 1) % photos.length);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? 0 : (current + photos.length - 1) % photos.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? 0 : (current + 1) % photos.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--gallery-rx", `${y * -7}deg`);
    event.currentTarget.style.setProperty("--gallery-ry", `${x * 7}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--gallery-rx", "0deg");
    event.currentTarget.style.setProperty("--gallery-ry", "0deg");
  };

  return (
    <>
      <div className="view-gallery">
        {photos.map((photo, index) => (
          <motion.button
            className="view-card"
            type="button"
            style={{ position: "relative" }}
            key={photo.src}
            onClick={() => setActiveIndex(index)}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            initial={{ opacity: 0, clipPath: "inset(12% 0 12% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Open ${photo.title}`}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 40vw" />
            <span className="view-card-shade" />
            <span className="view-card-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="view-card-copy"><small>{photo.meta}</small><strong>{photo.title}</strong></span>
            <span className="view-card-open" aria-hidden="true">&#8599;</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="view-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${photos[activeIndex].title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) setActiveIndex(null);
            }}
          >
            <button className="view-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo viewer">CLOSE <span>&#215;</span></button>
            <button className="view-lightbox-nav view-lightbox-prev" type="button" onClick={showPrevious} aria-label="View previous photo">&#8592;</button>
            <motion.figure
              key={photos[activeIndex].src}
              initial={{ opacity: 0, scale: 0.94, rotateY: -7 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="view-lightbox-image">
                <Image src={photos[activeIndex].src} alt={photos[activeIndex].alt} fill sizes="92vw" priority />
              </div>
              <figcaption>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
                <div><small>{photos[activeIndex].meta}</small><strong>{photos[activeIndex].title}</strong></div>
              </figcaption>
            </motion.figure>
            <button className="view-lightbox-nav view-lightbox-next" type="button" onClick={showNext} aria-label="View next photo">&#8594;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

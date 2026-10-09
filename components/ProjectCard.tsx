
"use client";

import { motion } from "motion/react";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
}: ProjectCardProps) {
  return (
    <motion.div
      className="card project-card border-0 shadow-sm h-100"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
    >
      <div className="card-body p-4">
        <span className="badge text-bg-light mb-3">Featured Project</span>
        <h3 className="h5 fw-bold">{title}</h3>
        <p className="text-secondary">{description}</p>
        <p className="accent-text small mb-0">{tech}</p>
      </div>
    </motion.div>
  );
}
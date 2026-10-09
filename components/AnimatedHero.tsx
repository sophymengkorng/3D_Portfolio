
"use client";

import { motion } from "motion/react";

export default function AnimatedHero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <motion.div
            className="col-lg-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-uppercase fw-semibold accent-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, welcome to my portfolio
            </motion.p>

            <h1 className="display-2 fw-bold">
              I&apos;m a{" "}
              <span className="accent-text">Frontend Developer.</span>
            </h1>

            <p className="lead text-secondary mt-4">
              I design and build modern, responsive digital experiences.
            </p>

            <motion.a
              href="#projects"
              className="btn btn-dark btn-lg mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore My Work →
            </motion.a>
          </motion.div>

          <motion.div
            className="col-lg-5 text-center"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.div
              className="profile-circle"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              KORNG
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

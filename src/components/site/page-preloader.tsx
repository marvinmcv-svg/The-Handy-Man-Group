"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium page preloader — shows once per session on first page load.
 * - Full-screen charcoal overlay
 * - Hammer logo draws in, then company name reveals word by word
 * - Progress bar at bottom
 * - Slides up to reveal the site after ~1.9s
 * - Uses sessionStorage to skip on subsequent navigations
 */
const STORAGE_KEY = "hg_preloader_seen";
const DURATION = 1900; // ms before exit begins

export function PagePreloader() {
  // Default visible=true so the SSR HTML includes the preloader overlay on the
  // very first paint (no flash of unstyled content for first-time visitors).
  // Returning visitors get dismissed on the next animation frame after mount,
  // once sessionStorage has been consulted.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let shouldSkip = false;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) {
        shouldSkip = true;
      } else {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // sessionStorage may be unavailable (private mode) — show the intro.
    }

    if (shouldSkip) {
      // Returning visitor — dismiss immediately, deferred to satisfy the
      // react-hooks/set-state-in-effect rule.
      const raf = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(raf);
    }

    // First-time visitor — dismiss after the full intro duration.
    const timer = window.setTimeout(() => setVisible(false), DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  // Lock body scroll while the preloader is visible.
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  const words = "Handyman & Carpentry Group".split(" ");

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#121117]"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle radial accent for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(210,21,30,0.08), transparent 60%)",
            }}
          />

          {/* HCG logo — draws in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img src="/ai-media/logo-hcg.png" alt="The Handyman & Carpentry Group" className="h-16 w-16 object-contain" />
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 blur-2xl"
              style={{ background: "rgba(210,21,30,0.45)" }}
            />
          </motion.div>

          {/* Word-by-word reveal */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-[0.35em] px-6 text-center">
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.45 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[16px] font-semibold uppercase tracking-[0.25em] text-white/85 sm:text-[20px]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/35"
          >
            Brisbane · Australia
          </motion.p>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-[#D2151E]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

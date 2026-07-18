"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium custom cursor — small dot + laggy ring with mix-blend-difference.
 * Hidden on touch / coarse-pointer devices.
 * Ring expands and shows label text on hover over interactive elements
 * (a, button, [data-cursor]).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  // Dot — fast, follows mouse precisely.
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  // Ring — laggy spring for a satisfying trailing effect.
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.55 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch / coarse pointer — bail entirely on those devices.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduce) return;

    // Defer state activation to next animation frame so we don't trigger
    // a synchronous re-render inside the effect body (also avoids blocking
    // the initial paint of the page).
    const raf = requestAnimationFrame(() => {
      setEnabled(true);
      setHidden(false);
    });

    function onMove(e: MouseEvent) {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button']"
      ) as HTMLElement | null;

      if (interactive) {
        setHovering(true);
        const lbl = interactive.getAttribute("data-cursor") || "";
        setLabel(lbl);
      } else {
        setHovering(false);
        setLabel("");
      }
    }
    function onLeave() {
      setHidden(true);
    }
    function onEnter() {
      setHidden(false);
    }
    function onDown() {
      setPressed(true);
    }
    function onUp() {
      setPressed(false);
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  const ringSize = hovering ? (label ? 80 : 64) : 32;

  return (
    <>
      {/* Dot — fast, follows precisely */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY, mixBlendMode: "difference" }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 0 : pressed ? 12 : 8,
            height: hovering ? 0 : pressed ? 12 : 8,
            opacity: hovering ? 0 : 1,
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>

      {/* Ring — laggy trailing element */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY, mixBlendMode: "difference" }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white"
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <AnimatePresence mode="wait">
            {label ? (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="select-none px-2 text-center text-[9px] font-semibold uppercase leading-tight tracking-wider text-white"
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

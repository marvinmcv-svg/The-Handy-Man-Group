"use client";

/**
 * gsap-utils.tsx
 * ----------------
 * Reusable React hooks that wrap GSAP for the common animation patterns used
 * across The Handyman & Carpentry Group site.
 *
 * Conventions:
 *  - All hooks use `gsap.context()` for cleanup (safe under React 19 strict mode).
 *  - All entrance hooks use `ScrollTrigger` from GSAP.
 *  - All hooks are SSR-safe (typeof window guard).
 *  - All hooks respect `prefers-reduced-motion` (no-op + show final state).
 *  - Plugins are registered once at module level.
 *  - Default easing is `power3.out` (premium feel).
 *  - Mobile (`max-width: 767px`) reduces animation intensity to ~60% to avoid
 *    motion sickness and keep performance snappy.
 *  - Animated elements should set `will-change: transform` (caller's responsibility).
 */

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once at module level (SSR-safe guard).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Premium easing used across all hooks. */
const EASE = "power3.out" as const;

/** SSR-safe check for prefers-reduced-motion. */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** SSR-safe mobile breakpoint check. */
function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Intensity multiplier — mobile gets 60% of the movement to reduce motion
 * sickness and keep the experience feeling premium on small screens.
 */
function motionScale(): number {
  return isMobileViewport() ? 0.6 : 1;
}

type AnyEl = HTMLElement;

/* -------------------------------------------------------------------------- */
/*                              useGsapReveal                                 */
/* -------------------------------------------------------------------------- */

export interface GsapRevealOptions {
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Vertical slide distance in px (default 40). */
  y?: number;
  /** Duration in seconds (default 0.8). */
  duration?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** Play once vs. replay every time it enters (default true). */
  once?: boolean;
}

/**
 * useGsapReveal — Fade + slide up reveal on scroll into view.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useGsapReveal(ref, { delay: 0.2, y: 40 });
 * return <div ref={ref} style={{ willChange: "transform" }}>...</div>;
 */
export function useGsapReveal<T extends AnyEl = HTMLDivElement>(
  ref: RefObject<T | null>,
  options: GsapRevealOptions = {}
): void {
  const { delay = 0, y = 40, duration = 0.8, start = "top 85%", once = true } =
    options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();
    const scale = motionScale();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y: y * scale },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, delay, y, duration, start, once]);
}

/* -------------------------------------------------------------------------- */
/*                              useGsapStagger                                */
/* -------------------------------------------------------------------------- */

export interface GsapStaggerOptions {
  /** Stagger between items in seconds (default 0.1). */
  stagger?: number;
  /** Slide distance in px (default 30). Used for both x and y based on `from`. */
  y?: number;
  /** Delay before the first item animates (default 0). */
  delay?: number;
  /** Per-item duration in seconds (default 0.8). */
  duration?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** Direction items slide in from (default "bottom"). */
  from?: "left" | "right" | "top" | "bottom";
  /** Play once vs. replay every time it enters (default true). */
  once?: boolean;
}

/**
 * useGsapStagger — Stagger reveal for grid items inside a container.
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * useGsapStagger(containerRef, ".item", { stagger: 0.1, y: 30 });
 * return <div ref={containerRef}>{items.map(... => <div className="item" />)}</div>;
 */
export function useGsapStagger<T extends AnyEl = HTMLDivElement>(
  containerRef: RefObject<T | null>,
  itemSelector: string,
  options: GsapStaggerOptions = {}
): void {
  const {
    stagger = 0.1,
    y = 30,
    delay = 0,
    duration = 0.8,
    start = "top 85%",
    from = "bottom",
    once = true,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const reduce = prefersReducedMotion();
    const scale = motionScale();

    // Resolve direction into x/y offsets (use `y` as the distance).
    const distance = Math.abs(y);
    let x0 = 0;
    let y0 = 0;
    if (from === "left") x0 = -distance;
    else if (from === "right") x0 = distance;
    else if (from === "top") y0 = -distance;
    else y0 = distance; // "bottom"

    const ctx = gsap.context(() => {
      const items = gsap.utils.selector(container)(itemSelector);
      if (items.length === 0) return;

      if (reduce) {
        gsap.set(items, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, x: x0 * scale, y: y0 * scale },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: EASE,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, itemSelector, stagger, y, delay, duration, start, from, once]);
}

/* -------------------------------------------------------------------------- */
/*                              useGsapParallax                               */
/* -------------------------------------------------------------------------- */

export interface GsapParallaxOptions {
  /**
   * Parallax speed. 1.0 = no parallax (moves with scroll), 0.5 = half speed
   * (background depth), 0.3 = deeper. Default 0.5.
   */
  speed?: number;
  /** ScrollTrigger start position (default "top bottom"). */
  start?: string;
  /** ScrollTrigger end position (default "bottom top"). */
  end?: string;
}

/**
 * useGsapParallax — Parallax scroll effect.
 *
 * The element drifts ±range px across the scroll, where range = (1 - speed) * 80.
 * Lower speed = deeper parallax. The element should be larger than its container
 * (or positioned with headroom) to avoid empty gaps during the drift.
 *
 * @example
 * const ref = useRef<HTMLImageElement>(null);
 * useGsapParallax(ref, { speed: 0.3 });
 * return <img ref={ref} style={{ willChange: "transform" }} />;
 */
export function useGsapParallax<T extends AnyEl = HTMLDivElement>(
  ref: RefObject<T | null>,
  options: GsapParallaxOptions = {}
): void {
  const { speed = 0.5, start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();
    if (reduce) return;

    // Pixel drift range — speed 0.3 → ±56px, speed 0.5 → ±40px, speed 0.7 → ±24px.
    const range = (1 - speed) * 80;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -range },
        {
          y: range,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, speed, start, end]);
}

/* -------------------------------------------------------------------------- */
/*                            useGsapTextReveal                               */
/* -------------------------------------------------------------------------- */

export interface GsapTextRevealOptions {
  /** Delay before the first character animates (default 0). */
  delay?: number;
  /** Stagger between characters in seconds (default 0.03). */
  stagger?: number;
  /** Per-character duration in seconds (default 0.6). */
  duration?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** If true, plays on scroll into view; if false, plays on mount (default false). */
  trigger?: boolean;
}

/**
 * useGsapTextReveal — Character-by-character text reveal.
 *
 * Splits `text` into characters, wraps each in an overflow-hidden span, and
 * slides each up from 110% → 0% with a stagger. The ref element should be
 * empty (no React children) — GSAP fills it on mount and re-fills on text change.
 *
 * Accessibility: the parent element gets `aria-label={text}` so screen readers
 * announce the full word instead of individual characters.
 *
 * @example
 * const ref = useRef<HTMLSpanElement>(null);
 * useGsapTextReveal(ref, "Hello world", { delay: 0.4, stagger: 0.03 });
 * return <span ref={ref} />;
 */
export function useGsapTextReveal<T extends AnyEl = HTMLSpanElement>(
  ref: RefObject<T | null>,
  text: string,
  options: GsapTextRevealOptions = {}
): void {
  const {
    delay = 0,
    stagger = 0.03,
    duration = 0.6,
    start = "top 85%",
    trigger = false,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();
    const scale = motionScale();

    const ctx = gsap.context(() => {
      // Build character spans inside the ref element.
      // Each character is wrapped in an overflow-hidden outer span and an
      // inner span that slides y: 110% → 0%.
      el.innerHTML = "";
      el.setAttribute("aria-label", text);

      const chars: HTMLSpanElement[] = [];
      // Split on whitespace, preserving spaces as text nodes between words.
      const words = text.split(/(\s+)/);

      words.forEach((word) => {
        if (word === "") return;
        if (/^\s+$/.test(word)) {
          el.appendChild(document.createTextNode(word));
          return;
        }
        // Wrap each word in an inline-block span so words don't break across
        // lines mid-character.
        const wordWrap = document.createElement("span");
        wordWrap.style.display = "inline-block";
        wordWrap.style.whiteSpace = "nowrap";
        wordWrap.style.verticalAlign = "top";
        Array.from(word).forEach((ch) => {
          const outer = document.createElement("span");
          outer.style.display = "inline-block";
          outer.style.overflow = "hidden";
          outer.style.verticalAlign = "top";
          outer.style.lineHeight = "1";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.style.willChange = "transform";
          inner.textContent = ch;
          outer.appendChild(inner);
          wordWrap.appendChild(outer);
          chars.push(inner);
        });
        el.appendChild(wordWrap);
      });

      if (reduce) {
        gsap.set(chars, { y: "0%" });
        return;
      }

      gsap.fromTo(
        chars,
        { y: "110%" },
        {
          y: "0%",
          duration,
          delay,
          stagger: stagger * scale,
          ease: EASE,
          scrollTrigger: trigger ? { trigger: el, start } : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, text, delay, stagger, duration, start, trigger]);
}

/* -------------------------------------------------------------------------- */
/*                              useGsapScale                                  */
/* -------------------------------------------------------------------------- */

export interface GsapScaleOptions {
  /** Delay before the animation starts (default 0). */
  delay?: number;
  /** Starting scale value (default 0.8). */
  from?: number;
  /** Duration in seconds (default 0.8). */
  duration?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** Play once vs. replay every time it enters (default true). */
  once?: boolean;
}

/**
 * useGsapScale — Scale in from a smaller size with fade.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useGsapScale(ref, { from: 0.8, delay: 0.2 });
 * return <div ref={ref} style={{ willChange: "transform" }}>...</div>;
 */
export function useGsapScale<T extends AnyEl = HTMLDivElement>(
  ref: RefObject<T | null>,
  options: GsapScaleOptions = {}
): void {
  const { delay = 0, from = 0.8, duration = 0.8, start = "top 85%", once = true } =
    options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();
    const scale = motionScale();
    // Mobile gets a closer starting scale (less dramatic movement).
    const fromScale = reduce ? 1 : 1 - (1 - from) * scale;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(el, { opacity: 1, scale: 1 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, scale: fromScale },
        {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, delay, from, duration, start, once]);
}

/* -------------------------------------------------------------------------- */
/*                            useGsapClipReveal                               */
/* -------------------------------------------------------------------------- */

export interface GsapClipRevealOptions {
  /** Delay before the animation starts (default 0). */
  delay?: number;
  /** Direction the wipe originates from (default "left"). */
  direction?: "left" | "right" | "top" | "bottom";
  /** Duration in seconds (default 1). */
  duration?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** Play once vs. replay every time it enters (default true). */
  once?: boolean;
}

/**
 * useGsapClipReveal — Clip-path wipe reveal.
 *
 * Animates `clip-path` from a fully-hidden inset (based on direction) to
 * `inset(0 0 0 0)` (fully visible). Great for image reveals and section transitions.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useGsapClipReveal(ref, { direction: "left", delay: 0.2 });
 * return <div ref={ref} style={{ willChange: "clip-path" }}>...</div>;
 */
export function useGsapClipReveal<T extends AnyEl = HTMLDivElement>(
  ref: RefObject<T | null>,
  options: GsapClipRevealOptions = {}
): void {
  const {
    delay = 0,
    direction = "left",
    duration = 1,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();

    const initial: Record<string, string> = {
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
      top: "inset(0 0 100% 0)",
      bottom: "inset(100% 0 0 0)",
    };

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(el, { clipPath: "inset(0 0 0 0)" });
        return;
      }
      gsap.fromTo(
        el,
        { clipPath: initial[direction] },
        {
          clipPath: "inset(0 0 0 0)",
          duration,
          delay,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, delay, direction, duration, start, once]);
}

/* -------------------------------------------------------------------------- */
/*                              useGsapCounter                                */
/* -------------------------------------------------------------------------- */

export interface GsapCounterOptions {
  /** Duration of the count-up in seconds (default 2). */
  duration?: number;
  /** Suffix appended to the number (e.g. "+"). */
  suffix?: string;
  /** Prefix prepended to the number (e.g. "$"). */
  prefix?: string;
  /** Delay before counting starts (default 0). */
  delay?: number;
  /** ScrollTrigger start position (default "top 85%"). */
  start?: string;
  /** If true (default), counts on scroll into view; if false, counts on mount. */
  trigger?: boolean;
}

/**
 * useGsapCounter — Count up animation. Writes to the element's textContent.
 *
 * The ref element can render the target number initially (so no-JS users see
 * the final value), then GSAP animates from 0 → target on mount/scroll.
 *
 * @example
 * const ref = useRef<HTMLSpanElement>(null);
 * useGsapCounter(ref, 12, { suffix: "+", duration: 2 });
 * return <span ref={ref}>12</span>;
 */
export function useGsapCounter<T extends AnyEl = HTMLSpanElement>(
  ref: RefObject<T | null>,
  target: number,
  options: GsapCounterOptions = {}
): void {
  const {
    duration = 2,
    suffix = "",
    prefix = "",
    delay = 0,
    start = "top 85%",
    trigger = true,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      if (reduce) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }

      // Start at 0 (briefly — overwritten by onUpdate on the first frame).
      el.textContent = `${prefix}0${suffix}`;

      gsap.to(obj, {
        val: target,
        duration,
        delay,
        ease: EASE,
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
        scrollTrigger: trigger ? { trigger: el, start } : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [ref, target, duration, suffix, prefix, delay, start, trigger]);
}

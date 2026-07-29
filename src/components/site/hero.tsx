"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Phone, Star, ShieldCheck, Award, Users } from "lucide-react";
import { HERO_IMAGE, SITE } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";
import {
  MagneticButton,
  GrainOverlay,
} from "@/components/site/motion-primitives";
import {
  useGsapTextReveal,
  useGsapStagger,
  useGsapParallax,
  useGsapCounter,
} from "@/components/site/gsap-utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();

  // --- GSAP target refs ---
  const bgImgRef = useRef<HTMLImageElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const contentStaggerRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const statCounterRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  // --- Framer Motion scroll-based parallax (kept) ---
  // bg image drifts at 0.5x scroll speed; content drifts up + fades; stat card
  // moves at 1.5x for foreground depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const headline1 = t("hero.headline1");
  const headline2 = t("hero.headline2");
  const yearsServing = new Date().getFullYear() - SITE.foundedYear;

  // --- GSAP: deeper bg image parallax (image moves at 0.3x scroll speed) ---
  // Adds a subtle additional drift on the inner <img> on top of the Framer
  // Motion parent parallax, for an extra layer of depth.
  useGsapParallax(bgImgRef, { speed: 0.3 });

  // --- GSAP: headline character-by-character reveal ---
  // Line 1 ("The group you can") slides up first, then line 2 ("trust.") with
  // a slightly larger stagger for emphasis on the red accent word.
  const h1CharCount = headline1.replace(/\s/g, "").length;
  useGsapTextReveal(headline1Ref, headline1, {
    delay: 0.4,
    stagger: 0.03,
    duration: 0.7,
  });
  useGsapTextReveal(headline2Ref, headline2, {
    delay: 0.4 + h1CharCount * 0.03 + 0.1,
    stagger: 0.05,
    duration: 0.7,
  });

  // --- GSAP: subhead + CTAs stagger (one after another) ---
  useGsapStagger(contentStaggerRef, ".hero-stagger-item", {
    delay: 1.5,
    stagger: 0.18,
    y: 24,
    duration: 0.85,
  });

  // --- GSAP: trust badges stagger from left ---
  useGsapStagger(trustRef, ".trust-badge", {
    delay: 1.9,
    stagger: 0.09,
    y: 16,
    from: "left",
    duration: 0.7,
  });

  // --- GSAP: stat card count-up (fires on mount, syncs with the card entrance at 1.8s) ---
  useGsapCounter(statCounterRef, yearsServing, {
    duration: 2,
    delay: 2.1,
    trigger: false,
  });

  // --- GSAP: scroll indicator floating animation (yoyo, repeat: -1) ---
  // The whole mouse-outline indicator bobs up and down gently forever. The
  // inner Framer Motion dot still does its scroll-loop animation on top.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = scrollIndicatorRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 6,
        duration: 1.6,
        delay: 2.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);
    return () => ctx.revert();
  }, [scrollIndicatorRef]);

  // Trust badge row data.
  const trustItems: { icon: typeof ShieldCheck | null; label: string }[] = [
    { icon: ShieldCheck, label: t("hero.trust1") },
    { icon: Award, label: t("hero.trust2") },
    { icon: Users, label: t("hero.trust3") },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[#121117] text-white"
    >
      {/* Background image — Framer Motion parallax (y/scale) on the wrapper +
          GSAP deeper parallax drift on the inner <img>. */}
      <motion.div
        className="absolute left-0 right-0 -top-[10%] h-[120%]"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          ref={bgImgRef}
          src={HERO_IMAGE}
          alt="Professional carpenter at work in a dark Brisbane workshop"
          className="h-full w-full object-cover"
          style={{
            filter: "grayscale(0.25) contrast(1.08) brightness(0.65)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* Multi-layer gradient overlays for depth */}
      {/* Horizontal: dark left → transparent right (text side is dark, image side visible) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#121117] via-[#121117]/85 to-[#121117]/15" />
      {/* Vertical: fade out bottom into the next section */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121117] via-[#121117]/30 to-[#121117]/60" />
      {/* Radial red accent — adds warmth and brand cue */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 45%, rgba(210,21,30,0.18), transparent 55%)",
        }}
      />
      {/* Subtle top vignette so the sticky header text stays legible */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#121117]/80 to-transparent" />

      {/* Foreground content — Framer Motion scroll drift/fade on the wrapper.
          Entrance animations inside are GSAP-driven. */}
      <motion.div
        className="container-drill relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex min-h-[100svh] flex-col justify-center py-28 md:py-32">
          <div className="max-w-4xl">
            {/* Eyebrow badge — Framer Motion blur-in (kept) */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md"
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
                ))}
              </span>
              <span className="text-[12px] font-medium tracking-wide text-white/80">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* HUGE cinematic headline — GSAP character-by-character reveal.
                Each line is an overflow-hidden wrapper around an empty span
                that GSAP fills with per-character slide-up spans. */}
            <h1 className="mt-7 font-bold leading-[0.92] tracking-[-0.035em] text-[52px] sm:text-[72px] md:text-[92px] lg:text-[108px] xl:text-[124px] 2xl:text-[140px]">
              <span className="block overflow-hidden pb-[0.05em]">
                <span
                  ref={headline1Ref}
                  className="block"
                  aria-label={headline1}
                  // Re-mount on locale change so the GSAP reveal replays cleanly.
                  key={`h1-${locale}`}
                />
              </span>
              <span className="block overflow-hidden pb-[0.05em] text-[#D2151E]">
                <span
                  ref={headline2Ref}
                  className="block"
                  aria-label={headline2}
                  key={`h2-${locale}`}
                />
              </span>
            </h1>

            {/* Subhead + CTAs — GSAP stagger container. Each direct child with
                .hero-stagger-item reveals one after another. */}
            <div ref={contentStaggerRef}>
              <p
                className="hero-stagger-item mt-7 max-w-xl text-[16px] font-normal leading-[1.6] text-white/70 md:text-[19px]"
                style={{ willChange: "transform, opacity" }}
              >
                {t("hero.subhead")}
              </p>
              <div
                className="hero-stagger-item mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{ willChange: "transform, opacity" }}
              >
                <MagneticButton
                  href="#contact"
                  className="group inline-flex h-14 items-center justify-center gap-2.5 bg-[#D2151E] px-8 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#B01118]"
                >
                  {t("hero.cta.quote")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  href={SITE.phoneHref}
                  strength={0.2}
                  className="group inline-flex h-14 items-center justify-center gap-2.5 border border-white/30 px-8 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  {t("hero.cta.call")}
                </MagneticButton>
              </div>
            </div>

            {/* Trust badges — GSAP stagger reveal from the left.
                Both badges and dividers carry .trust-badge so they reveal
                in sequence: badge → divider → badge → divider → badge. */}
            <div
              ref={trustRef}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-normal text-white/55"
            >
              {trustItems.map((item, i) => (
                <Fragment key={i}>
                  <div
                    className="trust-badge inline-flex items-center gap-2"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {item.icon ? (
                      <item.icon className="h-4 w-4 text-[#D2151E]" strokeWidth={2} />
                    ) : null}
                    {item.label}
                  </div>
                  {i < trustItems.length - 1 ? (
                    <span
                      className="trust-badge hidden h-4 w-px bg-white/20 sm:inline-block"
                      style={{ willChange: "transform, opacity" }}
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card — Framer Motion entrance (kept) + GSAP count-up.
          The card fades in at 1.8s; the count-up starts at 2.1s. */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 1.8, ease: EASE }}
        style={{ y: fgY }}
        className="absolute bottom-12 right-10 z-20 hidden lg:block"
      >
        <div className="glass relative w-[220px] border border-white/15 p-6">
          {/* Red accent bar */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-[#D2151E]" />
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/45">
            Serving Brisbane
          </div>
          <div className="mt-2 flex items-baseline gap-1 font-bold leading-none text-white">
            <span className="text-[48px]">
              {/* Renders the target on SSR (no-JS friendly); GSAP takes over on mount. */}
              <span ref={statCounterRef}>{yearsServing}</span>
            </span>
            <span className="text-[28px] text-[#D2151E]">+</span>
          </div>
          <div className="mt-1.5 text-[13px] font-normal text-white/60">
            years of craftsmanship
          </div>
          <div className="mt-4 h-px w-full bg-white/10" />
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D2151E]">
            QBCC Licensed
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — Framer Motion fade-in entrance + GSAP floating yoyo
          on the whole <a> element. The inner dot still does its Framer Motion
          scroll-loop animation. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:flex"
      >
        <a
          ref={scrollIndicatorRef}
          href="#services"
          className="flex flex-col items-center gap-2 text-white/45 transition-colors hover:text-white/80"
          aria-label={t("hero.scroll")}
          data-cursor="Scroll"
          style={{ willChange: "transform" }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            {t("hero.scroll")}
          </span>
          {/* Mouse outline */}
          <div className="relative h-7 w-[18px] rounded-full border border-white/40">
            <motion.span
              className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white"
              animate={{ y: [0, 9, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </div>
        </a>
      </motion.div>

      {/* Film grain for cinematic texture */}
      <GrainOverlay />
    </section>
  );
}

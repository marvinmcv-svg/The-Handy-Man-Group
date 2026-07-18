"use client";

import { Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Star, ShieldCheck, Award, Users } from "lucide-react";
import { HERO_IMAGE, SITE } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";
import {
  MagneticButton,
  TextReveal,
  CountUp,
  GrainOverlay,
} from "@/components/site/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // DEEP parallax: bg image moves at 0.5x scroll speed (slower = depth).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  // Content: slight upward drift + fade as the user scrolls past the hero.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // Foreground stat card moves at ~1.5x (faster than page).
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const headline1 = t("hero.headline1");
  const headline2 = t("hero.headline2");
  const yearsServing = new Date().getFullYear() - SITE.foundedYear;

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
      {/* Background image with deep parallax + cinematic zoom */}
      <motion.div
        className="absolute left-0 right-0 -top-[10%] h-[120%]"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={HERO_IMAGE}
          alt="Professional carpenter at work in a dark Brisbane workshop"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(0.25) contrast(1.08) brightness(0.65)" }}
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
      {/* Foreground content */}
      <motion.div
        className="container-drill relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex min-h-[100svh] flex-col justify-center py-28 md:py-32">
          <div className="max-w-4xl">
            {/* Eyebrow badge with blur-in */}
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

            {/* HUGE cinematic headline — character-by-character reveal */}
            <h1 className="mt-7 font-bold leading-[0.92] tracking-[-0.035em] text-[52px] sm:text-[72px] md:text-[92px] lg:text-[108px] xl:text-[124px] 2xl:text-[140px]">
              <span className="block overflow-hidden pb-[0.05em]">
                <TextReveal
                  key={`h1-${locale}`}
                  text={headline1}
                  delay={0.35}
                  stagger={0.025}
                />
              </span>
              <span className="block overflow-hidden pb-[0.05em] text-[#D2151E]">
                <TextReveal
                  key={`h2-${locale}`}
                  text={headline2}
                  delay={0.35 + headline1.length * 0.025 + 0.08}
                  stagger={0.045}
                />
              </span>
            </h1>

            {/* Subhead — blur in */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 1.2, ease: EASE }}
              className="mt-7 max-w-xl text-[16px] font-normal leading-[1.6] text-white/70 md:text-[19px]"
            >
              {t("hero.subhead")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.4, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
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
            </motion.div>

            {/* Trust badges with stagger */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 1.6 } },
              }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-normal text-white/55"
            >
              {trustItems.map((item, i) => (
                <Fragment key={i}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE },
                      },
                    }}
                    className="inline-flex items-center gap-2"
                  >
                    {item.icon ? (
                      <item.icon className="h-4 w-4 text-[#D2151E]" strokeWidth={2} />
                    ) : null}
                    {item.label}
                  </motion.div>
                  {i < trustItems.length - 1 ? (
                    <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
                  ) : null}
                </Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card — desktop only, foreground parallax */}
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
              <CountUp to={yearsServing} duration={2.2} />
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

      {/* Scroll indicator — animated mouse with scrolling dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:flex"
      >
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-white/45 transition-colors hover:text-white/80"
          aria-label={t("hero.scroll")}
          data-cursor="Scroll"
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

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { CTA_IMAGE, SITE } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

// Inline SVG noise pattern for grain overlay (kept tiny, no network request)
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/></svg>`
  );

export function CtaBanner() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Deep parallax — image moves slower than scroll (translate over a wider range)
  const imgY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  // Staggered content reveal
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#121117] text-white"
      aria-labelledby="cta-heading"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src={CTA_IMAGE}
          alt="Carpentry workshop with timber and tools"
          className="h-[140%] w-full object-cover opacity-50"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlay — heavy charcoal on left, transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #121117 0%, rgba(18,17,23,0.92) 35%, rgba(18,17,23,0.7) 60%, rgba(18,17,23,0.35) 100%)",
        }}
        aria-hidden
      />
      {/* Vertical fade for content legibility on mobile */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,17,23,0.6) 0%, rgba(18,17,23,0.85) 60%, rgba(18,17,23,0.95) 100%)",
        }}
        aria-hidden
      />
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")`, backgroundSize: "160px 160px" }}
        aria-hidden
      />

      <div className="container-drill relative py-20 md:py-32 lg:py-40">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D2151E]" aria-hidden />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D2151E]">
              {SITE.slogan}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="cta-heading"
            variants={item}
            className="text-[48px] font-bold leading-[0.95] tracking-tight md:text-[80px] lg:text-[88px]"
          >
            {t("cta.title1")}
            <br />
            <span className="text-[#D2151E]">{t("cta.title2")}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[16px] font-normal leading-[1.6] text-white/75 md:text-[18px]"
          >
            {t("cta.body")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex h-14 items-center justify-center gap-2 bg-[#D2151E] px-8 text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#B01118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2151E]"
            >
              {t("hero.cta.quote")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
            <motion.a
              href={SITE.phoneHref}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-14 items-center justify-center gap-2 border border-white/40 px-8 text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Phone className="h-4 w-4" />
              {t("hero.cta.call")} {SITE.phone}
            </motion.a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/45"
          >
            <span>{SITE.licensing}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <span>Family owned by {SITE.founders}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <span>Established {SITE.foundedYear}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

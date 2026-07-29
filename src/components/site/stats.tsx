"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS, SITE } from "@/lib/site-data";
import { useGsapReveal, useGsapStagger, useGsapCounter } from "@/components/site/gsap-utils";
import { useLanguage } from "@/components/site/language-provider";

// Register ScrollTrigger once (idempotent)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Stats() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Header scroll-reveal
  useGsapReveal(headerRef, { delay: 0, y: 28 });
  // Stagger the cards as the grid scrolls in
  useGsapStagger(cardsRef, ".stat-card", { stagger: 0.1, y: 28 });

  // Underline accents — GSAP scaleX 0 → 1, staggered, when section enters
  useUnderlineAccents(sectionRef, reduce);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby="stats-heading"
    >
      {/* Huge faint watermark text behind the stats */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center"
        aria-hidden
      >
        <span className="block text-[18vw] font-bold leading-none tracking-tight text-[#121117]/[0.025] md:text-[14vw]">
          BRISBANE
        </span>
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, #121117 1px, transparent 1px), linear-gradient(to bottom, #121117 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-drill relative">
        {/* Header */}
        <div ref={headerRef} className="mb-12 max-w-3xl md:mb-16">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
            {t("stats.eyebrow")}
          </span>
          <h2
            id="stats-heading"
            className="mt-4 text-[36px] font-bold leading-[1.02] tracking-tight text-[#121117] md:text-[64px]"
          >
            {t("stats.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] font-normal leading-[1.6] text-[#333333] md:text-[17px]">
            {t("stats.subtitle")}
          </p>
        </div>

        {/* Stat cards — 2x2 on mobile, 4-up on desktop. useGsapStagger animates each .stat-card. */}
        <div ref={cardsRef} className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((s, i) => (
            <article
              key={s.label}
              className="stat-card group relative flex flex-col bg-white p-5 shadow-[0_0_0_1px_#E5E7EB] transition-shadow duration-300 hover:shadow-[0_8px_0_0_#121117,0_0_0_1px_#121117] sm:p-6 md:p-8"
            >
              {/* Top red border — draws in on hover (CSS) */}
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#D2151E] transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />

              {/* Number with red underline accent (.stat-underline is GSAP scaleX target) */}
              <div className="flex flex-col">
                <span className="text-[44px] font-bold leading-none tracking-tight text-[#121117] transition-colors duration-300 group-hover:text-[#D2151E] sm:text-[56px] md:text-[88px] lg:text-[96px]">
                  <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} delay={0.2 + i * 0.1} />
                </span>
                <span
                  className="stat-underline mt-3 h-[2px] w-10 origin-left bg-[#D2151E] transition-all duration-300 group-hover:w-16"
                  style={{ transform: "scaleX(0)" }}
                  aria-hidden
                />
              </div>

              {/* Label */}
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666] sm:text-[12px] md:text-[13px]">
                {s.label}
              </p>
            </article>
          ))}
        </div>

        {/* Footer trust line */}
        <div className="mt-12 border-t border-[#E5E7EB] pt-6">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#999999]">
            {SITE.licensing} · Family owned by {SITE.founders} · Established {SITE.foundedYear}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stat number with useGsapCounter hook ---------- */
function StatNumber({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // useGsapCounter counts from 0 → value when the ref scrolls into view.
  useGsapCounter(ref, value, { duration: 2, prefix, suffix, delay });
  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ---------- Underline accent: GSAP scaleX 0 → 1 staggered ---------- */
function useUnderlineAccents(
  sectionRef: React.RefObject<HTMLElement | null>,
  reduce: boolean | null
) {
  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [sectionRef, reduce]);
}

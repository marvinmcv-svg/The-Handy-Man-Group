"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#121117] py-24 text-white md:py-32"
      aria-labelledby="process-heading"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D2151E]/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-drill relative">
        {/* Header */}
        <Reveal className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
            {t("process.eyebrow")}
          </span>
          <h2
            id="process-heading"
            className="mt-4 text-[40px] font-bold leading-[1.0] tracking-tight md:text-[64px]"
          >
            {t("process.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] font-normal leading-[1.6] text-white/70 md:text-[17px]">
            {t("process.subtitle")}
          </p>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div
          ref={sectionRef}
          className="relative mt-16 hidden md:block lg:mt-24"
        >
          {/* SVG horizontal line — animates pathLength on scroll-in */}
          <svg
            className="absolute left-[12.5%] right-[12.5%] top-[7px] h-[2px] w-[75%] overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
            aria-hidden
          >
            {/* Track */}
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="#2A2A35"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated fill */}
            <motion.path
              d="M 0 1 L 100 1"
              stroke="#D2151E"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </svg>

          <div className="grid grid-cols-4 gap-4 lg:gap-8">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.18, ease: EASE }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Pulsing red dot on the line */}
                <div className="relative mb-8 flex h-4 w-4 items-center justify-center">
                  <span className="relative z-10 h-4 w-4 bg-[#D2151E]" />
                  <span className="absolute inset-0 z-0 animate-ping rounded-full bg-[#D2151E] opacity-40" aria-hidden />
                </div>
                {/* Number */}
                <span className="text-[60px] font-bold leading-none tracking-tight text-[#D2151E] transition-colors duration-300 group-hover:text-white lg:text-[72px]">
                  {step.step}
                </span>
                {/* Title */}
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-white lg:text-[22px]">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="mt-3 max-w-xs text-[15px] font-normal leading-[1.6] text-white/60">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-14 md:hidden">
          <div className="relative pl-12">
            {/* Vertical line track */}
            <div className="absolute left-[14px] top-1 bottom-1 w-[2px] bg-[#2A2A35]" aria-hidden />
            {/* Animated fill */}
            <motion.div
              className="absolute left-[14px] top-1 bottom-1 w-[2px] origin-top bg-[#D2151E]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: EASE }}
              aria-hidden
            />
            <div className="flex flex-col gap-10">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                  className="relative"
                >
                  {/* Pulsing dot */}
                  <span className="absolute -left-[34px] top-2 flex h-4 w-4 items-center justify-center">
                    <span className="relative z-10 h-4 w-4 bg-[#D2151E]" />
                    <span className="absolute inset-0 z-0 animate-ping rounded-full bg-[#D2151E] opacity-40" aria-hidden />
                  </span>
                  <span className="text-[44px] font-bold leading-none tracking-tight text-[#D2151E]">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-[20px] font-bold leading-snug text-white">{step.title}</h3>
                  <p className="mt-2 text-[15px] font-normal leading-[1.6] text-white/65">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

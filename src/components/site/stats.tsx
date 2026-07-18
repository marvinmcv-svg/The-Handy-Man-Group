"use client";

import { motion } from "framer-motion";
import { STATS, SITE } from "@/lib/site-data";
import { Reveal, CountUp } from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Stats() {
  const { t } = useLanguage();

  return (
    <section
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
        <Reveal className="mb-12 max-w-3xl md:mb-16">
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
        </Reveal>

        {/* Stat cards — 2x2 on mobile, 4-up on desktop */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((s, i) => (
            <motion.article
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col bg-white p-6 shadow-[0_0_0_1px_#E5E7EB] transition-shadow duration-300 hover:shadow-[0_8px_0_0_#121117,0_0_0_1px_#121117] md:p-8"
            >
              {/* Top red border — draws in on hover */}
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#D2151E] transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />

              {/* Number with red underline accent */}
              <div className="flex flex-col">
                <span className="text-[56px] font-bold leading-none tracking-tight text-[#121117] transition-colors duration-300 group-hover:text-[#D2151E] md:text-[88px] lg:text-[96px]">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="mt-3 h-[2px] w-10 bg-[#D2151E] transition-all duration-300 group-hover:w-16" aria-hidden />
              </div>

              {/* Label */}
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#666666] md:text-[13px]">
                {s.label}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Footer trust line */}
        <Reveal delay={0.2} className="mt-12 border-t border-[#E5E7EB] pt-6">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#999999]">
            {SITE.licensing} · Family owned by {SITE.founders} · Established {SITE.foundedYear}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

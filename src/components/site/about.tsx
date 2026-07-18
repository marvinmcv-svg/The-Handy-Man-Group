"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Award, Clock4, MapPin } from "lucide-react";
import { ABOUT_IMAGE, SITE } from "@/lib/site-data";
import {
  Reveal,
  ImageReveal,
  Parallax,
  CountUp,
} from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";

const POINTS = [
  "Licensed carpenters, handymen and landscapers in one team",
  "QBCC licensed & Master Builders Queensland members",
  "Complimentary onsite inspection before every quote",
  "Family owned and operated by Joe & Claudia personally",
  "Fixed-price quotes — no hourly surprises, ever",
  "From a squeaky door to a full renovation — no job too small",
];

const BADGES = [
  { icon: ShieldCheck, label: "QBCC Licensed" },
  { icon: Award, label: "Master Builders QLD" },
  { icon: Clock4, label: "On-Time Service" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function About() {
  const { t } = useLanguage();
  const yearsOfService = new Date().getFullYear() - SITE.foundedYear;

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="container-drill">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ──────────────  LEFT: cinematic image  ────────────── */}
          <div className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0 lg:max-w-none">
            {/* Decorative red border offset behind (bottom-right) */}
            <div
              aria-hidden="true"
              className="absolute top-4 left-4 -right-4 -bottom-4 border-2 border-[#D2151E] sm:top-5 sm:left-5 sm:-right-5 sm:-bottom-5"
            />

            {/* Image with parallax (subtle vertical drift on scroll) */}
            <Parallax amount={14} className="relative z-10">
              <ImageReveal
                src={ABOUT_IMAGE}
                alt="A professional tradesperson from The Handyman & Carpentry Group on the job site"
                className="relative aspect-[4/5] overflow-hidden bg-[#F3F4F6]"
                imgClassName="h-full w-full object-cover"
              />
            </Parallax>

            {/* QBCC Licensed badge top-left (floating) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="absolute left-3 top-3 z-20 flex items-center gap-2 bg-white px-3 py-2 shadow-lg sm:left-4 sm:top-4"
            >
              <ShieldCheck className="h-4 w-4 text-[#D2151E] sm:h-5 sm:w-5" strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#121117] sm:text-[11px]">
                QBCC Licensed
              </span>
            </motion.div>

            {/* Floating stat card bottom-right (overlapping) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="absolute -bottom-5 -right-3 z-20 bg-[#121117] p-5 text-white sm:-bottom-6 sm:-right-4 md:p-7"
            >
              <div className="text-[42px] font-bold leading-none text-[#D2151E] md:text-[56px]">
                <CountUp to={yearsOfService} suffix="+" />
              </div>
              <div className="mt-2 max-w-[160px] text-[11px] font-normal leading-tight text-white/70 md:text-[12px]">
                {t("about.stat")}
              </div>
            </motion.div>
          </div>

          {/* ──────────────  RIGHT: copy + checklist + badges  ────────────── */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
                {t("about.eyebrow")}
              </span>
              <h2 className="mt-4 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[56px]">
                {t("about.title1")}
              </h2>
              <p className="mt-6 text-[16px] font-normal leading-[1.7] text-[#333333] md:text-[17px]">
                {t("about.p1")}
              </p>
              <p className="mt-4 text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                {t("about.p2")}
              </p>
            </Reveal>

            {/* Checklist grid (2-col, staggered entrance) */}
            <Reveal delay={0.15} className="mt-8">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {POINTS.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.06,
                      ease: EASE,
                    }}
                    className="flex items-start gap-3 text-[14px] font-normal leading-snug text-[#333333] md:text-[15px]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#D2151E]">
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            {/* Badges row */}
            <Reveal delay={0.25} className="mt-9">
              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[#DDDDDD] pt-7">
                {BADGES.map((b) => (
                  <motion.div
                    key={b.label}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 text-[13px] font-semibold text-[#121117] md:text-[14px]"
                  >
                    <b.icon className="h-5 w-5 text-[#D2151E]" strokeWidth={2} />
                    {b.label}
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Service area */}
            <Reveal delay={0.3} className="mt-6">
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#333333] md:text-[14px]">
                <MapPin className="h-4 w-4 text-[#D2151E]" strokeWidth={2} />
                <span>
                  Servicing{" "}
                  <span className="font-semibold text-[#121117]">
                    {SITE.serviceArea}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

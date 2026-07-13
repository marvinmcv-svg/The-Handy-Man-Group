"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Award, Clock4 } from "lucide-react";
import { ABOUT_IMAGE, SITE } from "@/lib/site-data";
import { Reveal, ImageReveal } from "@/components/site/motion-primitives";

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

export function About() {
  return (
    <section id="about" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <div className="relative order-2 lg:order-1">
          <ImageReveal
            src={ABOUT_IMAGE}
            alt="A professional tradesperson from The Handyman & Carpentry Group"
            className="relative aspect-[4/5] overflow-hidden bg-[#F3F4F6]"
            imgClassName="h-full w-full object-cover"
          />
          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -right-2 hidden bg-[#121117] p-6 text-white md:block lg:-right-6"
          >
            <div className="text-[44px] font-bold leading-none text-[#D2151E]">
              {new Date().getFullYear() - SITE.foundedYear}+
            </div>
            <div className="mt-2 max-w-[160px] text-[13px] font-normal leading-tight text-white/70">
              Years serving Brisbane homeowners &amp; businesses
            </div>
          </motion.div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              About us
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[48px]">
              We're builders of dreams — Joe &amp; Claudia
            </h2>
            <p className="mt-5 text-[17px] font-normal leading-[1.7] text-[#333333]">
              Formerly established as <strong className="font-semibold text-[#121117]">Joe Lewis Handyman</strong> in {SITE.foundedYear}, we've evolved and changed our name — but not the quality of our services. The Handyman &amp; Carpentry Group is pleased to continue offering our makeover services, from small renovations to repairs that keep your home in its best condition.
            </p>
            <p className="mt-4 text-[16px] font-normal leading-[1.7] text-[#333333]">
              If you are looking to sell, uplift the look of your home, renovate, or simply want advice from an experienced team — we want to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-7">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {POINTS.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 text-[15px] font-normal leading-snug text-[#333333]"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D2151E]" strokeWidth={2.5} />
                  {p}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25} className="mt-9">
            <div className="flex flex-wrap gap-6 border-t border-[#DDDDDD] pt-7">
              {BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-[14px] font-semibold text-[#121117]">
                  <b.icon className="h-5 w-5 text-[#D2151E]" strokeWidth={2} />
                  {b.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

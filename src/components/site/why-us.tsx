"use client";

import { motion } from "framer-motion";
import { Users, Eye, ShieldCheck, Hammer, ArrowRight, type LucideIcon } from "lucide-react";
import { DIFFERENTIATORS, SITE } from "@/lib/site-data";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion-primitives";

const ICONS: Record<string, LucideIcon> = { Users, Eye, ShieldCheck, Hammer };

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-[#121117] py-16 text-white md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              What makes us different
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
              Expert craftsmanship for unmatched service.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col justify-end">
            <p className="text-[17px] font-normal leading-[1.6] text-white/70">
              Choosing The Handyman &amp; Carpentry Group means working with a
              family team that values quality, honesty &amp; client
              satisfaction. From residential to commercial, we deliver results
              that last — on time &amp; within budget.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mt-7 inline-flex h-12 w-fit items-center gap-2 bg-[#D2151E] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </Reveal>
        </div>

        {/* Differentiators grid */}
        <StaggerGroup className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {DIFFERENTIATORS.map((d) => {
            const Icon = ICONS[d.icon] ?? ShieldCheck;
            return (
              <StaggerItem key={d.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group flex h-full flex-col bg-[#121117] p-7 md:p-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex h-12 w-12 items-center justify-center bg-white/5 text-[#D2151E] transition-colors group-hover:bg-[#D2151E] group-hover:text-white"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </motion.div>
                  <h3 className="mt-6 text-[20px] font-bold leading-snug">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[15px] font-normal leading-[1.6] text-white/65">
                    {d.body}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Licensing strip */}
        <Reveal delay={0.2} className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.15em] text-white/40">
            {SITE.licensing} · Family owned by {SITE.founders} · Established {SITE.foundedYear}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

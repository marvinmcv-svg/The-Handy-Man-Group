"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Users, Eye, ShieldCheck, Hammer, ArrowRight, type LucideIcon } from "lucide-react";
import { DIFFERENTIATORS, SITE } from "@/lib/site-data";
import {
  useGsapReveal,
  useGsapStagger,
  useGsapClipReveal,
  useGsapScale,
} from "@/components/site/gsap-utils";

const ICONS: Record<string, LucideIcon> = { Users, Eye, ShieldCheck, Hammer };

export function WhyUs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Section header scroll-reveal (eyebrow + heading)
  useGsapReveal(headerRef, { delay: 0, y: 28 });
  // Subtitle column scroll-reveal (slightly delayed)
  useGsapReveal(subtitleRef, { delay: 0.15, y: 28 });
  // Stagger the cards as the grid scrolls in
  useGsapStagger(cardsRef, ".why-card", { stagger: 0.12, y: 24 });

  return (
    <section id="why-us" className="relative overflow-hidden bg-[#121117] py-16 text-white md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={headerRef}>
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              What makes us different
            </span>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.05] tracking-tight sm:text-[36px] md:text-[52px]">
              Expert craftsmanship for unmatched service.
            </h2>
          </div>
          <div ref={subtitleRef} className="flex flex-col justify-end">
            <p className="text-[16px] font-normal leading-[1.6] text-white/70 sm:text-[17px]">
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
              className="no-tap-highlight mt-7 inline-flex min-h-[44px] w-fit items-center gap-2 bg-[#D2151E] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        {/* Differentiators grid — each card uses useGsapClipReveal (clip-path wipe) */}
        <div ref={cardsRef} className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d, i) => (
            <WhyCard key={d.title} icon={d.icon} title={d.title} body={d.body} index={i} />
          ))}
        </div>

        {/* Licensing strip */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.15em] text-white/40 sm:text-[13px]">
            {SITE.licensing} · Family owned by {SITE.founders} · Established {SITE.foundedYear}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why-us card — clip-path wipe reveal + icon scale-in ---------- */
function WhyCard({
  icon,
  title,
  body,
  index,
}: {
  icon: string;
  title: string;
  body: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[icon] ?? ShieldCheck;

  // Each card uses useGsapClipReveal for a directional clip-path wipe entrance
  // (alternating direction for visual interest)
  useGsapClipReveal(cardRef, {
    delay: 0.1 + index * 0.12,
    direction: index % 2 === 0 ? "left" : "right",
  });

  // Icon scales in from 0.5 (per spec)
  useGsapScale(iconRef, { delay: 0.3 + index * 0.12, from: 0.5 });

  return (
    <div ref={cardRef} className="why-card">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group flex h-full flex-col bg-[#121117] p-6 sm:p-7 md:p-8"
      >
        <div
          ref={iconRef}
          className="flex h-12 w-12 items-center justify-center bg-white/5 text-[#D2151E] transition-colors group-hover:bg-[#D2151E] group-hover:text-white"
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h3 className="mt-6 text-[18px] font-bold leading-snug sm:text-[20px]">
          {title}
        </h3>
        <p className="mt-3 text-[14px] font-normal leading-[1.6] text-white/65 sm:text-[15px]">
          {body}
        </p>
      </motion.div>
    </div>
  );
}

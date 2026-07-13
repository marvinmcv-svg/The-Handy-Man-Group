"use client";

import { motion } from "framer-motion";
import { Hammer, Wrench, Ruler, Building2, Trees, Sparkles, ArrowRight } from "lucide-react";

const ITEMS = [
  { icon: Hammer, label: "Carpentry" },
  { icon: Wrench, label: "Handyman Services" },
  { icon: Ruler, label: "Renovations" },
  { icon: Building2, label: "Commercial Spaces" },
  { icon: Trees, label: "Structural Landscaping" },
  { icon: Sparkles, label: "Home Makeovers" },
];

export function Marquee() {
  return (
    <section aria-label="Services overview" className="overflow-hidden border-y border-[#DDDDDD] bg-[#121117] py-5 text-white">
      <div className="relative flex">
        <motion.div
          className="flex w-max shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.06em] text-white/85">
              <item.icon className="h-5 w-5 text-[#D2151E]" strokeWidth={2} />
              {item.label}
              <ArrowRight className="ml-7 h-4 w-4 text-white/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

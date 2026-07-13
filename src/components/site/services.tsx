"use client";

import { motion } from "framer-motion";
import {
  Hammer,
  Wrench,
  Ruler,
  Building2,
  Trees,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion-primitives";

const ICONS: Record<string, LucideIcon> = {
  Hammer,
  Wrench,
  Ruler,
  Building2,
  Trees,
  Sparkles,
};

export type ServiceItem = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  points: string[];
};

export function Services({ services }: { services: ServiceItem[] }) {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <Reveal className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            What we do
          </span>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[56px]">
            Our Services
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] font-normal leading-[1.6] text-[#333333]">
            One trusted team for carpentry, handyman work, renovations,
            commercial spaces and structural landscaping. Licensed, insured,
            and proud of every job we finish.
          </p>
        </Reveal>

        {/* Services grid */}
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-px bg-[#DDDDDD] sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Hammer;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group flex h-full flex-col bg-white p-7 md:p-9"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex h-12 w-12 items-center justify-center bg-[#121117] text-white transition-colors group-hover:bg-[#D2151E]"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </motion.div>
                  <h3 className="mt-6 text-[22px] font-bold text-[#121117]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] font-normal leading-[1.6] text-[#333333]">
                    {service.blurb}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[14px] font-normal text-[#333333]">
                        <span className="h-1.5 w-1.5 bg-[#D2151E]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[#121117] transition-colors hover:text-[#D2151E]"
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

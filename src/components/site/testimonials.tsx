"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion-primitives";

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <section id="reviews" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              Our testimonials
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[52px]">
              Clients Review
            </h2>
            <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[#333333]">
              Real words from real Brisbane clients — no job too small, no detail overlooked.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4 border border-[#DDDDDD] bg-white px-5 py-4">
              <div className="flex flex-col">
                <span className="text-[32px] font-bold leading-none text-[#121117]">5.0</span>
                <span className="mt-1 text-[12px] font-normal text-[#999999]">Average rating</span>
              </div>
              <span className="h-10 w-px bg-[#DDDDDD]" />
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D2151E] text-[#D2151E]" />
                  ))}
                </div>
                <span className="mt-1 block text-[12px] font-normal text-[#999999]">Verified clients</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Testimonial grid */}
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex h-full flex-col bg-white p-7 md:p-8"
              >
                <Quote className="h-8 w-8 text-[#D2151E]" />
                <blockquote className="mt-4 flex-1 text-[15px] font-normal leading-[1.65] text-[#333333]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4 border-t border-[#DDDDDD] pt-5">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#121117] text-[15px] font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1">
                    <figcaption className="text-[15px] font-bold text-[#121117]">{t.name}</figcaption>
                    <p className="text-[13px] font-normal text-[#999999]">{t.role}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
                    ))}
                  </div>
                </div>
              </motion.figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

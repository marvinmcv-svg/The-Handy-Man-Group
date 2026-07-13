"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Star, ShieldCheck, ChevronDown } from "lucide-react";
import { HERO_IMAGE, SITE } from "@/lib/site-data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: image moves slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#121117] text-white">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src={HERO_IMAGE}
          alt="Professional carpenter at work in a dark Brisbane workshop"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121117] via-[#121117]/80 to-[#121117]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-transparent to-[#121117]/40" />
      </motion.div>

      {/* Content */}
      <motion.div className="container-drill relative z-10" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="flex min-h-[100svh] flex-col justify-center py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
                ))}
              </span>
              <span className="text-[12px] font-medium tracking-wide text-white/80">
                Brisbane's trusted carpenters &amp; handymen since {SITE.foundedYear}
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1 className="mt-6 text-[44px] font-bold leading-[1.02] tracking-tight sm:text-[60px] md:text-[80px] lg:text-[96px]">
              {"The group you can".split(" ").map((word, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                    {i < 3 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[#D2151E]"
                >
                  trust.
                </motion.span>
              </span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-[17px] font-normal leading-[1.6] text-white/75 md:text-[19px]"
            >
              Licensed carpentry, handyman services, renovations and structural
              landscaping across Brisbane. Family-owned by Joe &amp; Claudia.
              No job is too small.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118]"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href={SITE.phoneHref}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex h-12 items-center justify-center gap-2 border border-white/40 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-normal text-white/60"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#D2151E]" />
                QBCC Licensed
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
              <span>Master Builders QLD Members</span>
              <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
              <span>Family owned by Joe &amp; Claudia</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

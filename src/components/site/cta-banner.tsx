"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { CTA_IMAGE, SITE } from "@/lib/site-data";

export function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#121117] text-white">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={CTA_IMAGE}
          alt="Carpentry workshop with timber and tools"
          className="h-[120%] w-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121117] via-[#121117]/85 to-[#121117]/60" />
      </motion.div>

      <div className="container-drill relative py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-[36px] font-bold leading-[1.02] tracking-tight md:text-[64px]">
            Ready to uplift
            <br />
            <span className="text-[#D2151E]">your space?</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] font-normal leading-[1.6] text-white/75">
            Contact us today to book your free onsite inspection. From a
            squeaky door to a full renovation — we want to hear from you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/site-data";
import { Reveal, CountUp } from "@/components/site/motion-primitives";

export function Stats() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-drill">
        <Reveal className="mb-10 max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            By the numbers
          </span>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[44px]">
            Facts &amp; Figures
          </h2>
          <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[#333333]">
            The numbers that show why Brisbane keeps coming back to Joe &amp; Claudia.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-[#DDDDDD] md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-7 text-center md:p-9"
            >
              <div className="text-[40px] font-bold leading-none text-[#121117] md:text-[56px]">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[13px] font-medium uppercase tracking-wide text-[#999999] md:text-[14px]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

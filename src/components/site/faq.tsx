"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column */}
        <Reveal className="lg:col-span-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            FAQ
          </span>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[44px]">
            Questions,
            <br />
            answered.
          </h2>
          <p className="mt-5 text-[16px] font-normal leading-[1.6] text-[#333333]">
            Can't find what you're looking for? Give us a call — Joe or Claudia
            will answer personally. Or chat with Marvin, our AI assistant.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex h-12 items-center bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
          >
            Ask your question
          </a>
        </Reveal>

        {/* Accordion */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-[#DDDDDD] border-y border-[#DDDDDD]">
            {faqs.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-semibold text-[#121117] md:text-[19px]">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "#D2151E" : "#121117", color: isOpen ? "#FFFFFF" : "#121117" }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#121117]"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[15px] font-normal leading-[1.7] text-[#333333]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

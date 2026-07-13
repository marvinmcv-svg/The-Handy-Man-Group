"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/site-data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column */}
        <div className="lg:col-span-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            FAQ
          </span>
          <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[44px]">
            Questions,
            <br className="hidden md:block" /> answered.
          </h2>
          <p className="mt-5 text-[16px] font-normal leading-[1.6] text-[#333333]">
            Can&apos;t find what you&apos;re looking for? Give us a call — a real
            person answers the phone during business hours.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex h-12 items-center bg-[#D2151E] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#B01118]"
          >
            Ask your question
          </a>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-[#DDDDDD] border-y border-[#DDDDDD]">
            {FAQS.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-medium text-[#121117] md:text-[19px]">
                      {faq.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#121117] text-[#121117]">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-[15px] font-normal leading-[1.7] text-[#333333]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { Plus } from "lucide-react";
import { useGsapReveal, useGsapStagger } from "@/components/site/gsap-utils";

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  // Section header scroll-reveal
  useGsapReveal(headerRef, { delay: 0, y: 28 });
  // Accordion items slide in from the left, staggered.
  // (The hook uses `y` as the distance for both x and y directions; with from:"left"
  //  the items start at x:-y and animate to x:0 — i.e. slide in from the left.)
  useGsapStagger(accordionRef, ".faq-item", { stagger: 0.1, y: 24, from: "left" });

  return (
    <section id="faq" className="overflow-x-hidden bg-white py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left column */}
        <div ref={headerRef} className="min-w-0 lg:col-span-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            FAQ
          </span>
          <h2 className="mt-3 text-[32px] font-bold leading-[1.05] tracking-tight text-[#121117] sm:text-[36px] md:text-[44px]">
            Questions,
            <br />
            answered.
          </h2>
          <p className="mt-5 text-[15px] font-normal leading-[1.6] text-[#333333] sm:text-[16px]">
            Can&apos;t find what you&apos;re looking for? Give us a call — Joe or Claudia
            will answer personally. Or chat with Marvin, our AI assistant.
          </p>
          <a
            href="#contact"
            className="no-tap-highlight mt-7 inline-flex min-h-[44px] items-center bg-[#D2151E] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
          >
            Ask your question
          </a>
        </div>

        {/* Accordion — .faq-item items slide in from the left (useGsapStagger above) */}
        <div ref={accordionRef} className="min-w-0 lg:col-span-7">
          <div className="divide-y divide-[#DDDDDD] border-y border-[#DDDDDD]">
            {faqs.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <FaqRow
                  key={faq.id}
                  faq={faq}
                  isOpen={isOpen}
                  onToggle={() => setOpen(isOpen ? null : idx)}
                  reduce={reduce}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Single accordion row — uses GSAP for smooth height expand/collapse ---------- */
function FaqRow({
  faq,
  isOpen,
  onToggle,
  reduce,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean | null;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Animate height 0 → auto (open) or auto → 0 (close) with GSAP.
  // Falls back to instant display when prefers-reduced-motion is set.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (reduce) {
      // Reduced motion: just set height instantly
      el.style.height = isOpen ? "auto" : "0px";
      el.style.opacity = isOpen ? "1" : "0";
      return;
    }

    if (isOpen) {
      // Open: set auto height first to measure, then animate from 0 → measured
      gsap.set(el, { height: "auto", opacity: 1 });
      const fullHeight = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: fullHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            // Set to auto so content can reflow naturally (e.g. on viewport resize)
            gsap.set(el, { height: "auto", clearProps: "opacity" });
          },
        }
      );
    } else {
      // Close: animate current height → 0
      const currentHeight = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: currentHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.inOut",
        }
      );
    }
  }, [isOpen, reduce]);

  // Animate the + / × icon rotation via GSAP too (smooth rotate + color swap)
  useEffect(() => {
    if (!iconRef.current || reduce) return;
    gsap.to(iconRef.current, {
      rotate: isOpen ? 135 : 0,
      backgroundColor: isOpen ? "#D2151E" : "#121117",
      color: isOpen ? "#FFFFFF" : "#121117",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isOpen, reduce]);

  return (
    <div className="faq-item">
      <button
        type="button"
        onClick={onToggle}
        className="no-tap-highlight flex min-h-[44px] w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] font-semibold text-[#121117] sm:text-[17px] md:text-[19px]">
          {faq.q}
        </span>
        <span
          ref={iconRef}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#121117]"
          style={{
            backgroundColor: isOpen ? "#D2151E" : "#121117",
            color: isOpen ? "#FFFFFF" : "#121117",
          }}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      {/* The animated content — height starts at 0 when closed */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="pb-6 pr-4 text-[15px] font-normal leading-[1.7] text-[#333333] sm:pr-12">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

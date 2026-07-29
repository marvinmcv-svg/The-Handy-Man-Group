"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/site-data";
import { useGsapReveal, useGsapStagger, useGsapCounter } from "@/components/site/gsap-utils";
import { useLanguage } from "@/components/site/language-provider";

// Register ScrollTrigger once (idempotent)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  // Header scroll-reveal
  useGsapReveal(headerRef, { delay: 0, y: 28 });

  // Stagger the step cards as the section scrolls in (desktop grid)
  useGsapStagger(stepsContainerRef, ".process-step", { stagger: 0.18, y: 28 });
  // Stagger mobile steps too (they're in a separate container)
  useGsapStagger(mobileStepsRef, ".process-step", { stagger: 0.12, y: 20 });

  // Timeline line draw-in (stroke-dashoffset 100 → 0 on desktop, scaleY 0 → 1 on mobile).
  // Plus pulsing dots (infinite yoyo). Respects prefers-reduced-motion.
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      // Desktop SVG path: animate stroke-dashoffset 100 → 0 for the draw-in effect.
      // (stroke-dasharray is set inline to "100 100" so the dash repeats cleanly.)
      if (desktopLineRef.current) {
        gsap.fromTo(
          desktopLineRef.current,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
      // Mobile bar: scaleY 0 → 1
      if (mobileLineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Pulsing dots — infinite yoyo scale + opacity (the dot "breathes")
      gsap.utils.toArray<HTMLElement>(".process-dot").forEach((dot) => {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.4,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#121117] py-24 text-white md:py-32"
      aria-labelledby="process-heading"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D2151E]/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-drill relative">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
            {t("process.eyebrow")}
          </span>
          <h2
            id="process-heading"
            className="mt-4 text-[40px] font-bold leading-[1.0] tracking-tight md:text-[64px]"
          >
            {t("process.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] font-normal leading-[1.6] text-white/70 md:text-[17px]">
            {t("process.subtitle")}
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div
          ref={sectionRef}
          className="relative mt-16 hidden md:block lg:mt-24"
        >
          {/* SVG horizontal line — animates stroke-dashoffset on scroll-in */}
          <svg
            className="absolute left-[12.5%] right-[12.5%] top-[7px] h-[2px] w-[75%] overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
            aria-hidden
          >
            {/* Track */}
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="#2A2A35"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated fill */}
            <path
              ref={desktopLineRef}
              d="M 0 1 L 100 1"
              stroke="#D2151E"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              style={{ strokeDasharray: "100 100", strokeDashoffset: 100 }}
            />
          </svg>

          <div ref={stepsContainerRef} className="grid grid-cols-4 gap-4 lg:gap-8">
            {PROCESS.map((step, i) => (
              <div
                key={step.step}
                className="process-step group relative flex flex-col items-center text-center"
              >
                {/* Pulsing red dot on the line — .process-dot is GSAP yoyo target */}
                <div className="process-dot relative mb-8 flex h-4 w-4 items-center justify-center bg-[#D2151E]" aria-hidden />
                {/* Number — useGsapCounter counts from 0 → step number on scroll-in */}
                <ProcessCounter value={step.step} delay={0.4 + i * 0.18} className="text-[60px] font-bold leading-none tracking-tight text-[#D2151E] transition-colors duration-300 group-hover:text-white lg:text-[72px]" />
                {/* Title */}
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-white lg:text-[22px]">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="mt-3 max-w-xs text-[15px] font-normal leading-[1.6] text-white/60">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-14 md:hidden">
          <div ref={mobileStepsRef} className="relative pl-12">
            {/* Vertical line track */}
            <div className="absolute left-[14px] top-1 bottom-1 w-[2px] bg-[#2A2A35]" aria-hidden />
            {/* Animated fill — GSAP scaleY from 0 → 1 */}
            <div
              ref={mobileLineRef}
              className="absolute left-[14px] top-1 bottom-1 w-[2px] origin-top bg-[#D2151E]"
              style={{ transform: "scaleY(0)" }}
              aria-hidden
            />
            <div className="flex flex-col gap-10">
              {PROCESS.map((step, i) => (
                <div
                  key={step.step}
                  className="process-step relative"
                >
                  {/* Pulsing dot */}
                  <span className="process-dot absolute -left-[34px] top-2 flex h-4 w-4 items-center justify-center bg-[#D2151E]" aria-hidden />
                  <ProcessCounter value={step.step} delay={i * 0.12} className="text-[44px] font-bold leading-none tracking-tight text-[#D2151E]" />
                  <h3 className="mt-3 text-[20px] font-bold leading-snug text-white">{step.title}</h3>
                  <p className="mt-2 text-[15px] font-normal leading-[1.6] text-white/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process step counter (uses useGsapCounter hook) ---------- */
function ProcessCounter({
  value,
  delay,
  className,
}: {
  value: number;
  delay: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // useGsapCounter counts from 0 → value when the ref scrolls into view.
  // `delay` is passed through so each step's counter is staggered.
  useGsapCounter(ref, value, { duration: 1.4, delay });
  return <span ref={ref} className={className}>0</span>;
}

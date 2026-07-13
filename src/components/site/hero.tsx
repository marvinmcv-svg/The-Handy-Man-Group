import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { HERO_IMAGE, SITE } from "@/lib/site-data";

export function Hero() {
  return (
    <section id="top" className="relative bg-[#121117] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Professional handyman using a power drill on a renovation project"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121117] via-[#121117]/85 to-[#121117]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-drill relative">
        <div className="flex min-h-[640px] flex-col justify-center py-20 md:min-h-[720px] md:py-28 lg:min-h-[760px]">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]"
                  />
                ))}
              </span>
              <span className="text-[12px] font-medium tracking-wide text-white/80">
                4.9/5 from 600+ reviews across Australia
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-[56px] md:text-[72px] lg:text-[88px]">
              The handyman
              <br />
              you actually{" "}
              <span className="text-[#D2151E]">trust</span>.
            </h1>

            {/* Subhead */}
            <p className="mt-6 max-w-xl text-[17px] font-normal leading-[1.6] text-white/75 md:text-[19px]">
              Licensed carpenters, painters, plumbers and electricians — all
              under one roof. From quick fixes to full renovations, we deliver
              premium workmanship with honest, fixed-price quotes.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#B01118] active:bg-[#900F15]"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex h-12 items-center justify-center border border-white/40 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Call {SITE.phone}
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-normal text-white/60">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#D2151E]" />
                $20M public liability
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
              <span>Licensed &amp; insured</span>
              <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
              <span>12-month workmanship guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip at bottom */}
      <div className="relative border-t border-white/10 bg-[#0B0B0F]">
        <div className="container-drill grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            { v: "12+", l: "Years in business" },
            { v: "4,800+", l: "Jobs completed" },
            { v: "98%", l: "Repeat clients" },
            { v: "24/7", l: "Emergency call-outs" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center md:py-8">
              <div className="text-[28px] font-semibold text-white md:text-[36px]">
                {s.v}
              </div>
              <div className="mt-1 text-[12px] font-normal uppercase tracking-wide text-white/50 md:text-[13px]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

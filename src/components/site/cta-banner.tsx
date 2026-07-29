"use client";

import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { CTA_IMAGE, SITE } from "@/lib/site-data";
import { useGsapParallax, useGsapTextReveal, useGsapStagger } from "@/components/site/gsap-utils";
import { useLanguage } from "@/components/site/language-provider";

// Inline SVG noise pattern for grain overlay (kept tiny, no network request)
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/></svg>`
  );

export function CtaBanner() {
  const { t } = useLanguage();

  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);

  // Deep parallax on the background image (driven by useGsapParallax hook)
  useGsapParallax(bgRef, { speed: 0.3, start: "top bottom", end: "bottom top" });

  // Char-by-char reveal for the heading
  useGsapTextReveal(headingRef, t("cta.title1"), { delay: 0.1, stagger: 0.025 });

  // Stagger the CTA buttons in from the bottom
  useGsapStagger(ctaRowRef, ".cta-btn", { stagger: 0.12, y: 24 });

  return (
    <section
      className="relative overflow-hidden bg-[#121117] text-white"
      aria-labelledby="cta-heading"
    >
      {/* Parallax background image — useGsapParallax drives its Y position */}
      <div ref={bgRef} className="absolute inset-0" aria-hidden>
        <img
          src={CTA_IMAGE}
          alt="Carpentry workshop with timber and tools"
          className="h-[140%] w-full object-cover opacity-50"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay — heavy charcoal on left, transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #121117 0%, rgba(18,17,23,0.92) 35%, rgba(18,17,23,0.7) 60%, rgba(18,17,23,0.35) 100%)",
        }}
        aria-hidden
      />
      {/* Vertical fade for content legibility on mobile */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,17,23,0.6) 0%, rgba(18,17,23,0.85) 60%, rgba(18,17,23,0.95) 100%)",
        }}
        aria-hidden
      />
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")`, backgroundSize: "160px 160px" }}
        aria-hidden
      />

      <div className="container-drill relative py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D2151E]" aria-hidden />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D2151E]">
              {SITE.slogan}
            </span>
          </div>

          {/* Heading — useGsapTextReveal splits the title1 into chars and reveals one by one.
              The hook rebuilds the span's innerHTML with char spans, so title1 lives in a
              dedicated empty <span ref>. Title2 (red) is a separate React-rendered span. */}
          <h2
            id="cta-heading"
            className="text-[40px] font-bold leading-[0.95] tracking-tight sm:text-[48px] md:text-[80px] lg:text-[88px]"
          >
            <span ref={headingRef} aria-label={t("cta.title1")} />
            <br />
            <span className="text-[#D2151E]">{t("cta.title2")}</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-[16px] font-normal leading-[1.6] text-white/75 md:text-[18px]">
            {t("cta.body")}
          </p>

          {/* CTAs — useGsapStagger slides each .cta-btn up from below as the row enters view */}
          <div ref={ctaRowRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="cta-btn no-tap-highlight group inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#D2151E] px-8 py-3 text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#B01118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2151E]"
            >
              {t("hero.cta.quote")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href={SITE.phoneHref}
              className="cta-btn no-tap-highlight inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/40 px-8 py-3 text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Phone className="h-4 w-4" />
              {t("hero.cta.call")} {SITE.phone}
            </a>
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
            <span>{SITE.licensing}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <span>Family owned by {SITE.founders}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <span>Established {SITE.foundedYear}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

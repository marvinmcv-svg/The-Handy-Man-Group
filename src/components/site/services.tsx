"use client";

import { motion } from "framer-motion";
import {
  Hammer,
  Wrench,
  Ruler,
  Building2,
  Trees,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";
import { GALLERY_IMAGES } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  Hammer,
  Wrench,
  Ruler,
  Building2,
  Trees,
  Sparkles,
};

// Fallback backgrounds for the featured card when a service has no `photo` set.
// Index maps loosely to the service category imagery (deck, bathroom, etc).
const FEATURED_FALLBACK = GALLERY_IMAGES[3] ?? GALLERY_IMAGES[0];

export type ServiceItem = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  points: string[];
  photo: string | null;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Services({ services }: { services: ServiceItem[] }) {
  const { t } = useLanguage();

  if (!services || services.length === 0) return null;

  const [featured, ...rest] = services;
  const FeaturedIcon = ICONS[featured.icon] ?? Hammer;
  const featuredPhoto = featured.photo ?? FEATURED_FALLBACK;

  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-drill">
        {/* ──────────────  Header  ────────────── */}
        <Reveal className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
            {t("services.eyebrow")}
          </span>
          <h2 className="mt-4 text-[44px] font-bold leading-[0.95] tracking-tight text-[#121117] sm:text-[56px] md:text-[80px]">
            {t("services.title")}
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] md:text-[18px] font-normal leading-[1.65] text-[#333333]">
            {t("services.subtitle")}
          </p>
        </Reveal>

        {/* ──────────────  Featured (large) card  ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          className="mt-14 md:mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative block aspect-[16/11] w-full overflow-hidden bg-[#121117] sm:aspect-[16/9] md:aspect-[16/7]"
          >
            {/* Background image */}
            <motion.img
              src={featuredPhoto}
              alt={`${featured.title} — feature service`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: EASE }}
              whileHover={{ scale: 1.08 }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-[#121117]/55 to-[#121117]/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121117]/70 via-transparent to-transparent" />

            {/* Top row: icon + label */}
            <div className="absolute left-6 top-6 flex items-center gap-3 md:left-10 md:top-10">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex h-12 w-12 items-center justify-center bg-[#D2151E] text-white md:h-14 md:w-14"
              >
                <FeaturedIcon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
              </motion.div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 md:text-[12px]">
                Featured Service
              </span>
            </div>

            {/* Bottom: content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="max-w-2xl">
                <h3 className="text-[28px] font-bold leading-[0.95] tracking-tight text-white sm:text-[36px] md:text-[48px]">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-xl text-[13px] font-normal leading-[1.55] text-white/80 md:mt-4 md:text-[16px]">
                  {featured.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 md:mt-6">
                  {featured.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-[12px] font-medium text-white/90 md:text-[14px]"
                    >
                      <span className="h-1.5 w-1.5 bg-[#D2151E]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[12px] font-semibold text-white transition-colors group-hover:border-[#D2151E] group-hover:text-[#D2151E] md:mt-8 md:text-[14px]">
                  {t("services.getQuote")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* ──────────────  Grid of remaining services  ────────────── */}
        <StaggerGroup
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-8"
          stagger={0.1}
        >
          {rest.map((service) => {
            const Icon = ICONS[service.icon] ?? Hammer;
            const hasPhoto = !!service.photo;

            return (
              <StaggerItem key={service.id} y={28}>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative flex h-full flex-col overflow-hidden border border-[#E5E5E5] bg-white transition-colors hover:border-[#121117]"
                >
                  {/* Image header (if photo) */}
                  {hasPhoto && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#121117]">
                      <motion.img
                        src={service.photo as string}
                        alt={`${service.title} — service photo`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.8, ease: EASE }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121117]/45 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                      {/* Icon overlapping bottom-left of image */}
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center bg-[#121117] text-white shadow-lg transition-colors group-hover:bg-[#D2151E]"
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </motion.div>
                    </div>
                  )}

                  {/* Body */}
                  <div
                    className={`flex flex-1 flex-col p-6 md:p-8 ${hasPhoto ? "pt-10" : ""}`}
                  >
                    {!hasPhoto && (
                      <div className="mb-5 flex items-center justify-between">
                        <motion.div
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          className="flex h-12 w-12 items-center justify-center bg-[#F3F4F6] text-[#121117] transition-colors group-hover:bg-[#121117] group-hover:text-white"
                        >
                          <Icon className="h-6 w-6" strokeWidth={2} />
                        </motion.div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#999999] transition-colors group-hover:text-[#D2151E]">
                          0{rest.indexOf(service) + 2}
                        </span>
                      </div>
                    )}

                    <h3 className="text-[22px] font-bold leading-tight tracking-tight text-[#121117] md:text-[26px]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-normal leading-[1.6] text-[#333333] md:text-[15px]">
                      {service.blurb}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {service.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2.5 text-[13px] font-normal text-[#333333] md:text-[14px]"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 bg-[#D2151E]" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[#121117] transition-colors group-hover:text-[#D2151E] md:text-[14px]">
                      {t("services.getQuote")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

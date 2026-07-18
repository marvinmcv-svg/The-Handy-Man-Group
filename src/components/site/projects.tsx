"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  X,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";
import { SITE } from "@/lib/site-data";

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
};

// Preferred display order of filter tabs (only those present in data appear).
const PREFERRED_ORDER = [
  "All",
  "Carpentry",
  "Renovation",
  "Commercial",
  "Landscaping",
  "Makeover",
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Alternating aspect ratios for a masonry-like rhythm.
const ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[1/1]"];

export function Projects({ projects }: { projects: ProjectItem[] }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive filter tabs from present categories, ordered by PREFERRED_ORDER.
  const presentCategories = Array.from(
    new Set(projects.map((p) => p.category)),
  );
  const filterTabs = PREFERRED_ORDER.filter(
    (tab) => tab === "All" || presentCategories.includes(tab),
  );

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredProjects.length,
    );
  }, [filteredProjects.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredProjects.length) % filteredProjects.length,
    );
  }, [filteredProjects.length]);

  // Body-scroll lock + keyboard nav while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const currentProject =
    lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <section id="projects" className="bg-[#F3F4F6] py-24 md:py-32">
      <div className="container-drill">
        {/* ──────────────  Header  ────────────── */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
              {t("projects.eyebrow")}
            </span>
            <h2 className="mt-4 text-[44px] font-bold leading-[0.95] tracking-tight text-[#121117] sm:text-[56px] md:text-[80px]">
              {t("projects.title")}
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] font-normal leading-[1.65] text-[#333333]">
              {t("projects.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 border border-[#121117] px-6 text-[14px] font-semibold text-[#121117] transition-colors hover:bg-[#121117] hover:text-white"
            >
              {t("projects.viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* ──────────────  Filter tabs  ────────────── */}
        <Reveal delay={0.1} className="mt-12">
          <div
            className="flex flex-wrap gap-2 md:gap-3"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab)}
                  className={`relative h-10 px-4 text-[12px] font-semibold uppercase tracking-wide transition-colors md:h-11 md:px-5 md:text-[13px] ${
                    isActive
                      ? "bg-[#121117] text-white"
                      : "bg-transparent text-[#121117] hover:bg-[#121117]/10"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ──────────────  Masonry grid  ────────────── */}
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 md:gap-6 [column-fill:_balance]">
          {filteredProjects.map((project, idx) => {
            const aspect = ASPECTS[idx % ASPECTS.length];
            return (
              <motion.button
                key={`${activeFilter}-${project.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: (idx % 6) * 0.06,
                  ease: EASE,
                }}
                onClick={() => openLightbox(idx)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-[#121117] text-left md:mb-6"
                aria-label={`Open project: ${project.title}, ${project.category} in ${project.location}`}
              >
                <div className={`relative overflow-hidden ${aspect}`}>
                  <motion.img
                    src={project.image}
                    alt={`${project.title} — ${project.category} in ${project.location}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Persistent subtle gradient at the bottom for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121117]/60 via-transparent to-transparent" />

                  {/* Hover dark overlay */}
                  <div className="absolute inset-0 bg-[#121117]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category badge top-left */}
                  <span className="absolute left-4 top-4 bg-[#121117] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white md:text-[11px]">
                    {project.category}
                  </span>

                  {/* View arrow top-right (appears on hover) */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center bg-[#D2151E] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>

                  {/* Bottom: location + title (slide up on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="flex translate-y-2 items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-white/80 transition-transform duration-300 group-hover:translate-y-0">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </span>
                    <h3 className="mt-1.5 translate-y-2 text-[18px] font-bold leading-tight tracking-tight text-white transition-transform duration-300 group-hover:translate-y-0 md:text-[22px]">
                      {project.title}
                    </h3>
                    <span className="mt-3 block translate-y-2 text-[12px] font-semibold uppercase tracking-wide text-[#D2151E] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {t("projects.viewProject")} →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Empty-state (e.g. if a filter has no matches) */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 border border-[#DDDDDD] bg-white p-10 text-center">
            <p className="text-[14px] font-medium text-[#333333]">
              No projects in this category yet — check back soon.
            </p>
          </div>
        )}
      </div>

      {/* ──────────────  Lightbox modal  ────────────── */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121117]/95 p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery viewer"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close project viewer"
              className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#D2151E]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous project"
              className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#D2151E] md:left-6"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next project"
              className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#D2151E] md:right-6"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Card */}
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-[#1c1c25]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121117]">
                <img
                  src={currentProject.image}
                  alt={`${currentProject.title} — ${currentProject.category} in ${currentProject.location}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-y-auto p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#D2151E] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white md:text-[11px]">
                    {currentProject.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-white/60">
                    <MapPin className="h-3 w-3" />
                    {currentProject.location}
                  </span>
                  {lightboxIndex !== null && filteredProjects.length > 1 && (
                    <span className="ml-auto text-[11px] font-medium text-white/40">
                      {lightboxIndex + 1} / {filteredProjects.length}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-[24px] font-bold leading-tight tracking-tight text-white md:text-[32px]">
                  {currentProject.title}
                </h3>
                <p className="mt-3 text-[15px] font-normal leading-[1.6] text-white/70 md:text-[16px]">
                  {currentProject.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                  <Link
                    href="#contact"
                    onClick={closeLightbox}
                    className="inline-flex h-11 items-center gap-2 bg-[#D2151E] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#B01118]"
                  >
                    Request a similar job
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={closeLightbox}
                    className="inline-flex h-11 items-center px-5 text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

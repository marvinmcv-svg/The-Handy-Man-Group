"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Play, X, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";
import { useLanguage } from "@/components/site/language-provider";

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  video: string | null;
  image: string | null;
  order: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<TestimonialItem | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const count = testimonials.length;

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + count) % Math.max(count, 1));
    },
    [count]
  );

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  // Autoplay with pause-on-hover
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, count, paginate]);

  // Keyboard nav
  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    },
    [paginate]
  );

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#F3F4F6] py-24 md:py-32"
      aria-labelledby="reviews-heading"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-48 right-0 h-[28rem] w-[28rem] rounded-full bg-[#D2151E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-56 -left-32 h-[34rem] w-[34rem] rounded-full bg-[#121117]/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #121117 1px, transparent 1px), linear-gradient(to bottom, #121117 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-drill relative">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D2151E]">
              {t("testimonials.eyebrow")}
            </span>
            <h2
              id="reviews-heading"
              className="mt-4 text-[40px] font-bold leading-[0.98] tracking-tight text-[#121117] md:text-[72px]"
            >
              {t("testimonials.title1")}
              <br />
              <span className="text-[#D2151E]">{t("testimonials.title2")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] font-normal leading-[1.6] text-[#333333] md:text-[17px]">
              {t("testimonials.subtitle")}
            </p>
          </Reveal>

          {/* Rating badge */}
          <Reveal delay={0.15}>
            <div className="flex items-center gap-5 border border-[#DADCE0] bg-white px-6 py-5 shadow-[0_4px_0_0_#121117]">
              <div className="flex flex-col">
                <span className="text-[44px] font-bold leading-none text-[#121117]">5.0</span>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#999999]">
                  {t("testimonials.rating")}
                </span>
              </div>
              <span className="h-12 w-px bg-[#E5E7EB]" aria-hidden />
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[18px] w-[18px] fill-[#D2151E] text-[#D2151E]" />
                  ))}
                </div>
                <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#999999]">
                  {t("testimonials.verified")}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        {count > 0 ? (
          <div
            className="relative mt-14 md:mt-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onKeyDown={onKey}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials carousel"
          >
            {/* Slide viewport */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonials[index].id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${count}`}
                >
                  <CarouselSlide
                    testimonial={testimonials[index]}
                    onPlay={() => setActiveVideo(testimonials[index])}
                    videoBadge={t("testimonials.videoBadge")}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              {/* Dots + counter */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
                  {testimonials.map((tm, i) => (
                    <button
                      key={tm.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => goTo(i)}
                      className="group relative h-3 w-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2151E]"
                    >
                      <span
                        className={`block h-3 w-3 transition-all duration-300 ${
                          i === index
                            ? "bg-[#D2151E]"
                            : "bg-[#121117]/20 group-hover:bg-[#121117]/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#999999]">
                  <span className="text-[#121117]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-[#DADCE0]" aria-hidden />
                  <span>{String(count).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center bg-[#121117] text-white transition-colors hover:bg-[#D2151E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2151E] disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={count <= 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center bg-[#121117] text-white transition-colors hover:bg-[#D2151E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2151E] disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={count <= 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 border border-[#DADCE0] bg-white p-12 text-center text-[15px] text-[#999999]">
            No testimonials yet. Add some from the admin portal.
          </div>
        )}
      </div>

      <VideoModal
        testimonial={activeVideo}
        onClose={() => setActiveVideo(null)}
        videoLabel={t("testimonials.video")}
      />
    </section>
  );
}

/* ---------- Carousel slide ---------- */
function CarouselSlide({
  testimonial,
  onPlay,
  videoBadge,
}: {
  testimonial: TestimonialItem;
  onPlay: () => void;
  videoBadge: string;
}) {
  const isVideo = !!testimonial.video;
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  if (isVideo) {
    return (
      <div className="grid grid-cols-1 overflow-hidden bg-white shadow-[0_6px_0_0_#121117] lg:grid-cols-2">
        {/* Video thumbnail */}
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play video testimonial from ${testimonial.name}`}
          className="group relative aspect-video overflow-hidden bg-[#121117] lg:aspect-auto"
        >
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={`${testimonial.name} video testimonial`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a23] to-[#121117]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-[#121117]/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex h-20 w-20 items-center justify-center bg-[#D2151E] text-white shadow-2xl shadow-black/50"
            >
              <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
              <span className="absolute inset-0 animate-ping bg-[#D2151E] opacity-20" aria-hidden />
            </motion.div>
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-[#D2151E] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            <Video className="h-3 w-3" />
            {videoBadge}
          </span>
        </button>

        {/* Quote side */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
          <Quote className="h-12 w-12 text-[#D2151E]" />
          <div className="mt-4 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#D2151E] text-[#D2151E]" />
            ))}
          </div>
          <blockquote className="mt-5 text-[20px] font-normal leading-[1.55] text-[#121117] md:text-[26px]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4 border-t border-[#E5E7EB] pt-6">
            <div className="flex h-12 w-12 items-center justify-center bg-[#121117] text-[15px] font-bold text-white">
              {initials}
            </div>
            <div>
              <div className="text-[16px] font-bold text-[#121117]">{testimonial.name}</div>
              <div className="text-[13px] font-normal text-[#999999]">{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Text-only slide
  return (
    <div className="relative bg-white p-8 shadow-[0_6px_0_0_#121117] md:p-14 lg:p-16">
      <Quote className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 text-[#D2151E]/[0.06] md:h-56 md:w-56" aria-hidden />
      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <Quote className="h-12 w-12 flex-shrink-0 text-[#D2151E]" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#D2151E] text-[#D2151E]" />
            ))}
          </div>
        </div>
        <blockquote className="mt-6 max-w-4xl text-[24px] font-normal leading-[1.45] text-[#121117] md:text-[34px] md:leading-[1.4]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-10 flex items-center gap-4 border-t border-[#E5E7EB] pt-6">
          <div className="flex h-14 w-14 items-center justify-center bg-[#121117] text-[18px] font-bold text-white">
            {initials}
          </div>
          <div>
            <div className="text-[17px] font-bold text-[#121117]">{testimonial.name}</div>
            <div className="text-[14px] font-normal text-[#999999]">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Video modal player ---------- */
function VideoModal({
  testimonial,
  onClose,
  videoLabel,
}: {
  testimonial: TestimonialItem | null;
  onClose: () => void;
  videoLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!testimonial) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 100);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [testimonial, onClose]);

  return (
    <AnimatePresence>
      {testimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${testimonial.name}`}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-3xl bg-[#121117]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-[#D2151E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D2151E]"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              ref={videoRef}
              src={testimonial.video ?? undefined}
              poster={testimonial.image ?? undefined}
              className="aspect-video w-full bg-black"
              controls
              autoPlay
              playsInline
            />
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center bg-[#D2151E] text-[15px] font-bold text-white">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-bold text-white">{testimonial.name}</div>
                <div className="text-[13px] font-normal text-white/60">{testimonial.role}</div>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#D2151E] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                <Video className="h-2.5 w-2.5" />
                {videoLabel}
              </span>
              <div className="hidden gap-0.5 sm:flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D2151E] text-[#D2151E]" />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

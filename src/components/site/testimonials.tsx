"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Play, X, Video } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion-primitives";

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

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [activeVideo, setActiveVideo] = useState<TestimonialItem | null>(null);

  const videoTestimonials = testimonials.filter((t) => t.video);
  const textTestimonials = testimonials.filter((t) => !t.video);
  const featured = videoTestimonials[0] ?? null;
  const otherVideos = videoTestimonials.slice(1);

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#F3F4F6] py-16 md:py-28">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#D2151E]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#121117]/5 blur-3xl" />
      </div>

      <div className="container-drill relative">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              Our testimonials
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.02] tracking-tight text-[#121117] md:text-[56px]">
              Real clients.
              <br />
              <span className="text-[#D2151E]">Real reviews.</span>
            </h2>
            <p className="mt-5 text-[16px] font-normal leading-[1.6] text-[#333333] md:text-[17px]">
              Don&apos;t take our word for it — hear directly from Brisbane
              homeowners and businesses who&apos;ve worked with Joe &amp; the team.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4 border border-[#DDDDDD] bg-white px-5 py-4">
              <div className="flex flex-col">
                <span className="text-[32px] font-bold leading-none text-[#121117]">5.0</span>
                <span className="mt-1 text-[12px] font-normal text-[#999999]">Average rating</span>
              </div>
              <span className="h-10 w-px bg-[#DDDDDD]" />
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D2151E] text-[#D2151E]" />
                  ))}
                </div>
                <span className="mt-1 block text-[12px] font-normal text-[#999999]">Verified clients</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Featured video testimonial — large, cinematic */}
        {featured && (
          <Reveal delay={0.1} className="mt-12">
            <FeaturedVideoCard testimonial={featured} onPlay={() => setActiveVideo(featured)} />
          </Reveal>
        )}

        {/* Other video testimonials — horizontal row */}
        {otherVideos.length > 0 && (
          <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {otherVideos.map((t) => (
              <StaggerItem key={t.id}>
                <VideoTestimonialCard testimonial={t} onPlay={() => setActiveVideo(t)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {/* Text-only testimonials — elegant cards */}
        {textTestimonials.length > 0 && (
          <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {textTestimonials.map((t) => (
              <StaggerItem key={t.id}>
                <TextTestimonialCard testimonial={t} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {/* Empty state */}
        {testimonials.length === 0 && (
          <div className="mt-12 border border-[#DDDDDD] bg-white p-12 text-center text-[15px] text-[#999999]">
            No testimonials yet. Add some from the admin portal.
          </div>
        )}
      </div>

      {/* Video modal player */}
      <VideoModal testimonial={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

/* ---------- Featured video card (large, cinematic) ---------- */
function FeaturedVideoCard({
  testimonial,
  onPlay,
}: {
  testimonial: TestimonialItem;
  onPlay: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onPlay}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative block w-full overflow-hidden bg-[#121117] text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Video thumbnail */}
        <div className="relative aspect-video lg:aspect-auto lg:min-h-[420px] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-[#121117]/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#121117]" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex h-20 w-20 items-center justify-center bg-[#D2151E] text-white shadow-2xl shadow-black/50"
            >
              <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
              <span className="absolute inset-0 animate-ping bg-[#D2151E] opacity-20" />
            </motion.div>
          </div>
          {/* Video badge */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-[#D2151E] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            <Video className="h-3 w-3" />
            Video testimonial
          </span>
        </div>

        {/* Quote content */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <Quote className="h-10 w-10 text-[#D2151E]" />
          <blockquote className="mt-5 text-[18px] font-normal leading-[1.55] text-white md:text-[22px]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#D2151E] text-[16px] font-bold text-white">
              {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <div className="text-[16px] font-bold text-white">{testimonial.name}</div>
              <div className="text-[13px] font-normal text-white/60">{testimonial.role}</div>
            </div>
            <div className="ml-auto flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#D2151E] text-[#D2151E]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ---------- Smaller video testimonial card ---------- */
function VideoTestimonialCard({
  testimonial,
  onPlay,
}: {
  testimonial: TestimonialItem;
  onPlay: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onPlay}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex h-full w-full flex-col overflow-hidden bg-white text-left"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#121117]">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={`${testimonial.name} video testimonial`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a23] to-[#121117]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121117]/70 to-transparent" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex h-14 w-14 items-center justify-center bg-[#D2151E] text-white shadow-xl shadow-black/40 transition-transform group-hover:scale-110"
          >
            <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
          </motion.div>
        </div>
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-[#121117]/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          <Video className="h-2.5 w-2.5" />
          Video
        </span>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
          ))}
        </div>
        <blockquote className="flex-1 text-[14px] font-normal leading-[1.6] text-[#333333] line-clamp-4">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-5 flex items-center gap-3 border-t border-[#DDDDDD] pt-4">
          <div className="flex h-10 w-10 items-center justify-center bg-[#121117] text-[13px] font-bold text-white">
            {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-bold text-[#121117] truncate">{testimonial.name}</div>
            <div className="text-[12px] font-normal text-[#999999] truncate">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ---------- Text-only testimonial card ---------- */
function TextTestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex h-full flex-col bg-white p-7 md:p-8"
    >
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-[#D2151E]" />
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] font-normal leading-[1.65] text-[#333333]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4 border-t border-[#DDDDDD] pt-5">
        <div className="flex h-11 w-11 items-center justify-center bg-[#121117] text-[15px] font-bold text-white">
          {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1">
          <figcaption className="text-[15px] font-bold text-[#121117]">{testimonial.name}</figcaption>
          <p className="text-[13px] font-normal text-[#999999]">{testimonial.role}</p>
        </div>
      </div>
    </motion.figure>
  );
}

/* ---------- Video modal player ---------- */
function VideoModal({
  testimonial,
  onClose,
}: {
  testimonial: TestimonialItem | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape + trap focus inside the modal (basic accessibility).
  useEffect(() => {
    if (!testimonial) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    // Focus the close button when the modal opens.
    const t = setTimeout(() => closeBtnRef.current?.focus(), 100);
    // Lock body scroll while modal is open.
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
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${testimonial.name}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-3xl bg-[#121117]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-[#D2151E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D2151E]"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Video */}
            <video
              ref={videoRef}
              src={testimonial.video ?? undefined}
              poster={testimonial.image ?? undefined}
              className="aspect-video w-full bg-black"
              controls
              autoPlay
              playsInline
            />
            {/* Caption bar */}
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center bg-[#D2151E] text-[15px] font-bold text-white">
                {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-bold text-white">{testimonial.name}</div>
                <div className="text-[13px] font-normal text-white/60">{testimonial.role}</div>
              </div>
              <div className="hidden flex sm:flex">
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

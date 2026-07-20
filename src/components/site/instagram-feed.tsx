"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";
import { SITE } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";

// Real Instagram post shortcodes scraped from @thehandymangroup via imginn
const IG_POSTS = [
  { shortcode: "DVDiTY0ExGn", likes: 22, comments: 4, caption: "Latest project work" },
  { shortcode: "DSPReuMk0x7", likes: 18, comments: 2, caption: "On the tools" },
  { shortcode: "DQ8KmNIk2_N", likes: 12, comments: 1, caption: "Before & after" },
  { shortcode: "DQWRN2Qkwjk", likes: 10, comments: 1, caption: "Carpentry detail" },
  { shortcode: "DPlPoAWE4Eu", likes: 14, comments: 2, caption: "Site progress" },
  { shortcode: "DO-TifIk6Ck", likes: 22, comments: 4, caption: "Finished deck" },
  { shortcode: "DOsP9pqkzbY", likes: 10, comments: 3, caption: "Renovation work" },
  { shortcode: "DOKc5Dxk2Ci", likes: 12, comments: 1, caption: "Structural landscaping" },
  { shortcode: "DN44D6Dk0Vd", likes: 10, comments: 1, caption: "Commercial fit-out" },
  { shortcode: "DNM0jJGR_dH", likes: 18, comments: 2, caption: "Handyman repairs" },
  { shortcode: "DM7W6IHRxwc", likes: 16, comments: 0, caption: "Custom joinery" },
  { shortcode: "DL9EgZ3PXf9", likes: 9, comments: 2, caption: "Workshop" },
];

export function InstagramFeed() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  function markLoaded(idx: number) {
    setLoadedIframes((prev) => new Set(prev).add(idx));
  }

  return (
    <section id="instagram" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              {SITE.instagramHandle}
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.02] tracking-tight text-[#121117] md:text-[52px]">
              {t("ig.title")}
            </h2>
            <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[#333333] md:text-[17px]">
              {t("ig.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-12 items-center gap-2 bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              <Instagram className="h-4 w-4" />
              {t("ig.follow")} {SITE.instagramHandle}
            </motion.a>
          </Reveal>
        </div>

        {/* Clean uniform square grid */}
        <div
          ref={containerRef}
          className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:gap-4"
        >
          {IG_POSTS.map((post, idx) => {
            const isLoaded = loadedIframes.has(idx);
            const isHovered = hovered === idx;
            return (
              <motion.a
                key={post.shortcode}
                href={`https://www.instagram.com/p/${post.shortcode}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Instagram post: ${post.caption}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.4,
                  delay: (idx % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setHovered(idx)}
                onHoverEnd={() => setHovered(null)}
                className="group relative block aspect-square overflow-hidden bg-[#121117]"
              >
                {/* Instagram embed iframe — cropped to show only the media (square portion) */}
                <iframe
                  src={`https://www.instagram.com/p/${post.shortcode}/embed/?cr=1&v=14&wp=540&rd=&rp=`}
                  title={`Instagram post ${post.shortcode}`}
                  loading="lazy"
                  scrolling="no"
                  onLoad={() => markLoaded(idx)}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[400px] origin-center -translate-x-1/2 -translate-y-[42%] scale-[0.34] border-0 sm:scale-[0.5] md:scale-[0.44] lg:scale-[0.38]"
                />

                {/* Loading state */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="h-8 w-8 animate-pulse text-white/20" />
                  </div>
                )}

                {/* Hover overlay */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#121117] via-[#121117]/40 to-transparent p-3 sm:p-4"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="flex items-center gap-1 text-[12px] font-semibold sm:text-[13px]">
                      <Heart className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-semibold sm:text-[13px]">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-[11px] font-medium text-white/80 sm:text-[12px]">
                    {post.caption}
                  </p>
                </motion.div>

                {/* Instagram icon — always visible top-right */}
                <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center bg-[#121117]/50 backdrop-blur-sm sm:h-8 sm:w-8">
                  <Instagram className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                </div>

                {/* View arrow — appears on hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-2 bottom-2 z-10 flex h-8 w-8 items-center justify-center bg-[#D2151E] sm:h-10 sm:w-10"
                >
                  <ArrowUpRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-[14px] font-normal text-[#999999]">
            122 posts · 1.3K followers · {SITE.instagramBio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

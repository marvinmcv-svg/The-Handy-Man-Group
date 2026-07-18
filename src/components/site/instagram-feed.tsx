"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";
import { SITE } from "@/lib/site-data";

// Real Instagram post shortcodes scraped from @thehandymangroup via imginn
const IG_POSTS = [
  { shortcode: "DVDiTY0ExGn", caption: "Latest project work" },
  { shortcode: "DSPReuMk0x7", caption: "On the tools" },
  { shortcode: "DQ8KmNIk2_N", caption: "Before & after" },
  { shortcode: "DQWRN2Qkwjk", caption: "Carpentry detail" },
  { shortcode: "DPlPoAWE4Eu", caption: "Site progress" },
  { shortcode: "DO-TifIk6Ck", caption: "Finished deck" },
  { shortcode: "DOsP9pqkzbY", caption: "Renovation work" },
  { shortcode: "DOKc5Dxk2Ci", caption: "Structural landscaping" },
  { shortcode: "DN44D6Dk0Vd", caption: "Commercial fit-out" },
  { shortcode: "DNM0jJGR_dH", caption: "Handyman repairs" },
  { shortcode: "DM7W6IHRxwc", caption: "Custom joinery" },
  { shortcode: "DL9EgZ3PXf9", caption: "Workshop" },
];

// Shape of the Instagram embed.js global injected by the SDK.
interface InstagramEmbedGlobal {
  Embeds: { process: () => void };
}

declare global {
  interface Window {
    instgrm?: InstagramEmbedGlobal;
  }
}

export function InstagramFeed() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [hovered, setHovered] = useState<number | null>(null);

  // Load Instagram embed script
  useEffect(() => {
    if (document.getElementById("instagram-embedjs")) return;
    const s = document.createElement("script");
    s.id = "instagram-embedjs";
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Process embeds when visible count changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [visibleCount]);

  function loadMore() {
    setVisibleCount((c) => Math.min(c + 4, IG_POSTS.length));
  }

  const visiblePosts = IG_POSTS.slice(0, visibleCount);

  return (
    <section id="instagram" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <Reveal className="text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            @thehandymangroup
          </span>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[52px]">
            Straight from our Instagram
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] font-normal leading-[1.6] text-[#333333]">
            Real photos and videos from real jobs across Brisbane. Tap any post
            to view it on Instagram — give us a follow for daily updates.
          </p>
          <motion.a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mt-6 inline-flex h-12 items-center gap-2 bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
          >
            <Instagram className="h-4 w-4" />
            Follow {SITE.instagramHandle}
          </motion.a>
        </Reveal>

        {/* Instagram embed grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={post.shortcode}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: (idx % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onHoverStart={() => setHovered(idx)}
              onHoverEnd={() => setHovered(null)}
              className="relative overflow-hidden bg-white"
            >
              {/* Official Instagram embed */}
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`https://www.instagram.com/p/${post.shortcode}/`}
                data-instgrm-version="14"
                data-instgrm-captioned={false}
                style={{
                  background: "#FFF",
                  border: 0,
                  margin: 0,
                  padding: 0,
                  width: "100%",
                }}
              />

              {/* Hover overlay with caption + view button */}
              <motion.div
                animate={{ opacity: hovered === idx ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#121117]/80 via-transparent to-transparent p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-semibold text-white">
                    {post.caption}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Load more button */}
        {visibleCount < IG_POSTS.length && (
          <Reveal delay={0.15} className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={loadMore}
              className="inline-flex h-12 items-center border border-[#121117] px-8 text-[14px] font-semibold text-[#121117] transition-colors hover:bg-[#121117] hover:text-white"
            >
              Load more posts
            </motion.button>
          </Reveal>
        )}

        {/* Bottom note */}
        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-[14px] font-normal text-[#999999]">
            122 posts · 1.3K followers · {SITE.instagramBio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

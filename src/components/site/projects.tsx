"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PROJECTS, SITE } from "@/lib/site-data";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion-primitives";

export function Projects() {
  return (
    <section id="projects" className="bg-white py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              Explore
            </span>
            <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-tight text-[#121117] md:text-[56px]">
              Our Projects
            </h2>
            <p className="mt-5 text-[17px] font-normal leading-[1.6] text-[#333333]">
              A selection of recent carpentry, renovation and handyman work
              across Brisbane. Every job — big or small — gets the same care
              and attention to detail.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 border border-[#121117] px-6 text-[14px] font-semibold text-[#121117] transition-colors hover:bg-[#121117] hover:text-white"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Project grid */}
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group flex h-full flex-col bg-white"
              >
                {/* Image with overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F4F6]">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} — ${project.category} in ${project.location}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121117]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-[-8px] items-center justify-center bg-[#D2151E] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <span className="absolute left-4 top-4 bg-[#121117] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {project.category}
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col pt-5">
                  <span className="text-[12px] font-medium uppercase tracking-wide text-[#999999]">
                    {project.location}
                  </span>
                  <h3 className="mt-2 text-[22px] font-bold leading-tight text-[#121117]">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] font-normal leading-[1.55] text-[#333333]">
                    {project.description}
                  </p>
                  <Link
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#121117] transition-colors hover:text-[#D2151E]"
                  >
                    View Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Instagram CTA */}
        <Reveal delay={0.2} className="mt-14">
          <div className="flex flex-col items-center justify-between gap-5 border-t border-[#DDDDDD] pt-10 md:flex-row">
            <div>
              <h3 className="text-[22px] font-bold text-[#121117]">
                See our latest work on Instagram
              </h3>
              <p className="mt-1 text-[15px] font-normal text-[#333333]">
                {SITE.instagramHandle} — {SITE.instagramBio}
              </p>
            </div>
            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-12 items-center bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              Follow {SITE.instagramHandle}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

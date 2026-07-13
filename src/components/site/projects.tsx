import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/site-data";

export function Projects() {
  return (
    <section id="projects" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              Recent work
            </span>
            <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[52px]">
              Projects we&apos;re proud of.
            </h2>
            <p className="mt-5 text-[17px] font-normal leading-[1.6] text-[#333333]">
              A selection of recent carpentry, renovation and painting projects
              across Sydney. Every job is fully licensed, insured and backed by
              our workmanship guarantee.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-12 items-center border border-[#121117] px-6 text-[14px] font-medium text-[#121117] transition-colors hover:bg-[#121117] hover:text-white"
          >
            Start your project
          </a>
        </div>

        {/* Project grid (asymmetric) */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {PROJECTS.map((project, idx) => {
            const spanClass =
              project.span === "wide"
                ? "md:col-span-2"
                : project.span === "tall"
                ? "row-span-2"
                : "";
            const aspectClass =
              project.span === "tall"
                ? "aspect-[3/4] md:aspect-auto md:h-full"
                : project.span === "wide"
                ? "aspect-[16/10]"
                : "aspect-square";
            return (
              <Link
                key={project.id}
                href="#contact"
                className={`group relative block overflow-hidden bg-[#121117] ${spanClass} ${
                  idx === 0 ? "col-span-2 md:col-span-2" : ""
                }`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.category} in ${project.location}`}
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${aspectClass}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-[#121117]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

                {/* Top-right arrow */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-[#D2151E]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D2151E]">
                    {project.category}
                  </span>
                  <h3 className="mt-1.5 text-[18px] font-semibold leading-tight md:text-[20px]">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-normal text-white/70">
                    {project.location}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Instagram strip */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#DDDDDD] pt-10 md:flex-row">
          <div>
            <h3 className="text-[22px] font-semibold text-[#121117]">
              Follow our latest work on Instagram
            </h3>
            <p className="mt-1 text-[15px] font-normal text-[#333333]">
              @thehandymangroup — daily project updates and before/after
              transformations.
            </p>
          </div>
          <a
            href="https://www.instagram.com/thehandymangroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center bg-[#D2151E] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#B01118]"
          >
            Follow @thehandymangroup
          </a>
        </div>
      </div>
    </section>
  );
}

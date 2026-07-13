import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F3F4F6] py-16 md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
              Client reviews
            </span>
            <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[52px]">
              Loved by homeowners
              <br className="hidden md:block" /> and businesses alike.
            </h2>
          </div>
          <div className="flex items-center gap-4 border border-[#DDDDDD] bg-white px-5 py-4">
            <div className="flex flex-col">
              <span className="text-[32px] font-semibold leading-none text-[#121117]">
                4.9
              </span>
              <span className="mt-1 text-[12px] font-normal text-[#999999]">
                Average rating
              </span>
            </div>
            <span className="h-10 w-px bg-[#DDDDDD]" />
            <div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#D2151E] text-[#D2151E]"
                  />
                ))}
              </div>
              <span className="mt-1 block text-[12px] font-normal text-[#999999]">
                600+ reviews
              </span>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={t.id}
              className={`flex flex-col bg-white p-7 md:p-8 ${
                idx === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <Quote className="h-7 w-7 text-[#D2151E]" />
              <blockquote className="mt-4 flex-1 text-[16px] font-normal leading-[1.65] text-[#333333]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-[#DDDDDD] pt-5">
                <div className="flex h-11 w-11 items-center justify-center bg-[#121117] text-[15px] font-semibold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1">
                  <figcaption className="text-[15px] font-semibold text-[#121117]">
                    {t.name}
                  </figcaption>
                  <p className="text-[13px] font-normal text-[#999999]">
                    {t.role}
                  </p>
                </div>
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#D2151E] text-[#D2151E]"
                    />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

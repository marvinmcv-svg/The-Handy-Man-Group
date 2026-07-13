import {
  Hammer,
  Ruler,
  PaintRoller,
  Wrench,
  Plug,
  Grid3x3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  Hammer,
  Ruler,
  PaintRoller,
  Wrench,
  Plug,
  Grid3x3,
};

export function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="container-drill">
        {/* Section header */}
        <div className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            What we do
          </span>
          <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[52px]">
            One team for every job
            <br className="hidden md:block" /> around your home or business.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] font-normal leading-[1.6] text-[#333333]">
            No more juggling three different trades. Our in-house team covers
            carpentry, renovations, painting, maintenance, plumbing, electrical
            and more — coordinated, accountable and guaranteed.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-12 grid grid-cols-1 gap-px bg-[#DDDDDD] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Hammer;
            return (
              <div
                key={service.id}
                className="group flex flex-col bg-white p-7 transition-colors hover:bg-[#F3F4F6] md:p-9"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#121117] text-white transition-colors group-hover:bg-[#D2151E]">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-[22px] font-semibold text-[#121117]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] font-normal leading-[1.6] text-[#333333]">
                  {service.blurb}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-[14px] font-normal text-[#333333]"
                    >
                      <span className="h-1.5 w-1.5 bg-[#D2151E]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[#121117] transition-colors hover:text-[#D2151E]"
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

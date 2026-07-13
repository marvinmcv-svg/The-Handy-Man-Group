import { Check, ShieldCheck, Award, Clock4 } from "lucide-react";
import { ABOUT_IMAGE, SITE } from "@/lib/site-data";

const POINTS = [
  "Fully licensed carpenters, plumbers, electricians and painters",
  "$20M public liability insurance on every job",
  "Fixed-price quotes — no hourly surprises, ever",
  "Police-checked, uniformed tradespeople",
  "12-month workmanship guarantee on all completed work",
  "One project manager for the whole job, start to finish",
];

const BADGES = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Award, label: "Master Builders Member" },
  { icon: Clock4, label: "On-Time Guarantee" },
];

export function About() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F4F6]">
            <img
              src={ABOUT_IMAGE}
              alt="A professional tradesperson from The Handy Man Group on site"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-2 hidden bg-[#121117] p-6 text-white md:block lg:-right-6">
            <div className="text-[44px] font-semibold leading-none text-[#D2151E]">
              12+
            </div>
            <div className="mt-2 max-w-[160px] text-[13px] font-normal leading-tight text-white/70">
              Years delivering quality trades work across Australia
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            About us
          </span>
          <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[48px]">
            A family-run team built on
            <br className="hidden md:block" /> honest, reliable work.
          </h2>
          <p className="mt-5 text-[17px] font-normal leading-[1.7] text-[#333333]">
            Founded in 2013, The Handy Man Group started as a one-ute carpentry
            business and has grown into a multi-trade team serving thousands of
            Australian homes and businesses. We&apos;ve kept the same promise
            since day one: turn up on time, do quality work, and charge exactly
            what we quoted.
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[15px] font-normal leading-snug text-[#333333]"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D2151E]" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>

          {/* Badges */}
          <div className="mt-9 flex flex-wrap gap-4 border-t border-[#DDDDDD] pt-7">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 text-[14px] font-medium text-[#121117]"
              >
                <b.icon className="h-5 w-5 text-[#D2151E]" strokeWidth={2} />
                {b.label}
              </div>
            ))}
          </div>

          <p className="mt-7 text-[14px] font-normal text-[#999999]">
            Servicing: {SITE.serviceArea}
          </p>
        </div>
      </div>
    </section>
  );
}

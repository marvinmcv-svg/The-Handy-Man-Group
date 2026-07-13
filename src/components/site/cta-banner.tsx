import { Phone, ArrowRight } from "lucide-react";
import { CTA_IMAGE, SITE } from "@/lib/site-data";

export function CtaBanner() {
  return (
    <section className="relative bg-[#121117] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={CTA_IMAGE}
          alt="Carpentry workshop with timber and tools"
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121117] via-[#121117]/85 to-[#121117]/60" />
      </div>

      <div className="container-drill relative py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-tight md:text-[60px]">
            Got a job that needs
            <br />
            <span className="text-[#D2151E]">doing properly?</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] font-normal leading-[1.6] text-white/75">
            Send us a few details and we&apos;ll come back within one business
            day with a fixed-price quote. No call-out fees, no obligation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#B01118]"
            >
              Get my free quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/40 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

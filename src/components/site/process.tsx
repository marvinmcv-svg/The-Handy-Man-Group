import { PROCESS } from "@/lib/site-data";

export function Process() {
  return (
    <section id="process" className="bg-[#121117] py-16 text-white md:py-24">
      <div className="container-drill">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            How we work
          </span>
          <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[52px]">
            A clear process,
            <br className="hidden md:block" /> no guesswork.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] font-normal leading-[1.6] text-white/70">
            From the first phone call to the final walk-through, you&apos;ll
            always know what&apos;s happening, when, and what it costs.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col bg-[#121117] p-7 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[44px] font-semibold leading-none text-[#D2151E]">
                  {step.step}
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>
              <h3 className="mt-6 text-[20px] font-semibold leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] font-normal leading-[1.6] text-white/65">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

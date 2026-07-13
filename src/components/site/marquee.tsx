import { Hammer, Ruler, PaintRoller, Wrench, Plug, Grid3x3, Star } from "lucide-react";

const ITEMS = [
  { icon: Hammer, label: "Carpentry" },
  { icon: Ruler, label: "Renovations" },
  { icon: PaintRoller, label: "Painting" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Plug, label: "Plumbing" },
  { icon: Grid3x3, label: "Tiling" },
  { icon: Star, label: "Free Quotes" },
  { icon: Hammer, label: "Decking" },
  { icon: Ruler, label: "Fit-outs" },
  { icon: PaintRoller, label: "Decorating" },
];

export function Marquee() {
  return (
    <section
      aria-label="Services overview"
      className="overflow-hidden border-y border-[#DDDDDD] bg-[#121117] py-5 text-white"
    >
      <div className="flex w-max animate-marquee items-center gap-10">
        {[...ITEMS, ...ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 whitespace-nowrap text-[15px] font-medium uppercase tracking-[0.06em] text-white/85"
          >
            <item.icon className="h-5 w-5 text-[#D2151E]" strokeWidth={2} />
            {item.label}
            <span className="ml-7 h-1 w-1 bg-white/30" />
          </div>
        ))}
      </div>
    </section>
  );
}

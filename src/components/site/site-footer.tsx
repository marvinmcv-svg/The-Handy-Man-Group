import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Hammer, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-data";

const FOOTER_SERVICES = [
  "Carpentry",
  "Handyman Services",
  "Renovations",
  "Commercial Spaces",
  "Structural Landscaping",
  "Home Makeovers",
];

const FOOTER_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#why-us", label: "Why us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Get a quote" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#121117] text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-drill flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="text-[26px] font-bold leading-tight md:text-[34px]">
              Ready to uplift your space?
            </h3>
            <p className="mt-2 max-w-xl text-[16px] font-normal text-white/70">
              Contact us today to book your free onsite inspection. No job is too small.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-6 text-[14px] font-semibold text-white transition-colors hover:bg-white/10">
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a href="#contact" className="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-drill grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="#top" className="flex items-center gap-2.5 text-white" aria-label={`${SITE.name} home`}>
            <span className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white">
              <Hammer className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[14px] font-bold tracking-tight">Handyman &amp; Carpentry</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">Group · Brisbane</span>
            </span>
          </Link>
          <p className="mt-5 text-[14px] font-normal leading-[1.7] text-white/60">
            Family-owned by Joe &amp; Claudia. Licensed carpentry, handyman
            services, renovations and structural landscaping across Brisbane
            since {SITE.foundedYear}. Formerly Joe Lewis Handyman.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D2151E] hover:border-[#D2151E]">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D2151E] hover:border-[#D2151E]">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">Services</h4>
          <ul className="mt-5 space-y-3">
            {FOOTER_SERVICES.map((s) => (
              <li key={s}>
                <Link href="#services" className="text-[14px] font-normal text-white/80 transition-colors hover:text-[#D2151E]">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">Explore</h4>
          <ul className="mt-5 space-y-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] font-normal text-white/80 transition-colors hover:text-[#D2151E]">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">Get in touch</h4>
          <ul className="mt-5 space-y-4 text-[14px] font-normal text-white/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <a href={SITE.emailHref} className="hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <span>{SITE.serviceArea}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-drill flex flex-col items-center justify-between gap-3 py-6 text-[13px] font-normal text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. {SITE.licensing}.</p>
          <p className="text-white/40">Family owned by {SITE.founders} · {SITE.slogan}</p>
        </div>
      </div>
    </footer>
  );
}

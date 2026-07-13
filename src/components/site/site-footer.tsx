import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Hammer,
  ArrowRight,
} from "lucide-react";
import { SITE } from "@/lib/site-data";

const FOOTER_SERVICES = [
  "Carpentry & Joinery",
  "Home Renovations",
  "Painting & Decorating",
  "Property Maintenance",
  "Plumbing & Electrical",
  "Tiling & Flooring",
];

const FOOTER_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "How we work" },
  { href: "#about", label: "About us" },
  { href: "#testimonials", label: "Reviews" },
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
            <h3 className="text-[28px] font-semibold leading-tight md:text-[36px]">
              Ready to start your project?
            </h3>
            <p className="mt-2 max-w-xl text-[16px] font-normal text-white/70">
              Call us now or request a free, no-obligation quote. Licensed,
              insured, and proud of every job we finish.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-6 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#B01118]"
            >
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
          <Link
            href="#top"
            className="flex items-center gap-2 text-white"
            aria-label={`${SITE.name} home`}
          >
            <span className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white">
              <Hammer className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight">
                The Handy Man Group
              </span>
              <span className="text-[11px] font-normal text-white/50">
                {SITE.tagline}
              </span>
            </span>
          </Link>
          <p className="mt-5 text-[14px] font-normal leading-[1.7] text-white/60">
            Licensed, insured tradespeople delivering premium carpentry,
            renovations and property maintenance across Australia since 2013.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D2151E] hover:border-[#D2151E]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D2151E] hover:border-[#D2151E]"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/50">
            Services
          </h4>
          <ul className="mt-5 space-y-3">
            {FOOTER_SERVICES.map((s) => (
              <li key={s}>
                <Link
                  href="#services"
                  className="text-[14px] font-normal text-white/80 transition-colors hover:text-[#D2151E]"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/50">
            Explore
          </h4>
          <ul className="mt-5 space-y-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] font-normal text-white/80 transition-colors hover:text-[#D2151E]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/50">
            Get in touch
          </h4>
          <ul className="mt-5 space-y-4 text-[14px] font-normal text-white/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <a href={SITE.phoneHref} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <a href={SITE.emailHref} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D2151E]" />
              <span>{SITE.address}</span>
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
          <p>
            © {new Date().getFullYear()} {SITE.name}. {SITE.abn}. All rights
            reserved.
          </p>
          <p className="text-white/40">
            Licensed · Insured · Police-checked team
          </p>
        </div>
      </div>
    </footer>
  );
}

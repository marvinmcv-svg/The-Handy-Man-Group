"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Hammer } from "lucide-react";
import { SITE } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_#DDDDDD]" : "border-b border-transparent"
      }`}
    >
      <div className="container-drill">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="#top"
            className="flex items-center gap-2 text-[#121117]"
            aria-label={`${SITE.name} home`}
          >
            <span className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white">
              <Hammer className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight md:text-[17px]">
                The Handy Man Group
              </span>
              <span className="hidden text-[11px] font-normal text-[#999999] sm:block">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[16px] font-normal text-[#333333] transition-colors hover:text-[#000000]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-[15px] font-medium text-[#121117] transition-colors hover:text-[#D2151E]"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              {SITE.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center bg-[#D2151E] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#B01118] active:bg-[#900F15]"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center text-[#121117] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute left-0 right-0 z-50 flex flex-col gap-1 border-t border-[#DDDDDD] bg-white px-4 py-4"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center px-2 text-[16px] font-normal text-[#333333] hover:bg-[#F3F4F6] hover:text-[#000000]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-[#DDDDDD] pt-4">
              <a
                href={SITE.phoneHref}
                className="flex h-12 items-center justify-center gap-2 border border-[#121117] text-[15px] font-medium text-[#121117]"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center bg-[#D2151E] text-[15px] font-medium text-white"
              >
                Get a Free Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

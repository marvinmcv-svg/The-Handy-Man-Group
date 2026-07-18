"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, Hammer, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on Escape (accessibility).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#DDDDDD,0_8px_24px_-12px_rgba(0,0,0,0.12)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-drill">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16 md:h-20"}`}>
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2.5 text-[#121117]" aria-label={`${SITE.name} home`}>
            <motion.span
              whileHover={{ rotate: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white"
            >
              <Hammer className="h-5 w-5" strokeWidth={2.5} />
            </motion.span>
            <span className="flex flex-col leading-none">
              <span className="text-[14px] font-bold tracking-tight md:text-[16px]">
                Handyman &amp; Carpentry
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-[#999999] sm:block">
                Group · Brisbane
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[15px] font-medium text-[#333333] transition-colors hover:text-[#121117]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#D2151E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-[14px] font-semibold text-[#121117] transition-colors hover:text-[#D2151E]"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              {SITE.phone}
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-11 items-center gap-1.5 bg-[#D2151E] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex h-11 w-11 items-center justify-center text-[#121117] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-14 z-40 bg-black/50 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#DDDDDD] bg-white lg:hidden"
              aria-label="Mobile"
            >
              <div className="container-drill flex flex-col py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center text-[16px] font-medium text-[#333333] hover:text-[#D2151E]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 flex flex-col gap-3 border-t border-[#DDDDDD] pt-4">
                  <a href={SITE.phoneHref} className="flex h-12 items-center justify-center gap-2 border border-[#121117] text-[15px] font-semibold text-[#121117]">
                    <Phone className="h-4 w-4" />
                    {SITE.phone}
                  </a>
                  <a href="#contact" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center bg-[#D2151E] text-[15px] font-semibold text-white">
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

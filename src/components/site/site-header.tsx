"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";
import { LanguageToggle } from "@/components/site/language-toggle";
import type { TranslationKey } from "@/lib/i18n";

// Reduced to 5 primary links (was 7) — FAQ moved to mobile menu only
const NAV_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "#services", key: "nav.services" },
  { href: "#projects", key: "nav.projects" },
  { href: "#about", key: "nav.about" },
  { href: "#reviews", key: "nav.reviews" },
  { href: "#contact", key: "nav.contact" },
];

// Extra links shown only in the mobile menu
const MOBILE_EXTRA_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "#why-us", key: "nav.whyUs" },
  { href: "#faq", key: "nav.faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

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
          {/* Logo — new HCG logo image */}
          <Link href="#top" className="flex items-center gap-3 text-[#121117]" aria-label={`${SITE.name} home`}>
            <motion.img
              src="/ai-media/logo-hcg.png"
              alt="The Handyman & Carpentry Group logo"
              className="h-9 w-9 object-contain md:h-10 md:w-10"
              whileHover={{ rotate: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <span className="flex flex-col leading-none">
              <span className="text-[14px] font-bold tracking-tight md:text-[16px]">
                Handyman &amp; Carpentry
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-[#999999] sm:block">
                Group · Brisbane
              </span>
            </span>
          </Link>

          {/* Desktop nav — 5 links only */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[15px] font-medium text-[#333333] transition-colors hover:text-[#121117]"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#D2151E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — language toggle + quote button only (phone removed) */}
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageToggle variant="light" />
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-10 items-center gap-1.5 bg-[#D2151E] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#B01118]"
            >
              {t("nav.getQuote")}
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
                {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link, i) => (
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
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-[#DDDDDD] pt-4">
                  <LanguageToggle variant="light" />
                </div>
                <div className="mt-3">
                  <a href="#contact" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center bg-[#D2151E] text-[15px] font-semibold text-white">
                    {t("nav.getQuote")}
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

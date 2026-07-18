"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/site/language-provider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LanguageToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useLanguage();

  const baseColor =
    variant === "dark"
      ? "border-white/20 text-white/70 hover:text-white hover:border-white/40"
      : "border-[#DDDDDD] text-[#333333] hover:text-[#121117] hover:border-[#121117]";

  const activeColor =
    variant === "dark"
      ? "bg-white text-[#121117]"
      : "bg-[#121117] text-white";

  return (
    <div
      className={`inline-flex items-center border ${baseColor} overflow-hidden`}
      role="group"
      aria-label="Language selector"
    >
      {LOCALES.map((loc: Locale) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={active}
            className={`relative inline-flex h-8 items-center justify-center px-3 text-[12px] font-bold tracking-wide transition-colors ${
              active ? activeColor : ""
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0"
                transition={{ duration: 0.25, ease: EASE }}
              />
            )}
            <span className="relative z-10">{LOCALE_LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}

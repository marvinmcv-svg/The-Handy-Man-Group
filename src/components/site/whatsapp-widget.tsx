"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_URL =
  "https://wa.me/61730535274?text=Hi%20Joe%2C%20I'd%20like%20to%20chat%20about%20a%20job.";

const STORAGE_KEY = "hg-wa-card-seen";

// Inline WhatsApp glyph (lucide doesn't ship a brand-correct WhatsApp icon)
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 2.05.55 3.97 1.5 5.62L4 28l7.5-2.4a11.04 11.04 0 0 0 4.54.98h.01c6.1 0 11.05-4.95 11.05-11.06C27.1 8.95 22.15 4 16.04 4Zm0 20.2c-1.43 0-2.83-.39-4.05-1.11l-.29-.17-4.45 1.42 1.45-4.33-.19-.3a9.07 9.07 0 0 1-1.4-4.85c0-5.04 4.1-9.13 9.14-9.13 2.44 0 4.74.95 6.46 2.68a9.08 9.08 0 0 1 2.67 6.46c0 5.04-4.1 9.13-9.14 9.13Zm5.01-6.83c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32Z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [showCard, setShowCard] = useState(false);
  const [cardDismissed, setCardDismissed] = useState(false);

  // Show slide-out card after 3s, only once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // sessionStorage may be unavailable; fall through
    }
    const t = setTimeout(() => setShowCard(true), 3000);
    return () => clearTimeout(t);
  }, []);

  function dismissCard() {
    setShowCard(false);
    setCardDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  function openWhatsApp() {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
    dismissCard();
  }

  return (
    <div className="fixed z-[60] bottom-5 left-5 sm:bottom-6 sm:left-6 flex flex-col items-start gap-3">
      {/* Slide-out card */}
      <AnimatePresence>
        {showCard && !cardDismissed && (
          <motion.div
            key="wa-card"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-[260px] bg-white shadow-2xl shadow-black/30 border border-[#121117]/10 p-4"
          >
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismissCard}
              className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center text-[#999] hover:text-[#121117] hover:bg-[#F3F4F6] transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-start gap-3 pr-4">
              <div className="inline-flex h-9 w-9 items-center justify-center bg-[#25D366] text-white shrink-0">
                <WhatsAppGlyph className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#121117] leading-snug">
                  Need a quick answer?
                </p>
                <p className="text-xs text-[#666] mt-0.5 leading-relaxed">
                  Message Joe on WhatsApp — we usually reply fast during work
                  hours.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={openWhatsApp}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-sm font-semibold py-2.5 transition-colors"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              Open WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button + tooltip */}
      <div className="group relative">
        {/* Tooltip (desktop hover) */}
        <span
          role="tooltip"
          className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#121117] text-white text-xs font-medium px-3 py-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg shadow-black/30 hidden sm:block"
        >
          Chat with us on WhatsApp
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#121117]" />
        </span>

        {/* Pulse ripple (square — Framer Motion controlled) */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-[#25D366]/40"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-[#25D366]/30"
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.1,
          }}
        />

        {/* Notification badge */}
        <span className="absolute -top-1.5 -right-1.5 z-10 inline-flex h-5 w-5 items-center justify-center bg-[#D2151E] text-white text-[10px] font-bold ring-2 ring-white">
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            1
          </motion.span>
        </span>

        {/* Main button */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative inline-flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-2xl shadow-black/30 hover:bg-[#1fb855] transition-colors"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppGlyph className="h-7 w-7" />
          {/* subtle inner ring */}
          <span className="absolute inset-0 ring-2 ring-white/30 pointer-events-none" />
        </motion.a>
      </div>
    </div>
  );
}

export default WhatsAppWidget;

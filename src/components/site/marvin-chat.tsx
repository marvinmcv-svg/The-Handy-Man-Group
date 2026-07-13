"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles, AlertCircle } from "lucide-react";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const EASE = [0.22, 1, 0.36, 1] as const;

const QUICK_REPLIES = [
  "What services do you offer?",
  "Are you licensed?",
  "Book a free quote",
  "What areas do you service?",
];

const GREETING =
  "Hi! I'm Marvin, Joe's AI bot assistant 👋 I help visitors with questions about our carpentry, handyman and renovation services in Brisbane. How can I help you today?";

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export function MarvinChat() {
  const [open, setOpen] = useState(false);
  // Initialise with Marvin's greeting — only visible once the panel opens.
  const [messages, setMessages] = useState<Msg[]>([
    { id: nextId(), role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages / typing / panel open
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Focus the input shortly after the panel opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMsg: Msg = { id: nextId(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const payload = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok || !data.reply) {
        const errMsg =
          data?.error ||
          "Marvin's having trouble right now. Please try again, or call Joe on (07) 3053 5274.";
        setError(errMsg);
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: data.reply as string },
      ]);
      setLoading(false);
    } catch {
      setError(
        "Marvin's having trouble connecting right now. Please call Joe on (07) 3053 5274 or email info@thehandymangroup.com.au."
      );
      setLoading(false);
    }
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const showQuickReplies = messages.length <= 1 && !loading && !error;

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        aria-label="Open Marvin chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-[60] bottom-5 right-5 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-[#121117] text-white pl-3 pr-4 py-3 shadow-2xl shadow-black/40 hover:bg-[#1f1f27] transition-colors"
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          className="relative inline-flex h-9 w-9 items-center justify-center bg-[#D2151E]"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </motion.span>
        <span className="text-sm font-semibold tracking-tight hidden sm:inline">
          {open ? "Close" : "Marvin"}
        </span>
        {!open && (
          <span className="absolute -top-1 -left-1 h-3 w-3 bg-[#D2151E] rounded-full ring-2 ring-white">
            <span className="absolute inset-0 bg-[#D2151E] rounded-full animate-ping opacity-75" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="marvin-panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed z-[61] inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[560px] flex flex-col bg-white shadow-2xl shadow-black/40 border border-[#121117]/10"
          >
            {/* Header */}
            <header className="flex items-center justify-between bg-[#121117] text-white px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative inline-flex h-9 w-9 items-center justify-center bg-[#D2151E] shrink-0">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold tracking-tight truncate">
                      Marvin
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                      AI bot
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-60" />
                      <span className="relative inline-flex h-2 w-2 bg-[#25D366] rounded-full" />
                    </span>
                    <span className="text-[11px] text-white/70">
                      Joe&apos;s AI bot assistant · Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto drill-scroll bg-white px-4 py-4 space-y-3"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}

              {loading && <TypingIndicator />}

              {error && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#FFDEDE] text-[#121117] px-3 py-2 text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-[#D2151E]" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {showQuickReplies && (
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#999] mb-2 uppercase tracking-wider font-medium">
                    <Sparkles className="h-3 w-3" />
                    Suggested questions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="text-xs font-medium text-[#121117] bg-[#F3F4F6] hover:bg-[#121117] hover:text-white px-3 py-1.5 transition-colors border border-transparent hover:border-[#121117]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[#121117]/10 bg-white p-3">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask Marvin anything…"
                  disabled={loading}
                  className="flex-1 min-w-0 bg-[#F3F4F6] text-[#121117] placeholder:text-[#999] text-sm px-3 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-[#D2151E]/30 disabled:opacity-50"
                  aria-label="Type your message"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 items-center justify-center bg-[#D2151E] text-white hover:bg-[#b8121a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {loading ? (
                    <motion.span
                      className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-[10px] text-[#999] text-center">
                Powered by AI · For bookings call{" "}
                <a
                  href="tel:+61730535274"
                  className="font-semibold text-[#D2151E] hover:underline"
                >
                  (07) 3053 5274
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-[#D2151E] text-white"
            : "bg-[#F3F4F6] text-[#121117]"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="bg-[#F3F4F6] text-[#121117] px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block h-2 w-2 bg-[#121117] rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default MarvinChat;

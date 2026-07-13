"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check, Loader2, AlertCircle } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site-data";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      suburb: data.get("suburb"),
      service: data.get("service"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(
        json.message ||
          "Thanks! Your quote request has been received. We'll be in touch within one business day."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please call us instead.");
    }
  }

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="container-drill grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: info */}
        <div className="lg:col-span-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#D2151E]">
            Get a quote
          </span>
          <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-tight text-[#121117] md:text-[48px]">
            Tell us about
            <br className="hidden md:block" /> your project.
          </h2>
          <p className="mt-5 text-[17px] font-normal leading-[1.6] text-[#333333]">
            Fill in the form and we&apos;ll come back within one business day
            with a fixed-price quote. Prefer to talk? Call us — a real person
            picks up.
          </p>

          <div className="mt-9 space-y-5 border-t border-[#DDDDDD] pt-8">
            <a
              href={SITE.phoneHref}
              className="flex items-start gap-4 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F3F4F6] text-[#D2151E] transition-colors group-hover:bg-[#D2151E] group-hover:text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[12px] font-medium uppercase tracking-wide text-[#999999]">
                  Call us
                </span>
                <span className="text-[18px] font-semibold text-[#121117]">
                  {SITE.phone}
                </span>
              </span>
            </a>
            <a
              href={SITE.emailHref}
              className="flex items-start gap-4 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F3F4F6] text-[#D2151E] transition-colors group-hover:bg-[#D2151E] group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[12px] font-medium uppercase tracking-wide text-[#999999]">
                  Email us
                </span>
                <span className="text-[18px] font-semibold text-[#121117]">
                  {SITE.email}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F3F4F6] text-[#D2151E]">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[12px] font-medium uppercase tracking-wide text-[#999999]">
                  Visit us
                </span>
                <span className="text-[16px] font-medium text-[#121117]">
                  {SITE.address}
                </span>
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F3F4F6] text-[#D2151E]">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[12px] font-medium uppercase tracking-wide text-[#999999]">
                  Hours
                </span>
                <span className="text-[16px] font-medium text-[#121117]">
                  {SITE.hours}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <div className="bg-[#F3F4F6] p-6 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center bg-[#D2151E] text-white">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </div>
                <h3 className="mt-6 text-[26px] font-semibold text-[#121117]">
                  Quote request received
                </h3>
                <p className="mt-3 max-w-md text-[16px] font-normal leading-relaxed text-[#333333]">
                  {message}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="mt-7 inline-flex h-11 items-center border border-[#121117] px-6 text-[14px] font-medium text-[#121117] transition-colors hover:bg-[#121117] hover:text-white"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                      className="drill-input"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone" required>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="04xx xxx xxx"
                      className="drill-input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Email" htmlFor="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@example.com"
                      className="drill-input"
                    />
                  </Field>
                  <Field label="Suburb" htmlFor="suburb">
                    <input
                      id="suburb"
                      name="suburb"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="e.g. Bondi, NSW"
                      className="drill-input"
                    />
                  </Field>
                </div>

                <Field label="What do you need?" htmlFor="service" required>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="drill-input appearance-none bg-white"
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Other">Other / Not sure</option>
                  </select>
                </Field>

                <Field
                  label="Project details"
                  htmlFor="message"
                  required
                  hint="Tell us what you're trying to achieve, rough timing, and anything else useful."
                >
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    placeholder="e.g. We'd like to replace our old kitchen with a modern galley layout, including new cabinetry, stone benchtop and appliance install. Looking to start in about 6 weeks."
                    className="drill-input resize-y"
                  />
                </Field>

                {status === "error" && (
                  <div className="flex items-start gap-3 border border-[#D2151E] bg-[#FFDEDE] p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#D2151E]" />
                    <p className="text-[14px] font-normal text-[#121117]">
                      {message}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] font-normal text-[#999999]">
                    We&apos;ll never share your details. No spam, ever.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-8 text-[15px] font-medium text-white transition-colors hover:bg-[#B01118] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Request my free quote"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Shared input styling */}
      <style jsx>{`
        :global(.drill-input) {
          width: 100%;
          height: 53px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0 15px;
          font-size: 14px;
          font-family: var(--font-public-sans), sans-serif;
          color: #333333;
          outline: none;
          transition: border-color 0.15s ease;
        }
        :global(.drill-input::placeholder) {
          color: #999999;
        }
        :global(.drill-input:focus) {
          border-color: #121117;
        }
        :global(textarea.drill-input) {
          height: auto;
          padding: 14px 15px;
          line-height: 21px;
          min-height: 140px;
        }
        :global(select.drill-input) {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[13px] font-semibold text-[#121117]"
      >
        {label}
        {required && <span className="ml-1 text-[#D2151E]">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-[12px] font-normal text-[#999999]">{hint}</p>
      )}
    </div>
  );
}

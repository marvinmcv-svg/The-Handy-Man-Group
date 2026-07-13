"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Loader2, Phone, Mail, Clock, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

type Settings = Record<string, string>;

const SECTIONS = [
  {
    title: "Homepage Hero",
    icon: null,
    fields: [
      { key: "hero.headline", label: "Hero headline", type: "text", hint: "The big bold text on the hero" },
      { key: "hero.subhead", label: "Hero subheading", type: "textarea", hint: "The paragraph below the headline" },
      { key: "hero.trustBadge1", label: "Trust badge 1", type: "text" },
      { key: "hero.trustBadge2", label: "Trust badge 2", type: "text" },
      { key: "hero.trustBadge3", label: "Trust badge 3", type: "text" },
    ],
  },
  {
    title: "Contact Information",
    icon: Phone,
    fields: [
      { key: "contact.phone", label: "Phone number", type: "text" },
      { key: "contact.email", label: "Email address", type: "text" },
      { key: "contact.hours", label: "Business hours", type: "text" },
      { key: "contact.serviceArea", label: "Service area", type: "text" },
    ],
  },
  {
    title: "Social Media",
    icon: Instagram,
    fields: [
      { key: "social.instagram", label: "Instagram URL", type: "text" },
      { key: "social.instagramHandle", label: "Instagram handle", type: "text" },
      { key: "social.facebook", label: "Facebook URL", type: "text" },
      { key: "social.whatsapp", label: "WhatsApp number (international format, no +)", type: "text", hint: "e.g. 61730535274 for (07) 3053 5274" },
    ],
  },
  {
    title: "Marquee Strip",
    icon: null,
    fields: [
      { key: "marquee.items", label: "Marquee items (separated by |)", type: "textarea", hint: "e.g. Carpentry|Handyman Services|Renovations" },
    ],
  },
];

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [saving, setSaving] = useState(false);

  function update(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to save");
      toast.success("Settings saved — changes live on the site within 60s");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {SECTIONS.map((section) => (
        <div key={section.title} className="border border-[#DDDDDD] bg-white p-6">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#121117]">
            {section.icon && <section.icon className="h-5 w-5 text-[#D2151E]" />}
            {section.title}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <label htmlFor={field.key} className="mb-2 block text-[13px] font-semibold text-[#121117]">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    value={settings[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    rows={3}
                    className="w-full border border-[#DDDDDD] bg-white p-3 text-[14px] outline-none focus:border-[#121117]"
                  />
                ) : (
                  <input
                    id={field.key}
                    type="text"
                    value={settings[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    className="h-11 w-full border border-[#DDDDDD] bg-white px-3 text-[14px] outline-none focus:border-[#121117]"
                  />
                )}
                {field.hint && (
                  <p className="mt-1.5 text-[12px] text-[#999999]">{field.hint}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-12 items-center gap-2 bg-[#D2151E] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118] disabled:bg-[#CCCCCC]"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}

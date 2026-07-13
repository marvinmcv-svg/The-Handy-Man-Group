import { db } from "@/lib/db";

// Default settings — used as fallback if not in DB
export const DEFAULT_SETTINGS = {
  "hero.headline": "The group you can trust.",
  "hero.subhead":
    "Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane. Family-owned by Joe & Claudia. No job is too small.",
  "hero.trustBadge1": "QBCC Licensed",
  "hero.trustBadge2": "Master Builders QLD Members",
  "hero.trustBadge3": "Family owned by Joe & Claudia",
  "contact.phone": "(07) 3053 5274",
  "contact.email": "info@thehandymangroup.com.au",
  "contact.hours": "Mon–Fri 7:00am – 5:00pm · Sat by appointment",
  "contact.serviceArea": "Brisbane & Greater Queensland",
  "social.instagram": "https://www.instagram.com/thehandymangroup/",
  "social.facebook": "https://www.facebook.com/thehandymangroup/",
  "social.instagramHandle": "@thehandymangroup",
  "social.whatsapp": "61730535274",
  "marquee.items":
    "Carpentry|Handyman Services|Renovations|Commercial Spaces|Structural Landscaping|Home Makeovers",
};

export type Settings = typeof DEFAULT_SETTINGS;

export async function getSettings(): Promise<Settings> {
  const rows = await db.setting.findMany();
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  return { ...DEFAULT_SETTINGS, ...map } as Settings;
}

export async function getSetting(key: keyof Settings): Promise<string> {
  const row = await db.setting.findUnique({ where: { key } });
  return row?.value ?? DEFAULT_SETTINGS[key];
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function setSettings(values: Record<string, string>): Promise<void> {
  await Promise.all(
    Object.entries(values).map(([key, value]) => setSetting(key, value))
  );
}

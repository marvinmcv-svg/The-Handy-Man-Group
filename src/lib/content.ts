import { db } from "@/lib/db";

export type ServiceData = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  points: string[];
  photo: string | null;
  order: number;
};

export type ProjectData = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  order: number;
};

export type TestimonialData = {
  id: string;
  name: string;
  role: string;
  quote: string;
  video: string | null;
  image: string | null;
  order: number;
};

export type FaqData = {
  id: string;
  q: string;
  a: string;
  order: number;
};

export async function getServices(): Promise<ServiceData[]> {
  const rows = await db.service.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    blurb: r.blurb,
    icon: r.icon,
    points: safeParse(r.points, []),
    photo: r.photo,
    order: r.order,
  }));
}

export async function getProjects(): Promise<ProjectData[]> {
  const rows = await db.project.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    location: r.location,
    description: r.description,
    image: r.image,
    order: r.order,
  }));
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  const rows = await db.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    quote: r.quote,
    video: r.video,
    image: r.image,
    order: r.order,
  }));
}

export async function getFaqs(): Promise<FaqData[]> {
  const rows = await db.faq.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    q: r.q,
    a: r.a,
    order: r.order,
  }));
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function ensureAuth() {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  return null;
}

export async function GET() {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const items = await db.testimonial.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ ok: true, testimonials: items });
  } catch (err) {
    console.error("[admin/testimonials GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const body = await req.json().catch(() => null);
    const { name, role, quote, video, image, order } = body ?? {};

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (typeof quote !== "string" || !quote.trim()) {
      return NextResponse.json(
        { ok: false, error: "Quote is required." },
        { status: 400 }
      );
    }

    const created = await db.testimonial.create({
      data: {
        name: name.trim(),
        role: typeof role === "string" ? role.trim() : "",
        quote: quote.trim(),
        video: typeof video === "string" && video.trim() ? video.trim() : null,
        image: typeof image === "string" && image.trim() ? image.trim() : null,
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });
    return NextResponse.json({ ok: true, testimonial: created });
  } catch (err) {
    console.error("[admin/testimonials POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

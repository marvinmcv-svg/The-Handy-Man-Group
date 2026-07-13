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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const { name, role, quote, video, image, order } = body ?? {};

    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (typeof name === "string" && name.trim()) data.name = name.trim();
    if (typeof role === "string") data.role = role.trim();
    if (typeof quote === "string" && quote.trim()) data.quote = quote.trim();
    if (typeof video === "string") data.video = video.trim() || null;
    if (typeof image === "string") data.image = image.trim() || null;
    if (order !== undefined && Number.isFinite(Number(order)))
      data.order = Number(order);

    const updated = await db.testimonial.update({ where: { id }, data });
    return NextResponse.json({ ok: true, testimonial: updated });
  } catch (err) {
    console.error("[admin/testimonials PUT] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update testimonial." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const { id } = await params;
    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }
    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/testimonials DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}

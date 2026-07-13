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
    const { q, a, order } = body ?? {};

    const existing = await db.faq.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "FAQ not found." },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (typeof q === "string" && q.trim()) data.q = q.trim();
    if (typeof a === "string" && a.trim()) data.a = a.trim();
    if (order !== undefined && Number.isFinite(Number(order)))
      data.order = Number(order);

    const updated = await db.faq.update({ where: { id }, data });
    return NextResponse.json({ ok: true, faq: updated });
  } catch (err) {
    console.error("[admin/faqs PUT] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update FAQ." },
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
    const existing = await db.faq.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "FAQ not found." },
        { status: 404 }
      );
    }
    await db.faq.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/faqs DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete FAQ." },
      { status: 500 }
    );
  }
}

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
    const items = await db.faq.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ ok: true, faqs: items });
  } catch (err) {
    console.error("[admin/faqs GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load FAQs." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const body = await req.json().catch(() => null);
    const { q, a, order } = body ?? {};

    if (typeof q !== "string" || !q.trim()) {
      return NextResponse.json(
        { ok: false, error: "Question is required." },
        { status: 400 }
      );
    }
    if (typeof a !== "string" || !a.trim()) {
      return NextResponse.json(
        { ok: false, error: "Answer is required." },
        { status: 400 }
      );
    }

    const created = await db.faq.create({
      data: {
        q: q.trim(),
        a: a.trim(),
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });
    return NextResponse.json({ ok: true, faq: created });
  } catch (err) {
    console.error("[admin/faqs POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create FAQ." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["new", "contacted", "completed"];

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const { id } = await params;
    const quote = await db.quoteRequest.findUnique({ where: { id } });
    if (!quote) {
      return NextResponse.json(
        { ok: false, error: "Quote request not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, quote });
  } catch (err) {
    console.error("[admin/quotes GET id] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load quote request." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const { status } = body ?? {};

    if (typeof status !== "string" || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid status. Must be one of: new, contacted, completed.",
        },
        { status: 400 }
      );
    }

    const existing = await db.quoteRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Quote request not found." },
        { status: 404 }
      );
    }

    const updated = await db.quoteRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, quote: updated });
  } catch (err) {
    console.error("[admin/quotes PATCH] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update quote request." },
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
    const existing = await db.quoteRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Quote request not found." },
        { status: 404 }
      );
    }
    await db.quoteRequest.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/quotes DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete quote request." },
      { status: 500 }
    );
  }
}

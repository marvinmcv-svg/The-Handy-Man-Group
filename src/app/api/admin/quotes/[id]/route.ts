import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["new", "contacted", "quoted", "accepted", "scheduled", "completed", "declined"];

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
    const { status, notes, quoteAmount } = body ?? {};

    const data: Record<string, string | undefined> = {};
    if (typeof status === "string") {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          { ok: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}.` },
          { status: 400 }
        );
      }
      data.status = status;
    }
    if (typeof notes === "string") {
      data.notes = notes;
    }
    if (typeof quoteAmount === "string" || quoteAmount === null) {
      data.quoteAmount = quoteAmount ?? null;
    }

    const existing = await db.quoteRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Quote request not found." },
        { status: 404 }
      );
    }

    const updated = await db.quoteRequest.update({ where: { id }, data });
    if (status && status !== existing.status) {
      await logActivity("update", "quote", id, `Status changed ${existing.status} → ${status}`);
    }
    if (notes !== undefined && notes !== (existing.notes ?? "")) {
      await logActivity("update", "quote", id, "Updated internal notes");
    }
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
    await logActivity("delete", "quote", id, `Deleted quote from ${existing.name}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/quotes DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete quote request." },
      { status: 500 }
    );
  }
}

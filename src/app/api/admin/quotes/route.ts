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
    const items = await db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, quotes: items });
  } catch (err) {
    console.error("[admin/quotes GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load quote requests." },
      { status: 500 }
    );
  }
}

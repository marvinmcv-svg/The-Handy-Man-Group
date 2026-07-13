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

function parsePoints(points: unknown): string[] {
  if (Array.isArray(points)) {
    return points.map((p) => String(p).trim()).filter(Boolean);
  }
  if (typeof points === "string") {
    return points
      .split(/\r?\n|,/)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
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
    const { title, blurb, icon, points, order } = body ?? {};

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Service not found." },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (typeof title === "string" && title.trim()) data.title = title.trim();
    if (typeof blurb === "string" && blurb.trim()) data.blurb = blurb.trim();
    if (typeof icon === "string") data.icon = icon.trim();
    if (body && "points" in body) data.points = JSON.stringify(parsePoints(points));
    if (order !== undefined && Number.isFinite(Number(order)))
      data.order = Number(order);

    const updated = await db.service.update({ where: { id }, data });
    return NextResponse.json({ ok: true, service: updated });
  } catch (err) {
    console.error("[admin/services PUT] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update service." },
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
    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Service not found." },
        { status: 404 }
      );
    }
    await db.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/services DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete service." },
      { status: 500 }
    );
  }
}

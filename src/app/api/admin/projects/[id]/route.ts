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
    const { title, category, location, description, image, order } = body ?? {};

    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Project not found." },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (typeof title === "string" && title.trim()) data.title = title.trim();
    if (typeof category === "string" && category.trim())
      data.category = category.trim();
    if (typeof location === "string") data.location = location.trim();
    if (typeof description === "string" && description.trim())
      data.description = description.trim();
    if (typeof image === "string") data.image = image.trim();
    if (order !== undefined && Number.isFinite(Number(order)))
      data.order = Number(order);

    const updated = await db.project.update({ where: { id }, data });
    return NextResponse.json({ ok: true, project: updated });
  } catch (err) {
    console.error("[admin/projects PUT] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update project." },
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
    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Project not found." },
        { status: 404 }
      );
    }
    await db.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/projects DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete project." },
      { status: 500 }
    );
  }
}

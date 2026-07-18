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
    const items = await db.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ ok: true, services: items });
  } catch (err) {
    console.error("[admin/services GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load services." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const body = await req.json().catch(() => null);
    const { title, blurb, icon, points, photo, order } = body ?? {};

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title is required." },
        { status: 400 }
      );
    }
    if (typeof blurb !== "string" || !blurb.trim()) {
      return NextResponse.json(
        { ok: false, error: "Blurb is required." },
        { status: 400 }
      );
    }

    const pointsArr = Array.isArray(points)
      ? points.map((p) => String(p).trim()).filter(Boolean)
      : typeof points === "string"
        ? points
            .split(/\r?\n|,/)
            .map((p) => p.trim())
            .filter(Boolean)
        : [];

    const created = await db.service.create({
      data: {
        title: title.trim(),
        blurb: blurb.trim(),
        icon: typeof icon === "string" ? icon.trim() : "Hammer",
        points: JSON.stringify(pointsArr),
        photo: typeof photo === "string" && photo.trim() ? photo.trim() : null,
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });
    return NextResponse.json({ ok: true, service: created });
  } catch (err) {
    console.error("[admin/services POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create service." },
      { status: 500 }
    );
  }
}

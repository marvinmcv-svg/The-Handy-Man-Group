import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

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
    const items = await db.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ ok: true, projects: items });
  } catch (err) {
    console.error("[admin/projects GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const unauth = await ensureAuth();
  if (unauth) return unauth;
  try {
    const body = await req.json().catch(() => null);
    const {
      title,
      category,
      location,
      description,
      image,
      video,
      order,
    } = body ?? {};

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title is required." },
        { status: 400 }
      );
    }
    if (typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { ok: false, error: "Category is required." },
        { status: 400 }
      );
    }
    if (typeof description !== "string" || !description.trim()) {
      return NextResponse.json(
        { ok: false, error: "Description is required." },
        { status: 400 }
      );
    }

    const created = await db.project.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        location: typeof location === "string" ? location.trim() : "",
        description: description.trim(),
        image: typeof image === "string" ? image.trim() : "",
        video:
          typeof video === "string" && video.trim() ? video.trim() : null,
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });

    await logActivity(
      "create",
      "project",
      created.id,
      `Created project "${created.title}"`
    );

    return NextResponse.json({ ok: true, project: created });
  } catch (err) {
    console.error("[admin/projects POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create project." },
      { status: 500 }
    );
  }
}

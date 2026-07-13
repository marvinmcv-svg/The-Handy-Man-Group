import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const typeParam = url.searchParams.get("type");
    const type =
      typeParam === "image" || typeParam === "video" ? typeParam : undefined;

    const items = await db.media.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, media: items });
  } catch (err) {
    console.error("[admin/media GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load media." },
      { status: 500 }
    );
  }
}

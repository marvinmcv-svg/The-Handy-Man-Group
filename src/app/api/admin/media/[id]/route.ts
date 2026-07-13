import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const media = await db.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { ok: false, error: "Media not found." },
        { status: 404 }
      );
    }

    // Delete DB record first
    await db.media.delete({ where: { id } });

    // Then try to remove the file from disk (best-effort)
    try {
      const filePath = path.join(UPLOAD_DIR, media.filename);
      await fs.unlink(filePath);
    } catch (e) {
      // File may already be gone — log but don't fail
      console.error("[media delete] file removal failed:", e);
    }

    await logActivity(
      "delete",
      "media",
      media.id,
      `Deleted ${media.filename}`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/media DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete media." },
      { status: 500 }
    );
  }
}

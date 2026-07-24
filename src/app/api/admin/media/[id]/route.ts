import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// GET — serves the file content directly from the DB (fileData column).
// This is PUBLIC (no auth) so images/videos can be displayed on the public site.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const media = await db.media.findUnique({ where: { id } });

    if (!media || !media.fileData) {
      return new NextResponse("File not found", { status: 404 });
    }

    const buffer = Buffer.from(media.fileData, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": String(media.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[media-file GET] error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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

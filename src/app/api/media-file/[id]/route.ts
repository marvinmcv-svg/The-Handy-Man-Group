import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

    // Convert base64 to buffer
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
    console.error("[media-file] error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

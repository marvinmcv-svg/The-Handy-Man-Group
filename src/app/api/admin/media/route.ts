import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import sharp from "sharp";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "mov"]);

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 100 * 1024 * 1024;

function getExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.\./g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {}
}

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

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    // Accept JSON with base64-encoded file data
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.fileName || !body.fileData) {
      return NextResponse.json(
        { ok: false, error: "Missing fileName or fileData in JSON body." },
        { status: 400 }
      );
    }

    const { fileName, fileData, mimeType } = body as {
      fileName: string;
      fileData: string;
      mimeType?: string;
    };

    const ext = getExt(fileName);
    const isImage = IMAGE_EXTS.has(ext);
    const isVideo = VIDEO_EXTS.has(ext);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unsupported file type ".${ext}". Allowed: jpg, png, webp, gif, mp4, webm, mov.`,
        },
        { status: 400 }
      );
    }

    // Strip data URL prefix if present
    const base64Data = fileData.includes(",")
      ? fileData.split(",")[1]
      : fileData;

    let fileBuffer: Buffer;
    try {
      fileBuffer = Buffer.from(base64Data, "base64");
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid base64 data." },
        { status: 400 }
      );
    }

    const fileSize = fileBuffer.length;

    if (isImage && fileSize > MAX_IMAGE) {
      return NextResponse.json(
        {
          ok: false,
          error: `Image is ${(fileSize / 1024 / 1024).toFixed(1)}MB — max is 10MB.`,
        },
        { status: 413 }
      );
    }

    if (isVideo && fileSize > MAX_VIDEO) {
      return NextResponse.json(
        {
          ok: false,
          error: `Video is ${(fileSize / 1024 / 1024).toFixed(1)}MB — max is 100MB.`,
        },
        { status: 413 }
      );
    }

    if (fileSize === 0) {
      return NextResponse.json(
        { ok: false, error: "File is empty." },
        { status: 400 }
      );
    }

    await ensureUploadDir();

    const id = crypto.randomBytes(10).toString("hex");
    const safeName = slugify(fileName.replace(/\.[^.]+$/, ""));
    const filename = `${id}-${safeName}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    const url = `/uploads/${filename}`;

    await fs.writeFile(filePath, fileBuffer);

    let width: number | null = null;
    let height: number | null = null;
    if (isImage) {
      try {
        const meta = await sharp(fileBuffer).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
      } catch (e) {
        console.warn("[media upload] sharp metadata failed:", e);
      }
    }

    const media = await db.media.create({
      data: {
        filename,
        originalName: fileName,
        mimeType: mimeType || (isImage ? `image/${ext}` : `video/${ext}`),
        size: fileSize,
        url,
        type: isImage ? "image" : "video",
        width,
        height,
      },
    });

    await logActivity(
      "create",
      "media",
      media.id,
      `Uploaded ${fileName} (${(fileSize / 1024).toFixed(0)}KB)`
    );

    return NextResponse.json({
      ok: true,
      media: {
        id: media.id,
        url: media.url,
        type: media.type,
        filename: media.filename,
        originalName: media.originalName,
        size: media.size,
        width: media.width,
        height: media.height,
      },
    });
  } catch (err) {
    console.error("[media upload] error:", err);
    const message = err instanceof Error ? err.message : "Upload failed unexpectedly.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

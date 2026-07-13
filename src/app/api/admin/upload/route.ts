import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = "/uploads";

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "mov"]);

const IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const VIDEO_MIMES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100MB

function slugifyBase(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || "file";
}

function uniqueId(): string {
  return Date.now().toString(36) + crypto.randomBytes(6).toString("hex");
}

function getExt(filename: string): string {
  const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

export async function POST(req: NextRequest) {
  // Auth
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { ok: false, error: "Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file provided (field name must be 'file')." },
        { status: 400 }
      );
    }

    const originalName = file.name || "upload";
    const ext = getExt(originalName);
    if (!ext) {
      return NextResponse.json(
        { ok: false, error: "Could not determine file extension." },
        { status: 400 }
      );
    }

    const isImage = IMAGE_EXTS.has(ext);
    const isVideo = VIDEO_EXTS.has(ext);
    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unsupported file type ".${ext}". Allowed: ${[
            ...IMAGE_EXTS,
            ...VIDEO_EXTS,
          ].join(", ")}.`,
        },
        { status: 400 }
      );
    }

    // MIME sanity check
    if (file.type) {
      if (isImage && !IMAGE_MIMES.has(file.type)) {
        return NextResponse.json(
          {
            ok: false,
            error: `MIME type "${file.type}" is not an allowed image.`,
          },
          { status: 400 }
        );
      }
      if (isVideo && !VIDEO_MIMES.has(file.type)) {
        return NextResponse.json(
          {
            ok: false,
            error: `MIME type "${file.type}" is not an allowed video.`,
          },
          { status: 400 }
        );
      }
    }

    const size = file.size;
    if (isImage && size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image exceeds the 10MB limit." },
        { status: 400 }
      );
    }
    if (isVideo && size > MAX_VIDEO_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Video exceeds the 100MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${uniqueId()}-${slugifyBase(
      originalName.replace(/\.[^.]+$/, "")
    )}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Ensure dir exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(filePath, buffer);

    let width: number | null = null;
    let height: number | null = null;
    let storedMime = file.type || (isImage ? "image/*" : "video/*");

    if (isImage) {
      try {
        const meta = await sharp(buffer).metadata();
        if (meta.width) width = meta.width;
        if (meta.height) height = meta.height;
        if (meta.format) {
          storedMime = `image/${meta.format}`;
        }
      } catch (e) {
        console.error("[upload] sharp metadata failed:", e);
        // Non-fatal — keep going with null dimensions
      }
    }

    const url = `${PUBLIC_PREFIX}/${filename}`;
    const type = isImage ? "image" : "video";

    const media = await db.media.create({
      data: {
        filename,
        originalName,
        mimeType: storedMime,
        size,
        url,
        type,
        width,
        height,
      },
    });

    await logActivity(
      "create",
      "media",
      media.id,
      `Uploaded ${originalName}`
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
        createdAt: media.createdAt,
      },
    });
  } catch (err) {
    console.error("[admin/upload POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to upload file." },
      { status: 500 }
    );
  }
}

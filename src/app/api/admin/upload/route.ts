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

const MAX_IMAGE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO = 100 * 1024 * 1024; // 100MB

function getExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.\./g, "") // strip directory traversal sequences
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    // Directory may already exist
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
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (e) {
      console.error("[upload] formData parse failed:", e);
      return NextResponse.json(
        { ok: false, error: "Could not read upload. The file may be too large." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file provided." },
        { status: 400 }
      );
    }

    const ext = getExt(file.name);
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

    if (isImage && file.size > MAX_IMAGE) {
      return NextResponse.json(
        {
          ok: false,
          error: `Image is ${(file.size / 1024 / 1024).toFixed(1)}MB — max is 10MB.`,
        },
        { status: 413 }
      );
    }

    if (isVideo && file.size > MAX_VIDEO) {
      return NextResponse.json(
        {
          ok: false,
          error: `Video is ${(file.size / 1024 / 1024).toFixed(1)}MB — max is 100MB.`,
        },
        { status: 413 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { ok: false, error: "File is empty." },
        { status: 400 }
      );
    }

    await ensureUploadDir();

    const id = crypto.randomBytes(10).toString("hex");
    const safeName = slugify(file.name.replace(/\.[^.]+$/, ""));
    const filename = `${id}-${safeName}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    const url = `/uploads/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    let width: number | null = null;
    let height: number | null = null;
    if (isImage) {
      try {
        const meta = await sharp(buffer).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
      } catch (e) {
        console.warn("[upload] sharp metadata failed:", e);
      }
    }

    const media = await db.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type || (isImage ? `image/${ext}` : `video/${ext}`),
        size: file.size,
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
      `Uploaded ${file.name} (${(file.size / 1024).toFixed(0)}KB)`
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
    console.error("[upload] error:", err);
    const message = err instanceof Error ? err.message : "Upload failed unexpectedly.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

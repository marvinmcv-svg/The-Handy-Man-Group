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

interface UploadResult {
  ok: boolean;
  media?: {
    id: string;
    url: string;
    type: string;
    filename: string;
    originalName: string;
    size: number;
    width: number | null;
    height: number | null;
  };
  error?: string;
}

async function processUpload(
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<UploadResult> {
  const ext = getExt(fileName);
  const isImage = IMAGE_EXTS.has(ext);
  const isVideo = VIDEO_EXTS.has(ext);

  if (!isImage && !isVideo) {
    return {
      ok: false,
      error: `Unsupported file type ".${ext}". Allowed: jpg, png, webp, gif, mp4, webm, mov.`,
    };
  }

  const fileSize = fileBuffer.length;

  if (isImage && fileSize > MAX_IMAGE) {
    return {
      ok: false,
      error: `Image is ${(fileSize / 1024 / 1024).toFixed(1)}MB — max is 10MB.`,
    };
  }

  if (isVideo && fileSize > MAX_VIDEO) {
    return {
      ok: false,
      error: `Video is ${(fileSize / 1024 / 1024).toFixed(1)}MB — max is 100MB.`,
    };
  }

  if (fileSize === 0) {
    return { ok: false, error: "File is empty." };
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
      console.warn("[upload] sharp metadata failed:", e);
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

  return {
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
  };
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

    // Route 1: JSON with base64-encoded file data
    // This works through the Z.ai Code platform gateway which doesn't
    // forward multipart/form-data requests.
    if (contentType.includes("application/json")) {
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

      // Strip data URL prefix if present (e.g. "data:image/png;base64,AAAA...")
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

      const result = await processUpload(fileName, fileBuffer, mimeType || "");
      return NextResponse.json(result, {
        status: result.ok ? 200 : 400,
      });
    }

    // Route 2: Multipart form data (works locally, may not work through
    // the Z.ai Code platform gateway)
    if (contentType.includes("multipart/form-data")) {
      let formData: FormData;
      try {
        formData = await req.formData();
      } catch (e) {
        console.error("[upload] formData parse failed:", e);
        return NextResponse.json(
          {
            ok: false,
            error:
              "Could not read upload. The file may be too large or the gateway may not support multipart uploads. Try refreshing the page.",
          },
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

      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      const result = await processUpload(file.name, fileBuffer, file.type);
      return NextResponse.json(result, {
        status: result.ok ? 200 : 400,
      });
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported content type. Use application/json or multipart/form-data." },
      { status: 400 }
    );
  } catch (err) {
    console.error("[upload] error:", err);
    const message = err instanceof Error ? err.message : "Upload failed unexpectedly.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

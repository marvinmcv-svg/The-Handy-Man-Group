import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";
// Allow a bit more time for large video uploads
export const maxDuration = 60;

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const MAX_IMAGE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO = 100 * 1024 * 1024; // 100MB
const MAX_FILENAME_LEN = 180;

// Allow-list of (extension, mime, type) tuples. We trust the declared MIME
// only after also matching the extension — both must agree.
const ALLOWED: Record<
  string,
  { ext: string; mime: string; type: "image" | "video"; max: number }
> = {
  jpg: { ext: "jpg", mime: "image/jpeg", type: "image", max: MAX_IMAGE },
  jpeg: { ext: "jpeg", mime: "image/jpeg", type: "image", max: MAX_IMAGE },
  png: { ext: "png", mime: "image/png", type: "image", max: MAX_IMAGE },
  webp: { ext: "webp", mime: "image/webp", type: "image", max: MAX_IMAGE },
  gif: { ext: "gif", mime: "image/gif", type: "image", max: MAX_IMAGE },
  mp4: { ext: "mp4", mime: "video/mp4", type: "video", max: MAX_VIDEO },
  webm: { ext: "webm", mime: "video/webm", type: "video", max: MAX_VIDEO },
  mov: { ext: "mov", mime: "video/quicktime", type: "video", max: MAX_VIDEO },
};

// Lightweight magic-byte sniff — defends against clients that lie about MIME.
function sniffType(
  buf: Buffer
):
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "video/mp4"
  | "video/webm"
  | "video/quicktime"
  | null {
  if (buf.length < 12) return null;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  )
    return "image/png";
  // GIF: 47 49 46 38 (7a or 9a) 61
  if (
    buf[0] === 0x47 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x38 &&
    buf[6] === 0x61
  )
    return "image/gif";
  // WebP: RIFF....WEBP
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return "image/webp";
  // MP4/MOV: ftyp box at offset 4 — "ftyp". We can't easily distinguish
  // quicktime from mp4 by magic alone, so we accept either and trust the
  // extension rule for the final mime label.
  if (
    buf[4] === 0x66 &&
    buf[5] === 0x74 &&
    buf[6] === 0x79 &&
    buf[7] === 0x70
  ) {
    return "video/mp4";
  }
  // WebM: 1A 45 DF A3
  if (
    buf[0] === 0x1a &&
    buf[1] === 0x45 &&
    buf[2] === 0xdf &&
    buf[3] === 0xa3
  )
    return "video/webm";
  return null;
}

function getExt(name: string): string {
  const clean = name.toLowerCase();
  // Strip any path separators and take the last segment
  const base = clean.split(/[\\/]/).pop() ?? clean;
  // Reject double extensions like "shell.php.jpg" — only honour a single dot.
  const parts = base.split(".");
  if (parts.length !== 2) return "";
  const ext = parts[1];
  return /^[a-z0-9]+$/.test(ext) ? ext : "";
}

async function getImageDimensions(
  buf: Buffer,
  mime: string
): Promise<{ width: number; height: number } | null> {
  if (!mime.startsWith("image/")) return null;
  try {
    // sharp is installed in package.json
    const sharp = (await import("sharp")).default;
    const meta = await sharp(buf).metadata();
    if (meta.width && meta.height) {
      return { width: meta.width, height: meta.height };
    }
  } catch {
    // Sharp failed — not fatal; we just don't store dimensions.
  }
  return null;
}

export async function POST(req: NextRequest) {
  // Auth
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file provided." },
        { status: 400 }
      );
    }

    // Filename length cap
    if (file.name.length > MAX_FILENAME_LEN) {
      return NextResponse.json(
        { ok: false, error: "Filename is too long." },
        { status: 400 }
      );
    }

    const ext = getExt(file.name);
    if (!ext) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Invalid filename. Use a single, simple extension (e.g. photo.png).",
        },
        { status: 400 }
      );
    }

    const rule = ALLOWED[ext];
    if (!rule) {
      return NextResponse.json(
        { ok: false, error: `Unsupported file type ".${ext}".` },
        { status: 400 }
      );
    }

    // Size check (defence in depth — client also validates)
    if (file.size > rule.max) {
      const mb = Math.round((rule.max / (1024 * 1024)) * 10) / 10;
      return NextResponse.json(
        {
          ok: false,
          error: `File exceeds the ${mb}MB limit for ${rule.type}s.`,
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

    // Read into a Buffer so we can sniff magic bytes
    const buf = Buffer.from(await file.arrayBuffer());

    // MIME sniff — verify the declared type matches the bytes
    const sniffed = sniffType(buf);
    if (!sniffed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "File content did not match any allowed image or video type.",
        },
        { status: 400 }
      );
    }
    // Cross-check: sniffed type must be compatible with the rule
    const sniffedBase = sniffed.split("/")[0]; // "image" | "video"
    if (sniffedBase !== rule.type) {
      return NextResponse.json(
        { ok: false, error: "File extension does not match its contents." },
        { status: 400 }
      );
    }
    // For images, also require the sniffed MIME to match the declared MIME
    // (e.g. a .png must sniff as image/png).
    if (rule.type === "image" && sniffed !== rule.mime) {
      return NextResponse.json(
        {
          ok: false,
          error: `File is a ${sniffed} but extension says .${ext}.`,
        },
        { status: 400 }
      );
    }

    // Ensure upload dir exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Generate a safe, unique filename. We strip the user-controlled name
    // entirely and use a random ID + the validated extension.
    const id = crypto.randomBytes(12).toString("hex");
    const safeFilename = `${id}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeFilename);

    // Final safety: confirm resolved path is inside UPLOAD_DIR (no traversal).
    const resolved = path.resolve(filePath);
    const uploadDirResolved = path.resolve(UPLOAD_DIR);
    if (
      resolved !== uploadDirResolved &&
      !resolved.startsWith(uploadDirResolved + path.sep)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid file path." },
        { status: 400 }
      );
    }

    // Write to disk
    await fs.writeFile(resolved, buf);

    // Derive image dimensions (best-effort)
    const dims = await getImageDimensions(buf, rule.mime);

    // Persist the Media record
    const media = await db.media.create({
      data: {
        filename: safeFilename,
        originalName: file.name.slice(0, 255),
        mimeType: rule.mime,
        size: buf.length,
        url: `/uploads/${safeFilename}`,
        type: rule.type,
        width: dims?.width ?? null,
        height: dims?.height ?? null,
      },
    });

    await logActivity(
      "create",
      "media",
      media.id,
      `Uploaded ${media.filename} (${media.type})`
    );

    return NextResponse.json({ ok: true, media });
  } catch (err) {
    console.error("[admin/upload POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to upload file." },
      { status: 500 }
    );
  }
}

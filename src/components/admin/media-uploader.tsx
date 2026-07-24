"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/lib/media";

type QueueStatus = "uploading" | "success" | "error";

interface QueueItem {
  id: string;
  file: File;
  status: QueueStatus;
  message?: string;
}

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 100 * 1024 * 1024;

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "mov"]);

function getExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function validate(file: File): string | null {
  const ext = getExt(file.name);
  const isImage = IMAGE_EXTS.has(ext);
  const isVideo = VIDEO_EXTS.has(ext);
  if (!isImage && !isVideo) {
    return `Unsupported file type ".${ext}"`;
  }
  if (isImage && file.size > MAX_IMAGE) {
    return "Image exceeds 10MB limit";
  }
  if (isVideo && file.size > MAX_VIDEO) {
    return "Video exceeds 100MB limit";
  }
  return null;
}

export function MediaUploader({
  onUploaded,
  className,
}: {
  onUploaded?: (media: MediaItem) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const uploadOne = useCallback(
    async (item: QueueItem) => {
      setQueue((q) =>
        q.map((it) =>
          it.id === item.id ? { ...it, status: "uploading" } : it
        )
      );
      try {
        // Convert file to base64 and send as JSON — the Z.ai Code platform
        // gateway doesn't forward multipart/form-data requests, so we use
        // JSON with base64-encoded file data instead.
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(item.file);
        });
        const fileData = await base64Promise;

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: item.file.name,
            fileData: fileData,
            mimeType: item.file.type,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Upload failed");
        }
        setQueue((q) =>
          q.map((it) =>
            it.id === item.id
              ? { ...it, status: "success", message: undefined }
              : it
          )
        );
        toast.success(`Uploaded ${item.file.name}`);
        onUploaded?.(data.media as MediaItem);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong";
        setQueue((q) =>
          q.map((it) =>
            it.id === item.id ? { ...it, status: "error", message: msg } : it
          )
        );
        toast.error(`Failed to upload ${item.file.name}: ${msg}`);
      }
    },
    [onUploaded]
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      const accepted: QueueItem[] = [];
      const rejected: { name: string; reason: string }[] = [];
      for (const f of arr) {
        const reason = validate(f);
        if (reason) {
          rejected.push({ name: f.name, reason });
          continue;
        }
        accepted.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file: f,
          status: "uploading",
        });
      }

      if (rejected.length > 0) {
        for (const r of rejected) {
          toast.error(`${r.name}: ${r.reason}`);
        }
      }
      if (accepted.length > 0) {
        setQueue((q) => [...q, ...accepted]);
        // Upload sequentially to avoid hammering the server
        accepted.reduce<Promise<unknown>>(
          (p, item) => p.then(() => uploadOne(item)),
          Promise.resolve()
        );
      }
    },
    [uploadOne]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      if (e.dataTransfer?.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        handleFiles(e.target.files);
      }
      // Reset so the same file can be picked again
      e.target.value = "";
    },
    [handleFiles]
  );

  const clearFinished = useCallback(() => {
    setQueue((q) => q.filter((it) => it.status === "uploading"));
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue((q) => q.filter((it) => it.id !== id));
  }, []);

  const anyUploading = queue.some((q) => q.status === "uploading");

  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={onDragOver}
        onDragEnter={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragOver
            ? "border-[#D2151E] bg-[#FFDEDE]/40"
            : "border-[#DDDDDD] bg-[#F9FAFB] hover:border-[#D2151E] hover:bg-[#FFDEDE]/20"
        )}
        aria-label="Upload media — click or drag files here"
      >
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center transition-colors",
            dragOver ? "bg-[#D2151E] text-white" : "bg-[#121117] text-white"
          )}
        >
          <UploadCloud className="h-6 w-6" strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#121117]">
            Drag &amp; drop files here, or{" "}
            <span className="text-[#D2151E] underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="mt-1 text-xs text-[#666666]">
            Images: JPG, PNG, WebP, GIF (max 10MB) · Videos: MP4, WebM, MOV
            (max 100MB)
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {queue.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#666666]">
              Upload queue
            </p>
            <button
              type="button"
              onClick={clearFinished}
              disabled={anyUploading}
              className="text-xs font-medium text-[#666666] transition-colors hover:text-[#121117] disabled:opacity-40"
            >
              Clear finished
            </button>
          </div>
          <ul className="divide-y divide-[#EEEEEE] border border-[#DDDDDD] bg-white">
            {queue.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 px-3 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#F3F4F6] text-[#121117]">
                  {item.status === "uploading" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#D2151E]" />
                  ) : item.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-[#D2151E]" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-medium text-[#121117]"
                    title={item.file.name}
                  >
                    {item.file.name}
                  </p>
                  <p className="text-xs text-[#999999]">
                    {item.status === "uploading"
                      ? "Uploading…"
                      : item.status === "success"
                        ? "Uploaded"
                        : item.message || "Failed"}
                  </p>
                  {item.status === "uploading" && (
                    <span className="mt-1.5 block h-1 w-full overflow-hidden bg-[#F3F4F6]">
                      <span className="block h-full w-1/3 animate-[pulse_1.4s_ease-in-out_infinite] bg-[#D2151E]" />
                    </span>
                  )}
                </div>
                {item.status !== "uploading" && (
                  <button
                    type="button"
                    onClick={() => removeFromQueue(item.id)}
                    className="inline-flex h-7 w-7 items-center justify-center text-[#999999] transition-colors hover:bg-[#F3F4F6] hover:text-[#121117]"
                    aria-label="Remove from queue"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

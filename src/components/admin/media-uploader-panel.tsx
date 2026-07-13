"use client";

import { useRouter } from "next/navigation";
import { MediaUploader } from "@/components/admin/media-uploader";

/**
 * Wraps the MediaUploader so that, on every successful upload,
 * the server-rendered grid below refreshes via router.refresh().
 */
export function MediaUploaderPanel() {
  const router = useRouter();
  return (
    <MediaUploader
      onUploaded={() => router.refresh()}
      className="border border-[#DDDDDD] bg-white p-5 sm:p-6"
    />
  );
}

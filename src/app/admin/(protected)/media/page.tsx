import Link from "next/link";
import { Film, ImageIcon } from "lucide-react";
import { db } from "@/lib/db";
import {
  PageHeader,
  AdminContainer,
  EmptyState,
} from "@/components/admin/page-header";
import { MediaUploaderPanel } from "@/components/admin/media-uploader-panel";
import { MediaDeleteButton } from "@/components/admin/media-delete-button";
import { formatDate, formatFileSize } from "@/lib/media";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Filter = "image" | "video";

function parseFilter(v: string | undefined): Filter | undefined {
  return v === "image" || v === "video" ? v : undefined;
}

export default async function MediaLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type: rawType } = await searchParams;
  const activeFilter = parseFilter(rawType);

  const media = await db.media.findMany({
    where: activeFilter ? { type: activeFilter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const allCount = await db.media.count();
  const imageCount = await db.media.count({ where: { type: "image" } });
  const videoCount = await db.media.count({ where: { type: "video" } });

  const tabs: { key: string; label: string; href: string; count: number; active: boolean }[] = [
    {
      key: "all",
      label: "All",
      href: "/admin/media",
      count: allCount,
      active: !activeFilter,
    },
    {
      key: "image",
      label: "Images",
      href: "/admin/media?type=image",
      count: imageCount,
      active: activeFilter === "image",
    },
    {
      key: "video",
      label: "Videos",
      href: "/admin/media?type=video",
      count: videoCount,
      active: activeFilter === "video",
    },
  ];

  return (
    <>
      <PageHeader
        title="Media Library"
        description="Upload and manage images & videos used across the site."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Media Library" },
        ]}
      />
      <AdminContainer className="space-y-6">
        <MediaUploaderPanel />

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={cn(
                "inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                t.active
                  ? "border-[#121117] bg-[#121117] text-white"
                  : "border-[#DDDDDD] bg-white text-[#666666] hover:border-[#121117] hover:text-[#121117]"
              )}
            >
              {t.label}
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center px-1 text-[10px]",
                  t.active ? "bg-white/20 text-white" : "bg-[#F3F4F6] text-[#666666]"
                )}
              >
                {t.count}
              </span>
            </Link>
          ))}
        </div>

        {media.length === 0 ? (
          <EmptyState
            title="No media uploaded yet"
            description="Use the uploader above to add images or videos to your library. They'll show up here."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {media.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden border border-[#DDDDDD] bg-white transition-shadow hover:shadow-sm"
              >
                <div className="relative aspect-square w-full bg-[#F3F4F6]">
                  {item.type === "image" ? (
                     
                    <img
                      src={item.url}
                      alt={item.originalName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#121117]">
                      <Film className="h-8 w-8 text-white/80" />
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        <ImageIcon className="h-3 w-3" />
                        Video
                      </span>
                    </div>
                  )}
                  {item.type === "image" && (
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      <ImageIcon className="h-3 w-3" />
                      Image
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-1 border-t border-[#EEEEEE] px-3 py-2.5">
                  <p
                    className="truncate text-sm font-medium text-[#121117]"
                    title={item.originalName}
                  >
                    {item.originalName}
                  </p>
                  <p className="text-xs text-[#999999]">
                    {formatFileSize(item.size)}
                    {item.width && item.height
                      ? ` · ${item.width}×${item.height}`
                      : ""}
                  </p>
                  <p className="text-[10px] text-[#CCCCCC]">
                    {formatDate(item.createdAt.toISOString())}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-[#666666] underline underline-offset-2 transition-colors hover:text-[#D2151E]"
                    >
                      View
                    </a>
                    <MediaDeleteButton id={item.id} filename={item.filename} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminContainer>
    </>
  );
}

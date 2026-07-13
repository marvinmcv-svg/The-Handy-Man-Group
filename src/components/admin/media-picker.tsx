"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, ImageIcon, Film, X, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  type MediaItem,
  type MediaType,
  formatFileSize,
} from "@/lib/media";

interface MediaPickerProps {
  /** Current selected value (URL). Used to show preview outside the dialog. */
  value?: string;
  /** Restrict picker to a specific media type. */
  filterType?: MediaType;
  /** Label for the trigger button. */
  label?: string;
  /** Called when the user picks a media item. */
  onSelect: (media: { url: string; type: MediaType }) => void;
  /** Optional clear handler — when provided, a Clear button is shown. */
  onClear?: () => void;
  /** Render the trigger button with the "outline" style (default). */
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  buttonSize?: "default" | "sm";
}

export function MediaPicker({
  value,
  filterType,
  label = "Choose from library",
  onSelect,
  onClear,
  buttonVariant = "outline",
  buttonSize = "sm",
}: MediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<MediaType | "all">(
    filterType ?? "all"
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const effective =
        filter === "all" ? filterType ?? "all" : filter;
      if (effective !== "all") params.set("type", effective);
      const res = await fetch(`/api/admin/media?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to load media");
      }
      setItems(data.media as MediaItem[]);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load media library"
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter, filterType]);

  useEffect(() => {
    if (open) fetchMedia();
  }, [open, fetchMedia]);

  function handleConfirm() {
    const item = items.find((i) => i.id === selectedId);
    if (!item) {
      toast.error("Please select a media item first.");
      return;
    }
    onSelect({ url: item.url, type: item.type });
    setOpen(false);
    setSelectedId(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setSelectedId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={buttonVariant}
          size={buttonSize}
          className={cn(
            buttonVariant === "outline" && "border-[#DDDDDD] text-[#121117]"
          )}
        >
          {filterType === "video" ? (
            <Film className="h-3.5 w-3.5" />
          ) : (
            <ImageIcon className="h-3.5 w-3.5" />
          )}
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-white p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-[#DDDDDD] px-5 py-4">
          <DialogTitle className="text-base font-bold text-[#121117]">
            {filterType === "video"
              ? "Choose a video"
              : filterType === "image"
                ? "Choose an image"
                : "Choose media"}
          </DialogTitle>
          <DialogDescription className="text-xs text-[#666666]">
            Select a file from your media library. Click an item then confirm.
          </DialogDescription>
        </DialogHeader>

        {/* Filter tabs */}
        {!filterType && (
          <div className="flex items-center gap-1 border-b border-[#DDDDDD] px-5 py-3">
            {(["all", "image", "video"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                  filter === f
                    ? "bg-[#121117] text-white"
                    : "text-[#666666] hover:bg-[#F3F4F6] hover:text-[#121117]"
                )}
              >
                {f === "all" ? "All" : f === "image" ? "Images" : "Videos"}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#666666]">
              <Loader2 className="h-6 w-6 animate-spin text-[#D2151E]" />
              <p className="mt-2 text-sm">Loading media…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-[#DDDDDD] py-16 text-center">
              <ImageIcon className="h-8 w-8 text-[#CCCCCC]" />
              <p className="mt-3 text-sm font-semibold text-[#121117]">
                No media found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#666666]">
                Upload some files in the Media Library first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => {
                const selected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "group relative flex flex-col overflow-hidden border text-left transition-all",
                      selected
                        ? "border-[#D2151E] ring-2 ring-[#D2151E]"
                        : "border-[#DDDDDD] hover:border-[#121117]"
                    )}
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
                          <Film className="h-7 w-7 text-white/80" />
                        </div>
                      )}
                      {selected && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center bg-[#D2151E] text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 border-t border-[#EEEEEE] px-2 py-1.5">
                      <p
                        className="truncate text-xs font-medium text-[#121117]"
                        title={item.originalName}
                      >
                        {item.originalName}
                      </p>
                      <p className="text-[10px] text-[#999999]">
                        {formatFileSize(item.size)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-[#DDDDDD] px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setSelectedId(null);
            }}
            className="border-[#DDDDDD]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedId}
            className="bg-[#D2151E] text-white hover:bg-[#B01118]"
          >
            <Check className="h-4 w-4" />
            Select
          </Button>
        </DialogFooter>
      </DialogContent>

      {value && onClear && (
        <Button
          type="button"
          variant="ghost"
          size={buttonSize}
          onClick={onClear}
          className="ml-2 text-[#666666] hover:text-[#D2151E]"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </Dialog>
  );
}

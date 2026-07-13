"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton, useFormSubmit } from "@/components/admin/submit-button";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  id?: string;
  name?: string;
  role?: string;
  quote?: string;
  video?: string | null;
  image?: string | null;
  order?: number;
};

export function TestimonialForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const { loading, submit } = useFormSubmit();
  const isEdit = Boolean(initial?.id);

  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [video, setVideo] = useState(initial?.video ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      role,
      quote,
      video: video || null,
      image: image || null,
      order: Number(order) || 0,
    };

    const url = isEdit && initial?.id
      ? `/api/admin/testimonials/${initial.id}`
      : "/api/admin/testimonials";
    const method = isEdit ? "PUT" : "POST";

    await submit(
      url,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      () => {
        toast.success(isEdit ? "Testimonial updated." : "Testimonial created.");
        router.push("/admin/testimonials");
        router.refresh();
      },
      (msg) => toast.error(msg)
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-[#D2151E]">*</span>
            </Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John C."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role / Context</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Rental Property Refurb"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quote">
            Quote <span className="text-[#D2151E]">*</span>
          </Label>
          <Textarea
            id="quote"
            required
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="The customer's review, word for word."
            rows={5}
          />
        </div>

        {/* Video testimonial upload */}
        <div className="space-y-2">
          <Label>Video testimonial (optional)</Label>
          <p className="text-xs text-[#999999] -mt-1">
            Upload a video of the client speaking — shows on the site as a playable video testimonial.
          </p>
          {video ? (
            <div className="border border-[#DDDDDD] bg-[#F9FAFB] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#121117] text-white">
                  <Play className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#121117] truncate">Video attached</p>
                  <p className="text-xs text-[#999999] truncate">{video}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVideo("")}
                  className="inline-flex h-8 w-8 items-center justify-center text-[#999999] hover:text-[#D2151E]"
                  aria-label="Remove video"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <video src={video} className="mt-3 w-full max-h-48 object-contain bg-black" controls />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <MediaPicker
                filterType="video"
                label="Choose from library"
                onSelect={(m) => setVideo(m.url)}
              />
              <span className="text-xs text-[#999999]">or paste a URL:</span>
              <div className="flex-1 min-w-[200px]">
                <Input
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="https://…"
                  className="h-9"
                />
              </div>
            </div>
          )}
        </div>

        {/* Poster image (optional) */}
        <div className="space-y-2">
          <Label>Poster image (optional)</Label>
          <p className="text-xs text-[#999999] -mt-1">
            Shown as the thumbnail before the video plays. If omitted, the video&apos;s first frame is used.
          </p>
          {image ? (
            <div className="border border-[#DDDDDD] bg-[#F9FAFB] p-3">
              <div className="flex items-center gap-3">
                <img src={image} alt="Poster" className="h-12 w-20 object-cover" />
                <p className="text-xs text-[#999999] truncate flex-1">{image}</p>
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="inline-flex h-8 w-8 items-center justify-center text-[#999999] hover:text-[#D2151E]"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <MediaPicker
                filterType="image"
                label="Choose from library"
                onSelect={(m) => setImage(m.url)}
              />
              <span className="text-xs text-[#999999]">or paste a URL:</span>
              <div className="flex-1 min-w-[200px]">
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://…"
                  className="h-9"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="order">Display order</Label>
            <Input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="0"
            />
            <p className="text-xs text-[#999999]">
              Lower numbers appear first. Video testimonials are featured prominently.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/testimonials">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <SubmitButton
          loading={loading}
          className="bg-[#D2151E] text-white hover:bg-[#B01118]"
        >
          {isEdit ? "Save Changes" : "Create Testimonial"}
        </SubmitButton>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton, useFormSubmit } from "@/components/admin/submit-button";

type Initial = {
  id?: string;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  image?: string;
  order?: number;
};

export function ProjectForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const { loading, submit } = useFormSubmit();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      category,
      location,
      description,
      image,
      order: Number(order) || 0,
    };

    if (isEdit && initial?.id) {
      await submit(
        `/api/admin/projects/${initial.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Project updated.");
          router.push("/admin/projects");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
    } else {
      await submit(
        "/api/admin/projects",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Project created.");
          router.push("/admin/projects");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-[#D2151E]">*</span>
          </Label>
          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Custom Deck & Pergola"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-[#D2151E]">*</span>
            </Label>
            <Input
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Carpentry"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Brisbane, QLD"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-[#D2151E]">*</span>
          </Label>
          <Textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project, the work done and the outcome."
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://…"
          />
          <p className="text-xs text-[#999999]">
            Paste a direct image URL. A preview appears below.
          </p>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="h-40 w-full border border-[#DDDDDD] object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
              }}
            />
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
              Lower numbers appear first.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <SubmitButton
          loading={loading}
          className="bg-[#D2151E] text-white hover:bg-[#B01118]"
        >
          {isEdit ? "Save Changes" : "Create Project"}
        </SubmitButton>
      </div>
    </form>
  );
}

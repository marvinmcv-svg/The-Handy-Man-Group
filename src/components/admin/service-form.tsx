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
  blurb?: string;
  icon?: string;
  points?: string[];
  order?: number;
};

export function ServiceForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const { loading, submit } = useFormSubmit();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [blurb, setBlurb] = useState(initial?.blurb ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "Hammer");
  const [points, setPoints] = useState(
    Array.isArray(initial?.points) ? (initial!.points as string[]).join("\n") : ""
  );
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      blurb,
      icon,
      points,
      order: Number(order) || 0,
    };

    if (isEdit && initial?.id) {
      const ok = await submit(
        `/api/admin/services/${initial.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Service updated.");
          router.push("/admin/services");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
      if (!ok) return;
    } else {
      const ok = await submit(
        "/api/admin/services",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Service created.");
          router.push("/admin/services");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
      if (!ok) return;
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
            placeholder="e.g. Carpentry"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blurb">
            Blurb <span className="text-[#D2151E]">*</span>
          </Label>
          <Textarea
            id="blurb"
            required
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            placeholder="Short description shown under the service title."
            rows={3}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="icon">
              Icon <span className="text-[#D2151E]">*</span>
            </Label>
            <Input
              id="icon"
              required
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g. Hammer"
            />
            <p className="text-xs text-[#999999]">
              A Lucide icon name (e.g. Hammer, Wrench, Ruler, Building2, Trees,
              Sparkles).
            </p>
          </div>
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

        <div className="space-y-2">
          <Label htmlFor="points">
            Points <span className="text-[#D2151E]">*</span>
          </Label>
          <Textarea
            id="points"
            required
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder={"One point per line, e.g.\nDecks & pergolas\nStructural framing\nDoors & trim"}
            rows={6}
            className="font-mono text-xs"
          />
          <p className="text-xs text-[#999999]">
            Enter one bullet point per line (or comma-separated).
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <SubmitButton
          loading={loading}
          className="bg-[#D2151E] text-white hover:bg-[#B01118]"
        >
          {isEdit ? "Save Changes" : "Create Service"}
        </SubmitButton>
      </div>
    </form>
  );
}

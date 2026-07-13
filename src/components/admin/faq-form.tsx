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
  q?: string;
  a?: string;
  order?: number;
};

export function FaqForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const { loading, submit } = useFormSubmit();
  const isEdit = Boolean(initial?.id);

  const [q, setQ] = useState(initial?.q ?? "");
  const [a, setA] = useState(initial?.a ?? "");
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      q,
      a,
      order: Number(order) || 0,
    };

    if (isEdit && initial?.id) {
      await submit(
        `/api/admin/faqs/${initial.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("FAQ updated.");
          router.push("/admin/faqs");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
    } else {
      await submit(
        "/api/admin/faqs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("FAQ created.");
          router.push("/admin/faqs");
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
          <Label htmlFor="q">
            Question <span className="text-[#D2151E]">*</span>
          </Label>
          <Input
            id="q"
            required
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. What areas do you service?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="a">
            Answer <span className="text-[#D2151E]">*</span>
          </Label>
          <Textarea
            id="a"
            required
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="The answer shown when the question is expanded."
            rows={6}
          />
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
          <Link href="/admin/faqs">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <SubmitButton
          loading={loading}
          className="bg-[#D2151E] text-white hover:bg-[#B01118]"
        >
          {isEdit ? "Save Changes" : "Create FAQ"}
        </SubmitButton>
      </div>
    </form>
  );
}

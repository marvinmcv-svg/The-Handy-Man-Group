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
  name?: string;
  role?: string;
  quote?: string;
  order?: number;
};

export function TestimonialForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const { loading, submit } = useFormSubmit();
  const isEdit = Boolean(initial?.id);

  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      role,
      quote,
      order: Number(order) || 0,
    };

    if (isEdit && initial?.id) {
      await submit(
        `/api/admin/testimonials/${initial.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Testimonial updated.");
          router.push("/admin/testimonials");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
    } else {
      await submit(
        "/api/admin/testimonials",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        () => {
          toast.success("Testimonial created.");
          router.push("/admin/testimonials");
          router.refresh();
        },
        (msg) => toast.error(msg)
      );
    }
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

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUSES = [
  { value: "new", label: "New", className: "bg-[#D2151E] text-white" },
  { value: "contacted", label: "Contacted", className: "bg-[#121117] text-white" },
  {
    value: "completed",
    label: "Completed",
    className: "bg-[#F3F4F6] text-[#121117] border border-[#DDDDDD]",
  },
] as const;

export function QuoteStatusControl({
  quoteId,
  initialStatus,
}: {
  quoteId: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [pending, startTransition] = useTransition();
  const [updating, setUpdating] = useState(false);

  async function updateStatus(next: string) {
    if (next === status) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to update status.");
      }
      setStatus(next);
      toast.success(`Status updated to "${next}".`);
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUSES.map((s) => {
        const active = status === s.value;
        return (
          <button
            key={s.value}
            type="button"
            disabled={pending || updating}
            onClick={() => updateStatus(s.value)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 px-4 text-sm font-semibold transition-all disabled:opacity-50",
              active
                ? s.className
                : "border border-[#DDDDDD] bg-white text-[#666666] hover:border-[#121117] hover:text-[#121117]"
            )}
            aria-pressed={active}
          >
            {updating && active && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

export function QuoteStatusBadge({ status }: { status: string }) {
  const match = STATUSES.find((s) => s.value === status);
  const cls = match?.className ?? "bg-[#F3F4F6] text-[#121117]";
  return (
    <span
      className={cn(
        "inline-flex px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        cls
      )}
    >
      {status}
    </span>
  );
}

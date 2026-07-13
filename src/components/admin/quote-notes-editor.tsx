"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, DollarSign, StickyNote } from "lucide-react";

export function QuoteNotesEditor({
  quoteId,
  initialNotes,
  initialAmount,
}: {
  quoteId: string;
  initialNotes: string;
  initialAmount: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [amount, setAmount] = useState(initialAmount);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, quoteAmount: amount }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to save");
      toast.success("Notes & quote amount saved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6 border border-[#DDDDDD] bg-white p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-1">
          <label htmlFor="amount" className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#121117]">
            <DollarSign className="h-4 w-4 text-[#D2151E]" />
            Quote amount (AUD)
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 4500"
            className="h-11 w-full border border-[#DDDDDD] bg-white px-3 text-[14px] outline-none focus:border-[#121117]"
          />
          <p className="mt-1.5 text-[12px] text-[#999999]">Numbers only — Joe will confirm with the client.</p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="notes" className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#121117]">
            <StickyNote className="h-4 w-4 text-[#D2151E]" />
            Internal notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Site visit notes, scope agreed, materials needed, scheduling constraints…"
            className="w-full resize-y border border-[#DDDDDD] bg-white p-3 text-[14px] outline-none focus:border-[#121117]"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-10 items-center gap-2 bg-[#121117] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#000000] disabled:bg-[#CCCCCC]"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save notes"}
        </button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer, EmptyState } from "@/components/admin/page-header";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#D2151E] text-white",
  contacted: "bg-[#121117] text-white",
  completed: "bg-[#F3F4F6] text-[#121117] border border-[#DDDDDD]",
};

function formatDate(iso: Date) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function QuotesListPage() {
  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const newCount = quotes.filter((q) => q.status === "new").length;
  const contactedCount = quotes.filter((q) => q.status === "contacted").length;
  const completedCount = quotes.filter((q) => q.status === "completed").length;

  return (
    <>
      <PageHeader
        title="Quote Requests"
        description="Inbound enquiries from your website contact form."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Quote Requests" },
        ]}
      />
      <AdminContainer>
        {/* Status summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard label="Total" value={quotes.length} />
          <SummaryCard
            label="New"
            value={newCount}
            className="border-[#D2151E]"
            valueClass="text-[#D2151E]"
          />
          <SummaryCard label="Contacted" value={contactedCount} />
          <SummaryCard label="Completed" value={completedCount} />
        </div>

        {quotes.length === 0 ? (
          <EmptyState
            title="No quote requests yet"
            description="New enquiries submitted via your website contact form will appear here."
          />
        ) : (
          <div className="overflow-hidden border border-[#DDDDDD] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DDDDDD] bg-[#F9FAFB] text-left text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    <th className="px-4 py-3">Name</th>
                    <th className="hidden px-4 py-3 md:table-cell">Email</th>
                    <th className="hidden px-4 py-3 lg:table-cell">Phone</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Suburb</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr
                      key={q.id}
                      className="border-b border-[#EEEEEE] last:border-0 transition-colors hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-3 font-medium text-[#121117]">
                        {q.name}
                      </td>
                      <td className="hidden px-4 py-3 text-[#666666] md:table-cell">
                        <a
                          href={`mailto:${q.email}`}
                          className="hover:text-[#D2151E] hover:underline"
                        >
                          {q.email}
                        </a>
                      </td>
                      <td className="hidden px-4 py-3 text-[#666666] lg:table-cell">
                        <a
                          href={`tel:${q.phone}`}
                          className="hover:text-[#D2151E] hover:underline"
                        >
                          {q.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-[#333333]">{q.service}</td>
                      <td className="hidden px-4 py-3 text-[#666666] sm:table-cell">
                        {q.suburb || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            "inline-flex px-2 py-0.5 text-xs font-semibold uppercase tracking-wide " +
                            (STATUS_STYLES[q.status] ||
                              "bg-[#F3F4F6] text-[#121117]")
                          }
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-[#666666] sm:table-cell">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/quotes/${q.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#D2151E] hover:underline"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </AdminContainer>
    </>
  );
}

function SummaryCard({
  label,
  value,
  className = "",
  valueClass = "text-[#121117]",
}: {
  label: string;
  value: number;
  className?: string;
  valueClass?: string;
}) {
  return (
    <div className={"border border-[#DDDDDD] bg-white p-4 " + className}>
      <div className={"text-2xl font-bold " + valueClass}>{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-[#999999]">
        {label}
      </div>
    </div>
  );
}

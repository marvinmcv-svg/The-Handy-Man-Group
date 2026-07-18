import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { ServiceBarChart, StatusPieChart } from "@/components/admin/dashboard-charts";
import { maybeSweepOldActivity } from "@/lib/activity";
import {
  Wrench,
  FolderKanban,
  Quote,
  HelpCircle,
  Inbox,
  Mail,
  ArrowRight,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#D2151E] text-white",
  contacted: "bg-[#121117] text-white",
  quoted: "bg-[#7C2D12] text-white",
  accepted: "bg-[#15803D] text-white",
  scheduled: "bg-[#1E40AF] text-white",
  completed: "bg-[#F3F4F6] text-[#121117] border border-[#DDDDDD]",
  declined: "bg-[#999999] text-white",
};

function formatDate(iso: Date) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  // Opportunistic retention sweep — runs at most once per hour.
  await maybeSweepOldActivity();

  const [
    servicesCount,
    projectsCount,
    testimonialsCount,
    faqsCount,
    totalQuotes,
    newQuotes,
    recentQuotes,
    allQuotes,
  ] = await Promise.all([
    db.service.count(),
    db.project.count(),
    db.testimonial.count(),
    db.faq.count(),
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "new" } }),
    db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.quoteRequest.findMany({ select: { service: true, status: true, quoteAmount: true } }),
  ]);

  // Analytics: jobs by service
  const serviceCounts: Record<string, number> = {};
  for (const q of allQuotes) {
    serviceCounts[q.service] = (serviceCounts[q.service] ?? 0) + 1;
  }
  const serviceData = Object.entries(serviceCounts)
    .map(([name, count]) => ({
      name: name.length > 14 ? name.slice(0, 12) + "…" : name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Analytics: quotes by status
  const statusCounts: Record<string, number> = {};
  for (const q of allQuotes) {
    statusCounts[q.status] = (statusCounts[q.status] ?? 0) + 1;
  }
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  // Conversion: (accepted + completed) / total
  const won = (statusCounts["accepted"] ?? 0) + (statusCounts["completed"] ?? 0);
  const conversionRate = totalQuotes > 0 ? Math.round((won / totalQuotes) * 100) : 0;

  // Pipeline value: sum of quoteAmount for accepted/scheduled/completed
  const pipelineValue = allQuotes
    .filter((q) => ["accepted", "scheduled", "completed"].includes(q.status))
    .reduce((sum, q) => {
      const n = parseFloat(q.quoteAmount ?? "0");
      return sum + (isNaN(n) ? 0 : n);
    }, 0);

  const stats = [
    {
      label: "Services",
      value: servicesCount,
      icon: Wrench,
      href: "/admin/services",
    },
    {
      label: "Projects",
      value: projectsCount,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      label: "Testimonials",
      value: testimonialsCount,
      icon: Quote,
      href: "/admin/testimonials",
    },
    {
      label: "FAQs",
      value: faqsCount,
      icon: HelpCircle,
      href: "/admin/faqs",
    },
    {
      label: "New Quote Requests",
      value: newQuotes,
      icon: Mail,
      href: "/admin/quotes",
      accent: true,
    },
    {
      label: "Total Quote Requests",
      value: totalQuotes,
      icon: Inbox,
      href: "/admin/quotes",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your site content and quote requests."
      />
      <AdminContainer>
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="group flex flex-col justify-between border border-[#DDDDDD] bg-white p-5 transition-all hover:border-[#121117] hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      "flex h-9 w-9 items-center justify-center " +
                      (s.accent
                        ? "bg-[#D2151E] text-white"
                        : "bg-[#F3F4F6] text-[#121117]")
                    }
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#CCCCCC] transition-all group-hover:translate-x-1 group-hover:text-[#121117]" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold tracking-tight text-[#121117]">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-[#999999]">
                    {s.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Analytics row */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Conversion + pipeline */}
          <div className="border border-[#DDDDDD] bg-[#121117] p-6 text-white">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white/50">
              <TrendingUp className="h-4 w-4 text-[#D2151E]" />
              Conversion
            </div>
            <div className="mt-4 text-[56px] font-bold leading-none text-[#D2151E]">
              {conversionRate}%
            </div>
            <p className="mt-2 text-[13px] text-white/60">
              {won} won / {totalQuotes} total quotes
            </p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white/50">
                <DollarSign className="h-4 w-4 text-[#D2151E]" />
                Pipeline value
              </div>
              <div className="mt-3 text-[32px] font-bold leading-none">
                ${pipelineValue.toLocaleString("en-AU")}
              </div>
              <p className="mt-2 text-[13px] text-white/60">
                Accepted + scheduled + completed
              </p>
            </div>
          </div>

          {/* Jobs by service */}
          <div className="border border-[#DDDDDD] bg-white p-6 lg:col-span-2">
            <h2 className="text-[15px] font-bold text-[#121117]">Quotes by service</h2>
            <p className="mt-1 text-[12px] text-[#999999]">Which services are most in demand</p>
            {serviceData.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-[13px] text-[#999999]">
                No quote data yet
              </div>
            ) : (
              <div className="mt-4">
                <ServiceBarChart data={serviceData} />
              </div>
            )}
          </div>
        </div>

        {/* Quotes by status */}
        <div className="mt-4 border border-[#DDDDDD] bg-white p-6">
          <h2 className="text-[15px] font-bold text-[#121117]">Quotes by status</h2>
          <p className="mt-1 text-[12px] text-[#999999]">Pipeline overview</p>
          {statusData.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center text-[13px] text-[#999999]">
              No quote data yet
            </div>
          ) : (
            <div className="mt-4">
              <StatusPieChart data={statusData} />
            </div>
          )}
        </div>

        {/* Recent quote requests */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#121117]">
              Recent Quote Requests
            </h2>
            <Link
              href="/admin/quotes"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#D2151E] hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden border border-[#DDDDDD] bg-white">
            {recentQuotes.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-[#999999]">
                No quote requests yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#DDDDDD] bg-[#F9FAFB] text-left text-xs font-semibold uppercase tracking-wide text-[#666666]">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="hidden px-4 py-3 sm:table-cell">
                        Suburb
                      </th>
                      <th className="px-4 py-3">Status</th>
                      <th className="hidden px-4 py-3 sm:table-cell">Date</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {recentQuotes.map((q) => (
                      <tr
                        key={q.id}
                        className="border-b border-[#EEEEEE] last:border-0 transition-colors hover:bg-[#F9FAFB]"
                      >
                        <td className="px-4 py-3 font-medium text-[#121117]">
                          {q.name}
                        </td>
                        <td className="px-4 py-3 text-[#333333]">
                          {q.service}
                        </td>
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
            )}
          </div>
        </div>
      </AdminContainer>
    </>
  );
}

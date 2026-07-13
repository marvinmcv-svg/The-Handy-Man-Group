import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import {
  Wrench,
  FolderKanban,
  Quote,
  HelpCircle,
  Inbox,
  Mail,
  ArrowRight,
} from "lucide-react";

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

export default async function AdminDashboardPage() {
  const [
    servicesCount,
    projectsCount,
    testimonialsCount,
    faqsCount,
    totalQuotes,
    newQuotes,
    recentQuotes,
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
  ]);

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

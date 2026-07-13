import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer, EmptyState } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, GripVertical } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServicesListPage() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage the services displayed on your website."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Services" }]}
        action={
          <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
            <Link href="/admin/services/new">
              <Plus className="h-4 w-4" />
              Add New Service
            </Link>
          </Button>
        }
      />
      <AdminContainer>
        {services.length === 0 ? (
          <EmptyState
            title="No services yet"
            description="Add your first service to display it on the website."
            action={
              <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
                <Link href="/admin/services/new">
                  <Plus className="h-4 w-4" />
                  Add New Service
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="overflow-hidden border border-[#DDDDDD] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DDDDDD] bg-[#F9FAFB] text-left text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    <th className="w-10 px-4 py-3">#</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="hidden px-4 py-3 md:table-cell">Icon</th>
                    <th className="hidden px-4 py-3 lg:table-cell">Blurb</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Points</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-[#EEEEEE] align-top last:border-0 transition-colors hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-[#999999]">
                          <GripVertical className="h-4 w-4" />
                          <span className="text-xs font-semibold text-[#121117]">
                            {s.order}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#121117]">
                        {s.title}
                      </td>
                      <td className="hidden px-4 py-4 md:table-cell">
                        <code className="bg-[#F3F4F6] px-1.5 py-0.5 text-xs text-[#666666]">
                          {s.icon}
                        </code>
                      </td>
                      <td className="hidden max-w-xs px-4 py-4 text-[#666666] lg:table-cell">
                        <span className="line-clamp-2">{s.blurb}</span>
                      </td>
                      <td className="hidden px-4 py-4 text-[#666666] sm:table-cell">
                        {countPoints(s.points)} points
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                          >
                            <Link href={`/admin/services/${s.id}`}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                          </Button>
                          <DeleteButton
                            endpoint={`/api/admin/services/${s.id}`}
                            redirectTo="/admin/services"
                            itemLabel={`service "${s.title}"`}
                          />
                        </div>
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

function countPoints(points: string): number {
  try {
    const arr = JSON.parse(points);
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

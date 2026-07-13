import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer, EmptyState } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  const projects = await db.project.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage the project showcase gallery."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Projects" }]}
        action={
          <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4" />
              Add New Project
            </Link>
          </Button>
        }
      />
      <AdminContainer>
        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Add your first project to showcase your work."
            action={
              <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
                <Link href="/admin/projects/new">
                  <Plus className="h-4 w-4" />
                  Add New Project
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
                    <th className="w-20 px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="hidden px-4 py-3 md:table-cell">
                      Category
                    </th>
                    <th className="hidden px-4 py-3 lg:table-cell">Location</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Order</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#EEEEEE] align-top last:border-0 transition-colors hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-12 w-16 border border-[#DDDDDD] object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center border border-[#DDDDDD] bg-[#F3F4F6] text-[10px] text-[#999999]">
                            No img
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#121117]">
                        {p.title}
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="inline-flex bg-[#F3F4F6] px-2 py-0.5 text-xs font-medium text-[#121117]">
                          {p.category}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-[#666666] lg:table-cell">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-[#999999]" />
                          {p.location || "—"}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-xs font-semibold text-[#121117] sm:table-cell">
                        {p.order}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                          >
                            <Link href={`/admin/projects/${p.id}`}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                          </Button>
                          <DeleteButton
                            endpoint={`/api/admin/projects/${p.id}`}
                            redirectTo="/admin/projects"
                            itemLabel={`project "${p.title}"`}
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

import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer, EmptyState } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestimonialsListPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Manage customer reviews displayed on your site."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Testimonials" },
        ]}
        action={
          <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
            <Link href="/admin/testimonials/new">
              <Plus className="h-4 w-4" />
              Add New Testimonial
            </Link>
          </Button>
        }
      />
      <AdminContainer>
        {testimonials.length === 0 ? (
          <EmptyState
            title="No testimonials yet"
            description="Add your first customer review."
            action={
              <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
                <Link href="/admin/testimonials/new">
                  <Plus className="h-4 w-4" />
                  Add New Testimonial
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex flex-col border border-[#DDDDDD] bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#121117]">{t.name}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#999999]">
                      {t.role || "—"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#999999]">
                    #{t.order}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#444444]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#EEEEEE] pt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Link href={`/admin/testimonials/${t.id}`}>
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </Button>
                  <DeleteButton
                    endpoint={`/api/admin/testimonials/${t.id}`}
                    itemLabel={`testimonial from "${t.name}"`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminContainer>
    </>
  );
}

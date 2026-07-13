import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer, EmptyState } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FaqsListPage() {
  const faqs = await db.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader
        title="FAQs"
        description="Manage the frequently asked questions on your site."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "FAQs" }]}
        action={
          <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
            <Link href="/admin/faqs/new">
              <Plus className="h-4 w-4" />
              Add New FAQ
            </Link>
          </Button>
        }
      />
      <AdminContainer>
        {faqs.length === 0 ? (
          <EmptyState
            title="No FAQs yet"
            description="Add your first frequently asked question."
            action={
              <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
                <Link href="/admin/faqs/new">
                  <Plus className="h-4 w-4" />
                  Add New FAQ
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {faqs.map((f) => (
              <div
                key={f.id}
                className="flex flex-col gap-3 border border-[#DDDDDD] bg-white p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#F3F4F6] text-xs font-bold text-[#121117]">
                      {f.order}
                    </span>
                    <p className="font-semibold text-[#121117]">{f.q}</p>
                  </div>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-[#444444]">
                    {f.a}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 sm:pl-4">
                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <Link href={`/admin/faqs/${f.id}`}>
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </Button>
                  <DeleteButton
                    endpoint={`/api/admin/faqs/${f.id}`}
                    itemLabel={`FAQ "${f.q}"`}
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

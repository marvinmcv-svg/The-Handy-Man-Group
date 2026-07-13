import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { FaqForm } from "@/components/admin/faq-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await db.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <>
      <PageHeader
        title="Edit FAQ"
        description={faq.q}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "FAQs", href: "/admin/faqs" },
          { label: faq.q },
        ]}
        action={
          <DeleteButton
            endpoint={`/api/admin/faqs/${faq.id}`}
            redirectTo="/admin/faqs"
            itemLabel={`FAQ "${faq.q}"`}
            size="default"
          />
        }
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <FaqForm
            initial={{
              id: faq.id,
              q: faq.q,
              a: faq.a,
              order: faq.order,
            }}
          />
        </div>
      </AdminContainer>
    </>
  );
}

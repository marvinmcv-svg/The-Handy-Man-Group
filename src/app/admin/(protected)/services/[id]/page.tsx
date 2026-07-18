import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });
  if (!service) notFound();

  let points: string[] = [];
  try {
    const parsed = JSON.parse(service.points);
    if (Array.isArray(parsed)) points = parsed.map(String);
  } catch {
    points = [];
  }

  return (
    <>
      <PageHeader
        title="Edit Service"
        description={service.title}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Services", href: "/admin/services" },
          { label: service.title },
        ]}
        action={
          <DeleteButton
            endpoint={`/api/admin/services/${service.id}`}
            redirectTo="/admin/services"
            itemLabel={`service "${service.title}"`}
            size="default"
          />
        }
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <ServiceForm
            initial={{
              id: service.id,
              title: service.title,
              blurb: service.blurb,
              icon: service.icon,
              points,
              photo: service.photo,
              order: service.order,
            }}
          />
        </div>
      </AdminContainer>
    </>
  );
}

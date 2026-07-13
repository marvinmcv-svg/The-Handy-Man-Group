import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <>
      <PageHeader
        title="New Service"
        description="Add a new service to your website."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Services", href: "/admin/services" },
          { label: "New" },
        ]}
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <ServiceForm />
        </div>
      </AdminContainer>
    </>
  );
}

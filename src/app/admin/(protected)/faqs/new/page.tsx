import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { FaqForm } from "@/components/admin/faq-form";

export const dynamic = "force-dynamic";

export default function NewFaqPage() {
  return (
    <>
      <PageHeader
        title="New FAQ"
        description="Add a new frequently asked question."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "FAQs", href: "/admin/faqs" },
          { label: "New" },
        ]}
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <FaqForm />
        </div>
      </AdminContainer>
    </>
  );
}

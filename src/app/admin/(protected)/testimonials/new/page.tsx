import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <>
      <PageHeader
        title="New Testimonial"
        description="Add a new customer review."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Testimonials", href: "/admin/testimonials" },
          { label: "New" },
        ]}
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <TestimonialForm />
        </div>
      </AdminContainer>
    </>
  );
}

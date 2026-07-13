import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await db.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <>
      <PageHeader
        title="Edit Testimonial"
        description={testimonial.name}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Testimonials", href: "/admin/testimonials" },
          { label: testimonial.name },
        ]}
        action={
          <DeleteButton
            endpoint={`/api/admin/testimonials/${testimonial.id}`}
            redirectTo="/admin/testimonials"
            itemLabel={`testimonial from "${testimonial.name}"`}
            size="default"
          />
        }
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <TestimonialForm
            initial={{
              id: testimonial.id,
              name: testimonial.name,
              role: testimonial.role,
              quote: testimonial.quote,
              video: testimonial.video,
              image: testimonial.image,
              order: testimonial.order,
            }}
          />
        </div>
      </AdminContainer>
    </>
  );
}

import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <PageHeader
        title="Edit Project"
        description={project.title}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Projects", href: "/admin/projects" },
          { label: project.title },
        ]}
        action={
          <DeleteButton
            endpoint={`/api/admin/projects/${project.id}`}
            redirectTo="/admin/projects"
            itemLabel={`project "${project.title}"`}
            size="default"
          />
        }
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <ProjectForm
            initial={{
              id: project.id,
              title: project.title,
              category: project.category,
              location: project.location,
              description: project.description,
              image: project.image,
              order: project.order,
            }}
          />
        </div>
      </AdminContainer>
    </>
  );
}

import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <>
      <PageHeader
        title="New Project"
        description="Add a new project to your showcase."
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Projects", href: "/admin/projects" },
          { label: "New" },
        ]}
      />
      <AdminContainer>
        <div className="mx-auto max-w-2xl border border-[#DDDDDD] bg-white p-6 sm:p-8">
          <ProjectForm />
        </div>
      </AdminContainer>
    </>
  );
}

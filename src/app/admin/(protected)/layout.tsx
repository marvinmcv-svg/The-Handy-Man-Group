import { requireAuth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Toaster as SonnerToaster } from "sonner";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <AdminShell>{children}</AdminShell>
      <SonnerToaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0px",
            border: "1px solid #DDDDDD",
            background: "#FFFFFF",
            color: "#121117",
          },
        }}
      />
    </div>
  );
}

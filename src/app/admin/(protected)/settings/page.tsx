import { requireAuth } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { PageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAuth();
  const settings = await getSettings();
  return (
    <div>
      <PageHeader title="Site Settings" crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]} />
      <SettingsForm initialSettings={settings as unknown as Record<string, string>} />
    </div>
  );
}

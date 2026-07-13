import { requireAuth } from "@/lib/auth";
import { getRecentActivity } from "@/lib/activity";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

const ACTION_COLORS: Record<string, string> = {
  create: "bg-[#D2151E] text-white",
  update: "bg-[#121117] text-white",
  delete: "bg-[#999999] text-white",
  login: "bg-[#F3F4F6] text-[#121117]",
  logout: "bg-[#F3F4F6] text-[#121117]",
};

export default async function ActivityPage() {
  await requireAuth();
  const activity = await getRecentActivity(100);

  return (
    <div>
      <PageHeader
        title="Activity Log"
        breadcrumb={[{ label: "Dashboard", href: "/admin" }, { label: "Activity" }]}
      />
      <div className="border border-[#DDDDDD] bg-white">
        {activity.length === 0 ? (
          <div className="p-12 text-center text-[15px] text-[#999999]">
            No activity yet. Admin actions (create/update/delete) will appear here.
          </div>
        ) : (
          <div className="divide-y divide-[#DDDDDD]">
            {activity.map((entry) => (
              <div key={entry.id} className="flex items-center gap-4 p-4">
                <span
                  className={`inline-flex h-8 w-16 items-center justify-center text-[11px] font-bold uppercase tracking-wide ${
                    ACTION_COLORS[entry.action] ?? "bg-[#F3F4F6] text-[#121117]"
                  }`}
                >
                  {entry.action}
                </span>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-[#121117]">
                    {entry.entity}
                    {entry.entityId && (
                      <span className="ml-2 text-[12px] font-normal text-[#999999]">
                        #{entry.entityId.slice(-8)}
                      </span>
                    )}
                  </p>
                  {entry.detail && (
                    <p className="text-[13px] text-[#666666]">{entry.detail}</p>
                  )}
                </div>
                <time className="text-[12px] text-[#999999]">
                  {new Date(entry.createdAt).toLocaleString("en-AU", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

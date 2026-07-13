import { db } from "@/lib/db";

export async function logActivity(
  action: string,
  entity: string,
  entityId?: string,
  detail?: string
): Promise<void> {
  try {
    await db.activityLog.create({
      data: { action, entity, entityId, detail },
    });
  } catch (e) {
    // Activity logging is best-effort; never fail the main operation
    console.error("[logActivity] failed:", e);
  }
}

export async function getRecentActivity(limit = 50) {
  return db.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

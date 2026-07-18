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

/**
 * Delete activity-log entries older than `days` days.
 *
 * Called opportunistically from the admin dashboard load (rate-limited to
 * once per hour) so the table doesn't grow unboundedly. Best-effort — any
 * DB error is swallowed.
 */
const RETENTION_DAYS = 90;
const SWEEP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
let lastSweep = 0;

export async function maybeSweepOldActivity(): Promise<void> {
  const now = Date.now();
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  try {
    const cutoff = new Date(now - RETENTION_DAYS * 24 * 60 * 60 * 1000);
    await db.activityLog.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });
  } catch (e) {
    console.error("[activity sweep] failed:", e);
  }
}

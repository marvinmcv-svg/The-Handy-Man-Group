import { NextResponse } from "next/server";

/**
 * Minimal API health check.
 * GET /api → 200 { ok: true, service, time }
 * Useful for uptime monitors (e.g. UptimeRobot) and container orchestration.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "the-handyman-carpentry-group",
    time: new Date().toISOString(),
  });
}

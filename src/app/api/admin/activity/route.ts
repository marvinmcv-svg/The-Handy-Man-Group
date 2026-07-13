import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getRecentActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const activity = await getRecentActivity(50);
  return NextResponse.json({ ok: true, activity });
}

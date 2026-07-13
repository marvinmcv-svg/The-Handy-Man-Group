import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSettings, setSettings } from "@/lib/settings";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { settings } = body as { settings?: Record<string, string> };
    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ ok: false, error: "Settings object required" }, { status: 400 });
    }
    await setSettings(settings);
    await logActivity("update", "settings", undefined, `Updated ${Object.keys(settings).length} setting(s)`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[settings PUT]", e);
    return NextResponse.json({ ok: false, error: "Failed to save settings" }, { status: 500 });
  }
}

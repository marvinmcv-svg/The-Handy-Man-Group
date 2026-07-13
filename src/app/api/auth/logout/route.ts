import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/logout] error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to log out." },
      { status: 500 }
    );
  }
}

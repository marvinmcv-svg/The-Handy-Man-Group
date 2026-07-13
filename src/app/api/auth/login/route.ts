import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { username, password } = body ?? {};

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username ||
      !password
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const success = await login(username, password);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/login] error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

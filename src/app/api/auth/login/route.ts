import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Brute-force protection: max 5 FAILED login attempts per minute per IP.
// We only count failures — a legit user who fat-fingers their password a few
// times then succeeds is not blocked. Successful login clears the bucket.
const loginLimiter = rateLimit({
  intervalMs: 60_000,
  max: 5,
  label: "login",
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

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

    // If the IP already has 5 failures in the last minute, refuse early.
    if (loginLimiter.remaining(ip) === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many login attempts. Please try again in a minute.",
        },
        { status: 429 }
      );
    }

    const success = await login(username, password);
    if (!success) {
      // Record the failure (consumes one of the 5 slots).
      loginLimiter.record(ip);
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Successful login — clear the failure bucket.
    loginLimiter.reset(ip);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/login] error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

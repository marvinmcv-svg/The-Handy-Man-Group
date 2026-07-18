import { cookies } from "next/headers";
import { db } from "@/lib/db";
import crypto from "crypto";

// Admin credentials — read from env vars in production. The fallback default
// is ONLY for local development and is explicitly rejected at runtime when
// NODE_ENV === "production" (see assertConfig()).
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Joeisgay123!";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Joelewis123!";

const SESSION_COOKIE = "hg_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const TOKEN_SECRET =
  process.env.ADMIN_TOKEN_SECRET || "hg-admin-secret-change-me";

// A new session is created on each login, so an attacker who pre-set the
// session cookie cannot reuse it after a legitimate login (session fixation
// defence).

function assertConfig() {
  if (process.env.NODE_ENV === "production") {
    if (
      TOKEN_SECRET === "hg-admin-secret-change-me" ||
      TOKEN_SECRET.length < 32
    ) {
      throw new Error(
        "ADMIN_TOKEN_SECRET must be set to a random string of at least 32 characters in production."
      );
    }
    if (
      ADMIN_USERNAME === "Joeisgay123!" ||
      ADMIN_PASSWORD === "Joelewis123!"
    ) {
      throw new Error(
        "Default admin credentials are not allowed in production. Set ADMIN_USERNAME and ADMIN_PASSWORD env vars."
      );
    }
  }
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
}

function createToken(): string {
  // 32 bytes of CSPRNG entropy for the payload, plus a timestamp for TTL
  // observability.
  const rand = crypto.randomBytes(32).toString("hex");
  const payload = `admin:${Date.now()}:${rand}`;
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

/**
 * Timing-safe token verification.
 *
 * Returns false on any structural problem (no dot, mismatched length, etc.).
 * The HMAC comparison itself uses `crypto.timingSafeEqual` over equal-length
 * hex strings.
 */
function verifyToken(token: string): boolean {
  try {
    const lastDot = token.lastIndexOf(".");
    if (lastDot === -1) return false;
    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);
    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!crypto.timingSafeEqual(a, b)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Timing-safe string comparison for the username + password check.
 * We compare both fields with timingSafeEqual so the response time doesn't
 * leak whether the username was correct.
 */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    // Still do a comparison to keep timing roughly constant
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

export async function login(username: string, password: string): Promise<boolean> {
  assertConfig();
  // Compare both fields every time (timing-safe) — order matters: we always
  // check username AND password, even if the username is wrong, to avoid
  // user-enumeration via response time.
  const userOk = safeEqual(username, ADMIN_USERNAME);
  const passOk = safeEqual(password, ADMIN_PASSWORD);
  if (!userOk || !passOk) {
    return false;
  }

  const token = createToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.adminSession.create({
    data: { token, expiresAt },
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
  return true;
}

export async function logout(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.adminSession.deleteMany({ where: { token } }).catch(() => {});
  }
  // Always clear the cookie, even if the DB delete failed.
  store.delete(SESSION_COOKIE);
}

// Track the last time we did a session-table cleanup so we don't sweep on
// every auth check.
let lastSessionSweep = 0;
const SESSION_SWEEP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

async function maybeSweepExpiredSessions() {
  const now = Date.now();
  if (now - lastSessionSweep < SESSION_SWEEP_INTERVAL_MS) return;
  lastSessionSweep = now;
  try {
    await db.adminSession.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  } catch (e) {
    // Best-effort — don't fail the auth check.
    console.error("[auth] session sweep failed:", e);
  }
}

export async function isAuthenticated(): Promise<boolean> {
  assertConfig();
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  if (!verifyToken(token)) return false;

  // Opportunistic cleanup of expired sessions (rate-limited).
  await maybeSweepExpiredSessions();

  // Check DB session exists and not expired.
  const session = await db.adminSession.findUnique({ where: { token } });
  if (!session) return false;
  if (session.expiresAt < new Date()) {
    await db.adminSession.delete({ where: { id: session.id } }).catch(() => {});
    return false;
  }
  return true;
}

export async function requireAuth(): Promise<void> {
  const ok = await isAuthenticated();
  if (!ok) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
}

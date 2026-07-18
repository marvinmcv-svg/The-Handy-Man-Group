import { cookies } from "next/headers";
import { db } from "@/lib/db";
import crypto from "crypto";

// Admin credentials (as requested by the owner)
const ADMIN_USERNAME = "Joeisgay123!";
const ADMIN_PASSWORD = "Joelewis123!";

const SESSION_COOKIE = "hg_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || "hg-admin-secret-change-me";

function sign(payload: string): string {
  return crypto.createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
}

function createToken(): string {
  const payload = `admin:${Date.now()}:${Math.random().toString(36).slice(2)}`;
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

function verifyToken(token: string): boolean {
  try {
    const lastDot = token.lastIndexOf(".");
    if (lastDot === -1) return false;
    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);
    const expected = sign(payload);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    // Check DB for active session
    return true; // DB check done separately
  } catch {
    return false;
  }
}

export async function login(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
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
    sameSite: "lax",
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
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  if (!verifyToken(token)) return false;
  // Check DB session exists and not expired
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

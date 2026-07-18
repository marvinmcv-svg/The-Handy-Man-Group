import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Public POST rate limit: max 5 quote submissions per 10 minutes per IP.
// This protects against spam bots hammering the form.
const quoteLimiter = rateLimit({
  intervalMs: 10 * 60_000,
  max: 5,
  label: "quote",
});

// Hard caps to prevent abuse / oversized DB rows.
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_SERVICE = 80;
const MAX_SUBURB = 120;
const MAX_MESSAGE = 4000;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!quoteLimiter.check(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "You've sent a few too many requests. Please try again shortly, or call us on (07) 3053 5274.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const { name, email, phone, service, message, suburb } = body ?? {};

    // Basic validation
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > MAX_NAME
    ) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name." },
        { status: 400 }
      );
    }
    if (
      typeof email !== "string" ||
      email.trim().length > MAX_EMAIL ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (
      typeof phone !== "string" ||
      phone.trim().length < 6 ||
      phone.trim().length > MAX_PHONE
    ) {
      return NextResponse.json(
        { ok: false, error: "A valid phone number is required." },
        { status: 400 }
      );
    }
    if (
      typeof service !== "string" ||
      service.trim().length === 0 ||
      service.trim().length > MAX_SERVICE
    ) {
      return NextResponse.json(
        { ok: false, error: "Please select a service." },
        { status: 400 }
      );
    }
    if (
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { ok: false, error: "Please add a few details about your project." },
        { status: 400 }
      );
    }
    if (suburb != null && (typeof suburb !== "string" || suburb.length > MAX_SUBURB)) {
      return NextResponse.json(
        { ok: false, error: "Suburb is too long." },
        { status: 400 }
      );
    }

    const record = await db.quoteRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service: service.trim(),
        message: message.trim(),
        suburb: typeof suburb === "string" && suburb.trim() ? suburb.trim() : null,
        status: "new",
      },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message:
        "Thanks! Your quote request has been received. We'll be in touch within one business day.",
    });
  } catch (err) {
    console.error("[quote POST] error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or call us." },
      { status: 500 }
    );
  }
}

/**
 * GET is admin-only. Public callers receive 401 — quote submissions contain
 * customer PII (name, phone, email) and must not be enumerable.
 */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const requests = await db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        service: true,
        suburb: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ ok: true, requests });
  } catch (err) {
    console.error("[quote GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to load requests." },
      { status: 500 }
    );
  }
}

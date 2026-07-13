import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, suburb } = body ?? {};

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name." },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { ok: false, error: "A valid phone number is required." },
        { status: 400 }
      );
    }
    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { ok: false, error: "Please select a service." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please add a few details about your project." },
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
        suburb: suburb ? String(suburb).trim() : null,
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

export async function GET() {
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

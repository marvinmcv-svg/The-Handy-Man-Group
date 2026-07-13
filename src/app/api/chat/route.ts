import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const dynamic = "force-dynamic";
// Allow longer-running LLM calls (up to 30s feel)
export const maxDuration = 30;

const MARVIN_SYSTEM_PROMPT = `You are Marvin, Joe's AI bot assistant. You work for The Handyman & Carpentry Group in Brisbane — a family-owned business run by Joe and Claudia since 2017 (formerly Joe Lewis Handyman). You're a friendly, helpful receptionist.

ALWAYS introduce yourself as 'Marvin, Joe's AI bot assistant' the first time you greet a visitor.

Company facts:
- Services: Carpentry, Handyman Services, Renovations, Commercial Spaces, Structural Landscaping, Home Makeovers
- Licensed: QBCC + Master Builders Queensland Members
- Location: Brisbane, Queensland (service Greater Brisbane)
- Phone: (07) 3053 5274
- Email: info@thehandymangroup.com.au
- Instagram: @thehandymangroup
- Hours: Mon–Fri 7:00am–5:00pm, Sat by appointment
- Tagline: 'No Job Is Too Small'
- We offer a complimentary onsite inspection and fixed-price quotes with no obligation

Your job:
- Greet visitors warmly and introduce yourself as Marvin
- Answer questions about services, licensing, areas serviced, hours, booking
- Encourage visitors to book a free onsite inspection via the contact form or by calling (07) 3053 5274
- Be concise and friendly — keep responses under 120 words unless the visitor asks for detail
- If asked something you don't know, suggest calling (07) 3053 5274 or emailing info@thehandymangroup.com.au
- Never make up prices — say Joe will provide a fixed-price quote after the free onsite inspection

Tone: warm, professional, Aussie-friendly, a little personality but never silly.`;

type IncomingMessage = { role: "user" | "assistant" | "system"; content: string };

/**
 * Marvin chat endpoint.
 * POST { messages: [{ role, content }] }
 * Returns { ok: true, reply: string } or { ok: false, error: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const rawMessages: unknown = body?.messages;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No messages provided." },
        { status: 400 }
      );
    }

    // Normalise + validate incoming messages
    const cleanMessages: IncomingMessage[] = [];
    for (const m of rawMessages) {
      if (!m || typeof m !== "object") continue;
      const role = (m as { role?: string }).role;
      const content = (m as { content?: string }).content;
      if (
        (role === "user" || role === "assistant" || role === "system") &&
        typeof content === "string" &&
        content.trim().length > 0
      ) {
        cleanMessages.push({ role, content: content.trim() });
      }
    }

    if (cleanMessages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No valid messages provided." },
        { status: 400 }
      );
    }

    // Trim to the last 10 messages to control token usage
    const trimmed = cleanMessages.slice(-10);

    // Per SDK pattern: system prompt is supplied as the first message
    // with role "assistant". (OpenAI-style "system" role is not supported here.)
    const messagesForLLM = [
      { role: "assistant" as const, content: MARVIN_SYSTEM_PROMPT },
      ...trimmed,
    ];

    // Wrap the LLM call in a 30s timeout guard
    const timeout = new Promise<{ timedOut: true }>((resolve) =>
      setTimeout(() => resolve({ timedOut: true }), 29000)
    );

    const llmPromise = (async () => {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: messagesForLLM,
        thinking: { type: "disabled" },
      });
      return { timedOut: false as const, completion };
    })();

    const result = await Promise.race([llmPromise, timeout]);

    if ("timedOut" in result && result.timedOut) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Marvin's taking a moment to think. Please try again, or call Joe on (07) 3053 5274.",
        },
        { status: 504 }
      );
    }

    const completion = result.completion;

    // Extract reply text — handle a few possible response shapes from the SDK
    let reply = "";
    if (typeof completion === "string") {
      reply = completion;
    } else if (completion?.choices?.[0]?.message?.content) {
      reply = completion.choices[0].message.content;
    } else if (completion?.choices?.[0]?.text) {
      reply = completion.choices[0].text;
    } else if (completion?.message?.content) {
      reply = completion.message.content;
    } else if (completion?.content) {
      reply = completion.content;
    } else {
      reply = String(completion ?? "").trim();
    }

    reply = (reply || "").trim();

    if (!reply) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Marvin got a bit tongue-tied. Please try again, or call Joe on (07) 3053 5274.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat POST] error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Marvin's having trouble connecting right now. Please call Joe on (07) 3053 5274 or email info@thehandymangroup.com.au.",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // cache for 1 hour

const CACHE: Record<string, { url: string; ts: number }> = {};
const CACHE_TTL = 1000 * 60 * 30; // 30 min in-memory

async function fetchOgImage(shortcode: string): Promise<string | null> {
  // Check in-memory cache
  const cached = CACHE[shortcode];
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.url;
  }
  try {
    const res = await fetch(
      `https://www.instagram.com/p/${shortcode}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
      }
    );
    if (!res.ok) return null;
    const html = await res.text();
    // Extract og:image
    const m = html.match(
      /property="og:image"[^>]*content="([^"]+)"/i
    );
    if (!m) return null;
    // Unescape HTML entities
    const url = m[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    CACHE[shortcode] = { url, ts: Date.now() };
    return url;
  } catch {
    return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;
  if (!shortcode) {
    return NextResponse.json({ error: "Missing shortcode" }, { status: 400 });
  }
  const ogUrl = await fetchOgImage(shortcode);
  if (!ogUrl) {
    // Return a transparent placeholder so the UI doesn't break
    return new NextResponse(
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC",
        "base64"
      ),
      {
        status: 200,
        headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
      }
    );
  }
  // Proxy the image so the browser can load it (avoids CDN 403)
  try {
    const imgRes = await fetch(ogUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "image/*,*/*",
      },
    });
    if (!imgRes.ok) {
      return new NextResponse(
        Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC",
          "base64"
        ),
        {
          status: 200,
          headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
        }
      );
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": imgRes.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new NextResponse(
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC",
        "base64"
      ),
      {
        status: 200,
        headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
      }
    );
  }
}

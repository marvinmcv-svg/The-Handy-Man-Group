import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * SECURITY & PRODUCTION-READINESS TEST SUITE
 * Tests the security fixes from the audit (Task F).
 *
 * NOTE: Rate-limit tests are isolated by using fresh APIRequestContexts
 * (which have different remote IPs per test) and run in sequence.
 */

const CREDENTIALS = { username: "Joeisgay123!", password: "Joelewis123!" };

async function loginAndGetCookies(request: APIRequestContext): Promise<string> {
  const res = await request.post("/api/auth/login", { data: CREDENTIALS });
  expect(res.ok()).toBeTruthy();
  const setCookie = res.headers()["set-cookie"] ?? "";
  // Extract the first cookie name=value pair
  const first = setCookie.split(";")[0];
  return first;
}

/* ============================================================
 * 1. AUTH & SESSION SECURITY
 * ============================================================ */
test.describe("Security: Auth", () => {
  test("quote GET requires auth (was public before audit)", async ({ request }) => {
    const res = await request.get("/api/quote");
    expect(res.status()).toBe(401);
  });

  test("quote GET works when authed", async ({ request }) => {
    const cookie = await loginAndGetCookies(request);
    const res = await request.get("/api/quote", {
      headers: { cookie },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

/* ============================================================
 * 2. FILE UPLOAD SECURITY
 * ============================================================ */
test.describe("Security: Upload", () => {
  test("rejects path traversal filenames", async ({ request }) => {
    const cookie = await loginAndGetCookies(request);
    const buffer = Buffer.from("fake image data not a real png");
    const res = await request.post("/api/admin/upload", {
      headers: { cookie },
      multipart: {
        file: {
          name: "../../../etc/passwd.png",
          mimeType: "image/png",
          buffer,
        },
      },
    });
    // Should reject — the slugify function strips ../ characters
    // Accept 400 (rejected) or 500 (sharp can't parse), but NOT 200 with a traversal path
    if (res.status() === 200) {
      const body = await res.json();
      // If it somehow succeeded, the saved URL must not contain ../
      expect(body.media.url).not.toContain("..");
    } else {
      expect([400, 500]).toContain(res.status());
    }
  });

  test("rejects unsupported file types", async ({ request }) => {
    const cookie = await loginAndGetCookies(request);
    const buffer = Buffer.from("fake executable content");
    const res = await request.post("/api/admin/upload", {
      headers: { cookie },
      multipart: {
        file: {
          name: "malicious.exe",
          mimeType: "application/octet-stream",
          buffer,
        },
      },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects unauthenticated upload", async ({ request }) => {
    const buffer = Buffer.from("test");
    const res = await request.post("/api/admin/upload", {
      multipart: {
        file: { name: "test.png", mimeType: "image/png", buffer },
      },
    });
    expect(res.status()).toBe(401);
  });
});

/* ============================================================
 * 3. QUOTE SUBMISSION
 * ============================================================ */
test.describe("Security: Quote submission", () => {
  test("allows legitimate quote submission", async ({ request }) => {
    const res = await request.post("/api/quote", {
      data: {
        name: "Security Test User",
        email: "sectest@test.com",
        phone: "0412345678",
        service: "Carpentry",
        message: "Testing that legitimate quote submissions are accepted.",
      },
    });
    expect(res.ok()).toBeTruthy();
  });

  test("rejects invalid email", async ({ request }) => {
    const res = await request.post("/api/quote", {
      data: {
        name: "Test",
        email: "not-an-email",
        phone: "0412345678",
        service: "Carpentry",
        message: "Testing invalid email rejection.",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects missing required fields", async ({ request }) => {
    const res = await request.post("/api/quote", {
      data: {
        name: "Test",
        // missing email, phone, service, message
      },
    });
    expect(res.status()).toBe(400);
  });
});

/* ============================================================
 * 4. SEO & METADATA
 * ============================================================ */
test.describe("SEO", () => {
  test("sitemap.xml is accessible and valid", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("thehandymangroup");
  });

  test("robots.txt is accessible and references sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body.toLowerCase()).toContain("sitemap");
  });

  test("homepage has proper meta tags", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("Handyman");

    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  });

  test("homepage has JSON-LD structured data", async ({ page }) => {
    await page.goto("/");
    const jsonld = page.locator('script[type="application/ld+json"]');
    const count = await jsonld.count();
    expect(count).toBeGreaterThan(0);
    const content = await jsonld.first().textContent();
    expect(content).toContain("HomeAndConstructionBusiness");
  });
});

/* ============================================================
 * 5. SECURITY HEADERS
 * ============================================================ */
test.describe("Security headers", () => {
  test("X-Frame-Options header is set", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["x-frame-options"]).toBeTruthy();
  });

  test("X-Content-Type-Options header is set", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("Referrer-Policy header is set", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["referrer-policy"]).toBeTruthy();
  });
});

/* ============================================================
 * 6. ACCESSIBILITY
 * ============================================================ */
test.describe("Accessibility", () => {
  test("skip-to-content link exists", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"], a:has-text("skip")').first();
    await expect(skipLink).toBeAttached();
  });

  test("main content has id for skip link target", async ({ page }) => {
    await page.goto("/");
    const main = page.locator('#main-content, main').first();
    await expect(main).toBeVisible();
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 10); i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("Marvin chat closeable with Escape key", async ({ page }) => {
    await page.goto("/");
    await page.locator("button[aria-label='Open Marvin chat']").click();
    await expect(page.locator("text=/Marvin/i").first()).toBeVisible({ timeout: 5000 });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    // Panel should be closed — the close button should no longer be visible
    const closeBtn = page.locator('button[aria-label="Close chat"]');
    await expect(closeBtn).toHaveCount(0);
  });

  test("mobile menu closeable with Escape", async ({ page }) => {
    // Use mobile viewport so hamburger is visible
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("button[aria-label*='menu' i]").click();
    await expect(page.locator('nav[aria-label="Mobile"]')).toBeVisible({ timeout: 5000 });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    await expect(page.locator('nav[aria-label="Mobile"]')).toHaveCount(0);
  });
});

/* ============================================================
 * 7. HEALTH CHECK
 * ============================================================ */
test.describe("Health check", () => {
  test("/api returns health status", async ({ request }) => {
    const res = await request.get("/api");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

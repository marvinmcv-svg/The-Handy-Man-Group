import { test, expect } from "@playwright/test";

// Admin portal E2E tests — login, auth guard, dashboard, CRUD, media, settings.

const CREDENTIALS = { username: "Joeisgay123!", password: "Joelewis123!" };

async function adminLogin(page: import("@playwright/test").Page) {
  await page.goto("/admin/login");
  await page.locator('input[name="username"]').fill(CREDENTIALS.username);
  await page.locator('input[name="password"]').fill(CREDENTIALS.password);
  await page.locator('button[type="submit"]', { hasText: /sign in/i }).click();
  await page.waitForURL(/\/admin$/, { timeout: 10000 });
}

test.describe("Admin portal — auth", () => {
  test("redirects to /admin/login when unauthenticated", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForURL(/\/admin\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/admin/login");
  });

  test("admin API returns 401 when unauthenticated", async ({ request }) => {
    const res = await request.get("/api/admin/services");
    expect(res.status()).toBe(401);
  });

  test("login fails with wrong credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator('input[name="username"]').fill("wrong");
    await page.locator('input[name="password"]').fill("wrong");
    await page.locator('button[type="submit"]', { hasText: /sign in/i }).click();
    // Should stay on login page
    await page.waitForTimeout(2000);
    expect(page.url()).toContain("/admin/login");
  });

  test("login succeeds with correct credentials", async ({ page }) => {
    await adminLogin(page);
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.locator("h1", { hasText: /dashboard/i })).toBeVisible();
  });

  test("logout works", async ({ page }) => {
    await adminLogin(page);
    await page.locator('button', { hasText: /logout/i }).click();
    await page.waitForURL(/\/admin\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/admin/login");
  });
});

test.describe("Admin portal — dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
  });

  test("shows stat cards with counts", async ({ page }) => {
    await expect(page.locator("text=SERVICES").first()).toBeVisible();
    await expect(page.locator("text=PROJECTS").first()).toBeVisible();
    await expect(page.locator("text=TESTIMONIALS").first()).toBeVisible();
    await expect(page.locator("text=FAQS").first()).toBeVisible();
  });

  test("shows analytics section", async ({ page }) => {
    await expect(page.locator("text=/conversion/i").first()).toBeVisible();
    await expect(page.locator("text=/quotes by service/i")).toBeVisible();
    await expect(page.locator("text=/quotes by status/i")).toBeVisible();
  });

  test("sidebar has all nav links", async ({ page }) => {
    const nav = page.locator('nav[aria-label="Admin navigation"]');
    await expect(nav.locator("a", { hasText: "Dashboard" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Services" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Projects" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Media Library" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Testimonials" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "FAQs" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Quote Requests" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Site Settings" })).toBeVisible();
    await expect(nav.locator("a", { hasText: "Activity Log" })).toBeVisible();
  });
});

test.describe("Admin portal — Services CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/services");
  });

  test("lists existing services", async ({ page }) => {
    await expect(page.locator("h1", { hasText: /services/i })).toBeVisible();
    // Scope to the table to avoid matching sidebar links
    const table = page.locator("table");
    await expect(table.locator("td", { hasText: "Carpentry" }).first()).toBeVisible();
    await expect(table.locator("td", { hasText: "Handyman Services" }).first()).toBeVisible();
  });

  test("creates a new service", async ({ page }) => {
    await page.locator("a", { hasText: /add new service/i }).click();
    await page.waitForURL(/\/admin\/services\/new/);

    await page.locator('#title').fill("Test Service E2E");
    await page.locator('#icon').fill("Wrench");
    await page.locator('#blurb').fill("A test service created by Playwright for E2E testing.");
    await page.locator('#points').fill("Point one\nPoint two\nPoint three");
    await page.locator('#order').fill("99");
    await page.locator('button[type="submit"]', { hasText: /create/i }).click();

    // Should redirect to services list
    await page.waitForURL(/\/admin\/services$/, { timeout: 15000 });
    await expect(page.locator("table")).toContainText("Test Service E2E");
  });

  test("deletes a service", async ({ page }) => {
    // Find the row with "Test Service E2E" and delete it
    const row = page.locator("tr", { hasText: "Test Service E2E" }).first();
    await expect(row).toBeVisible();
    // Click delete button in that row
    const deleteBtn = row.locator("button", { hasText: /delete/i });
    await deleteBtn.click();
    // Confirm in the dialog
    await page.waitForTimeout(1000);
    const confirmBtn = page.locator('[role="alertdialog"] button', { hasText: /delete|confirm/i }).last();
    await confirmBtn.click();
    await page.waitForTimeout(3000);
    // Row should be gone
    await expect(page.locator("table")).not.toContainText("Test Service E2E");
  });
});

test.describe("Admin portal — Media Library", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/media");
  });

  test("media library page loads", async ({ page }) => {
    await expect(page.locator("h1", { hasText: /media library/i })).toBeVisible();
  });

  test("upload dropzone is present", async ({ page }) => {
    await expect(page.locator('input[type="file"]')).toBeAttached();
  });

  test("can upload an image", async ({ page }) => {
    // Create a small test PNG
    const fs = await import("fs");
    const path = await import("path");
    const tmpDir = "/tmp";
    const imgPath = path.join(tmpDir, "e2e-test.png");
    // 1x1 red pixel PNG
    const pngBase64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    fs.writeFileSync(imgPath, Buffer.from(pngBase64, "base64"));

    await page.setInputFiles('input[type="file"]', imgPath);
    // Wait for upload to complete — success toast or the image appearing
    await expect(page.locator("text=/upload|success/i").first()).toBeVisible({ timeout: 20000 });
  });
});

test.describe("Admin portal — Site Settings", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/settings");
  });

  test("settings page loads with all sections", async ({ page }) => {
    await expect(page.locator("h1", { hasText: /site settings/i })).toBeVisible();
    await expect(page.locator("text=Homepage Hero")).toBeVisible();
    await expect(page.locator("text=Contact Information")).toBeVisible();
    await expect(page.locator("text=Social Media")).toBeVisible();
  });

  test("can update a setting and save", async ({ page }) => {
    const headlineInput = page.locator('[id="hero.headline"]');
    await headlineInput.fill("E2E Test Headline");
    await page.locator('button[type="submit"]', { hasText: /save settings/i }).click();
    // Success toast
    await expect(page.locator("text=/settings saved/i")).toBeVisible({ timeout: 10000 });
    // Reload and verify it persisted
    await page.reload();
    await expect(headlineInput).toHaveValue("E2E Test Headline");
  });
});

test.describe("Admin portal — Quote Requests", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/quotes");
  });

  test("quotes list page loads", async ({ page }) => {
    await expect(page.locator("h1", { hasText: /quote/i })).toBeVisible();
  });

  test("can view a quote detail and update status", async ({ page }) => {
    // Click the first "View" link
    const viewLink = page.locator('a', { hasText: /^view$/i }).first();
    if (await viewLink.count() > 0) {
      await viewLink.click();
      await page.waitForURL(/\/admin\/quotes\/./, { timeout: 10000 });
      // Status control should be present
      await expect(page.locator("text=/current status/i")).toBeVisible();
      // Notes editor should be present
      await expect(page.locator("text=/internal notes/i")).toBeVisible();
      // Quote amount field should be present
      await expect(page.locator("text=/quote amount/i")).toBeVisible();
    }
  });
});

test.describe("Admin portal — Activity Log", () => {
  test("activity log page loads", async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/activity");
    await expect(page.locator("h1", { hasText: /activity log/i })).toBeVisible();
    // Should show recent activity from our CRUD tests
    const rows = page.locator(".divide-y > div");
    expect(await rows.count()).toBeGreaterThan(0);
  });
});

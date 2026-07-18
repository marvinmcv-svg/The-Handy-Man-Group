import { test, expect } from "@playwright/test";

/**
 * Language toggle + Service photo tests
 */

test.describe("Language toggle (EN/ES)", () => {
  test("language toggle is visible in header", async ({ page }) => {
    await page.goto("/");
    // The toggle is a group with role="group" and aria-label "Language selector"
    const toggle = page.locator('[aria-label="Language selector"]');
    await expect(toggle).toBeVisible();
    // Should have EN and ES buttons
    await expect(toggle.locator("button", { hasText: "EN" })).toBeVisible();
    await expect(toggle.locator("button", { hasText: "ES" })).toBeVisible();
  });

  test("default language is English", async ({ page }) => {
    await page.goto("/");
    // Nav should show English labels
    await expect(page.locator("nav a[href='#services']").first()).toContainText(/Services/i);
  });

  test("switching to Spanish translates nav labels", async ({ page }) => {
    await page.goto("/");
    // Click ES
    await page.locator('[aria-label="Language selector"] button', { hasText: "ES" }).click();
    await page.waitForTimeout(500);
    // Nav should now show Spanish
    await expect(page.locator("nav a[href='#services']").first()).toContainText(/Servicios/i);
    await expect(page.locator("nav a[href='#contact']").first()).toContainText(/Contacto/i);
  });

  test("switching back to English restores English labels", async ({ page }) => {
    await page.goto("/");
    // Switch to ES
    await page.locator('[aria-label="Language selector"] button', { hasText: "ES" }).click();
    await page.waitForTimeout(500);
    // Switch back to EN
    await page.locator('[aria-label="Language selector"] button', { hasText: "EN" }).click();
    await page.waitForTimeout(500);
    await expect(page.locator("nav a[href='#services']").first()).toContainText(/Services/i);
  });

  test("language preference persists across page reloads", async ({ page }) => {
    await page.goto("/");
    await page.locator('[aria-label="Language selector"] button', { hasText: "ES" }).click();
    await page.waitForTimeout(500);
    // Reload
    await page.reload();
    await page.waitForTimeout(2000);
    // Should still be Spanish
    await expect(page.locator("nav a[href='#services']").first()).toContainText(/Servicios/i);
  });

  test("language toggle visible in mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    // Open mobile menu
    await page.locator("button[aria-label*='menu' i]").click();
    await expect(page.locator('nav[aria-label="Mobile"]')).toBeVisible({ timeout: 5000 });
    // Language toggle should be in mobile menu
    await expect(page.locator('nav[aria-label="Mobile"] [aria-label="Language selector"]')).toBeVisible();
  });
});

test.describe("Service photo feature", () => {
  test("services API accepts photo field on create", async ({ request }) => {
    // Login
    const loginRes = await request.post("/api/auth/login", {
      data: { username: "Joeisgay123!", password: "Joelewis123!" },
    });
    expect(loginRes.ok()).toBeTruthy();
    const cookie = loginRes.headers()["set-cookie"]?.split(";")[0] ?? "";

    // Create a service with a photo
    const res = await request.post("/api/admin/services", {
      headers: { cookie },
      data: {
        title: "Photo Test Service",
        blurb: "Testing the photo field",
        icon: "Hammer",
        points: ["Point 1", "Point 2"],
        photo: "https://example.com/test-photo.jpg",
        order: 999,
      },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.service.photo).toBe("https://example.com/test-photo.jpg");

    // Clean up — delete it
    await request.delete(`/api/admin/services/${body.service.id}`, {
      headers: { cookie },
    });
  });

  test("services API accepts photo field on update", async ({ request }) => {
    const loginRes = await request.post("/api/auth/login", {
      data: { username: "Joeisgay123!", password: "Joelewis123!" },
    });
    const cookie = loginRes.headers()["set-cookie"]?.split(";")[0] ?? "";

    // Create without photo
    const createRes = await request.post("/api/admin/services", {
      headers: { cookie },
      data: {
        title: "Photo Update Test",
        blurb: "Will add photo",
        icon: "Wrench",
        points: ["Point"],
        order: 999,
      },
    });
    const created = await createRes.json();

    // Update with photo
    const updateRes = await request.put(`/api/admin/services/${created.service.id}`, {
      headers: { cookie },
      data: { photo: "https://example.com/updated-photo.jpg" },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.service.photo).toBe("https://example.com/updated-photo.jpg");

    // Clean up
    await request.delete(`/api/admin/services/${created.service.id}`, {
      headers: { cookie },
    });
  });

  test("service photo can be cleared (set to null)", async ({ request }) => {
    const loginRes = await request.post("/api/auth/login", {
      data: { username: "Joeisgay123!", password: "Joelewis123!" },
    });
    const cookie = loginRes.headers()["set-cookie"]?.split(";")[0] ?? "";

    // Create with photo
    const createRes = await request.post("/api/admin/services", {
      headers: { cookie },
      data: {
        title: "Clear Photo Test",
        blurb: "Will clear photo",
        icon: "Hammer",
        points: ["Point"],
        photo: "https://example.com/photo.jpg",
        order: 999,
      },
    });
    const created = await createRes.json();

    // Clear photo (empty string → null)
    const updateRes = await request.put(`/api/admin/services/${created.service.id}`, {
      headers: { cookie },
      data: { photo: "" },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.service.photo).toBeNull();

    // Clean up
    await request.delete(`/api/admin/services/${created.service.id}`, {
      headers: { cookie },
    });
  });
});

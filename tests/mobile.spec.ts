import { test, expect } from "@playwright/test";

// Mobile-specific tests run with the "mobile" project config.

test("homepage hero is readable on mobile", async ({ page }) => {
  await page.goto("/");
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  const box = await h1.boundingBox();
  expect(box).toBeTruthy();
  expect(box!.width).toBeLessThan(390);
});

test("mobile hamburger menu opens and closes", async ({ page }) => {
  await page.goto("/");
  const hamburger = page.locator('button[aria-label*="menu" i]');
  await expect(hamburger).toBeVisible();
  await hamburger.click();
  await expect(page.locator('nav[aria-label="Mobile"]')).toBeVisible({ timeout: 5000 });
  // Close it
  const closeBtn = page.locator('button[aria-label*="close" i]');
  await closeBtn.click();
  await expect(page.locator('nav[aria-label="Mobile"]')).toHaveCount(0);
});

test("contact form is usable on mobile", async ({ page }) => {
  await page.goto("/");
  // Scroll to contact
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const nameInput = page.locator('input[name="name"]');
  await expect(nameInput).toBeVisible();
  const box = await nameInput.boundingBox();
  expect(box!.width).toBeGreaterThan(200);
});

test("Marvin chat widget opens near-fullscreen on mobile", async ({ page }) => {
  await page.goto("/");
  await page.locator("button", { hasText: /marvin/i }).first().click();
  await page.waitForTimeout(1000);
  // Chat panel should be visible
  await expect(page.locator("text=/marvin/i").first()).toBeVisible();
});

test("WhatsApp widget is reachable on mobile", async ({ page }) => {
  await page.goto("/");
  const wa = page.locator('a[href*="wa.me"]').first();
  await expect(wa).toBeVisible();
});

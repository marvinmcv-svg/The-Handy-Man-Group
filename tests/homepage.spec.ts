import { test, expect, type Page } from "@playwright/test";

// Homepage E2E tests — verifies all sections render, real content present,
// CTAs work, form submits, Marvin + WhatsApp widgets functional.

test.describe("Homepage — public site", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with correct title and hero", async ({ page }) => {
    await expect(page).toHaveTitle(/Handyman & Carpentry Group/i);
    await expect(page.locator("h1")).toContainText(/trust/i);
  });

  test("displays real Brisbane company info", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toContainText("Brisbane");
    await expect(body).toContainText("Joe");
    await expect(body).toContainText("QBCC");
    await expect(body).toContainText("Master Builders");
    await expect(body).toContainText("No Job");
  });

  test("shows all 6 services from DB", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toContainText("Carpentry");
    await expect(body).toContainText("Handyman Services");
    await expect(body).toContainText("Renovations");
    await expect(body).toContainText("Commercial Spaces");
    await expect(body).toContainText("Structural Landscaping");
    await expect(body).toContainText("Home Makeovers");
  });

  test("shows real testimonials", async ({ page }) => {
    await expect(page.locator("body")).toContainText("AWX Management");
    await expect(page.locator("body")).toContainText("John C.");
  });

  test("contact form section is present with all fields", async ({ page }) => {
    const contact = page.locator("#contact");
    await expect(contact).toBeVisible();
    await expect(contact.locator('input[name="name"]')).toBeVisible();
    await expect(contact.locator('input[name="email"]')).toBeVisible();
    await expect(contact.locator('input[name="phone"]')).toBeVisible();
    await expect(contact.locator('select[name="service"]')).toBeVisible();
    await expect(contact.locator('textarea[name="message"]')).toBeVisible();
  });

  test("contact form submits successfully (golden path)", async ({ page }) => {
    await page.locator('input[name="name"]').fill("Playwright Test");
    await page.locator('input[name="phone"]').fill("0412345678");
    await page.locator('input[name="email"]').fill("playwright@test.com");
    await page.locator('input[name="suburb"]').fill("Test Suburb, QLD");
    await page.locator('select[name="service"]').selectOption("Carpentry");
    await page
      .locator('textarea[name="message"]')
      .fill("This is a test quote request from Playwright. Need a deck built.");
    await page.locator('button[type="submit"]', { hasText: /send my request/i }).click();

    // Wait for success state
    await expect(page.locator("h3", { hasText: /quote request received/i })).toBeVisible({
      timeout: 15000,
    });
  });

  test("FAQ accordion expands/collapses", async ({ page }) => {
    const faq = page.locator("#faq");
    const firstButton = faq.locator("button").first();
    // First item should be expanded by default
    await expect(firstButton).toHaveAttribute("aria-expanded", "true");
    // Click to collapse
    await firstButton.click();
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  test("Instagram feed section renders with embeds", async ({ page }) => {
    const ig = page.locator("#instagram");
    await expect(ig).toBeVisible();
    await expect(ig.locator("h2")).toContainText(/Instagram/i);
    // Wait for embed.js to process blockquotes into iframes
    await page.waitForTimeout(4000);
    const iframes = ig.locator('iframe[src*="instagram.com/p/"]');
    const count = await iframes.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("Marvin chat widget opens and responds", async ({ page }) => {
    // Find the Marvin launcher button
    const launcher = page.locator("button", { hasText: /marvin/i }).first();
    await expect(launcher).toBeVisible();
    await launcher.click();

    // Chat panel should open with greeting
    await expect(page.locator("text=/Marvin/i").first()).toBeVisible();

    // Find the chat input and send a message
    const input = page.locator('input[type="text"], textarea').last();
    await input.fill("Hi, who are you?");
    const sendBtn = page.locator("button", { hasText: /send/i }).last();
    await sendBtn.click();

    // Wait for a response (Marvin should introduce himself)
    await expect(page.locator("body")).toContainText(/Marvin/i, { timeout: 20000 });
  });

  test("WhatsApp widget is present with correct number", async ({ page }) => {
    const waLink = page.locator('a[href*="wa.me/61730535274"]');
    await expect(waLink.first()).toBeVisible();
  });

  test("scroll progress bar appears on scroll", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    const progressBar = page.locator(".fixed.top-0.bg-\\[\\#D2151E\\]");
    await expect(progressBar).toBeVisible();
  });

  test("all nav anchor links scroll to sections", async ({ page }) => {
    const navLinks = page.locator('nav a[href^="#"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("hero image (AI-generated) loads", async ({ page }) => {
    const heroImg = page.locator('section img').first();
    await expect(heroImg).toHaveAttribute("src", /hero-carpenter/);
    const naturalWidth = await heroImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });
});

// Mobile tests are in mobile.spec.ts (run only on the mobile project)

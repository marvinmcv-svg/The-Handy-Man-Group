# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage — public site >> contact form submits successfully (golden path)
- Location: tests/homepage.spec.ts:50:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h3').filter({ hasText: /quote request received/i })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('h3').filter({ hasText: /quote request received/i })

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- banner:
  - link "The Handyman & Carpentry Group home":
    - /url: "#top"
    - img "The Handyman & Carpentry Group logo"
    - text: Handyman & Carpentry Group · Brisbane
  - navigation "Primary":
    - link "Services":
      - /url: "#services"
    - link "Projects":
      - /url: "#projects"
    - link "About":
      - /url: "#about"
    - link "Reviews":
      - /url: "#reviews"
    - link "Contact":
      - /url: "#contact"
  - group "Language selector":
    - button "EN" [pressed]
    - button "ES"
  - link "Get a Free Quote":
    - /url: "#contact"
- main:
  - img "Professional carpenter at work in a dark Brisbane workshop"
  - text: Brisbane's trusted carpenters & handymen since 2017
  - heading "The group you can trust." [level=1]: T h e g r o u p y o u c a n t r u s t .
  - paragraph: Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane. Family-owned by Joe & Claudia. No job is too small.
  - link "Get a Free Quote":
    - /url: "#contact"
  - link "Call":
    - /url: tel:0730535274
  - text: QBCC Licensed Master Builders QLD Members Family owned by Joe & Claudia Serving Brisbane 9 + years of craftsmanship QBCC Licensed
  - link "Scroll":
    - /url: "#services"
  - region "Services overview": Carpentry Handyman Services Renovations Commercial Spaces Structural Landscaping Home Makeovers Carpentry Handyman Services Renovations Commercial Spaces Structural Landscaping Home Makeovers Carpentry Handyman Services Renovations Commercial Spaces Structural Landscaping Home Makeovers
  - text: Explore
  - heading "Our Projects" [level=2]
  - paragraph: A selection of recent carpentry, renovation and handyman work across Brisbane. Every job — big or small — gets the same care and attention to detail.
  - link "View All Projects":
    - /url: https://www.instagram.com/thehandymangroup/
  - tablist "Filter projects by category":
    - tab "All" [selected]
    - tab "Carpentry"
    - tab "Renovation"
    - tab "Commercial"
    - tab "Landscaping"
    - tab "Makeover"
  - 'button "Open project: Office Space Refurbishment, Commercial in Brisbane, QLD"':
    - img "Office Space Refurbishment — Commercial in Brisbane, QLD"
    - text: Commercial Brisbane, QLD
    - heading "Office Space Refurbishment" [level=3]
    - text: View Project →
  - 'button "Open project: Rental Property Refresh, Renovation in Brisbane, QLD"':
    - img "Rental Property Refresh — Renovation in Brisbane, QLD"
    - text: Renovation Brisbane, QLD
    - heading "Rental Property Refresh" [level=3]
    - text: View Project →
  - 'button "Open project: Pre-Sale Home Preparation, Makeover in Brisbane, QLD"':
    - img "Pre-Sale Home Preparation — Makeover in Brisbane, QLD"
    - text: Makeover Brisbane, QLD
    - heading "Pre-Sale Home Preparation" [level=3]
    - text: View Project →
  - 'button "Open project: qweqw, qwerqw in"':
    - img "qweqw — qwerqw in"
    - text: qwerqw
    - heading "qweqw" [level=3]
    - text: View Project →
  - 'button "Open project: Custom Deck & Pergola, Carpentry in Brisbane, QLD"':
    - img "Custom Deck & Pergola — Carpentry in Brisbane, QLD"
    - text: Carpentry Brisbane, QLD
    - heading "Custom Deck & Pergola" [level=3]
    - text: View Project →
  - 'button "Open project: Bathroom Makeover, Renovation in Brisbane, QLD"':
    - img "Bathroom Makeover — Renovation in Brisbane, QLD"
    - text: Renovation Brisbane, QLD
    - heading "Bathroom Makeover" [level=3]
    - text: View Project →
  - 'button "Open project: Structural Landscaping, Landscaping in Brisbane, QLD"':
    - img "Structural Landscaping — Landscaping in Brisbane, QLD"
    - text: Landscaping Brisbane, QLD
    - heading "Structural Landscaping" [level=3]
    - text: View Project →
  - img "A professional tradesperson from The Handyman & Carpentry Group on the job site"
  - text: QBCC Licensed 0+ Years serving Brisbane homeowners & businesses About us
  - heading "We're builders of dreams — Joe & Claudia" [level=2]
  - paragraph: Formerly established as Joe Lewis Handyman in 2017, we've evolved and changed our name — but not the quality of our services. The Handyman & Carpentry Group is pleased to continue offering our makeover services, from small renovations to repairs that keep your home in its best condition.
  - paragraph: If you are looking to sell, uplift the look of your home, renovate, or simply want advice from an experienced team — we want to hear from you.
  - list:
    - listitem: Licensed carpenters, handymen and landscapers in one team
    - listitem: QBCC licensed & Master Builders Queensland members
    - listitem: Complimentary onsite inspection before every quote
    - listitem: Family owned and operated by Joe & Claudia personally
    - listitem: Fixed-price quotes — no hourly surprises, ever
    - listitem: From a squeaky door to a full renovation — no job too small
  - text: QBCC Licensed Master Builders QLD On-Time Service Servicing Brisbane & Greater Queensland What we do
  - heading "Our Services" [level=2]
  - paragraph: One trusted team for carpentry, handyman work, renovations, commercial spaces and structural landscaping. Licensed, insured, and proud of every job we finish.
  - link "Handyman Services — feature service Featured Service Handyman Services From the small fix-ups you've been putting off to full property maintenance. No job is too small — that's our promise. General repairs Door & lock fixes Tiling & patching Gutter cleaning Get a quote":
    - /url: "#contact"
    - img "Handyman Services — feature service"
    - text: Featured Service
    - heading "Handyman Services" [level=3]
    - paragraph: From the small fix-ups you've been putting off to full property maintenance. No job is too small — that's our promise.
    - list:
      - listitem: General repairs
      - listitem: Door & lock fixes
      - listitem: Tiling & patching
      - listitem: Gutter cleaning
    - text: Get a quote
  - link "02 Renovations Makeover services that uplift your home — kitchens, bathrooms, floors and full home refits, managed end to end. Kitchen makeovers Bathroom remodels Flooring & sanding Pre-sale makeovers Get a quote":
    - /url: "#contact"
    - text: "02"
    - heading "Renovations" [level=3]
    - paragraph: Makeover services that uplift your home — kitchens, bathrooms, floors and full home refits, managed end to end.
    - list:
      - listitem: Kitchen makeovers
      - listitem: Bathroom remodels
      - listitem: Flooring & sanding
      - listitem: Pre-sale makeovers
    - text: Get a quote
  - link "03 Commercial Spaces Office refits and commercial refurbishments that keep your business running. Quick, focused, and professional. Office refits Retail fit-outs Rental refurbishments Strata maintenance Get a quote":
    - /url: "#contact"
    - text: "03"
    - heading "Commercial Spaces" [level=3]
    - paragraph: Office refits and commercial refurbishments that keep your business running. Quick, focused, and professional.
    - list:
      - listitem: Office refits
      - listitem: Retail fit-outs
      - listitem: Rental refurbishments
      - listitem: Strata maintenance
    - text: Get a quote
  - link "04 Structural Landscaping Outdoor transformations with structural integrity — retaining walls, decks, pergolas and hard landscaping that lasts. Retaining walls Decking Pergolas & gazebos Hard landscaping Get a quote":
    - /url: "#contact"
    - text: "04"
    - heading "Structural Landscaping" [level=3]
    - paragraph: Outdoor transformations with structural integrity — retaining walls, decks, pergolas and hard landscaping that lasts.
    - list:
      - listitem: Retaining walls
      - listitem: Decking
      - listitem: Pergolas & gazebos
      - listitem: Hard landscaping
    - text: Get a quote
  - link "05 Home Makeovers Selling or staying? We uplift the look of your home with a targeted makeover that adds real value. Pre-sale prep Painting & detailing Garden tidy-up Styling repairs Get a quote":
    - /url: "#contact"
    - text: "05"
    - heading "Home Makeovers" [level=3]
    - paragraph: Selling or staying? We uplift the look of your home with a targeted makeover that adds real value.
    - list:
      - listitem: Pre-sale prep
      - listitem: Painting & detailing
      - listitem: Garden tidy-up
      - listitem: Styling repairs
    - text: Get a quote
  - text: What makes us different
  - heading "Expert craftsmanship for unmatched service." [level=2]
  - paragraph: Choosing The Handyman & Carpentry Group means working with a family team that values quality, honesty & client satisfaction. From residential to commercial, we deliver results that last — on time & within budget.
  - link "Contact us":
    - /url: "#contact"
  - heading "Family Owned Business" [level=3]
  - paragraph: Joe and Claudia run the show personally — you deal with the owners, not a call centre.
  - heading "Complimentary Onsite Inspection" [level=3]
  - paragraph: We come to you, assess the job properly, and give you honest advice before quoting.
  - heading "QBCC Licensed & Master Builders QLD" [level=3]
  - paragraph: Fully licensed, fully insured, and members of Master Builders Queensland. Quality you can verify.
  - heading "No Job Is Too Small" [level=3]
  - paragraph: From a squeaky door to a full renovation — we genuinely welcome the small jobs others won't.
  - paragraph: QBCC Licensed · Master Builders Queensland Members · Family owned by Joe & Claudia · Established 2017
  - region "Facts & Figures":
    - text: By the numbers
    - heading "Facts & Figures" [level=2]
    - paragraph: The numbers that show why Brisbane keeps coming back to Joe & Claudia.
    - article:
      - text: "0"
      - paragraph: Established
    - article:
      - text: 0+
      - paragraph: Instagram posts of real work
    - article:
      - text: 0+
      - paragraph: Happy Queensland clients
    - article:
      - text: 0%
      - paragraph: QBCC licensed & insured
    - paragraph: QBCC Licensed · Master Builders Queensland Members · Family owned by Joe & Claudia · Established 2017
  - region "Real clients. Real reviews.":
    - text: Our testimonials
    - heading "Real clients. Real reviews." [level=2]
    - paragraph: Don't take our word for it — hear directly from Brisbane homeowners and businesses who've worked with Joe & the team.
    - text: 5.0 Average rating Verified clients
    - region "Testimonials carousel":
      - blockquote: “Joe Lewis Handyman was quick, efficient and did a great job of our office space. He noticed things we've never noticed and provided a quality, friendly, and streamlined service. Couldn't recommend more highly.”
      - text: AM AWX Management Commercial Office Refurb
      - tablist "Choose testimonial":
        - tab "Go to testimonial 1" [selected]
        - tab "Go to testimonial 2"
        - tab "Go to testimonial 3"
        - tab "Go to testimonial 4"
      - text: 01 04
      - button "Previous testimonial"
      - button "Next testimonial"
  - text: "@thehandymangroup"
  - heading "Straight from our Instagram" [level=2]
  - paragraph: Real photos and videos from real jobs across Brisbane. Tap any post to view it on Instagram — give us a follow for daily updates.
  - link "Follow @thehandymangroup":
    - /url: https://www.instagram.com/thehandymangroup/
  - 'link "View Instagram post: Latest project work"':
    - /url: https://www.instagram.com/p/DVDiTY0ExGn/
    - iframe
    - text: 22 4
    - paragraph: Latest project work
  - 'link "View Instagram post: On the tools"':
    - /url: https://www.instagram.com/p/DSPReuMk0x7/
    - iframe
    - text: 18 2
    - paragraph: On the tools
  - 'link "View Instagram post: Before & after"':
    - /url: https://www.instagram.com/p/DQ8KmNIk2_N/
    - iframe
    - text: 12 1
    - paragraph: Before & after
  - 'link "View Instagram post: Carpentry detail"':
    - /url: https://www.instagram.com/p/DQWRN2Qkwjk/
    - iframe
    - text: 10 1
    - paragraph: Carpentry detail
  - 'link "View Instagram post: Site progress"':
    - /url: https://www.instagram.com/p/DPlPoAWE4Eu/
    - iframe
    - text: 14 2
    - paragraph: Site progress
  - 'link "View Instagram post: Finished deck"':
    - /url: https://www.instagram.com/p/DO-TifIk6Ck/
    - iframe
    - text: 22 4
    - paragraph: Finished deck
  - 'link "View Instagram post: Renovation work"':
    - /url: https://www.instagram.com/p/DOsP9pqkzbY/
    - iframe
    - text: 10 3
    - paragraph: Renovation work
  - 'link "View Instagram post: Structural landscaping"':
    - /url: https://www.instagram.com/p/DOKc5Dxk2Ci/
    - iframe
    - text: 12 1
    - paragraph: Structural landscaping
  - 'link "View Instagram post: Commercial fit-out"':
    - /url: https://www.instagram.com/p/DN44D6Dk0Vd/
    - iframe
    - text: 10 1
    - paragraph: Commercial fit-out
  - 'link "View Instagram post: Handyman repairs"':
    - /url: https://www.instagram.com/p/DNM0jJGR_dH/
    - iframe
    - text: 18 2
    - paragraph: Handyman repairs
  - 'link "View Instagram post: Custom joinery"':
    - /url: https://www.instagram.com/p/DM7W6IHRxwc/
    - iframe
    - text: 16 0
    - paragraph: Custom joinery
  - 'link "View Instagram post: Workshop"':
    - /url: https://www.instagram.com/p/DL9EgZ3PXf9/
    - iframe
    - text: 9 2
    - paragraph: Workshop
  - paragraph: 122 posts · 1.3K followers · Licensed Carpentry and Structural Landscaping · Handyman Services · Master Builders Qld Members
  - region "Ready to uplift your space?":
    - img "Carpentry workshop with timber and tools"
    - text: No Job Is Too Small
    - heading "Ready to uplift your space?" [level=2]
    - paragraph: Contact us today to book your free onsite inspection. From a squeaky door to a full renovation — we want to hear from you.
    - link "Get a Free Quote":
      - /url: "#contact"
    - link "Call (07) 3053 5274":
      - /url: tel:0730535274
    - text: QBCC Licensed · Master Builders Queensland Members Family owned by Joe & Claudia Established 2017
  - text: FAQ
  - heading "Questions, answered." [level=2]
  - paragraph: Can't find what you're looking for? Give us a call — Joe or Claudia will answer personally. Or chat with Marvin, our AI assistant.
  - link "Ask your question":
    - /url: "#contact"
  - button "What areas do you service?" [expanded]
  - paragraph: We're based in Brisbane and service Greater Brisbane and surrounding Queensland suburbs. For larger commercial and structural landscaping projects we travel further — just ask.
  - button "Are you licensed and insured?"
  - button "Is there a job that's too small?"
  - button "Do you offer free quotes?"
  - button "Can you handle commercial work?"
  - button "How do I book a job?"
  - text: Contact us
  - heading "Let's Connect" [level=2]
  - paragraph: Send us a message, and Joe or Claudia will get back to you promptly. We're here to answer your questions and help bring your vision to life.
  - link "Send us an email info@thehandymangroup.com.au":
    - /url: mailto:info@thehandymangroup.com.au
  - link "Give us a call (07) 3053 5274":
    - /url: tel:0730535274
  - text: Where we work Brisbane & Greater Queensland Hours Mon–Fri 7:00am – 5:00pm · Sat by appointment
  - link "Follow our work @thehandymangroup":
    - /url: https://www.instagram.com/thehandymangroup/
  - text: Your name*
  - textbox "Your name*":
    - /placeholder: Jane Smith
    - text: Playwright Test
  - text: Phone*
  - textbox "Phone*":
    - /placeholder: 04xx xxx xxx
    - text: "0412345678"
  - text: Email*
  - textbox "Email*":
    - /placeholder: jane@example.com
    - text: playwright@test.com
  - text: Suburb
  - textbox "Suburb":
    - /placeholder: e.g. Paddington, QLD
    - text: Test Suburb, QLD
  - text: What do you need?*
  - combobox "What do you need?*":
    - option "Select a service…" [disabled]
    - option "Carpentry" [selected]
    - option "Handyman Services"
    - option "Renovations"
    - option "Commercial Spaces"
    - option "Structural Landscaping"
    - option "Home Makeovers"
    - option "Other / Not sure"
  - text: Project details*
  - textbox "Project details*":
    - /placeholder: e.g. We'd like to refresh our kitchen — new cabinetry, benchtop and a coat of paint. Looking to start in about 4 weeks.
    - text: This is a test quote request from Playwright. Need a deck built.
  - paragraph: Tell us what you're trying to achieve, rough timing, and anything else useful.
  - paragraph: You've sent a few too many requests. Please try again shortly, or call us on (07) 3053 5274.
  - paragraph: We'll never share your details. No spam, ever.
  - button "Send my request"
- contentinfo:
  - heading "Ready to uplift your space?" [level=3]
  - paragraph: Contact us today to book your free onsite inspection. No job is too small.
  - link "(07) 3053 5274":
    - /url: tel:0730535274
  - link "Get a Free Quote":
    - /url: "#contact"
  - link "The Handyman & Carpentry Group home":
    - /url: "#top"
    - img "The Handyman & Carpentry Group logo"
    - text: Handyman & Carpentry Group · Brisbane
  - paragraph: Family-owned by Joe & Claudia. Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane since 2017. Formerly Joe Lewis Handyman.
  - link "Instagram":
    - /url: https://www.instagram.com/thehandymangroup/
  - link "Facebook":
    - /url: https://www.facebook.com/thehandymangroup/
  - heading "Services" [level=4]
  - list:
    - listitem:
      - link "Carpentry":
        - /url: "#services"
    - listitem:
      - link "Handyman Services":
        - /url: "#services"
    - listitem:
      - link "Renovations":
        - /url: "#services"
    - listitem:
      - link "Commercial Spaces":
        - /url: "#services"
    - listitem:
      - link "Structural Landscaping":
        - /url: "#services"
    - listitem:
      - link "Home Makeovers":
        - /url: "#services"
  - heading "Explore" [level=4]
  - list:
    - listitem:
      - link "Services":
        - /url: "#services"
    - listitem:
      - link "Projects":
        - /url: "#projects"
    - listitem:
      - link "About us":
        - /url: "#about"
    - listitem:
      - link "Why us":
        - /url: "#why-us"
    - listitem:
      - link "Reviews":
        - /url: "#reviews"
    - listitem:
      - link "FAQ":
        - /url: "#faq"
    - listitem:
      - link "Get a quote":
        - /url: "#contact"
  - heading "Get in touch" [level=4]
  - list:
    - listitem:
      - link "(07) 3053 5274":
        - /url: tel:0730535274
    - listitem:
      - link "info@thehandymangroup.com.au":
        - /url: mailto:info@thehandymangroup.com.au
    - listitem: Brisbane & Greater Queensland
    - listitem: Mon–Fri 7:00am – 5:00pm · Sat by appointment
  - paragraph: © 2026 The Handyman & Carpentry Group. QBCC Licensed · Master Builders Queensland Members.
  - paragraph: Family owned by Joe & Claudia · No Job Is Too Small
- button "Open Marvin chat": Marvin
- button "Dismiss"
- paragraph: Need a quick answer?
- paragraph: Message Joe on WhatsApp — we usually reply fast during work hours.
- button "Open WhatsApp"
- tooltip "Chat with us on WhatsApp"
- text: "1"
- link "Chat with us on WhatsApp":
  - /url: https://wa.me/61730535274?text=Hi%20Joe%2C%20I'd%20like%20to%20chat%20about%20a%20job.
- region "Notifications (F8)":
  - list
- alert
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | 
  3   | // Homepage E2E tests — verifies all sections render, real content present,
  4   | // CTAs work, form submits, Marvin + WhatsApp widgets functional.
  5   | 
  6   | test.describe("Homepage — public site", () => {
  7   |   test.beforeEach(async ({ page }) => {
  8   |     await page.goto("/");
  9   |   });
  10  | 
  11  |   test("loads with correct title and hero", async ({ page }) => {
  12  |     await expect(page).toHaveTitle(/Handyman & Carpentry Group/i);
  13  |     await expect(page.locator("h1")).toContainText(/trust/i);
  14  |   });
  15  | 
  16  |   test("displays real Brisbane company info", async ({ page }) => {
  17  |     const body = page.locator("body");
  18  |     await expect(body).toContainText("Brisbane");
  19  |     await expect(body).toContainText("Joe");
  20  |     await expect(body).toContainText("QBCC");
  21  |     await expect(body).toContainText("Master Builders");
  22  |     await expect(body).toContainText("No Job");
  23  |   });
  24  | 
  25  |   test("shows all 6 services from DB", async ({ page }) => {
  26  |     const body = page.locator("body");
  27  |     await expect(body).toContainText("Carpentry");
  28  |     await expect(body).toContainText("Handyman Services");
  29  |     await expect(body).toContainText("Renovations");
  30  |     await expect(body).toContainText("Commercial Spaces");
  31  |     await expect(body).toContainText("Structural Landscaping");
  32  |     await expect(body).toContainText("Home Makeovers");
  33  |   });
  34  | 
  35  |   test("shows real testimonials", async ({ page }) => {
  36  |     await expect(page.locator("body")).toContainText("AWX Management");
  37  |     await expect(page.locator("body")).toContainText("John C.");
  38  |   });
  39  | 
  40  |   test("contact form section is present with all fields", async ({ page }) => {
  41  |     const contact = page.locator("#contact");
  42  |     await expect(contact).toBeVisible();
  43  |     await expect(contact.locator('input[name="name"]')).toBeVisible();
  44  |     await expect(contact.locator('input[name="email"]')).toBeVisible();
  45  |     await expect(contact.locator('input[name="phone"]')).toBeVisible();
  46  |     await expect(contact.locator('select[name="service"]')).toBeVisible();
  47  |     await expect(contact.locator('textarea[name="message"]')).toBeVisible();
  48  |   });
  49  | 
  50  |   test("contact form submits successfully (golden path)", async ({ page }) => {
  51  |     await page.locator('input[name="name"]').fill("Playwright Test");
  52  |     await page.locator('input[name="phone"]').fill("0412345678");
  53  |     await page.locator('input[name="email"]').fill("playwright@test.com");
  54  |     await page.locator('input[name="suburb"]').fill("Test Suburb, QLD");
  55  |     await page.locator('select[name="service"]').selectOption("Carpentry");
  56  |     await page
  57  |       .locator('textarea[name="message"]')
  58  |       .fill("This is a test quote request from Playwright. Need a deck built.");
  59  |     await page.locator('button[type="submit"]', { hasText: /send my request/i }).click();
  60  | 
  61  |     // Wait for success state
> 62  |     await expect(page.locator("h3", { hasText: /quote request received/i })).toBeVisible({
      |                                                                              ^ Error: expect(locator).toBeVisible() failed
  63  |       timeout: 15000,
  64  |     });
  65  |   });
  66  | 
  67  |   test("FAQ accordion expands/collapses", async ({ page }) => {
  68  |     const faq = page.locator("#faq");
  69  |     const firstButton = faq.locator("button").first();
  70  |     // First item should be expanded by default
  71  |     await expect(firstButton).toHaveAttribute("aria-expanded", "true");
  72  |     // Click to collapse
  73  |     await firstButton.click();
  74  |     await expect(firstButton).toHaveAttribute("aria-expanded", "false");
  75  |   });
  76  | 
  77  |   test("Instagram feed section renders with embeds", async ({ page }) => {
  78  |     const ig = page.locator("#instagram");
  79  |     await expect(ig).toBeVisible();
  80  |     await expect(ig.locator("h2")).toContainText(/Instagram/i);
  81  |     // Wait for embed.js to process blockquotes into iframes
  82  |     await page.waitForTimeout(4000);
  83  |     const iframes = ig.locator('iframe[src*="instagram.com/p/"]');
  84  |     const count = await iframes.count();
  85  |     expect(count).toBeGreaterThanOrEqual(1);
  86  |   });
  87  | 
  88  |   test("Marvin chat widget opens and responds", async ({ page }) => {
  89  |     // Find the Marvin launcher button
  90  |     const launcher = page.locator("button", { hasText: /marvin/i }).first();
  91  |     await expect(launcher).toBeVisible();
  92  |     await launcher.click();
  93  | 
  94  |     // Chat panel should open with greeting
  95  |     await expect(page.locator("text=/Marvin/i").first()).toBeVisible();
  96  | 
  97  |     // Find the chat input and send a message
  98  |     const input = page.locator('input[type="text"], textarea').last();
  99  |     await input.fill("Hi, who are you?");
  100 |     const sendBtn = page.locator("button", { hasText: /send/i }).last();
  101 |     await sendBtn.click();
  102 | 
  103 |     // Wait for a response (Marvin should introduce himself)
  104 |     await expect(page.locator("body")).toContainText(/Marvin/i, { timeout: 20000 });
  105 |   });
  106 | 
  107 |   test("WhatsApp widget is present with correct number", async ({ page }) => {
  108 |     const waLink = page.locator('a[href*="wa.me/61730535274"]');
  109 |     await expect(waLink.first()).toBeVisible();
  110 |   });
  111 | 
  112 |   test("scroll progress bar appears on scroll", async ({ page }) => {
  113 |     await page.evaluate(() => window.scrollTo(0, 1000));
  114 |     await page.waitForTimeout(500);
  115 |     const progressBar = page.locator(".fixed.top-0.bg-\\[\\#D2151E\\]");
  116 |     await expect(progressBar).toBeVisible();
  117 |   });
  118 | 
  119 |   test("all nav anchor links scroll to sections", async ({ page }) => {
  120 |     const navLinks = page.locator('nav a[href^="#"]');
  121 |     const count = await navLinks.count();
  122 |     expect(count).toBeGreaterThanOrEqual(5);
  123 |   });
  124 | 
  125 |   test("hero image (AI-generated) loads", async ({ page }) => {
  126 |     const heroImg = page.locator('section img').first();
  127 |     await expect(heroImg).toHaveAttribute("src", /hero-carpenter/);
  128 |     const naturalWidth = await heroImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
  129 |     expect(naturalWidth).toBeGreaterThan(0);
  130 |   });
  131 | });
  132 | 
  133 | // Mobile tests are in mobile.spec.ts (run only on the mobile project)
  134 | 
```